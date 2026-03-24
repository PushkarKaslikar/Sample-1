# VERSION: 2.0-NO-REQUESTS
from fastapi import FastAPI, HTTPException, status, UploadFile, File, Depends, Body, Request

from dotenv import load_dotenv

# Load environment variables
load_dotenv()
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, Response
from pydantic import BaseModel
from sqlalchemy.orm import Session
from passlib.context import CryptContext
import os
import shutil
from typing import List, Optional

# SECURITY: Master code for teacher access
TEACHER_SECRET_CODE = "DKTE_Mech_2026"

from database import SessionLocal, engine, Base
import models

# Create database tables
Base.metadata.create_all(bind=engine)

# Auto-migration: add storage_path column if it doesn't exist
from sqlalchemy import inspect, text
inspector = inspect(engine)
if 'files' in inspector.get_table_names():
    columns = [col['name'] for col in inspector.get_columns('files')]
    if 'storage_path' not in columns:
        with engine.connect() as conn:
            conn.execute(text("ALTER TABLE files ADD COLUMN storage_path VARCHAR"))
            conn.commit()
            print("Migration: Added storage_path column to files table")

# Auto-migration: copy existing users to students/teachers tables
if 'users' in inspector.get_table_names():
    db_session = SessionLocal()
    try:
        # Migrate students
        existing_students = db_session.query(models.User).filter(models.User.role == "student").all()
        for u in existing_students:
            exists = db_session.query(models.Student).filter(models.Student.email == u.email).first()
            if not exists:
                db_session.add(models.Student(name=u.name, email=u.email, password_hash=u.password_hash))
        # Migrate teachers
        existing_teachers = db_session.query(models.User).filter(models.User.role == "teacher").all()
        for u in existing_teachers:
            exists = db_session.query(models.Teacher).filter(models.Teacher.email == u.email).first()
            if not exists:
                db_session.add(models.Teacher(name=u.name, email=u.email, password_hash=u.password_hash))
        db_session.commit()
        print("Migration: Copied existing users to students/teachers tables")
    except Exception as e:
        print(f"Migration note: {e}")
        db_session.rollback()
    finally:
        db_session.close()

app = FastAPI()

# Password Hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# CORS Configuration


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://mechtron.vercel.app",
        "https://sample-1-two.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Explicit OPTIONS handler for Vercel serverless compatibility
@app.options("/{rest_of_path:path}")
async def preflight_handler(rest_of_path: str, request: Request):
    response = Response(status_code=204)
    origin = request.headers.get("origin", "")
    allowed_origins = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://mechtron.vercel.app",
        "https://sample-1-two.vercel.app",
    ]
    if origin in allowed_origins:
        response.headers["Access-Control-Allow-Origin"] = origin
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization, X-Requested-With"
    response.headers["Access-Control-Allow-Credentials"] = "true"
    response.headers["Access-Control-Max-Age"] = "86400"
    return response

@app.on_event("startup")
async def startup_event():
    print("Backend server is ready at http://127.0.0.1:8000")

# UPLOAD_DIR logic removed as files are stored in DB

# Pydantic Models
class UserRegister(BaseModel):
    name: str
    email: str
    password: str
    role: str
    master_code: Optional[str] = None

class UserLogin(BaseModel):
    email: str
    password: str
    master_code: Optional[str] = None

# Chat Bot Logic Removed (Moved to Frontend)

class UserResponse(BaseModel):
    name: str
    email: str
    role: str
    
    class Config:
        from_attributes = True

# Helper Functions
# Use pbkdf2_sha256 which is pure python and robust on Windows
pwd_context = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

# Auth Endpoints
@app.post("/auth/register", response_model=UserResponse)
async def register(user: UserRegister, db: Session = Depends(get_db)):
    print(f"Attempting to register user: {user.email} as {user.role}")  # Debug log
    try:
        if user.role == "teacher":
            # Verify Teacher Secret Code
            if user.master_code != TEACHER_SECRET_CODE:
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail="Invalid Teacher Secret Code"
                )
            # Check if email exists in teachers table
            existing = db.query(models.Teacher).filter(models.Teacher.email == user.email).first()
            if existing:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Email already registered as teacher"
                )
            hashed_password = get_password_hash(user.password)
            new_user = models.Teacher(
                name=user.name,
                email=user.email,
                password_hash=hashed_password
            )
            db.add(new_user)
            db.commit()
            db.refresh(new_user)
            print(f"Teacher registered successfully: {new_user.id}")
            return {"name": new_user.name, "email": new_user.email, "role": "teacher"}
        else:
            # Student registration
            existing = db.query(models.Student).filter(models.Student.email == user.email).first()
            if existing:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Email already registered as student"
                )
            hashed_password = get_password_hash(user.password)
            new_user = models.Student(
                name=user.name,
                email=user.email,
                password_hash=hashed_password
            )
            db.add(new_user)
            db.commit()
            db.refresh(new_user)
            print(f"Student registered successfully: {new_user.id}")
            return {"name": new_user.name, "email": new_user.email, "role": "student"}
    except Exception as e:
        print(f"Error during registration: {str(e)}")
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Registration failed: {str(e)}"
        )

@app.post("/auth/login", response_model=UserResponse)
async def login(user: UserLogin, db: Session = Depends(get_db)):
    if user.master_code:
        # Teacher login
        db_user = db.query(models.Teacher).filter(models.Teacher.email == user.email).first()
        if not db_user or not verify_password(user.password, db_user.password_hash):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password"
            )
        if user.master_code != TEACHER_SECRET_CODE:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Invalid Teacher Secret Code. Please enter the master code to log in."
            )
        return {"name": db_user.name, "email": db_user.email, "role": "teacher"}
    else:
        # Student login
        db_user = db.query(models.Student).filter(models.Student.email == user.email).first()
        if not db_user or not verify_password(user.password, db_user.password_hash):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password"
            )
        return {"name": db_user.name, "email": db_user.email, "role": "student"}

from fastapi.responses import StreamingResponse
import io
from fastapi import Form

# Request Models
class FolderCreate(BaseModel):
    name: str
    parent_id: Optional[int] = None

class FileRegister(BaseModel):
    filename: str
    content_type: str
    size: int
    storage_path: str
    parent_id: Optional[int] = None

# File/Folder Endpoints

@app.get("/files/list")
async def list_files(parent_id: Optional[int] = None, db: Session = Depends(get_db)):
    # Query items with specific parent_id (Folder browsing)
    items_db = db.query(
        models.DBFile.id,
        models.DBFile.filename, 
        models.DBFile.size, 
        models.DBFile.content_type,
        models.DBFile.is_folder,
        models.DBFile.parent_id,
        models.DBFile.storage_path
    ).filter(models.DBFile.parent_id == parent_id).all()
    
    item_list = []
    for f in items_db:
        if f.is_folder:
            size_str = "-"
            type_str = "folder"
        else:
            size = f.size
            if size < 1024:
                size_str = f"{size} B"
            elif size < 1024 * 1024:
                size_str = f"{size / 1024:.1f} KB"
            else:
                size_str = f"{size / (1024 * 1024):.1f} MB"
            type_str = f.content_type

        item_list.append({
            "id": f.id,
            "name": f.filename,
            "size": size_str,
            "type": type_str,
            "is_folder": f.is_folder,
            "parent_id": f.parent_id,
            "storage_path": f.storage_path
        })
    return item_list

@app.post("/folders/create")
async def create_folder(folder: FolderCreate, db: Session = Depends(get_db)):
    new_folder = models.DBFile(
        filename=folder.name,
        content_type="application/x-directory",
        size=0,
        data=b"",
        is_folder=True,
        parent_id=folder.parent_id
    )
    db.add(new_folder)
    db.commit()
    db.refresh(new_folder)
    return {"id": new_folder.id, "name": new_folder.filename, "is_folder": True}

@app.post("/files/upload")
async def upload_file(
    file: UploadFile = File(...), 
    parent_id: Optional[int] = Form(None),
    db: Session = Depends(get_db)
):
    request_object_content = await file.read()
    
    # Check if exists in this specific folder
    existing_file = db.query(models.DBFile).filter(
        models.DBFile.filename == file.filename,
        models.DBFile.parent_id == parent_id
    ).first()
    
    if existing_file:
         db.delete(existing_file)
         db.commit()
         
    new_file = models.DBFile(
        filename=file.filename,
        content_type=file.content_type,
        size=len(request_object_content),
        data=request_object_content,
        parent_id=parent_id,
        is_folder=False
    )
    db.add(new_file)
    db.commit()
    
    return {"filename": file.filename}

# New endpoint: Register file metadata after Supabase upload
@app.post("/files/register")
async def register_file(file_data: FileRegister, db: Session = Depends(get_db)):
    # Check if exists in this specific folder
    existing_file = db.query(models.DBFile).filter(
        models.DBFile.filename == file_data.filename,
        models.DBFile.parent_id == file_data.parent_id
    ).first()
    
    if existing_file:
        db.delete(existing_file)
        db.commit()
    
    new_file = models.DBFile(
        filename=file_data.filename,
        content_type=file_data.content_type,
        size=file_data.size,
        data=None,  # No binary data - file is in Supabase
        parent_id=file_data.parent_id,
        is_folder=False,
        storage_path=file_data.storage_path
    )
    db.add(new_file)
    db.commit()
    db.refresh(new_file)
    
    return {"id": new_file.id, "filename": new_file.filename, "storage_path": new_file.storage_path}

@app.delete("/files/delete/{item_id}")
async def delete_item(item_id: int, db: Session = Depends(get_db)):
    try:
        # Recursive delete function
        def delete_recursive(id):
            # Fetch children first
            children = db.query(models.DBFile).filter(models.DBFile.parent_id == id).all()
            for child in children:
                delete_recursive(child.id)
            
            # Fetch item again to ensure it's attached/available
            item = db.query(models.DBFile).filter(models.DBFile.id == id).first()
            if item:
                db.delete(item)
                db.flush() # Force delete execution to respect order

        item = db.query(models.DBFile).filter(models.DBFile.id == item_id).first()
        if item:
            # Collect storage paths for Supabase cleanup
            storage_paths = []
            def collect_paths(id):
                f = db.query(models.DBFile).filter(models.DBFile.id == id).first()
                if f and f.storage_path:
                    storage_paths.append(f.storage_path)
                children = db.query(models.DBFile).filter(models.DBFile.parent_id == id).all()
                for child in children:
                    collect_paths(child.id)
            collect_paths(item.id)
            
            # If it's a folder, delete children content first
            if item.is_folder:
                delete_recursive(item.id)
            else:
                db.delete(item)
                
            db.commit()
            return {"message": "Item deleted", "storage_paths": storage_paths}
        raise HTTPException(status_code=404, detail="Item not found")
    except Exception as e:
        print(f"Error deleting item {item_id}: {str(e)}")
        # Print full traceback if possible or ensure it's visible
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/files/download/{item_id}")
async def download_file(item_id: int, db: Session = Depends(get_db)):
    db_file = db.query(models.DBFile).filter(models.DBFile.id == item_id).first()
    if db_file and not db_file.is_folder:
        # If file is stored in Supabase, return the public URL
        if db_file.storage_path:
            supabase_url = f"https://zqosvmefhfutzwexusbu.supabase.co/storage/v1/object/public/uploads/{db_file.storage_path}"
            return {"url": supabase_url, "filename": db_file.filename}
        # Legacy: file stored in database
        if db_file.data:
            return StreamingResponse(
                io.BytesIO(db_file.data), 
                media_type=db_file.content_type,
                headers={"Content-Disposition": f"attachment; filename={db_file.filename}"}
            )
    raise HTTPException(status_code=404, detail="File not found or is a folder")

if __name__ == "__main__":
    import uvicorn
    print("Starting backend...")
    uvicorn.run(app, host="127.0.0.1", port=8000)