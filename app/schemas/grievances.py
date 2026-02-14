# app/schemas/grievance.py
from pydantic import BaseModel
from uuid import UUID
from typing import Optional

class GrievanceCreate(BaseModel):
    title: str
    description: str
    location: str
    category: str
    user_id: UUID
    # Notice: No priority or status here. Students cannot "see" these fields.

class ProgressUpdate(BaseModel):
    grievance_id: UUID
    new_status: str
    remarks: str
    actor_id: UUID
    priority: Optional[str] = None # Authorities CAN update this