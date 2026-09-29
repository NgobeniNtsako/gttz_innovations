#!/usr/bin/env python3
"""
Backend API Testing Script for GTTZ Innovations
Tests the POST /api/contact endpoint and other existing endpoints
"""

import requests
import json
import sys
from datetime import datetime
from pymongo import MongoClient
import os
from dotenv import load_dotenv
from pathlib import Path

# Load environment variables
load_dotenv(Path("/app/backend/.env"))
load_dotenv(Path("/app/frontend/.env"))

# Get backend URL from frontend .env
BACKEND_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://gtz-rebuild.preview.emergentagent.com")
API_BASE = f"{BACKEND_URL}/api"

# MongoDB connection for verification
MONGO_URL = os.environ.get("MONGO_URL", "mongodb://localhost:27017")
DB_NAME = os.environ.get("DB_NAME", "test_database")

print(f"Testing backend at: {API_BASE}")
print(f"MongoDB at: {MONGO_URL}")
print("=" * 80)

# Test results tracking
test_results = []

def log_test(test_name, passed, details=""):
    """Log test result"""
    status = "✅ PASS" if passed else "❌ FAIL"
    result = {
        "test": test_name,
        "passed": passed,
        "details": details,
        "timestamp": datetime.now().isoformat()
    }
    test_results.append(result)
    print(f"\n{status}: {test_name}")
    if details:
        print(f"   Details: {details}")
    return passed

def test_existing_endpoint():
    """Test 5: Verify existing GET /api/ endpoint still works"""
    print("\n" + "=" * 80)
    print("TEST 5: Existing GET /api/ endpoint")
    print("=" * 80)
    
    try:
        response = requests.get(f"{API_BASE}/", timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            if data.get("message") == "Hello World":
                return log_test(
                    "GET /api/ endpoint",
                    True,
                    f"Status: {response.status_code}, Response: {data}"
                )
            else:
                return log_test(
                    "GET /api/ endpoint",
                    False,
                    f"Unexpected response: {data}"
                )
        else:
            return log_test(
                "GET /api/ endpoint",
                False,
                f"Status: {response.status_code}, Response: {response.text}"
            )
    except Exception as e:
        return log_test("GET /api/ endpoint", False, f"Exception: {str(e)}")

def test_valid_submission():
    """Test 1: Valid contact form submission with Resend integration"""
    print("\n" + "=" * 80)
    print("TEST 1: Valid contact form submission (Resend integration)")
    print("=" * 80)
    
    payload = {
        "name": "Test User",
        "email": "test@example.com",
        "phone": "0640000000",
        "service": "General Building",
        "message": "Please confirm delivery of this test enquiry from the GTTZ website."
    }
    
    try:
        response = requests.post(
            f"{API_BASE}/contact",
            json=payload,
            headers={"Content-Type": "application/json"},
            timeout=30
        )
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            
            # Check required fields
            required_fields = ["ok", "stored", "message", "id"]
            missing_fields = [f for f in required_fields if f not in data]
            
            if missing_fields:
                return log_test(
                    "Valid submission - response structure",
                    False,
                    f"Missing fields: {missing_fields}. Response: {data}"
                )
            
            if not data.get("stored"):
                return log_test(
                    "Valid submission - stored flag",
                    False,
                    f"stored=False. Response: {data}"
                )
            
            # For Resend integration, check delivery details
            if data.get("ok"):
                # Email was sent successfully
                delivered_to = data.get("delivered_to", [])
                email_ids = data.get("email_ids", [])
                failed_recipients = data.get("failed_recipients", [])
                
                # Verify at least zmasilela@gttzinnovations.com was delivered
                if "zmasilela@gttzinnovations.com" not in delivered_to:
                    return log_test(
                        "Valid submission - delivery",
                        False,
                        f"Expected zmasilela@gttzinnovations.com in delivered_to. Response: {data}"
                    )
                
                # Verify we have at least one email_id (Resend ID)
                if not email_ids or len(email_ids) == 0:
                    return log_test(
                        "Valid submission - email IDs",
                        False,
                        f"Expected at least one email_id. Response: {data}"
                    )
                
                # Note: info@gttzinnovations.com may be in failed_recipients (acceptable)
                if "info@gttzinnovations.com" in failed_recipients:
                    print("   Note: info@gttzinnovations.com in failed_recipients (expected - mailbox may not exist)")
                
                return log_test(
                    "Valid submission",
                    True,
                    f"Email delivered to {delivered_to}. Email IDs: {email_ids}. Failed: {failed_recipients}"
                )
            else:
                # Email delivery failed for all recipients
                return log_test(
                    "Valid submission",
                    False,
                    f"ok=False - email delivery failed. Response: {data}"
                )
        else:
            return log_test(
                "Valid submission",
                False,
                f"Expected 200, got {response.status_code}. Response: {response.text}"
            )
    except Exception as e:
        return log_test("Valid submission", False, f"Exception: {str(e)}")

def test_validation_error():
    """Test 3: Validation error - invalid data"""
    print("\n" + "=" * 80)
    print("TEST 3: Validation error (name too short, invalid email, message too short)")
    print("=" * 80)
    
    payload = {
        "name": "X",
        "email": "not-an-email",
        "message": "hi"
    }
    
    try:
        response = requests.post(
            f"{API_BASE}/contact",
            json=payload,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 422:
            return log_test(
                "Validation error",
                True,
                f"Correctly returned 422 for invalid data"
            )
        else:
            return log_test(
                "Validation error",
                False,
                f"Expected 422, got {response.status_code}. Response: {response.text}"
            )
    except Exception as e:
        return log_test("Validation error", False, f"Exception: {str(e)}")

def test_missing_required():
    """Test 5: Missing required fields"""
    print("\n" + "=" * 80)
    print("TEST 5: Missing required fields (only name provided)")
    print("=" * 80)
    
    payload = {
        "name": "Test"
    }
    
    try:
        response = requests.post(
            f"{API_BASE}/contact",
            json=payload,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 422:
            return log_test(
                "Missing required fields",
                True,
                f"Correctly returned 422 for missing fields"
            )
        else:
            return log_test(
                "Missing required fields",
                False,
                f"Expected 422, got {response.status_code}. Response: {response.text}"
            )
    except Exception as e:
        return log_test("Missing required fields", False, f"Exception: {str(e)}")

def test_optional_fields():
    """Test 2: Optional fields (phone and service omitted)"""
    print("\n" + "=" * 80)
    print("TEST 2: Optional fields (phone and service omitted)")
    print("=" * 80)
    
    payload = {
        "name": "Jane Doe",
        "email": "jane@example.com",
        "message": "Just enquiring — please deliver."
    }
    
    try:
        response = requests.post(
            f"{API_BASE}/contact",
            json=payload,
            headers={"Content-Type": "application/json"},
            timeout=30
        )
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            
            # Check that it has the same structure as valid submission
            if data.get("ok"):
                delivered_to = data.get("delivered_to", [])
                email_ids = data.get("email_ids", [])
                
                if "zmasilela@gttzinnovations.com" in delivered_to and len(email_ids) > 0:
                    return log_test(
                        "Optional fields",
                        True,
                        f"Successfully accepted submission without phone/service. Delivered to: {delivered_to}"
                    )
                else:
                    return log_test(
                        "Optional fields",
                        False,
                        f"Email not delivered properly. Response: {data}"
                    )
            else:
                return log_test(
                    "Optional fields",
                    False,
                    f"ok=False - email delivery failed. Response: {data}"
                )
        else:
            return log_test(
                "Optional fields",
                False,
                f"Expected 200, got {response.status_code}. Response: {response.text}"
            )
    except Exception as e:
        return log_test("Optional fields", False, f"Exception: {str(e)}")

def test_mongodb_persistence():
    """Test 4: Verify MongoDB persistence with Resend fields"""
    print("\n" + "=" * 80)
    print("TEST 4: MongoDB persistence check (Resend integration)")
    print("=" * 80)
    
    # First submit a unique message
    unique_message = f"Test message for MongoDB verification at {datetime.now().isoformat()}"
    payload = {
        "name": "MongoDB Test User",
        "email": "mongotest@example.com",
        "phone": "0641234567",
        "service": "Testing",
        "message": unique_message
    }
    
    try:
        # Submit the form
        response = requests.post(
            f"{API_BASE}/contact",
            json=payload,
            headers={"Content-Type": "application/json"},
            timeout=30
        )
        
        if response.status_code != 200:
            return log_test(
                "MongoDB persistence",
                False,
                f"Failed to submit test message. Status: {response.status_code}"
            )
        
        submission_id = response.json().get("id")
        print(f"Submitted with ID: {submission_id}")
        
        # Now check MongoDB
        client = MongoClient(MONGO_URL)
        db = client[DB_NAME]
        
        # Find the submission by ID
        record = db.contact_messages.find_one({"id": submission_id})
        
        if record:
            print(f"Found record in MongoDB: {record}")
            
            # Verify key fields for Resend integration
            checks = []
            checks.append(("name", record.get("name") == payload["name"]))
            checks.append(("email", record.get("email") == payload["email"]))
            checks.append(("message", record.get("message") == unique_message))
            checks.append(("email_sent exists", "email_sent" in record))
            checks.append(("delivered_to exists", "delivered_to" in record))
            checks.append(("email_ids exists", "email_ids" in record))
            
            # Check if email was sent successfully
            if record.get("email_sent"):
                checks.append(("email_sent=True", True))
                checks.append(("delivered_to populated", len(record.get("delivered_to", [])) > 0))
                checks.append(("email_ids populated", len(record.get("email_ids", [])) > 0))
                
                # Verify zmasilela@gttzinnovations.com is in delivered_to
                if "zmasilela@gttzinnovations.com" in record.get("delivered_to", []):
                    checks.append(("zmasilela delivered", True))
                else:
                    checks.append(("zmasilela delivered", False))
            else:
                checks.append(("email_sent=False", True))
                # If errors field exists, log it
                if "errors" in record:
                    print(f"   Errors captured: {record['errors']}")
            
            failed_checks = [name for name, passed in checks if not passed]
            
            if not failed_checks:
                client.close()
                return log_test(
                    "MongoDB persistence",
                    True,
                    f"Record successfully stored with all Resend fields. email_sent={record.get('email_sent')}"
                )
            else:
                client.close()
                return log_test(
                    "MongoDB persistence",
                    False,
                    f"Failed checks: {failed_checks}. Record: {record}"
                )
        else:
            client.close()
            return log_test(
                "MongoDB persistence",
                False,
                f"Record with ID {submission_id} not found in contact_messages collection"
            )
            
    except Exception as e:
        return log_test("MongoDB persistence", False, f"Exception: {str(e)}")

def print_summary():
    """Print test summary"""
    print("\n" + "=" * 80)
    print("TEST SUMMARY")
    print("=" * 80)
    
    total = len(test_results)
    passed = sum(1 for r in test_results if r["passed"])
    failed = total - passed
    
    print(f"\nTotal Tests: {total}")
    print(f"Passed: {passed} ✅")
    print(f"Failed: {failed} ❌")
    print(f"Success Rate: {(passed/total*100):.1f}%")
    
    if failed > 0:
        print("\n" + "=" * 80)
        print("FAILED TESTS:")
        print("=" * 80)
        for result in test_results:
            if not result["passed"]:
                print(f"\n❌ {result['test']}")
                print(f"   {result['details']}")
    
    return failed == 0

if __name__ == "__main__":
    print("Starting GTTZ Innovations Backend API Tests - Resend Integration")
    print(f"Timestamp: {datetime.now().isoformat()}")
    
    # Run tests in order matching review request
    test_existing_endpoint()  # Test 5: Sanity check
    test_valid_submission()   # Test 1: Valid full submission
    test_optional_fields()    # Test 2: Optional fields omitted
    test_validation_error()   # Test 3: Validation
    test_mongodb_persistence() # Test 4: MongoDB persistence
    test_missing_required()   # Test 5: Missing required (additional)
    
    # Print summary
    all_passed = print_summary()
    
    # Exit with appropriate code
    sys.exit(0 if all_passed else 1)
