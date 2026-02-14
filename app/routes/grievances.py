from fastapi import APIRouter, HTTPException
from app.core.supabase import supabase
from app.schemas.grievances import GrievanceCreate, ProgressUpdate # Import our gates

router = APIRouter()

@router.post("/create")
async def create_new_grievance(payload: GrievanceCreate):
    try:
        # 1. Convert Pydantic model to dictionary
        data = payload.dict()
        
        # 2. MANUALLY set defaults (Security: Student can't override these)
        data["status"] = "PENDING"
        data["priority"] = "MEDIUM"
        
        response = supabase.table("grievances").insert(data).execute()
        return {"status": "success", "data": response.data}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/update-progress")
async def update_progress(payload: ProgressUpdate):
    try:
        # 1. Update the main Grievance table
        # We only update 'status' and 'priority' if provided
        update_data = {"status": payload.new_status}
        if payload.priority:
            update_data["priority"] = payload.priority
            
        supabase.table("grievances").update(update_data).eq("id", payload.grievance_id).execute()

        # 2. INSERT into status_logs (Triggers Real-time)
        log_entry = {
            "grievance_id": str(payload.grievance_id),
            "actor_id": str(payload.actor_id),
            "new_status": payload.new_status,
            "remarks": payload.remarks
        }
        
        result = supabase.table("status_logs").insert(log_entry).execute()
        return {"status": "success", "log": result.data}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/list/{user_id}")
async def get_my_grievances(user_id: str):
    response = supabase.table("grievances").select("*").eq("user_id", user_id).execute()
    return response.data