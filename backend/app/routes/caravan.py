from fastapi import APIRouter
from pydantic import BaseModel
from datetime import datetime
from app.core.config import settings
from supabase import create_client

router = APIRouter(prefix="/caravan", tags=["caravan"])

supabase = create_client(settings.SUPABASE_URL, settings.SUPABASE_SERVICE_ROLE_KEY)


class RideCreate(BaseModel):
    driver_id: str
    from_location: str
    to_location: str
    departure_time: datetime
    total_seats: int


@router.get("/rides")
def get_rides():

    rides = supabase.table("rides") \
        .select("*, profiles(full_name)") \
        .order("departure_time") \
        .execute()

    return rides.data


# @router.post("/post")
# def post_ride(data: RideCreate):

#     ride = supabase.table("rides").insert({
#         "driver_id": data.driver_id,
#         "from_location": data.from_location,
#         "to_location": data.to_location,
#         "departure_time": data.departure_time,
#         "total_seats": data.total_seats,
#         "seats_left": data.total_seats
#     }).execute()

#     return {"status": "success", "ride": ride.data}
@router.post("/post")
def post_ride(data: RideCreate):

    ride = supabase.table("rides").insert({
        "driver_id": data.driver_id,
        "from_location": data.from_location,
        "to_location": data.to_location,
        "departure_time": data.departure_time.isoformat(),
        "total_seats": data.total_seats,
        "seats_left": data.total_seats
    }).execute()

    return {"status": "success", "ride": ride.data}

@router.post("/request/{ride_id}/{student_id}")
def request_seat(ride_id: str, student_id: str):

    supabase.table("ride_requests").insert({
        "ride_id": ride_id,
        "student_id": student_id
    }).execute()

    return {"status": "requested"}