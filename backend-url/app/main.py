from fastapi import FastAPI, Depends, HTTPException
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from . import models, schemas, crud
from .database import engine, SessionLocal, Base
import os
from typing import List
from fastapi import Query


# Create tables in the database (if they don't exist)
Base.metadata.create_all(bind=engine)

app = FastAPI(title="FastAPI URL Shortener")

origins = os.getenv("FRONTEND_URL")
if origins:
    origins = [origins]
else:
    origins = []

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Configurable base URL (for production use)
BASE_URL = os.getenv("BASE_URL")


# --- API Endpoints ---

@app.post("/shorten", response_model=schemas.URLInfo)
def shorten_url(payload: schemas.URLCreate, db: Session = Depends(get_db)):
    """Create a new short URL"""
    url_obj = crud.create_short_url(db, payload.original_url)
    return url_obj

@app.get("/urls", response_model=List[schemas.URLInfo])
def get_all_urls_endpoint(db: Session = Depends(get_db),skip:int=Query(0,ge=0),limit:int=Query(10,ge=1,le=100)):
    """Return all shortened URLs"""
    return crud.get_all_urls(db,skip=skip,limit=limit)



@app.get("/{short_code}")
def redirect_to_original(short_code: str, db: Session = Depends(get_db)):
    """Redirect short URL to original URL"""
    url_obj = crud.get_by_code(db, short_code)
    if not url_obj:
        raise HTTPException(status_code=404, detail="Short URL not found")
    crud.increment_click(db, url_obj)
    return RedirectResponse(url_obj.original_url)




