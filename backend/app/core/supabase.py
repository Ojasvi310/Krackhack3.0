# #app/core/supbase.py
# import os
# from supabase import create_client, Client
# from pydantic_settings import BaseSettings

# class Settings(BaseSettings):
#     SUPABASE_URL: str
#     SUPABASE_SERVICE_ROLE_KEY: str # Use Service Role for backend DB operations
#     INSTITUTE_DOMAIN: str

#     class Config:
#         env_file = ".env"

# settings = Settings()
# supabase: Client = create_client(settings.SUPABASE_URL, settings.SUPABASE_SERVICE_ROLE_KEY)

from supabase import create_client, Client
from app.core.config import settings

# Admin client with service role key (for backend operations)
supabase: Client = create_client(
    settings.SUPABASE_URL,
    settings.SUPABASE_SERVICE_ROLE_KEY
)

def get_supabase_client() -> Client:
    """Returns the Supabase admin client"""
    return supabase