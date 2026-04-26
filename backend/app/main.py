from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.product_routes import router as product_router
from app.routes.order_routes import router as order_router

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ROUTES
app.include_router(product_router)
app.include_router(order_router)

# ROOT (IMPORTANT)
@app.get("/")
def root():
    return {"message": "ScoopJoy Backend Running 🚀"}

# TEST API
@app.get("/api/")
def home():
    return {"message": "Hello World"}