# # # from fastapi import APIRouter, HTTPException
# # # from fastapi.encoders import jsonable_encoder
# # # from app.core.supabase import supabase

# # # router = APIRouter()

# # # # SAME STYLE AS GRIEVANCES

# # # @router.get("/list/{user_id}")
# # # async def get_student_courses(user_id: str):
# # #     try:
# # #         # adjust table name if needed
# # #         response = supabase.table("student_courses")\
# # #             .select("*")\
# # #             .eq("student_id", user_id)\
# # #             .execute()

# # #         return jsonable_encoder(response.data)

# # #     except Exception as e:
# # #         raise HTTPException(status_code=400, detail=str(e))
# # from fastapi import APIRouter, HTTPException
# # from fastapi.encoders import jsonable_encoder
# # from app.core.supabase import supabase

# # router = APIRouter(prefix="/student-courses", tags=["Student Courses"])


# # @router.get("/list/{user_id}")
# # async def get_student_courses(user_id: str):

# #     try:

# #         print("USER ID:", user_id)

# #         # 🔴 STEP 1
# #         enrollments = supabase.table("enrollements")\
# #             .select("*")\
# #             .eq("student_id", user_id)\
# #             .execute()

# #         print("ENROLLMENTS:", enrollments.data)

# #         if not enrollments.data:
# #             return []

# #         # 🔴 STEP 2
# #         course_ids = [row["course_id"] for row in enrollments.data]

# #         print("COURSE IDS:", course_ids)

# #         # 🔴 STEP 3
# #         courses = supabase.table("courses")\
# #             .select("*")\
# #             .in_("id", course_ids)\
# #             .execute()

# #         print("COURSES:", courses.data)

# #         return jsonable_encoder(courses.data)

# #     except Exception as e:
# #         print("🔥 STUDENT COURSES ERROR:", e)
# #         raise HTTPException(status_code=400, detail=str(e))
# from fastapi import APIRouter, HTTPException
# from fastapi.encoders import jsonable_encoder
# from app.core.supabase import supabase

# router = APIRouter()

# @router.get("/my-courses/{user_id}")
# async def get_student_courses(user_id: str):
#     try:
#         # 1. Fetch enrollments for the student
#         # We join with the 'courses' table to get course details
#         enrollment_res = supabase.table("enrollments") \
#             .select("*, courses(*)") \
#             .eq("student_id", user_id) \
#             .execute()
        
#         # 2. Fetch attendance for these courses
#         attendance_res = supabase.table("attendance") \
#             .select("*") \
#             .eq("student_id", user_id) \
#             .execute()
        
#         # Combine the data for a cleaner frontend experience
#         combined_data = []
#         attendance_map = {a['course_id']: a for a in attendance_res.data}
        
#         for enrollment in enrollment_res.data:
#             course_id = enrollment['course_id']
#             course_info = enrollment.get('courses', {})
#             att = attendance_map.get(course_id, {"attended": 0, "total": 0})
            
#             combined_data.append({
#                 "enrollment_id": enrollment['id'],
#                 "course_id": course_id,
#                 "course_name": course_info.get("course_name", "Unknown"),
#                 "credits": course_info.get("credits", 0),
#                 "semester": enrollment['semester'],
#                 "status": enrollment['status'],
#                 "attendance": {
#                     "attended": att.get("attended", 0),
#                     "total": att.get("total", 0),
#                     "percentage": round((att['attended'] / att['total'] * 100), 2) if att.get("total", 0) > 0 else 0
#                 }
#             })

#         return jsonable_encoder(combined_data)
#     except Exception as e:
#         print(f"Error fetching student courses: {e}")
#         raise HTTPException(status_code=400, detail=str(e))
# app/routes/student_courses.py
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