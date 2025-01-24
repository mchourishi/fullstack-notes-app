from pydantic import BaseModel, EmailStr, Field
from datetime import datetime

class UserBase(BaseModel):
    username: str = Field(..., min_length=3, max_length=50, description="Unique username of the user")
    email: EmailStr = Field(..., description="Email address of the user")

class UserCreate(UserBase):
    password: str = Field(..., min_length=6, description="Password for the user (minimum 6 characters)")

class UserInDB(UserBase):
    id: str = Field(..., description="Unique identifier for the user")
    created_at: datetime = Field(default_factory=datetime.utcnow, description="Timestamp when the user was created")
    hashed_password: str = Field(..., description="Hashed password of the user")
    