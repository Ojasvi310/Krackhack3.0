# from fastapi import APIRouter, HTTPException
# from app.services.supabase_client import supabase
# from datetime import datetime, timedelta

# router = APIRouter(prefix="/api/authority", tags=["Authority"])


# @router.get("/dashboard/metrics")
# def get_dashboard_metrics():
#     """Get key metrics for authority dashboard"""
    
#     # Total Students
#     students = supabase.table("profiles")\
#         .select("id", count="exact")\
#         .eq("role", "student")\
#         .eq("is_active", True)\
#         .execute()
    
#     # Active Courses
#     courses = supabase.table("courses")\
#         .select("course_id", count="exact")\
#         .eq("status", "active")\
#         .execute()
    
#     # Faculty Members
#     faculty = supabase.table("profiles")\
#         .select("id", count="exact")\
#         .eq("role", "faculty")\
#         .eq("is_active", True)\
#         .execute()
    
#     # Calculate Average Attendance
#     attendance_data = supabase.table("attendance")\
#         .select("attended, total")\
#         .execute()
    
#     total_attended = sum([a['attended'] for a in attendance_data.data if a['attended']])
#     total_classes = sum([a['total'] for a in attendance_data.data if a['total']])
#     avg_attendance = (total_attended / total_classes * 100) if total_classes > 0 else 0
    
#     return {
#         "totalStudents": students.count,
#         "activeCourses": courses.count,
#         "facultyMembers": faculty.count,
#         "avgAttendance": round(avg_attendance, 1)
#     }


# @router.get("/dashboard/course-overview")
# def get_course_overview():
#     """Get overview of all courses with stats"""
    
#     courses = supabase.table("courses")\
#         .select("course_id, course_name")\
#         .eq("status", "active")\
#         .execute()
    
#     course_stats = []
    
#     for course in courses.data:
#         # Get enrollment count
#         enrollment = supabase.table("enrollemnts")\
#             .select("student_id", count="exact")\
#             .eq("course_id", course['course_id'])\
#             .eq("status", "active")\
#             .execute()
        
#         # Get attendance stats
#         attendance = supabase.table("attendance")\
#             .select("attended, total")\
#             .eq("course_id", course['course_id'])\
#             .execute()
        
#         avg_attendance = 0
#         if attendance.data:
#             total_attended = sum([a['attended'] for a in attendance.data])
#             total_classes = sum([a['total'] for a in attendance.data])
#             avg_attendance = (total_attended / total_classes * 100) if total_classes > 0 else 0
        
#         # Count low attendance alerts
#         low_attendance = supabase.table("attendance")\
#             .select("student_id", count="exact")\
#             .eq("course_id", course['course_id'])\
#             .execute()
        
#         alerts = sum(1 for a in low_attendance.data if (a.get('attended', 0) / a.get('total', 1)) < 0.75)
        
#         course_stats.append({
#             "code": course['course_id'],
#             "name": course['course_name'],
#             "enrolled": enrollment.count,
#             "attendance": round(avg_attendance, 1),
#             "avgMarks": 0,  # TODO: Implement grades table
#             "alerts": alerts
#         })
    
#     return course_stats


# @router.get("/dashboard/upcoming-events")
# def get_upcoming_events():
#     """Get upcoming events in next 7 days"""
    
#     today = datetime.now().date()
#     next_week = today + timedelta(days=7)
    
#     events = supabase.table("academic_events")\
#         .select("*")\
#         .gte("event_time", today.isoformat())\
#         .lte("event_time", next_week.isoformat())\
#         .order("event_time")\
#         .execute()
    
#     formatted_events = []
#     for event in events.data:
#         event_date = datetime.fromisoformat(event['event_time'].replace('Z', '+00:00'))
#         days_left = (event_date.date() - today).days
        
#         formatted_events.append({
#             "id": event['id'],
#             "title": event['title'],
#             "course": event['course_id'],
#             "date": event_date.date().isoformat(),
#             "type": event['event_type'],
#             "daysLeft": days_left
#         })
    
#     return formatted_events


# @router.get("/dashboard/alerts")
# def get_system_alerts():
#     """Get system alerts for low attendance and pending items"""
    
#     alerts = []
    
#     # Low attendance students by course
#     courses = supabase.table("courses")\
#         .select("course_id, course_name")\
#         .eq("status", "active")\
#         .execute()
    
#     for course in courses.data:
#         attendance = supabase.table("attendance")\
#             .select("*")\
#             .eq("course_id", course['course_id'])\
#             .execute()
        
#         low_count = sum(1 for a in attendance.data if (a.get('attended', 0) / a.get('total', 1)) < 0.75)
        
#         if low_count > 0:
#             alerts.append({
#                 "id": f"att_{course['course_id']}",
#                 "text": f"{low_count} students have attendance below 75%",
#                 "severity": "critical",
#                 "course": course['course_id']
#             })
    
#     return alerts


# @router.get("/dashboard/recent-activities")
# def get_recent_activities():
#     """Get recent activities from logs"""
    
#     activities = supabase.table("academic_logs")\
#         .select("*")\
#         .order("created_at", desc=True)\
#         .limit(10)\
#         .execute()
    
#     formatted_activities = []
#     for activity in activities.data:
#         created_at = datetime.fromisoformat(activity['created_at'].replace('Z', '+00:00'))
#         time_diff = datetime.now() - created_at.replace(tzinfo=None)
        
#         if time_diff.days > 0:
#             time_ago = f"{time_diff.days} day{'s' if time_diff.days > 1 else ''} ago"
#         elif time_diff.seconds >= 3600:
#             hours = time_diff.seconds // 3600
#             time_ago = f"{hours} hour{'s' if hours > 1 else ''} ago"
#         else:
#             minutes = time_diff.seconds // 60
#             time_ago = f"{minutes} minute{'s' if minutes > 1 else ''} ago"
        
#         formatted_activities.append({
#             "id": activity['id'],
#             "text": f"{activity['action']} on {activity['entity']}",
#             "time": time_ago
#         })
    
#     return formatted_activities


# @router.get("/dashboard/attendance-summary")
# def get_attendance_summary():
#     """Get attendance distribution summary"""
    
#     attendance = supabase.table("attendance")\
#         .select("*")\
#         .execute()
    
#     total_students = len(attendance.data)
#     if total_students == 0:
#         return {
#             "overall": 0,
#             "above85": 0,
#             "between75and85": 0,
#             "below75": 0
#         }
    
#     above_85 = 0
#     between_75_85 = 0
#     below_75 = 0
#     total_percentage = 0
    
#     for record in attendance.data:
#         percentage = (record['attended'] / record['total'] * 100) if record['total'] > 0 else 0
#         total_percentage += percentage
        
#         if percentage >= 85:
#             above_85 += 1
#         elif percentage >= 75:
#             between_75_85 += 1
#         else:
#             below_75 += 1
    
#     return {
#         "overall": round(total_percentage / total_students, 1),
#         "above85": round(above_85 / total_students * 100, 0),
#         "between75and85": round(between_75_85 / total_students * 100, 0),
#         "below75": round(below_75 / total_students * 100, 0)
#     }


# @router.get("/profile")
# def get_authority_profile(user_id: str):
#     """Get authority user profile"""
    
#     profile = supabase.table("profiles")\
#         .select("*")\
#         .eq("id", user_id)\
#         .single()\
#         .execute()
    
#     # Get department name
#     if profile.data.get('academic_dept_id'):
#         dept = supabase.table("academic_dept")\
#             .select("name")\
#             .eq("id", profile.data['academic_dept_id'])\
#             .single()\
#             .execute()
        
#         department_name = dept.data['name'] if dept.data else "N/A"
#     else:
#         department_name = "N/A"
    
#     return {
#         "name": profile.data['full_name'],
#         "role": profile.data['role'].title(),
#         "department": department_name,
#         "email": profile.data['email']
#     }
"""
Authority Management API
Complete backend endpoints for all Authority dashboard pages
"""

from fastapi import APIRouter, HTTPException, Query, Body
from app.services.supabase_client import supabase
from datetime import datetime, timedelta
from typing import Optional, List, Dict
from pydantic import BaseModel

router = APIRouter(prefix="/authority", tags=["Authority"])


# ==================== PYDANTIC MODELS ====================

class CourseCreate(BaseModel):
    course_id: str
    course_name: str
    credits: int
    semester: int
    department: str
    status: str = "active"

class CourseUpdate(BaseModel):
    course_name: Optional[str] = None
    credits: Optional[int] = None
    status: Optional[str] = None

class NotificationCreate(BaseModel):
    subject: str
    message: str
    recipient_type: str
    course_ids: Optional[List[str]] = []
    semesters: Optional[List[int]] = []
    departments: Optional[List[str]] = []
    schedule_date: Optional[str] = None
    schedule_time: Optional[str] = None


# ==================== DASHBOARD ENDPOINTS ====================

@router.get("/dashboard/metrics")
async def get_dashboard_metrics():
    """Get key metrics for authority dashboard"""
    try:
        # Total Students
        students_result = supabase.table("profiles")\
            .select("id", count="exact")\
            .eq("role", "student")\
            .eq("is_active", True)\
            .execute()
        
        # Active Courses
        courses_result = supabase.table("courses")\
            .select("course_id", count="exact")\
            .eq("status", "active")\
            .execute()
        
        # Faculty Members
        faculty_result = supabase.table("profiles")\
            .select("id", count="exact")\
            .eq("role", "faculty")\
            .eq("is_active", True)\
            .execute()
        
        # Average Attendance
        attendance_data = supabase.table("attendance")\
            .select("attended, total")\
            .execute()
        
        total_attended = sum([a.get('attended', 0) for a in attendance_data.data])
        total_classes = sum([a.get('total', 0) for a in attendance_data.data])
        avg_attendance = (total_attended / total_classes * 100) if total_classes > 0 else 0
        
        return {
            "totalStudents": students_result.count or 0,
            "activeCourses": courses_result.count or 0,
            "facultyMembers": faculty_result.count or 0,
            "avgAttendance": round(avg_attendance, 1)
        }
    except Exception as e:
        print(f"Error in get_dashboard_metrics: {str(e)}")
        return {"totalStudents": 0, "activeCourses": 0, "facultyMembers": 0, "avgAttendance": 0}


@router.get("/dashboard/course-overview")
async def get_course_overview():
    """Get overview of all courses with stats"""
    try:
        courses = supabase.table("courses")\
            .select("course_id, course_name")\
            .eq("status", "active")\
            .execute()
        
        course_stats = []
        for course in courses.data:
            enrollment = supabase.table("enrollments")\
                .select("student_id", count="exact")\
                .eq("course_id", course['course_id'])\
                .eq("status", "active")\
                .execute()
            
            attendance = supabase.table("attendance")\
                .select("attended, total")\
                .eq("course_id", course['course_id'])\
                .execute()
            
            avg_attendance = 0
            if attendance.data:
                total_attended = sum([a.get('attended', 0) for a in attendance.data])
                total_classes = sum([a.get('total', 0) for a in attendance.data])
                avg_attendance = (total_attended / total_classes * 100) if total_classes > 0 else 0
            
            alerts = sum(1 for a in attendance.data if (a.get('attended', 0) / max(a.get('total', 1), 1)) < 0.75)
            
            course_stats.append({
                "code": course['course_id'],
                "name": course['course_name'],
                "enrolled": enrollment.count or 0,
                "attendance": round(avg_attendance, 1),
                "avgMarks": 0,
                "alerts": alerts
            })
        
        return course_stats
    except Exception as e:
        print(f"Error in get_course_overview: {str(e)}")
        return []


@router.get("/dashboard/upcoming-events")
async def get_upcoming_events():
    """Get upcoming events in next 7 days"""
    try:
        today = datetime.now().date()
        next_week = today + timedelta(days=7)
        
        events = supabase.table("academic_events")\
            .select("*")\
            .gte("event_time", today.isoformat())\
            .lte("event_time", next_week.isoformat())\
            .order("event_time")\
            .execute()
        
        formatted_events = []
        for event in events.data:
            try:
                event_date = datetime.fromisoformat(event['event_time'].replace('Z', '+00:00'))
                days_left = (event_date.date() - today).days
                
                formatted_events.append({
                    "id": event['id'],
                    "title": event['title'],
                    "course": event.get('course_id', 'N/A'),
                    "date": event_date.date().isoformat(),
                    "type": event.get('event_type', 'general'),
                    "daysLeft": days_left
                })
            except:
                continue
        
        return formatted_events
    except Exception as e:
        print(f"Error in get_upcoming_events: {str(e)}")
        return []


@router.get("/dashboard/alerts")
async def get_system_alerts():
    """Get system alerts for low attendance and pending items"""
    try:
        alerts = []
        courses = supabase.table("courses")\
            .select("course_id, course_name")\
            .eq("status", "active")\
            .limit(10)\
            .execute()
        
        for course in courses.data:
            attendance = supabase.table("attendance")\
                .select("*")\
                .eq("course_id", course['course_id'])\
                .execute()
            
            low_count = sum(1 for a in attendance.data if (a.get('attended', 0) / max(a.get('total', 1), 1)) < 0.75)
            
            if low_count > 0:
                alerts.append({
                    "id": f"att_{course['course_id']}",
                    "text": f"{low_count} students have attendance below 75%",
                    "severity": "critical",
                    "course": course['course_id']
                })
        
        return alerts
    except Exception as e:
        print(f"Error in get_system_alerts: {str(e)}")
        return []


@router.get("/dashboard/recent-activities")
async def get_recent_activities():
    """Get recent activities from logs"""
    try:
        activities = supabase.table("academic_logs")\
            .select("*")\
            .order("created_at", desc=True)\
            .limit(10)\
            .execute()
        
        formatted_activities = []
        for activity in activities.data:
            try:
                created_at = datetime.fromisoformat(activity['created_at'].replace('Z', '+00:00'))
                time_diff = datetime.now() - created_at.replace(tzinfo=None)
                
                if time_diff.days > 0:
                    time_ago = f"{time_diff.days} day{'s' if time_diff.days > 1 else ''} ago"
                elif time_diff.seconds >= 3600:
                    hours = time_diff.seconds // 3600
                    time_ago = f"{hours} hour{'s' if hours > 1 else ''} ago"
                else:
                    minutes = time_diff.seconds // 60
                    time_ago = f"{minutes} minute{'s' if minutes > 1 else ''} ago"
                
                formatted_activities.append({
                    "id": activity['id'],
                    "text": f"{activity.get('action', 'Action')} on {activity.get('entity', 'entity')}",
                    "time": time_ago
                })
            except:
                continue
        
        return formatted_activities
    except Exception as e:
        print(f"Error in get_recent_activities: {str(e)}")
        return []


@router.get("/dashboard/attendance-summary")
async def get_attendance_summary():
    """Get attendance distribution summary"""
    try:
        attendance = supabase.table("attendance")\
            .select("*")\
            .execute()
        
        total_students = len(attendance.data)
        if total_students == 0:
            return {"overall": 0, "above85": 0, "between75and85": 0, "below75": 0}
        
        above_85 = 0
        between_75_85 = 0
        below_75 = 0
        total_percentage = 0
        
        for record in attendance.data:
            percentage = (record.get('attended', 0) / max(record.get('total', 1), 1) * 100)
            total_percentage += percentage
            
            if percentage >= 85:
                above_85 += 1
            elif percentage >= 75:
                between_75_85 += 1
            else:
                below_75 += 1
        
        return {
            "overall": round(total_percentage / total_students, 1),
            "above85": round(above_85 / total_students * 100, 0),
            "between75and85": round(between_75_85 / total_students * 100, 0),
            "below75": round(below_75 / total_students * 100, 0)
        }
    except Exception as e:
        print(f"Error in get_attendance_summary: {str(e)}")
        return {"overall": 0, "above85": 0, "between75and85": 0, "below75": 0}


@router.get("/profile")
async def get_authority_profile(user_id: str = Query(...)):
    try:
        # 1. Added 'service_dept_id' to the select string
        profile = supabase.table("profiles") \
            .select("full_name, role, department, email, service_dept_id") \
            .eq("id", user_id) \
            .single() \
            .execute()

        if not profile.data:
            raise HTTPException(status_code=404, detail="Profile not found")

        # Now dept_id will correctly capture the UUID from the database
        department_name = profile.data.get("department")
        dept_id = profile.data.get("service_dept_id")

        return {
            "name": profile.data.get("full_name", "User"),
            "role": profile.data.get("role", "authority").lower(),
            "dept_id": dept_id,
            "dept_name": department_name,
            "email": profile.data.get("email", "N/A")
        }

    except Exception as e:
        # Improved error logging to see exactly what fails in your terminal
        print(f"Error in get_authority_profile: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# ==================== COURSES ENDPOINTS ====================

@router.get("/courses")
async def get_courses(status: Optional[str] = None):
    """Get all courses"""
    try:
        query = supabase.table("courses").select("*")
        
        if status:
            query = query.eq("status", status)
        
        result = query.execute()
        
        # Add enrollment count for each course
        courses_with_stats = []
        for course in result.data:
            enrollment = supabase.table("enrollments")\
                .select("student_id", count="exact")\
                .eq("course_id", course['course_id'])\
                .eq("status", "active")\
                .execute()
            
            course['enrolled'] = enrollment.count or 0
            courses_with_stats.append(course)
        
        return courses_with_stats
    except Exception as e:
        print(f"Error in get_courses: {str(e)}")
        return []


@router.post("/courses")
async def create_course(course: CourseCreate):
    """Create a new course"""
    try:
        result = supabase.table("courses")\
            .insert({
                "course_id": course.course_id,
                "course_name": course.course_name,
                "credits": course.credits,
                "semester": course.semester,
                "department": course.department,
                "status": course.status
            })\
            .execute()
        print(f"Insert result: {result}") 
        
        return {"status": "success", "data": result.data}
    except Exception as e:
        print(f"Error in create_course: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.patch("/courses/{course_id}")
async def update_course(course_id: str, course: CourseUpdate):
    """Update a course"""
    try:
        update_data = {k: v for k, v in course.dict().items() if v is not None}
        
        result = supabase.table("courses")\
            .update(update_data)\
            .eq("course_id", course_id)\
            .execute()
        
        return {"status": "success", "data": result.data}
    except Exception as e:
        print(f"Error in update_course: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/courses/{course_id}")
async def delete_course(course_id: str):
    """Delete a course"""
    try:
        result = supabase.table("courses")\
            .update({"status": "inactive"})\
            .eq("course_id", course_id)\
            .execute()
        
        return {"status": "success"}
    except Exception as e:
        print(f"Error in delete_course: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


# ==================== STUDENTS ENDPOINTS ====================

@router.get("/students")
async def get_students(
    department: Optional[str] = None,
    semester: Optional[int] = None,
    status: Optional[str] = None
):
    """Get all students with filters"""
    try:
        query = supabase.table("profiles")\
            .select("*")\
            .eq("role", "student")\
            .eq("is_active", True)
        
        if department and department != "All Departments":
            query = query.eq("department", department)
        
        result = query.execute()
        
        students_with_stats = []
        for student in result.data:
            # Get enrollment
            enrollments = supabase.table("enrollments")\
                .select("course_id")\
                .eq("student_id", student['id'])\
                .eq("status", "active")\
                .execute()
            
            # Get attendance
            attendance = supabase.table("attendance")\
                .select("attended, total")\
                .eq("student_id", student['id'])\
                .execute()
            
            avg_attendance = 0
            if attendance.data:
                total_attended = sum([a.get('attended', 0) for a in attendance.data])
                total_classes = sum([a.get('total', 0) for a in attendance.data])
                avg_attendance = (total_attended / total_classes * 100) if total_classes > 0 else 0
            
            # Determine status
            student_status = "active"
            if avg_attendance < 65:
                student_status = "critical"
            elif avg_attendance < 75:
                student_status = "warning"
            
            students_with_stats.append({
                "id": student['id'],
                "name": student['full_name'],
                "rollNo": student.get('roll_number', 'N/A'),
                "email": student['email'],
                "phone": student.get('phone', 'N/A'),
                "department": student.get('department', 'N/A'),
                "semester": 6,  # TODO: Add semester to profiles table
                "enrolledCourses": [e['course_id'] for e in enrollments.data],
                "totalCredits": len(enrollments.data) * 3,  # Approximate
                "cgpa": 0,  # TODO: Implement grades
                "attendance": round(avg_attendance, 0),
                "status": student_status,
                "alerts": []
            })
        
        return students_with_stats
    except Exception as e:
        print(f"Error in get_students: {str(e)}")
        return []


@router.get("/students/{student_id}")
async def get_student_details(student_id: str):
    """Get detailed student information"""
    try:
        # Get profile
        profile = supabase.table("profiles")\
            .select("*")\
            .eq("id", student_id)\
            .single()\
            .execute()
        
        # Get enrollments
        enrollments = supabase.table("enrollments")\
            .select("*")\
            .eq("student_id", student_id)\
            .execute()
        
        # Get attendance
        attendance = supabase.table("attendance")\
            .select("*")\
            .eq("student_id", student_id)\
            .execute()
        
        return {
            "profile": profile.data,
            "enrollments": enrollments.data,
            "attendance": attendance.data
        }
    except Exception as e:
        print(f"Error in get_student_details: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


# ==================== NOTIFICATIONS ENDPOINTS ====================

@router.post("/notifications/send")
async def send_notification(notification: NotificationCreate):
    """Send notification to selected recipients"""
    try:
        # Here you would implement actual notification sending
        # For now, just log the notification
        
        recipients_count = 0
        
        if notification.recipient_type == "all":
            students = supabase.table("profiles")\
                .select("id", count="exact")\
                .eq("role", "student")\
                .execute()
            recipients_count = students.count or 0
        
        elif notification.recipient_type == "course":
            for course_id in notification.course_ids:
                enrollments = supabase.table("enrollments")\
                    .select("student_id", count="exact")\
                    .eq("course_id", course_id)\
                    .execute()
                recipients_count += enrollments.count or 0
        
        # Log notification (you can create a notifications table for this)
        
        return {
            "status": "success",
            "recipients_count": recipients_count,
            "message": "Notification sent successfully"
        }
    except Exception as e:
        print(f"Error in send_notification: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


# ==================== ANALYTICS ENDPOINTS ====================

@router.get("/analytics/overview")
async def get_analytics_overview():
    """Get analytics overview data"""
    try:
        # Get all metrics for analytics
        students = supabase.table("profiles")\
            .select("id", count="exact")\
            .eq("role", "student")\
            .execute()
        
        courses = supabase.table("courses")\
            .select("course_id", count="exact")\
            .execute()
        
        faculty = supabase.table("profiles")\
            .select("id", count="exact")\
            .eq("role", "faculty")\
            .execute()
        
        # Calculate averages
        attendance = supabase.table("attendance")\
            .select("*")\
            .execute()
        
        total_attended = sum([a.get('attended', 0) for a in attendance.data])
        total_classes = sum([a.get('total', 0) for a in attendance.data])
        avg_attendance = (total_attended / total_classes * 100) if total_classes > 0 else 0
        
        return {
            "totalStudents": students.count or 0,
            "totalCourses": courses.count or 0,
            "totalFaculty": faculty.count or 0,
            "avgAttendance": round(avg_attendance, 1),
            "avgCGPA": 7.6,  # TODO: Implement from grades
            "passRate": 92.5   # TODO: Implement from grades
        }
    except Exception as e:
        print(f"Error in get_analytics_overview: {str(e)}")
        return {}


@router.get("/analytics/course-performance")
async def get_course_performance():
    """Get course performance analytics"""
    try:
        courses = supabase.table("courses")\
            .select("*")\
            .eq("status", "active")\
            .execute()
        
        performance_data = []
        for course in courses.data:
            # Get stats for each course
            enrollment = supabase.table("enrollments")\
                .select("student_id", count="exact")\
                .eq("course_id", course['course_id'])\
                .execute()
            
            attendance = supabase.table("attendance")\
                .select("attended, total")\
                .eq("course_id", course['course_id'])\
                .execute()
            
            avg_attendance = 0
            if attendance.data:
                total_attended = sum([a.get('attended', 0) for a in attendance.data])
                total_classes = sum([a.get('total', 0) for a in attendance.data])
                avg_attendance = (total_attended / total_classes * 100) if total_classes > 0 else 0
            
            performance_data.append({
                "code": course['course_id'],
                "name": course['course_name'],
                "enrolled": enrollment.count or 0,
                "avgMarks": 70,  # TODO: Implement
                "attendance": round(avg_attendance, 1),
                "passRate": 90   # TODO: Implement
            })
        
        return performance_data
    except Exception as e:
        print(f"Error in get_course_performance: {str(e)}")
        return []