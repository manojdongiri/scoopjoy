from fastapi import APIRouter
from pymongo import MongoClient

router = APIRouter(prefix="/api/auth", tags=["Auth"])

# ✅ MongoDB Atlas connection
uri = "mongodb+srv://manojdongiri:123456@cluster0.wun8f6y.mongodb.net/?appName=Cluster0"
client = MongoClient(uri)

db = client["scoopjoy"]
users_collection = db["users"]

# Signup
@router.post("/signup")
async def signup(user: dict):
    existing = users_collection.find_one({"email": user["email"]})

    if existing:
        return {"message": "User already exists ❌"}

    users_collection.insert_one(user)
    return {"message": "Signup successful ✅"}

# Login
@router.post("/login")
async def login(user: dict):
    existing = users_collection.find_one({
        "email": user["email"],
        "password": user["password"]
    })

    if existing:
        return {"message": "Login successful ✅"}
    else:
        return {"message": "Invalid credentials ❌"}