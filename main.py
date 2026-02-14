# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware

# # Import your routers
# from app.routes.auth import router as auth_router


# # -------------------------
# # CREATE FASTAPI APP
# # -------------------------
# app = FastAPI(
#     title="AEGIS Backend",
#     version="1.0.0"
# )


# # -------------------------
# # CORS (REQUIRED FOR REACT)
# # -------------------------
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=[
#         "http://localhost:5173",   # Vite frontend
#         "http://127.0.0.1:5173",
#         "*"                        # keep for dev, restrict later
#     ],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )


# # -------------------------
# # INCLUDE ROUTES
# # -------------------------
# app.include_router(auth_router)


# # -------------------------
# # HEALTH CHECK ROUTE
# # -------------------------
# @app.get("/")
# def root():
#     return {"message": "AEGIS backend running successfully"}

# # from fastapi import FastAPI

# # app = FastAPI()

# # @app.get("/")
# # def root():
# #     return {"hello": "backend works"}

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.routes.auth import router as auth_router
# 1. IMPORT your new grievance router
from app.routes.grievances import router as grievance_router 

app = FastAPI(
    title="AEGIS API",
    description="IIT Mandi Campus Management Platform API",
    version="1.0.0"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth_router, prefix=settings.API_PREFIX)

# 2. INCLUDE the grievance router
app.include_router(grievance_router, prefix=settings.API_PREFIX)

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