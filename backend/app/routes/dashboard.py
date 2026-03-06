from fastapi import APIRouter
from app.services.supabase_client import supabase
from datetime import datetime, timedelta, timezone

router = APIRouter(prefix="/dashboard", tags=["dashboard"])


@router.get("/upcoming/{user_id}")
def get_upcoming(user_id: str):

    upcoming = []

    now = datetime.now(timezone.utc)
    week_later = now + timedelta(days=7)

    # Academic events this week
    events = supabase.table("academic_events") \
        .select("title, event_time, event_type, course_id") \
        .gte("event_time", now.isoformat()) \
        .lte("event_time", week_later.isoformat()) \
        .order("event_time", desc=False) \
        .execute()

    for e in events.data:
        upcoming.append({
            "text": e["title"],
            "time": e["event_time"],
            "type": e.get("event_type", "other"),
            "course": e.get("course_id", "")
        })

    # Tasks due this week
    tasks = supabase.table("tasks") \
        .select("title, deadline, priority") \
        .eq("student_id", user_id) \
        .gte("deadline", now.date().isoformat()) \
        .lte("deadline", week_later.date().isoformat()) \
        .execute()

    for t in tasks.data:
        upcoming.append({
            "text": t["title"],
            "time": t["deadline"],
            "type": "task",
            "course": ""
        })

    upcoming.sort(key=lambda x: x["time"])
    return upcoming[:5]


@router.get("/activity/{user_id}")
def get_activity(user_id: str):

    activity = []

    grievances = supabase.table("grievances") \
        .select("id, title") \
        .eq("user_id", user_id) \
        .execute()

    grievance_ids = [g["id"] for g in grievances.data] if grievances.data else []

    if grievance_ids:
        logs = supabase.table("status_logs") \
            .select("grievance_id, new_status, created_at") \
            .in_("grievance_id", grievance_ids) \
            .order("created_at", desc=True) \
            .execute()

        for l in logs.data:
            activity.append({
                "text": f"Grievance status changed to {l['new_status']}",
                "badge": l["new_status"],
                "variant": "info",
                "time": l["created_at"]
            })

    apps = supabase.table("applications") \
        .select("status, applied_at") \
        .eq("student_id", user_id) \
        .order("applied_at", desc=True) \
        .limit(5) \
        .execute()

    for a in apps.data:
        activity.append({
            "text": "Internship application update",
            "badge": a["status"],
            "variant": "success" if a["status"] == "ACCEPTED" else "warning",
            "time": a["applied_at"]
        })

    activity.sort(key=lambda x: x["time"], reverse=True)
    return activity[:5]