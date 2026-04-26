from fastapi import APIRouter

router = APIRouter(prefix="/api/orders", tags=["Orders"])

orders = []

# ✅ POST
@router.post("/")
async def create_order(order: dict):
    orders.append(order)
    return {"message": "Order placed successfully ✅"}

# ✅ GET
@router.get("/")
async def get_orders():
    return orders