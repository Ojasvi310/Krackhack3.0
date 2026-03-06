
from fastapi import APIRouter, HTTPException
from fastapi.encoders import jsonable_encoder
from app.core.supabase import supabase

router = APIRouter()

@router.get("/details/{user_id}")
async def get_course_master_view(user_id: str):
    try:
        # 1. Fetch Enrollments with Course details
        # Check your DB: if the table is 'enrollments', change the name below
        enroll_res = supabase.table("enrollments") \
            .select("*, courses:course_id(*)") \
            .eq("student_id", user_id) \
            .execute()
        
        # 2. Fetch Attendance
        att_res = supabase.table("attendance") \
            .select("*") \
            .eq("student_id", user_id) \
            .execute()
        
        # 3. Fetch Verified Resources
        res_res = supabase.table("academic_resources") \
            .select("*") \
            .eq("verified", True) \
            .execute()

        # Create lookups for faster processing
        attendance_map = {a['course_id']: a for a in att_res.data}
        
        master_list = []
        for en in enroll_res.data:
            cid = en['course_id']
            # Safely handle potential nulls from the join
            course_info = en.get('courses', {}) 
            att = attendance_map.get(cid, {"attended": 0, "total": 0})
            
            # Filter resources for THIS specific course
            course_resources = [r for r in res_res.data if r['course_id'] == cid]
            
            master_list.append({
                "course_id": cid,
                "course_name": course_info.get("course_name", "N/A"),
                "credits": course_info.get("credits", 0),
                "status": en.get("status", "PENDING"),
                "attendance": {
                    "attended": att.get("attended", 0),
                    "total": att.get("total", 0)
                },
                "resources": course_resources
            })

        return jsonable_encoder(master_list)

    except Exception as e:
        # This will print the exact SQL/Supabase error in your terminal
        print(f"❌ DATABASE ERROR: {str(e)}")
        raise HTTPException(status_code=400, detail=f"Database Query Failed: {str(e)}")