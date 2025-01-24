from motor.motor_asyncio import AsyncIOMotorClient
from app.config import settings
from typing import Optional
from datetime import datetime
class Database:
    client: Optional[AsyncIOMotorClient] = None
    db = None
    
    @classmethod
    async def connect_db(cls):
        """ Create database connection """
        if cls.client is None: 
            cls.client = AsyncIOMotorClient(settings.mongodb_url)
            cls.db = cls.client.vicinity_db
            print("Connected to MongoDB")
    
    @classmethod
    async def close_db(cls):
        """Close database connection."""
        if cls.client:
            cls.client.close()
            print("MongoDB connection closed")
            
    @classmethod
    async def get_db(cls):
        """Get database instance."""
        if not cls.client:
            await cls.connect_db()
        return cls.db
    
db = Database()