from fastapi import APIRouter, HTTPException
from app.services.supabase_client import supabase

router = APIRouter(prefix="/admin/users", tags=["Admin Users"])


# GET ALL USERS
@router.get("/")
def get_users():

    res = supabase.table("profiles")\
        .select("*")\
        .order("created_at", desc=True)\
        .execute()

    return res.data


# SEARCH USERS
@router.get("/search/{query}")
def search_users(query: str):

    res = supabase.table("profiles")\
        .select("*")\
        .or_(f"full_name.ilike.%{query}%,email.ilike.%{query}%")\
        .execute()

    return res.data


# FULL USER DASHBOARD
@router.get("/{user_id}")
def user_full(user_id: str):

    profile = supabase.table("profiles")\
        .select("*")\
        .eq("id", user_id)\
        .single()\
        .execute()

    enroll = supabase.table("enrollemnts")\
        .select("*")\
        .eq("student_id", user_id)\
        .execute()

    grievances = supabase.table("grievances")\
        .select("*")\
        .eq("user_id", user_id)\
        .execute()

    return {
        "profile": profile.data,
        "enrollments": enroll.data,
        "grievances": grievances.data
    }


# CHANGE ROLE
@router.patch("/{user_id}/role")
def change_role(user_id: str, role: str):

    supabase.table("profiles")\
        .update({"role": role})\
        .eq("id", user_id)\
        .execute()

    return {"status": "updated"}


# DISABLE USER
@router.patch("/{user_id}/disable")
def disable_user(user_id: str):

    supabase.table("profiles")\
        .update({"is_active": False})\
        .eq("id", user_id)\
        .execute()

    return {"status": "disabled"}