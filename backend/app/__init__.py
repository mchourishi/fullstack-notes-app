from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from app.routes.auth import router as auth_router
from app.routes.notes import router as notes_router
from app.db.mongodb import db
from datetime import datetime

# Create FastAPI app
app = FastAPI()
app.include_router(auth_router)
app.include_router(notes_router)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.middleware("http")
async def log_request(request: Request, call_next):
    print(f"Request headers: {request.headers}")
    response = await call_next(request)
    return response

# Event handlers for database connection
@app.on_event("startup")
async def startup_db_client():
    try:
        await db.connect_db()
        # Ensure `users` collection exists by inserting a dummy document if empty
        existing_users = await db.db.users.count_documents({})
        if existing_users == 0:
            print("Creating admin user...")
            await db.db.users.insert_one({
                "username": "admin",
                "email": "admin@notes.com",
                "hashed_password": "admin_password",
                "created_at": datetime.now()
            })
            print("Admin user created.")
            
        # Ensure `notes` collection exists by inserting a dummy note if empty
        existing_notes = await db.db.notes.count_documents({})
        if existing_notes == 0:
            print("Creating dummy notes ...")
            await db.db.notes.insert_one({
                "content": "This is my first note.",
                "created_at": datetime.now(),
                "user_id": "123"
            })
            print("Dummy note created.")
    except Exception as e:
        print(f"Error connecting to MongoDB: {e}")
    except Exception as e:
        print(f"Error connecting to MongoDB: {e}")

@app.on_event("shutdown")
async def shutdown_db_client():
    await db.close_db()
    print("MongoDB connection closed")