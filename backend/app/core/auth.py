# #app/core/auth.py
# from fastapi import Depends, HTTPException
# from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
# from jose import jwt, JWTError
# import requests

# from app.core.config import SUPABASE_URL

# security = HTTPBearer()

# JWKS_URL = f"{SUPABASE_URL}/auth/v1/keys"

# jwks = requests.get(JWKS_URL).json()


# def get_current_user(
#     credentials: HTTPAuthorizationCredentials = Depends(security)
# ):
#     token = credentials.credentials

#     try:
#         header = jwt.get_unverified_header(token)

#         key = next(
#             k for k in jwks["keys"] if k["kid"] == header["kid"]
#         )

#         payload = jwt.decode(
#             token,
#             key,
#             algorithms=["ES256"],
#             audience="authenticated",
#         )

#         return payload

#     except Exception:
#         raise HTTPException(
#             status_code=401,
#             detail="Invalid Supabase token"
#         )


from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt, JWTError
import requests
from typing import Optional, Dict, Any
from functools import lru_cache

from app.core.config import settings
from app.core.supabase import get_supabase_client

security = HTTPBearer()

# Cache JWKS for 1 hour to avoid repeated requests
@lru_cache(maxsize=1)
def get_jwks():
    """Fetch Supabase's JSON Web Key Set"""
    jwks_url = f"{settings.SUPABASE_URL}/auth/v1/keys"
    try:
        response = requests.get(jwks_url, timeout=10)
        response.raise_for_status()
        return response.json()
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=f"Failed to fetch JWKS: {str(e)}"
        )

def verify_supabase_token(token: str) -> Dict[str, Any]:
    """
    Verify Supabase JWT token and return payload
    
    Args:
        token: JWT token from Authorization header
        
    Returns:
        Dict containing user info (sub, email, role, etc.)
        
    Raises:
        HTTPException: If token is invalid
    """
    try:
        # Get the key ID from token header
        header = jwt.get_unverified_header(token)
        kid = header.get("kid")
        
        if not kid:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token: missing kid"
            )
        
        # Get JWKS and find matching key
        jwks = get_jwks()
        key = next((k for k in jwks.get("keys", []) if k["kid"] == kid), None)
        
        if not key:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token: key not found"
            )
        
        # Verify and decode token
        payload = jwt.decode(
            token,
            key,
            algorithms=["ES256", "RS256"],  # Supabase uses ES256
            audience="authenticated",
        )
        
        return payload
        
    except JWTError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Invalid token: {str(e)}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Authentication failed: {str(e)}"
        )

async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
) -> Dict[str, Any]:
    """
    Dependency to get current authenticated user from JWT
    
    Returns user payload with:
    - sub: User UUID
    - email: User email
    - role: User role (from user_metadata)
    - app_metadata: Additional metadata
    """
    token = credentials.credentials
    payload = verify_supabase_token(token)
    
    # Verify email is confirmed (optional - enforce if needed)
    if not payload.get("email_confirmed_at"):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Email not verified"
        )
    
    return payload

async def get_current_user_id(
    current_user: Dict[str, Any] = Depends(get_current_user)
) -> str:
    """Get just the user ID from token"""
    return current_user.get("sub")

async def get_current_user_profile(
    current_user: Dict[str, Any] = Depends(get_current_user)
) -> Dict[str, Any]:
    """
    Fetch full user profile from database
    Combines auth data with profile data
    """
    supabase = get_supabase_client()
    user_id = current_user.get("sub")
    
    try:
        # Fetch profile from profiles table
        response = supabase.table("profiles").select("*").eq("id", user_id).single().execute()
        
        if not response.data:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Profile not found"
            )
        
        profile = response.data
        
        # Check if user is active
        if not profile.get("is_active"):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Account is not active. Please contact administrator."
            )
        
        return profile
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch profile: {str(e)}"
        )

def require_role(allowed_roles: list[str]):
    """
    Dependency factory for role-based access control
    
    Usage:
        @router.get("/admin", dependencies=[Depends(require_role(["ADMIN"]))])
    """
    async def check_role(profile: Dict[str, Any] = Depends(get_current_user_profile)):
        user_role = profile.get("role")
        
        if user_role not in allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Access denied. Required roles: {', '.join(allowed_roles)}"
            )
        
        return profile
    
    return check_role

# Role-specific dependencies
require_admin = require_role(["ADMIN"])
require_authority = require_role(["ADMIN", "AUTHORITY"])
require_faculty = require_role(["ADMIN", "FACULTY"])
require_student = require_role(["ADMIN", "STUDENT"])