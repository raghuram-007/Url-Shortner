from datetime import datetime
from pydantic import BaseModel, HttpUrl
from typing import Optional



    
    
class URLCreate(BaseModel):
     original_url: HttpUrl
     


class URLInfo(BaseModel):
    id:int
    original_url: str
    short_url: str
    clicks: int
    created_at: datetime
    last_accessed: Optional[datetime] = None
       
    class Config:
         orm_mode = True
         
    