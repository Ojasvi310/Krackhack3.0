from sqlalchemy import Column, String, Boolean, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime,timezone
import uuid

Base = declarative_base()

class Profile(Base):
    __tablename__ = "profiles"

    # id should match the Supabase Auth UUID
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    full_name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    role = Column(String, default="STUDENT") # STUDENT, FACULTY, AUTHORITY, ADMIN
    department = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Pillar I: Identification Columns
    roll_number = Column(String, unique=True, nullable=True) # For Students
    employee_id = Column(String, unique=True, nullable=True) # For Faculty
    is_active = Column(Boolean, default=False) # For Admin Approval system

    def __repr__(self):
        return f"<Profile(email={self.email}, role={self.role})>"
    
class Grievance(Base):
    __tablename__ = "grievances"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String, nullable=False)
    description = Column(String, nullable=False)
    location = Column(String)
    category = Column(String)
    status = Column(String, default="PENDING")
    priority = Column(String, default="MEDIUM")
    user_id = Column(UUID(as_uuid=True), ForeignKey("profiles.id"))
    assigned_to = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))
    target_service_dept_id = Column(UUID(as_uuid=True), nullable=True)