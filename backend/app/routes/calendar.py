from fastapi import APIRouter
from app.services.supabase_client import supabase

router = APIRouter(prefix="/calendar", tags=["Calendar"])


@router.get("/events/{user_id}")
def get_calendar_events(user_id: str):

    events = []

    # Academic events (global - exams, deadlines etc)
    academic = supabase.table("academic_events") \
        .select("id, title, event_type, event_time, course_id") \
        .order("event_time", desc=False) \
        .execute()

    for e in academic.data:
        events.append({
            "id": e["id"],
            "title": e["title"],
            "type": e.get("event_type", "general"),
            "date": e["event_time"],
            "course": e.get("course_id", ""),
            "source": "academic"
        })

    # Student's enrolled courses deadlines via tasks
    tasks = supabase.table("tasks") \
        .select("id, title, deadline, priority, status") \
        .eq("student_id", user_id) \
        .execute()

    for t in tasks.data:
        events.append({
            "id": t["id"],
            "title": t["title"],
            "type": "task",
            "date": t["deadline"],
            "course": "",
            "priority": t.get("priority", "medium"),
            "status": t.get("status", "pending"),
            "source": "task"
        })

    # Sort all by date
    events.sort(key=lambda x: x["date"] or "")

    return events