from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

class NoteBase(BaseModel):
    content: str = Field(..., min_length=1, max_length=100, description="Content of the note")
    author: Optional[str] = Field(None, description="Author of the note")

class NoteCreate(NoteBase):
    pass

class NoteInDB(NoteBase):
    id: str = Field(..., description="Unique identifier for the note")
    user_id: str  = Field(..., description="ID of the user who owns the note")
    created_at: datetime = Field(default_factory=datetime.utcnow, description="Timestamp when the note was created")


    