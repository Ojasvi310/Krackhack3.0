from fastapi import APIRouter, HTTPException
from fastapi.encoders import jsonable_encoder
from app.core.supabase import supabase

router = APIRouter()

# 1. Detailed Ledger Route (Working)
@router.get("/details/{user_id}")
async def get_attendance_details(user_id: str):
    try:
        response = supabase.table("attendance") \
            .select("*, courses:course_id(course_name, credits)") \
            .eq("student_id", user_id) \
            .execute()
        return jsonable_encoder(response.data)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# 2. Unified Dashboard Summary (NEW)
@router.get("/summary/{user_id}")
async def get_dashboard_summary(user_id: str):
    try:
        # Fetch Attendance with Course Names
        attendance = supabase.table("attendance") \
            .select("course_id, attended, total, courses:course_id(course_name)") \
            .eq("student_id", user_id).execute()
        
        # Fetch Upcoming Events
        calendar = supabase.table("academic_events") \
            .select("*").gte("event_time", "now()") \
            .order("event_time", asc=True).limit(3).execute()

        # Fetch Quick Stats
        opps = supabase.table("opportunities").select("id", count="exact").execute()
        grievances = supabase.table("grievances").select("id").eq("user_id", user_id).execute()

        return jsonable_encoder({
            "attendance": attendance.data,
            "calendar": calendar.data,
            "stats": {
                "active_grievances": len(grievances.data),
                "open_opportunities": opps.count if opps.count else 0,
                "total_courses": len(attendance.data)
            }
        })
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Summary Error: {str(e)}")