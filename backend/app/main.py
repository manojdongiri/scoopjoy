from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# ROUTES IMPORT
from app.routes.product_routes import router as product_router
from app.routes.order_routes import router as order_router
from app.routes.auth_routes import router as auth_router

# ✅ CREATE APP FIRST
app = FastAPI()

# ✅ CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ INCLUDE ROUTES AFTER APP CREATED
app.include_router(product_router)
app.include_router(order_router)
app.include_router(auth_router)

# ROOT
@app.get("/")
def root():
    return {"message": "ScoopJoy Backend Running 🚀"}

# TEST
@app.get("/api/")
def home():
    return {"message": "Hello World"}