from  pydantic_settings import BaseSettings
from pathlib import Path

class Settings(BaseSettings):
    mongodb_url : str
    secret_key: str
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    
    class Config:
        env_file = str(Path(__file__).resolve().parent.parent / ".env")
        
settings = Settings()        
        