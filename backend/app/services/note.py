import aiohttp
from app.models.note import NoteCreate, NoteInDB
from app.db.mongodb import db
from datetime import datetime

class NoteService:
    @staticmethod
    async def create_note(note: NoteCreate, user_id:str) -> NoteInDB:
        database = await db.get_db()
        note_dict = {
            "content": note.content,
            "user_id": user_id,
            "author": note.author if note.author else None,
            "created_at": datetime.now()
        }
        result = await database.notes.insert_one(note_dict)
        return NoteInDB(**note_dict, id=str(result.inserted_id))
    
    @staticmethod
    async def get_user_notes(user_id: str):
        database = await db.get_db()
        notes = await database.notes.find({"user_id": user_id}).to_list(None)
        return [NoteInDB(**note, id=str(note["_id"])) for note in notes]
    
    @staticmethod
    async def get_random_note(user_id: str) -> NoteInDB:
        async with aiohttp.ClientSession() as session:
            async with session.get("https://zenquotes.io/api/random") as response:
                if response.status != 200:
                    raise Exception("Failed to fetch random quote")
                data = await response.json()
        # Extract content and author
        content = data[0]["q"]
        author = data[0]["a"]
        
        note_create = NoteCreate(content=content, author=author)
        return await NoteService.create_note(note_create, user_id)