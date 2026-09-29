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
    """Test 6: Verify existing GET /api/ endpoint still works"""
    print("\n" + "=" * 80)
    print("TEST 6: Existing GET /api/ endpoint")
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
    """Test 1: Valid contact form submission"""
    print("\n" + "=" * 80)
    print("TEST 1: Valid contact form submission")
    print("=" * 80)
    
    payload = {
        "name": "Test User",
        "email": "test@example.com",
        "phone": "0640000000",
        "service": "General Building",
        "message": "Hello, I need a quote for my home extension."
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
            
            # Both ok=True (email sent) and ok=False (pending activation) are acceptable
            return log_test(
                "Valid submission",
                True,
                f"Response: {data}. Email sent: {data.get('ok')}"
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
    """Test 2: Validation error - invalid data"""
    print("\n" + "=" * 80)
    print("TEST 2: Validation error (name too short, invalid email, message too short)")
    print("=" * 80)
    
    payload = {
        "name": "X",
        "email": "invalid",
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
    """Test 3: Missing required fields"""
    print("\n" + "=" * 80)
    print("TEST 3: Missing required fields (only name provided)")
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
    """Test 4: Optional fields (phone and service omitted)"""
    print("\n" + "=" * 80)
    print("TEST 4: Optional fields (phone and service omitted)")
    print("=" * 80)
    
    payload = {
        "name": "Jane Doe",
        "email": "jane@example.com",
        "message": "Just enquiring about services with no service selected"
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
            return log_test(
                "Optional fields",
                True,
                f"Successfully accepted submission without phone/service. Response: {data}"
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
    """Test 5: Verify MongoDB persistence"""
    print("\n" + "=" * 80)
    print("TEST 5: MongoDB persistence check")
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
            
            # Verify key fields
            if (record.get("name") == payload["name"] and
                record.get("email") == payload["email"] and
                record.get("message") == unique_message):
                
                client.close()
                return log_test(
                    "MongoDB persistence",
                    True,
                    f"Record successfully stored and verified in contact_messages collection"
                )
            else:
                client.close()
                return log_test(
                    "MongoDB persistence",
                    False,
                    f"Record found but data mismatch. Record: {record}"
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
    print("Starting GTTZ Innovations Backend API Tests")
    print(f"Timestamp: {datetime.now().isoformat()}")
    
    # Run tests in order
    test_existing_endpoint()  # Test 6 first to verify basic connectivity
    test_valid_submission()   # Test 1
    test_validation_error()   # Test 2
    test_missing_required()   # Test 3
    test_optional_fields()    # Test 4
    test_mongodb_persistence() # Test 5
    
    # Print summary
    all_passed = print_summary()
    
    # Exit with appropriate code
    sys.exit(0 if all_passed else 1)
