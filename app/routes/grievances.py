from fastapi import APIRouter, HTTPException
from fastapi.encoders import jsonable_encoder
from app.core.supabase import supabase
from app.schemas.grievances import GrievanceCreate, ProgressUpdate

# 1. ADD THIS LINE: This defines the router that handles your endpoints
router = APIRouter()

@router.post("/create")
async def create_new_grievance(payload: GrievanceCreate):
    try:
        data = jsonable_encoder(payload)  # 🔥 FIX
        data["status"] = "PENDING"
        data["priority"] = "MEDIUM"
        
        response = supabase.table("grievances").insert(data).execute()

        return {"status": "success_verified", "data": response.data}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/update-progress")
async def update_progress(payload: ProgressUpdate):
    try:
        update_data = {"status": payload.new_status}
        if payload.priority:
            update_data["priority"] = payload.priority
            
        supabase.table("grievances").update(update_data).eq("id", payload.grievance_id).execute()

        log_entry = {
            "grievance_id": str(payload.grievance_id),
            "actor_id": str(payload.actor_id),
            "new_status": payload.new_status,
            "remarks": payload.remarks
        }
        
        result = supabase.table("status_logs").insert(log_entry).execute()
        return jsonable_encoder({"status": "success", "log": result.data}) # Use encoder here too!
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/list/{user_id}")
async def get_my_grievances(user_id: str):
    response = supabase.table("grievances").select("*").eq("user_id", user_id).execute()
    return jsonable_encoder(response.data) # Added encoder for UUIDs

@router.get("/list-by-dept/{dept_id}")
async def get_dept_grievances(dept_id: str):
    # Fetch grievances where target_service_dept_id matches the authority's department
    response = supabase.table("grievances").select("*").eq("target_service_dept_id", dept_id).execute()
    return jsonable_encoder(response.data) # Crucial to prevent UUID errors