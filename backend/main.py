import os  # <--- CRITICAL: Do not forget this!
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings

# IMPORT ROUTES
from app.routes.auth import router as auth_router
from app.routes.grievances import router as grievance_router 
from app.routes.users import router as users_router
from app.routes import student_courses
from app.routes import student_opportunities
from app.routes import student_attendance
from app.routes.authority import router as authority_router

app = FastAPI(
    title="AEGIS API",
    description="IIT Mandi Campus Management Platform API",
    version="1.0.0"
)

# -------------------------
# CORS
# -------------------------
# Split comma-separated string from Vercel Env into a Python list
cors_raw = os.getenv("CORS_ORIGINS", "")
origins = [
    "http://localhost:5173",  # Local development
    "https://krackhack3-0-88pj-92d69hpue-ojasvisj-gmailcoms-projects.vercel.app", # Your specific Vercel URL
]

# 2. Add the middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,           # Allows your Vercel URL
    allow_credentials=True,
    allow_methods=["*"],             # Allows POST, GET, OPTIONS, etc.
    allow_headers=["*"],             # Allows all headers (Content-Type, etc.)
)

# -------------------------
# ROUTES
# -------------------------
# These use the /api prefix from your settings.py
app.include_router(auth_router, prefix=settings.API_PREFIX)
app.include_router(grievance_router, prefix=settings.API_PREFIX)
app.include_router(authority_router, prefix=settings.API_PREFIX)
app.include_router(users_router, prefix=settings.API_PREFIX)

# These are your specific student routes
# Note: If settings.API_PREFIX is "/api", these match your frontend calls
app.include_router(
    student_opportunities.router, 
    prefix=f"{settings.API_PREFIX}/student-opportunities", 
    tags=["Student Opportunities"]
)

app.include_router(
    student_courses.router, 
    prefix=f"{settings.API_PREFIX}/student-courses", 
    tags=["Student Courses"]
)

app.include_router(
    student_attendance.router, 
    prefix=f"{settings.API_PREFIX}/attendance", 
    tags=["Attendance"]
)

# -------------------------
# HEALTH & ROOT
# -------------------------
@app.get("/")
def root():
    return {
        "message": "AEGIS API is running",
        "version": "1.0.0",
        "docs": "/docs"
    }

@app.get("/health")
def health_check():
    return {"status": "healthy"}