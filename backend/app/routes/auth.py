# # from fastapi import APIRouter, Depends, HTTPException, status
# # from pydantic import BaseModel, EmailStr
# # from typing import Dict, Any

# # from app.core.auth import (
# #     get_current_user,
# #     get_current_user_profile,
# #     require_admin
# # )
# # from app.core.supabase import get_supabase_client

# # router = APIRouter(prefix="/auth", tags=["Authentication"])

# # # Pydantic Models
# # class UserLoginRequest(BaseModel):
# #     email: EmailStr
# #     password: str

# # class UserLoginResponse(BaseModel):
# #     access_token: str
# #     refresh_token: str
# #     user: Dict[str, Any]
# #     profile: Dict[str, Any]

# # class PasswordResetRequest(BaseModel):
# #     email: EmailStr

# # # Routes
# # @router.post("/login", response_model=UserLoginResponse)
# # async def login(credentials: UserLoginRequest):
# #     """
# #     Login with email and password
# #     Returns access token and user profile with role
# #     """
# #     supabase = get_supabase_client()
    
# #     try:
# #         # Sign in with Supabase
# #         auth_response = supabase.auth.sign_in_with_password({
# #             "email": credentials.email,
# #             "password": credentials.password
# #         })
        
# #         if not auth_response.user:
# #             raise HTTPException(
# #                 status_code=status.HTTP_401_UNAUTHORIZED,
# #                 detail="Invalid credentials"
# #             )
        
# #         user = auth_response.user
# #         session = auth_response.session
        
# #         # Fetch user profile
# #         profile_response = supabase.table("profiles").select("*").eq("id", user.id).single().execute()
        
# #         if not profile_response.data:
# #             raise HTTPException(
# #                 status_code=status.HTTP_404_NOT_FOUND,
# #                 detail="Profile not found"
# #             )
        
# #         profile = profile_response.data
        
# #         # Check if account is active
# #         if not profile.get("is_active"):
# #             raise HTTPException(
# #                 status_code=status.HTTP_403_FORBIDDEN,
# #                 detail="Account is not active. Please contact administrator."
# #             )
        
# #         return {
# #             "access_token": session.access_token,
# #             "refresh_token": session.refresh_token,
# #             "user": {
# #                 "id": user.id,
# #                 "email": user.email,
# #                 "email_confirmed_at": user.email_confirmed_at,
# #             },
# #             "profile": profile
# #         }
        
# #     except HTTPException:
# #         raise
# #     except Exception as e:
# #         raise HTTPException(
# #             status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
# #             detail=f"Login failed: {str(e)}"
# #         )

# # @router.get("/me")
# # async def get_me(
# #     current_user: Dict[str, Any] = Depends(get_current_user),
# #     profile: Dict[str, Any] = Depends(get_current_user_profile)
# # ):
# #     """
# #     Get current authenticated user info
# #     """
# #     return {
# #         "user": {
# #             "id": current_user.get("sub"),
# #             "email": current_user.get("email"),
# #             "email_confirmed_at": current_user.get("email_confirmed_at"),
# #         },
# #         "profile": profile
# #     }

# # @router.post("/logout")
# # async def logout(current_user: Dict[str, Any] = Depends(get_current_user)):
# #     """
# #     Logout current user (revoke token on Supabase)
# #     Frontend should clear tokens from localStorage
# #     """
# #     supabase = get_supabase_client()
    
# #     try:
# #         # Note: Service role key is required for sign_out
# #         # In practice, frontend handles logout by clearing tokens
# #         return {"message": "Logged out successfully"}
        
# #     except Exception as e:
# #         raise HTTPException(
# #             status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
# #             detail=f"Logout failed: {str(e)}"
# #         )

# # @router.post("/password-reset")
# # async def request_password_reset(request: PasswordResetRequest):
# #     """
# #     Send password reset email
# #     """
# #     supabase = get_supabase_client()
    
# #     try:
# #         supabase.auth.reset_password_for_email(
# #             request.email,
# #             options={
# #                 "redirect_to": "http://localhost:3000/reset-password"  # Update with your frontend URL
# #             }
# #         )
        
# #         return {
# #             "message": "If the email exists, a password reset link has been sent."
# #         }
        
# #     except Exception as e:
# #         # Don't reveal if email exists for security
# #         return {
# #             "message": "If the email exists, a password reset link has been sent."
# #         }

# # @router.get("/verify-role/{role}")
# # async def verify_role(
# #     role: str,
# #     profile: Dict[str, Any] = Depends(get_current_user_profile)
# # ):
# #     """
# #     Verify if current user has the specified role
# #     Used by frontend for route protection
# #     """
# #     user_role = profile.get("role", "").upper()
# #     required_role = role.upper()
    
# #     if user_role != required_role:
# #         raise HTTPException(
# #             status_code=status.HTTP_403_FORBIDDEN,
# #             detail=f"Access denied. Required role: {required_role}, Your role: {user_role}"
# #         )
    
# #     return {
# #         "valid": True,
# #         "role": user_role,
# #         "profile": profile
# #     }

# from fastapi import APIRouter, Depends, HTTPException, status
# from pydantic import BaseModel, EmailStr, validator
# from typing import Dict, Any

# from app.core.auth import (
#     get_current_user,
#     get_current_user_profile,
#     require_admin
# )
# from app.core.supabase import get_supabase_client
# from app.core.config import settings

# router = APIRouter(prefix="/auth", tags=["Authentication"])

# # Pydantic Models
# class UserLoginRequest(BaseModel):
#     email: EmailStr
#     password: str
    
#     @validator('email')
#     def validate_institute_email(cls, v):
#         """Validate that email is from IIT Mandi domain"""
#         if not settings.validate_email_domain(v):
#             raise ValueError(
#                 f'Email must be from IIT Mandi domain (*.iitmandi.ac.in). '
#                 f'Valid examples: user@students.iitmandi.ac.in, user@faculty.iitmandi.ac.in'
#             )
#         return v.lower()

# class UserLoginResponse(BaseModel):
#     access_token: str
#     refresh_token: str
#     user: Dict[str, Any]
#     profile: Dict[str, Any]

# class PasswordResetRequest(BaseModel):
#     email: EmailStr
    
#     @validator('email')
#     def validate_institute_email(cls, v):
#         if not settings.validate_email_domain(v):
#             raise ValueError('Email must be from IIT Mandi domain')
#         return v.lower()

# # Routes
# @router.post("/login", response_model=UserLoginResponse)
# async def login(credentials: UserLoginRequest):
#     """
#     Login with email and password
#     Returns access token and user profile with role
    
#     Accepts emails from any IIT Mandi subdomain:
#     - @students.iitmandi.ac.in (students)
#     - @faculty.iitmandi.ac.in (faculty)
#     - @iitmandi.ac.in (admin/staff)
#     """
#     supabase = get_supabase_client()
    
#     try:
#         # Sign in with Supabase
#         auth_response = supabase.auth.sign_in_with_password({
#             "email": credentials.email,
#             "password": credentials.password
#         })
        
#         if not auth_response.user:
#             raise HTTPException(
#                 status_code=status.HTTP_401_UNAUTHORIZED,
#                 detail="Invalid credentials"
#             )
        
#         user = auth_response.user
#         session = auth_response.session
        
#         # Fetch user profile
#         profile_response = supabase.table("profiles").select("*").eq("id", user.id).single().execute()
        
#         if not profile_response.data:
#             raise HTTPException(
#                 status_code=status.HTTP_404_NOT_FOUND,
#                 detail="Profile not found. Please contact administrator."
#             )
        
#         profile = profile_response.data
        
#         # Check if account is active
#         if not profile.get("is_active"):
#             raise HTTPException(
#                 status_code=status.HTTP_403_FORBIDDEN,
#                 detail="Account is not active. Please contact administrator."
#             )
        
#         # Log the subdomain for debugging/analytics
#         subdomain = settings.get_email_subdomain(credentials.email)
#         print(f"Login: {credentials.email} (subdomain: {subdomain or 'main'}, role: {profile.get('role')})")
        
#         return {
#             "access_token": session.access_token,
#             "refresh_token": session.refresh_token,
#             "user": {
#                 "id": user.id,
#                 "email": user.email,
#                 "email_confirmed_at": user.email_confirmed_at,
#             },
#             "profile": profile
#         }
        
#     except HTTPException:
#         raise
#     except Exception as e:
#         print(f"Login error: {e}")
#         raise HTTPException(
#             status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
#             detail=f"Login failed: {str(e)}"
#         )

# @router.get("/me")
# async def get_me(
#     current_user: Dict[str, Any] = Depends(get_current_user),
#     profile: Dict[str, Any] = Depends(get_current_user_profile)
# ):
#     """
#     Get current authenticated user info
#     """
#     return {
#         "user": {
#             "id": current_user.get("sub"),
#             "email": current_user.get("email"),
#             "email_confirmed_at": current_user.get("email_confirmed_at"),
#         },
#         "profile": profile
#     }

# @router.post("/logout")
# async def logout(current_user: Dict[str, Any] = Depends(get_current_user)):
#     """
#     Logout current user
#     Frontend should clear tokens from localStorage
#     """
#     return {"message": "Logged out successfully"}

# @router.post("/password-reset")
# async def request_password_reset(request: PasswordResetRequest):
#     """
#     Send password reset email
#     Only works for IIT Mandi email addresses
#     """
#     supabase = get_supabase_client()
    
#     try:
#         supabase.auth.reset_password_for_email(
#             request.email,
#             options={
#                 "redirect_to": "http://localhost:3000/reset-password"
#             }
#         )
        
#         return {
#             "message": "If the email exists, a password reset link has been sent."
#         }
        
#     except Exception as e:
#         # Don't reveal if email exists for security
#         return {
#             "message": "If the email exists, a password reset link has been sent."
#         }

# @router.get("/verify-role/{role}")
# async def verify_role(
#     role: str,
#     profile: Dict[str, Any] = Depends(get_current_user_profile)
# ):
#     """
#     Verify if current user has the specified role
#     Used by frontend for route protection
#     """
#     user_role = profile.get("role", "").upper()
#     required_role = role.upper()
    
#     if user_role != required_role:
#         raise HTTPException(
#             status_code=status.HTTP_403_FORBIDDEN,
#             detail=f"Access denied. Required role: {required_role}, Your role: {user_role}"
#         )
    
#     return {
#         "valid": True,
#         "role": user_role,
#         "profile": profile
#     }

# @router.get("/validate-email/{email}")
# async def validate_email(email: str):
#     """
#     Check if an email is valid for IIT Mandi
#     Useful for frontend validation
#     """
#     is_valid = settings.validate_email_domain(email)
#     subdomain = settings.get_email_subdomain(email) if is_valid else None
    
#     return {
#         "valid": is_valid,
#         "email": email,
#         "subdomain": subdomain,
#         "message": "Valid IIT Mandi email" if is_valid else "Email must be from *.iitmandi.ac.in domain"
#     }
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, EmailStr
from typing import Dict, Any

from app.core.auth import (
    get_current_user,
    get_current_user_profile,
    require_admin
)
from app.core.supabase import get_supabase_client
from app.core.config import settings

router = APIRouter(prefix="/auth", tags=["Authentication"])

# Pydantic Models (without validators to avoid complex error objects)
class UserLoginRequest(BaseModel):
    email: EmailStr
    password: str

class UserLoginResponse(BaseModel):
    access_token: str
    refresh_token: str
    user: Dict[str, Any]
    profile: Dict[str, Any]

class PasswordResetRequest(BaseModel):
    email: EmailStr

# Routes
@router.post("/login", response_model=UserLoginResponse)
async def login(credentials: UserLoginRequest):
    """
    Login with email and password
    Accepts emails from any IIT Mandi subdomain
    """
    supabase = get_supabase_client()
    
    # Validate email domain (simple check)
    email = credentials.email.lower()
    if not email.endswith('iitmandi.ac.in'):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email must be from IIT Mandi domain (*.iitmandi.ac.in)"
        )
    
    try:
        # Sign in with Supabase
        auth_response = supabase.auth.sign_in_with_password({
            "email": email,
            "password": credentials.password
        })
        
        if not auth_response.user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid credentials"
            )
        
        user = auth_response.user
        session = auth_response.session
        
        # Fetch user profile
        profile_response = supabase.table("profiles").select("*").eq("id", user.id).single().execute()
        
        if not profile_response.data:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Profile not found. Please contact administrator."
            )
        
        profile = profile_response.data
        
        # Check if account is active
        if not profile.get("is_active"):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Account is not active. Please contact administrator."
            )
        
        return {
            "access_token": session.access_token,
            "refresh_token": session.refresh_token,
            "user": {
                "id": user.id,
                "email": user.email,
                "email_confirmed_at": user.email_confirmed_at,
            },
            "profile": profile
        }
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"Login error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

@router.get("/me")
async def get_me(
    current_user: Dict[str, Any] = Depends(get_current_user),
    profile: Dict[str, Any] = Depends(get_current_user_profile)
):
    """Get current authenticated user info"""
    return {
        "user": {
            "id": current_user.get("sub"),
            "email": current_user.get("email"),
            "email_confirmed_at": current_user.get("email_confirmed_at"),
        },
        "profile": profile
    }

@router.post("/logout")
async def logout(current_user: Dict[str, Any] = Depends(get_current_user)):
    """Logout current user"""
    return {"message": "Logged out successfully"}

@router.post("/password-reset")
async def request_password_reset(request: PasswordResetRequest):
    """Send password reset email"""
    supabase = get_supabase_client()
    
    email = request.email.lower()
    if not email.endswith('iitmandi.ac.in'):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email must be from IIT Mandi domain"
        )
    
    try:
        supabase.auth.reset_password_for_email(
            email,
            options={
                "redirect_to": "http://localhost:3000/reset-password"
            }
        )
        return {
            "message": "If the email exists, a password reset link has been sent."
        }
    except:
        return {
            "message": "If the email exists, a password reset link has been sent."
        }

@router.get("/verify-role/{role}")
async def verify_role(
    role: str,
    profile: Dict[str, Any] = Depends(get_current_user_profile)
):
    """Verify if current user has the specified role"""
    user_role = profile.get("role", "").upper()
    required_role = role.upper()
    
    if user_role != required_role:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"Access denied. Required role: {required_role}, Your role: {user_role}"
        )
    
    return {
        "valid": True,
        "role": user_role,
        "profile": profile
    }