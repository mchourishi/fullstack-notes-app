import uvicorn
from app import app

if __name__ == '__main__':
    uvicorn.run("app:app", host="localhost", port=5001, reload=True)
