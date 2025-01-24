
from datetime import datetime, timedelta
from fastapi import Depends, HTTPException, status, Request
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from typing import Optional
from passlib.context import CryptContext
from app.config import settings
from app.models.user import UserCreate, UserInDB
from app.db.mongodb import db

pwd_context  = CryptContext(schemes=["bcrypt"], deprecated = "auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/login")

class AuthService:
    @staticmethod
    def create_access_token(data:dict):
        to_encode = data.copy()
        expire =  datetime.utcnow() + timedelta(minutes=settings.access_token_expire_minutes)
        to_encode.update({"exp": expire})
        return jwt.encode(to_encode, settings.secret_key, algorithm=settings.algorithm)

    @staticmethod
    async def create_user(user:UserCreate)->UserInDB:
        hashed_password = pwd_context.hash(user.password)
        database = await db.get_db()
        user_dict = {
            "username": user.username,
            "email": user.email,
            "hashed_password": hashed_password,
            "created_at": datetime.now()
        }
        result = await database.users.insert_one(user_dict)
        return UserInDB(**user_dict, id=str(result.inserted_id))
    
    @staticmethod
    async def get_user_by_email(email:str)->Optional[UserInDB]:
        database = await db.get_db()
        user_dict = await database.users.find_one({"email": email})
        if user_dict:
            return UserInDB(**user_dict,id=str(user_dict["_id"]))
        return None
    
    @staticmethod
    async def authenticate_user(username: str, password: str) -> Optional[UserInDB]:
        user = await AuthService.get_user_by_email(username)
        if not user or not pwd_context.verify(password, user.hashed_password):
            return None
        return user
    
    @staticmethod
    async def blacklist_token(token: str):
        database = await db.get_db()
        blacklist_entry = {
            "token": token,
            "blacklisted_at": datetime.utcnow()
        }
        await database.blacklisted_tokens.insert_one(blacklist_entry)
        
    @staticmethod
    async def is_token_blacklisted(token: str) -> bool:
        """Check if a token is blacklisted."""
        database = await db.get_db()
        blacklisted_token = await database.blacklisted_tokens.find_one({"token": token})
        return blacklisted_token is not None
    
async def get_current_user(token: str = Depends(oauth2_scheme)) -> str:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    if await AuthService.is_token_blacklisted(token):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token has been revoked",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    try:
        payload = jwt.decode(
            token, 
            settings.secret_key, 
            algorithms=[settings.algorithm]
        )
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
        return user_id
    except JWTError:
        print("Error decoding JWT")
        raise credentials_exception