from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import re
import ipaddress
import logging
import httpx
from html import escape
from html.parser import HTMLParser
from urllib.parse import urlparse
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Configure logging (needed before send_email uses it)
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
)
logger = logging.getLogger(__name__)

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Email (Emergent-managed Resend) - constant base URL, key from env
EMAIL_BASE_URL = "https://integrations.emergentagent.com"
EMAIL_KEY = os.environ.get("EMERGENT_EMAIL_KEY", "")
EMAIL_FROM_NAME = os.environ.get("EMAIL_FROM_NAME", "GTTZ Innovations")
EMAIL_REPLY_TO = os.environ.get("EMAIL_REPLY_TO")

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# ---------------------- Models ----------------------
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


@api_router.get("/")
async def root():
    return {"message": "Hello World"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    _ = await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks


# ---------------------- Email guardrail gate ----------------------
_SHORTENERS = ("bit.ly", "tinyurl.com", "t.co", "is.gd", "cutt.ly", "goo.gl", "rebrand.ly")
_CRED_ASK = (
    "reply with your password", "reply with the code", "send your password",
    "cvv", "send us your password", "enter your password below",
    "confirm your card number", "your full card number",
    "seed phrase", "recovery phrase", "verify your card",
    "social security number", "confirm your bank details",
)
_HOSTISH = re.compile(r"\b(?:https?://)?((?:[a-z0-9-]+\.)+[a-z]{2,})", re.I)


def _host_ok(host: str) -> bool:
    if not host or "xn--" in host:
        return False
    try:
        ipaddress.ip_address(host)
        return False
    except ValueError:
        pass
    return not any(host == s or host.endswith("." + s) for s in _SHORTENERS)


def _same_site(shown: str, real: str) -> bool:
    return shown == real or real.endswith("." + shown) or shown.endswith("." + real)


class _EmailScan(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags, self.urls, self.anchors = set(), [], []
        self._href, self._text = None, []

    def handle_starttag(self, tag, attrs):
        self.tags.add(tag.lower())
        self.urls += [v for k, v in attrs if k.lower() in ("href", "src") and v]
        if tag.lower() == "a":
            self._href = dict((k.lower(), v) for k, v in attrs).get("href")
            self._text = []

    def handle_data(self, data):
        if self._href is not None:
            self._text.append(data)

    def handle_endtag(self, tag):
        if tag.lower() == "a" and self._href is not None:
            self.anchors.append((self._href, "".join(self._text)))
            self._href, self._text = None, []


def _assert_safe_email(subject: str, html: str) -> None:
    scan = _EmailScan()
    scan.feed(html)
    if scan.tags & {"form", "input", "textarea", "select"}:
        raise ValueError("No forms or input fields in email (G2)")
    body = f"{subject}\n{html}".lower()
    for p in _CRED_ASK:
        if p in body:
            raise ValueError(f"Email asks the recipient for credentials: {p!r} (G2)")
    for url in scan.urls:
        low = url.strip().lower()
        if low.startswith(("mailto:", "tel:", "cid:", "#")):
            continue
        if not low.startswith("https://"):
            raise ValueError(f"Email links/assets must be absolute https: {url!r} (G3)")
        host = urlparse(low).hostname or ""
        if not _host_ok(host) or urlparse(low).username is not None:
            raise ValueError(f"Shortened, numeric-host or credential-bearing URL: {url!r} (G3)")
    for href, text in scan.anchors:
        real = urlparse(href.strip().lower()).hostname or ""
        if not real:
            continue
        for m in _HOSTISH.finditer(text):
            if not _same_site(m.group(1).lower(), real):
                raise ValueError(f"Anchor text {m.group(1)!r} != real link host {real!r} (G3)")


async def send_email(*, to_list: List[str], subject: str, html: str,
                     reply_to: Optional[str] = None) -> Optional[str]:
    _assert_safe_email(subject, html)
    payload = {
        "to": to_list,
        "subject": subject,
        "html": html,
        "from_name": EMAIL_FROM_NAME,
    }
    if reply_to or EMAIL_REPLY_TO:
        payload["contact_email"] = reply_to or EMAIL_REPLY_TO
    try:
        async with httpx.AsyncClient(timeout=30) as http:
            resp = await http.post(
                f"{EMAIL_BASE_URL}/api/v1/email/send",
                headers={"X-Email-Key": EMAIL_KEY},
                json=payload,
            )
        resp.raise_for_status()
        return resp.json().get("id")
    except httpx.HTTPStatusError as e:
        logger.error("Email send failed: %s %s", e.response.status_code, e.response.text)
        raise HTTPException(status_code=502, detail="Failed to send email")
    except Exception as e:
        logger.error("Email send error: %s", e)
        raise HTTPException(status_code=500, detail="Failed to send email")


# ---------------------- Contact form ----------------------
OWNER_EMAILS = ["info@gttzinnovations.com", "zmasilela@gttzinnovations.com"]


class ContactCreate(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    phone: Optional[str] = None
    service: Optional[str] = None
    message: str = Field(min_length=5, max_length=4000)


class ContactRecord(ContactCreate):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    email_sent: bool = False
    delivered_to: List[str] = Field(default_factory=list)
    email_ids: List[str] = Field(default_factory=list)
    failed_recipients: List[str] = Field(default_factory=list)


def _build_owner_email_html(rec: "ContactRecord") -> str:
    """Server-side template. Every dynamic value is escape()d."""
    name = escape(rec.name)
    email = escape(rec.email)
    phone = escape(rec.phone) if rec.phone else "&mdash;"
    service = escape(rec.service) if rec.service else "General enquiry"
    msg_html = escape(rec.message).replace("\n", "<br/>")
    ts = escape(rec.created_at.strftime("%d %b %Y, %H:%M UTC"))
    return (
        '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" '
        'style="background:#f5f5f4;padding:24px;font-family:Arial,Helvetica,sans-serif;">'
        '<tr><td align="center">'
        '<table role="presentation" width="600" cellpadding="0" cellspacing="0" '
        'style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;'
        'border:1px solid #e7e5e4;">'
        '<tr><td style="background:#18181b;padding:20px 28px;">'
        f'<div style="color:#f59e0b;font-size:11px;letter-spacing:3px;text-transform:uppercase;">'
        f'{escape(EMAIL_FROM_NAME)}</div>'
        '<div style="color:#ffffff;font-size:22px;font-weight:700;margin-top:4px;">'
        'New Website Enquiry</div>'
        '</td></tr>'
        '<tr><td style="padding:28px;">'
        '<p style="margin:0 0 16px;color:#3f3f46;font-size:15px;line-height:1.55;">'
        f'You received a new enquiry via the GTTZ Innovations website contact form on {ts}.'
        '</p>'
        '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" '
        'style="border-collapse:collapse;font-size:14px;color:#18181b;margin-top:8px;">'
        f'<tr><td style="padding:10px 0;border-bottom:1px solid #f5f5f4;width:120px;'
        f'color:#71717a;">Name</td><td style="padding:10px 0;border-bottom:1px solid #f5f5f4;">'
        f'<strong>{name}</strong></td></tr>'
        f'<tr><td style="padding:10px 0;border-bottom:1px solid #f5f5f4;color:#71717a;">Email</td>'
        f'<td style="padding:10px 0;border-bottom:1px solid #f5f5f4;">'
        f'<a href="mailto:{email}" style="color:#b45309;text-decoration:none;">{email}</a></td></tr>'
        f'<tr><td style="padding:10px 0;border-bottom:1px solid #f5f5f4;color:#71717a;">Phone</td>'
        f'<td style="padding:10px 0;border-bottom:1px solid #f5f5f4;">{phone}</td></tr>'
        f'<tr><td style="padding:10px 0;border-bottom:1px solid #f5f5f4;color:#71717a;">Service</td>'
        f'<td style="padding:10px 0;border-bottom:1px solid #f5f5f4;">{service}</td></tr>'
        '</table>'
        '<div style="margin-top:22px;padding:16px 18px;background:#fafaf9;border-left:3px solid #b45309;'
        'border-radius:8px;color:#27272a;font-size:14px;line-height:1.6;">'
        f'{msg_html}'
        '</div>'
        '<p style="margin:22px 0 0;color:#71717a;font-size:13px;">'
        f'Reply directly to this email to respond to <strong>{name}</strong>.'
        '</p>'
        '</td></tr>'
        '<tr><td style="background:#fafaf9;padding:16px 28px;border-top:1px solid #e7e5e4;">'
        f'<div style="color:#a1a1aa;font-size:11px;line-height:1.5;">'
        f'Sent by {escape(EMAIL_FROM_NAME)}. We never ask for passwords or card details by email.'
        '</div>'
        '</td></tr>'
        '</table>'
        '</td></tr></table>'
    )


@api_router.post("/contact")
async def submit_contact(payload: ContactCreate):
    """Save contact submission and deliver an email to each owner inbox via Resend.

    Sends per-recipient so that a single blocked address (e.g. deliverability
    filter) does not prevent the other owners from getting the message.
    """
    record = ContactRecord(**payload.model_dump())

    subject = f"New GTTZ enquiry: {payload.service or 'General'} - {payload.name}"
    html = _build_owner_email_html(record)

    errors: List[str] = []
    for to_addr in OWNER_EMAILS:
        try:
            email_id = await send_email(
                to_list=[to_addr],
                subject=subject,
                html=html,
                reply_to=payload.email,
            )
            if email_id:
                record.delivered_to.append(to_addr)
                record.email_ids.append(email_id)
        except HTTPException as e:
            record.failed_recipients.append(to_addr)
            errors.append(f"{to_addr}: {e.status_code} {e.detail}")
            logger.warning("Email delivery failed for %s -> %s", record.id, to_addr)
        except Exception as e:
            record.failed_recipients.append(to_addr)
            errors.append(f"{to_addr}: {e}")
            logger.exception("Unexpected email failure for %s -> %s", record.id, to_addr)

    record.email_sent = len(record.delivered_to) > 0

    # Persist regardless of email outcome
    doc = record.model_dump()
    doc["created_at"] = doc["created_at"].isoformat()
    if errors:
        doc["errors"] = errors
    try:
        await db.contact_messages.insert_one(doc)
    except Exception as e:
        logger.exception("Mongo insert failed: %s", e)

    if not record.email_sent:
        return {
            "ok": False,
            "stored": True,
            "message": (
                "Your message was saved. Delivery is temporarily delayed - "
                "the team will follow up shortly."
            ),
            "id": record.id,
        }

    return {
        "ok": True,
        "stored": True,
        "delivered_to": record.delivered_to,
        "email_ids": record.email_ids,
        "failed_recipients": record.failed_recipients,
        "message": "Message sent successfully.",
        "id": record.id,
    }


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
