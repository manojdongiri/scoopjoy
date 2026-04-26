from fastapi import APIRouter

router = APIRouter(prefix="/api/auth", tags=["Auth"])

users = []

# SIGNUP
@router.post("/signup")
async def signup(user: dict):
    users.append(user)
    return {"message": "User created successfully ✅"}

# LOGIN
@router.post("/login")
async def login(user: dict):
    for u in users:
        if u["email"] == user["email"] and u["password"] == user["password"]:
            return {"message": "Login successful ✅"}
    return {"message": "Invalid credentials ❌"}