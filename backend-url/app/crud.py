from sqlalchemy.orm import Session
from . import models
from datetime import datetime
import string, secrets

ALPHABET = string.ascii_letters + string.digits





def generate_code(length: int = 6) -> str:
    return ''.join(secrets.choice(ALPHABET) for _ in range(length))


def get_by_code(db: Session, code: str):
    return db.query(models.URLMap).filter(models.URLMap.short_url == code).first()


def create_short_url(db: Session, original_url, code_length: int = 6):
    """Create a new short URL"""
    # Convert Pydantic HttpUrl to string
    original_url_str = str(original_url)

    # Optional: check if URL already exists
    existing = db.query(models.URLMap).filter(models.URLMap.original_url == original_url_str).first()
    if existing:
        db.refresh(existing) 
        return existing

    # Generate unique code (retry on collision)
    max_attempts = 10
    for _ in range(max_attempts):
        code = generate_code(code_length)
        if not get_by_code(db, code):
            break
    else:
        raise Exception("Failed to generate unique short code")

    # Create new DB record
    db_obj = models.URLMap(original_url=original_url_str, short_url=code)
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj


def increment_click(db: Session, url_obj: models.URLMap):
    """Increment clicks and update last_accessed timestamp"""
    url_obj.clicks += 1
    url_obj.last_accessed = datetime.utcnow()
    db.add(url_obj)
    db.commit()
    db.refresh(url_obj)
    return url_obj



def get_all_urls(db: Session,skip:int=0,limit:int=10):
    """Return all URLs ordered by creation date descending"""
    return db.query(models.URLMap).order_by(models.URLMap.created_at.desc()).offset(skip).limit(limit).all()
