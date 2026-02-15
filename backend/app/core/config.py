# # # #app/core/config.py
# # # import os
# # # from dotenv import load_dotenv

# # # load_dotenv()

# # # SUPABASE_URL = os.getenv("SUPABASE_URL")
# # # SUPABASE_KEY = os.getenv("SUPABASE_KEY")

# # import os
# # from pydantic_settings import BaseSettings
# # from dotenv import load_dotenv

# # load_dotenv()

# # class Settings(BaseSettings):
# #     # Supabase Configuration
# #     SUPABASE_URL: str
# #     SUPABASE_SERVICE_ROLE_KEY: str  # For admin operations
# #     SUPABASE_ANON_KEY: str  # For client-side operations
    
# #     # Database Configuration (if using direct PostgreSQL connection)
# #     DATABASE_URL: str
    
# #     # Application Settings
# #     INSTITUTE_DOMAIN: str = "@students.iitmandi.ac.in"
# #     API_PREFIX: str = "/api"
    
# #     # CORS Settings
# #     CORS_ORIGINS: list = [
# #         "http://localhost:3000",
# #         "http://localhost:5173",
# #         "http://localhost:5174",
# #     ]
    
# #     class Config:
# #         env_file = ".env"
# #         case_sensitive = True

# # settings = Settings()

# import os
# from typing import List
# from pydantic_settings import BaseSettings
# from dotenv import load_dotenv

# load_dotenv()

# class Settings(BaseSettings):
#     # Supabase Configuration
#     SUPABASE_URL: str
#     SUPABASE_SERVICE_ROLE_KEY: str  # For admin operations
#     SUPABASE_ANON_KEY: str  # For client-side operations
    
#     # Database Configuration (if using direct PostgreSQL connection)
#     DATABASE_URL: str
    
#     # Application Settings
#     INSTITUTE_DOMAIN: str = "@students.iitmandi.ac.in"
#     API_PREFIX: str = "/api"
    
#     # CORS Settings - now as a string that we'll split
#     CORS_ORIGINS: str = "http://localhost:3000,http://localhost:5173,http://localhost:5174"
    
#     class Config:
#         env_file = ".env"
#         case_sensitive = True
    
#     @property
#     def cors_origins_list(self) -> List[str]:
#         """Convert CORS_ORIGINS string to list"""
#         return [origin.strip() for origin in self.CORS_ORIGINS.split(",")]

# settings = Settings()

import os
from typing import List
from pydantic_settings import BaseSettings
from dotenv import load_dotenv
import re

load_dotenv()

class Settings(BaseSettings):
    # Supabase Configuration
    SUPABASE_URL: str
    SUPABASE_SERVICE_ROLE_KEY: str  # For admin operations
    SUPABASE_ANON_KEY: str  # For client-side operations
    
    # Database Configuration (if using direct PostgreSQL connection)
    DATABASE_URL: str
    
    # Application Settings
    INSTITUTE_DOMAIN: str = "iitmandi.ac.in"  # Just the domain, no @
    API_PREFIX: str = "/api"
    
    # CORS Settings - now as a string that we'll split
    CORS_ORIGINS: str = "http://localhost:3000,http://localhost:5173,http://localhost:5174"
    
    class Config:
        env_file = ".env"
        case_sensitive = True
    
    @property
    def cors_origins_list(self) -> List[str]:
        """Convert CORS_ORIGINS string to list"""
        return [origin.strip() for origin in self.CORS_ORIGINS.split(",")]
    
    def validate_email_domain(self, email: str) -> bool:
        """
        Validate if email ends with @*.iitmandi.ac.in
        
        Valid examples:
        - student@students.iitmandi.ac.in ✅
        - faculty@faculty.iitmandi.ac.in ✅
        - admin@iitmandi.ac.in ✅
        - user@dept.iitmandi.ac.in ✅
        
        Invalid examples:
        - user@gmail.com ❌
        - user@iitd.ac.in ❌
        """
        if not email or '@' not in email:
            return False
        
        # Get domain part after @
        domain = email.split('@')[1].lower()
        
        # Check if domain ends with iitmandi.ac.in
        return domain.endswith(self.INSTITUTE_DOMAIN)
    
    def get_email_subdomain(self, email: str) -> str:
        """
        Extract subdomain from email
        
        Examples:
        - student@students.iitmandi.ac.in -> students
        - faculty@faculty.iitmandi.ac.in -> faculty
        - admin@iitmandi.ac.in -> (empty string)
        """
        if not email or '@' not in email:
            return ""
        
        domain = email.split('@')[1].lower()
        
        # Remove the main institute domain
        subdomain_part = domain.replace('.' + self.INSTITUTE_DOMAIN, '').replace(self.INSTITUTE_DOMAIN, '')
        
        return subdomain_part.strip('.')

settings = Settings()