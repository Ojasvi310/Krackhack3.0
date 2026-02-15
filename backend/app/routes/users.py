# from fastapi import APIRouter, HTTPException
# from app.services.supabase_client import supabase

# router = APIRouter(prefix="/admin/users", tags=["Admin Users"])


# # GET ALL USERS
# @router.get("/")
# def get_users():

#     res = supabase.table("profiles")\
#         .select("*")\
#         .order("created_at", desc=True)\
#         .execute()

#     return res.data


# # SEARCH USERS
# @router.get("/search/{query}")
# def search_users(query: str):

#     res = supabase.table("profiles")\
#         .select("*")\
#         .or_(f"full_name.ilike.%{query}%,email.ilike.%{query}%")\
#         .execute()

#     return res.data


# # FULL USER DASHBOARD
# @router.get("/{user_id}")
# def user_full(user_id: str):

#     profile = supabase.table("profiles")\
#         .select("*")\
#         .eq("id", user_id)\
#         .single()\
#         .execute()

#     enroll = supabase.table("enrollemnts")\
#         .select("*")\
#         .eq("student_id", user_id)\
#         .execute()

#     grievances = supabase.table("grievances")\
#         .select("*")\
#         .eq("user_id", user_id)\
#         .execute()

#     return {
#         "profile": profile.data,
#         "enrollments": enroll.data,
#         "grievances": grievances.data
#     }


# # CHANGE ROLE
# @router.patch("/{user_id}/role")
# def change_role(user_id: str, role: str):

#     supabase.table("profiles")\
#         .update({"role": role})\
#         .eq("id", user_id)\
#         .execute()

#     return {"status": "updated"}


# # DISABLE USER
# @router.patch("/{user_id}/disable")
# def disable_user(user_id: str):

#     supabase.table("profiles")\
#         .update({"is_active": False})\
#         .eq("id", user_id)\
#         .execute()

#     return {"status": "disabled"}

from fastapi import APIRouter
from app.services.supabase_client import supabase
from fastapi import HTTPException # Ensure this is imported

router = APIRouter(prefix="/admin/users", tags=["Admin Users"])


@router.get("/")
def get_users():

    res=supabase.table("profiles")\
        .select("*")\
        .order("created_at",desc=True)\
        .execute()

    return res.data


@router.get("/search/{query}")
def search_users(query:str):

    res=supabase.table("profiles")\
        .select("*")\
        .or_(f"full_name.ilike.%{query}%,email.ilike.%{query}%")\
        .execute()

    return res.data


@router.get("/{user_id}")
def user_full(user_id:str):

    profile=supabase.table("profiles")\
        .select("*")\
        .eq("id",user_id)\
        .single()\
        .execute()

    enroll=supabase.table("enrollemnts")\
        .select("*")\
        .eq("student_id",user_id)\
        .execute()

    grievances=supabase.table("grievances")\
        .select("*")\
        .eq("user_id",user_id)\
        .execute()

    return {
        "profile":profile.data,
        "enrollments":enroll.data,
        "grievances":grievances.data
    }


@router.patch("/{user_id}/role")
def change_role(user_id:str,role:str):

    supabase.table("profiles")\
        .update({"role":role})\
        .eq("id",user_id)\
        .execute()

    return {"status":"updated"}


@router.patch("/{user_id}/disable")
def disable_user(user_id:str):

    supabase.table("profiles")\
        .update({"is_active":False})\
        .eq("id",user_id)\
        .execute()

    return {"status":"disabled"}

# app/routes/users.py

@router.get("/authority-dept/{user_id}")
async def get_authority_dept(user_id: str):
    try:
        # We only select 'role' and 'department' strings
        response = supabase.table("profiles")\
            .select("role, department")\
            .eq("id", user_id)\
            .single()\
            .execute()
        
        if not response.data:
            raise HTTPException(status_code=404, detail="User not found")
            
        # Returning a simple dictionary of strings is always JSON safe
        return {
            "role": response.data.get("role"),
            "department": response.data.get("department")
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))