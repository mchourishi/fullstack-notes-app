from fastapi import APIRouter,Depends
from app.services.note import NoteService
from app.models.note import NoteCreate
from app.services.auth import get_current_user

router = APIRouter()

@router.post("/notes")
async def create_note(note: NoteCreate, current_user: dict = Depends(get_current_user)):
    return await NoteService.create_note(note, current_user)

@router.get("/notes")
async def get_notes(current_user: str = Depends(get_current_user)):
    return await NoteService.get_user_notes(current_user)

@router.get("/random_quote")
async def random_note(current_user: str = Depends(get_current_user)):
    return await NoteService.get_random_note(current_user)



