from fastapi import APIRouter, HTTPException, Depends,status,Request
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from app.services.auth import AuthService
from app.models.user import UserCreate
from app.db.mongodb import db

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/login")
router = APIRouter()

@router.post("/signup")
async def signup(user: UserCreate):
    database = await db.get_db()
    existing_user = await database.users.find_one({"$or": [{"username": user.username}, {"email": user.email}]})
    if existing_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Username already exists")
    user = await AuthService.create_user(user)
    return {"message": "User created successfully"}

@router.post("/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = await AuthService.authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token = AuthService.create_access_token(
        data={"sub": str(user.id)}
    )
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/logout")
async def logout(request: Request, token: str = Depends(oauth2_scheme)):
    try:
        # Blacklist the token
        await AuthService.blacklist_token(token)
        return {"message": "Successfully logged out"}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to logout",
        )