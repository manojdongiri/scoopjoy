from fastapi import APIRouter
from app.models.product_model import Product

router = APIRouter(prefix="/api/products", tags=["Products"])

products = [
    {
        "id": "1",
        "name": "Classic Strawberry",
        "price": 100,
        "image": "https://images.unsplash.com/photo-1629385738750-5617b763a80b"
    },
    {
        "id": "2",
        "name": "Cherry Chocolate Cone",
        "price": 150,
        "image": "https://images.unsplash.com/photo-1615484477863-ba177590e3e0"
    },
    {
        "id": "3",
        "name": "Vanilla Bean Waffle",
        "price": 120,
        "image": "https://images.unsplash.com/photo-1626182767767-ca6edbb7a6c7"
    },
    {
        "id": "4",
        "name": "Chocolate Parfait Sundae",
        "price": 180,
        "image": "https://images.unsplash.com/photo-1514849302-984523450cf4"
    }
]

@router.get("/")
async def get_products():
    return products