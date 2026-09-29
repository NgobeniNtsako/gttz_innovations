from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import httpx


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks


# ---------------------- Contact form ----------------------
PRIMARY_EMAIL = "info@gttzinnovations.com"
CC_EMAIL = "zmasilela@gttzinnovations.com"


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
    email_provider_response: Optional[str] = None


@api_router.post("/contact")
async def submit_contact(payload: ContactCreate):
    """Save contact submission and forward via FormSubmit.co (no API key required).

    First-ever submission triggers a one-time activation email to PRIMARY_EMAIL.
    """
    record = ContactRecord(**payload.model_dump())

    # Build FormSubmit payload. _cc sends a copy to the secondary email.
    form_payload = {
        "name": payload.name,
        "email": payload.email,
        "phone": payload.phone or "Not provided",
        "service": payload.service or "Not specified",
        "message": payload.message,
        "_subject": f"New GTTZ enquiry: {payload.service or 'General'} - {payload.name}",
        "_replyto": payload.email,
        "_cc": CC_EMAIL,
        "_template": "table",
        "_captcha": "false",
    }

    provider_response_text = ""
    try:
        async with httpx.AsyncClient(timeout=20.0) as http:
            r = await http.post(
                f"https://formsubmit.co/ajax/{PRIMARY_EMAIL}",
                json=form_payload,
                headers={"Accept": "application/json", "Content-Type": "application/json"},
            )
            provider_response_text = r.text[:500]
            if r.status_code == 200:
                data = r.json()
                # FormSubmit returns {"success": "true"} on success
                if str(data.get("success", "")).lower() in ("true", "1"):
                    record.email_sent = True
                else:
                    logger.warning("FormSubmit responded without success: %s", data)
            else:
                logger.warning("FormSubmit non-200: %s %s", r.status_code, r.text[:300])
    except Exception as e:
        logger.exception("Email send failed: %s", e)
        provider_response_text = f"ERROR: {e}"

    record.email_provider_response = provider_response_text

    # Persist regardless of email outcome
    doc = record.model_dump()
    doc["created_at"] = doc["created_at"].isoformat()
    try:
        await db.contact_messages.insert_one(doc)
    except Exception as e:
        logger.exception("Mongo insert failed: %s", e)

    if not record.email_sent:
        # Surface a clear message but don't 500 - we've stored it
        return {
            "ok": False,
            "stored": True,
            "message": (
                "Your message was saved. The email service may need a one-time "
                "activation - the team will follow up shortly."
            ),
            "id": record.id,
        }

    return {"ok": True, "stored": True, "message": "Message sent successfully.", "id": record.id}


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()