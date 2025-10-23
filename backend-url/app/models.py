from .database import Base
from sqlalchemy import Column,Integer,String,DateTime,func,Boolean





class URLMap(Base):
    __tablename__="url_map"
    id=Column(Integer,primary_key=True,index=True)
    original_url=Column(String,nullable=False)
    short_url=Column(String,unique=True,index=True,nullable=False)
    created_at=Column(DateTime(timezone=True),server_default=func.now())
    last_accessed=Column(DateTime(timezone=True),onupdate=func.now())
    clicks=Column(Integer,default=0,nullable=False)
    
    
