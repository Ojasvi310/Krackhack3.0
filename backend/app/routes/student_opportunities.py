from fastapi import APIRouter, HTTPException
from fastapi.encoders import jsonable_encoder
from app.core.supabase import supabase
from typing import Dict, Any

router = APIRouter()

# 1. BROWSE ALL
@router.get("/")
async def get_all_opportunities():
    try:
        response = supabase.table("opportunities") \
            .select("*, profiles:posted_by(full_name, email)") \
            .order("created_at", desc=True) \
            .execute()
        return jsonable_encoder(response.data)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# 2. GET MY APPLICATIONS
@router.get("/my-applications/{user_id}")
async def get_my_applications(user_id: str):
    try:
        response = supabase.table("applications") \
            .select("*, opportunities(title, deadline, profiles:posted_by(full_name, email))") \
            .eq("student_id", user_id) \
            .execute()
        return jsonable_encoder(response.data)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# 3. APPLY
@router.post("/apply/{opportunity_id}/{user_id}")
async def apply_to_opp(opportunity_id: str, user_id: str):
    try:
        check = supabase.table("applications") \
            .select("id") \
            .eq("student_id", user_id) \
            .eq("opportunity_id", opportunity_id) \
            .execute()

        if check.data:
            raise HTTPException(status_code=400, detail="Already applied.")

        data = {"student_id": user_id, "opportunity_id": opportunity_id, "status": "Applied"}
        response = supabase.table("applications").insert(data).execute()
        return {"status": "success_verified", "data": response.data}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# 4. WITHDRAW (NEW)
@router.delete("/withdraw/{opportunity_id}/{user_id}")
async def withdraw_application(opportunity_id: str, user_id: str):
    try:
        response = supabase.table("applications") \
            .delete() \
            .eq("student_id", user_id) \
            .eq("opportunity_id", opportunity_id) \
            .execute()
            
        if not response.data:
            raise HTTPException(status_code=404, detail="Application record not found.")
            
        return {"status": "success_verified", "message": "Application withdrawn"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))