# THE PULSE PROTOCOL  
### Academic Governance & Student Management System

# Overview

**The PULSE Protocol** is a full-stack academic governance platform designed to centralize student management, grievance handling, academic tracking, and opportunity management into one unified system.

The platform provides secure, role-based access for:

- Students  
- Faculty
- Authorities 
- Admin  

The system is built using:

- FastAPI (Backend)
- React + Vite (Frontend)
- Supabase (Database and Realtime)

---

# Core System Pillars

## Pillar I: Identity & Governance

Handles authentication, authorization, and role management.

**Features:**

- Secure login/signup
- JWT authentication
- Role-based access control
- Department-based authority access
- Secure API protection

---

## Pillar II: Voice (Grievance Management)

Allows students to submit grievances and authorities to manage them.

**Features:**

- Grievance submission
- Department-based routing
- Authority grievance dashboard
- Real-time grievance updates (Supabase Realtime)
- Status tracking

---

## Pillar III: Fate (Academic Mastery)

Centralized academic management system.

**Features:**

- Course management
- Course listing and tracking
- Academic dashboard
- Credit monitoring
- Enrollment tracking

---

## Pillar IV: Opportunity (Internships & Tasks)

Tracks student opportunities and assignments.

**Features:**

- Internship tracking
- Task assignment
- Authority monitoring
- Opportunity management

---
## Pillar V: The Commons (Life & Trade)
- Ride-sharing for students  
- Campus freelancing marketplace  
- Lost & Found with image listings  

## Pillar VI: Connection (Community & Safety)
- Student discussion forum  
- Interactive campus navigation  
- Emergency SOS alert system  

## Pillar VII: The Spirit (Clubs & Announcements)
- Club and event management  
- University-wide announcements system  


# Tech Stack

## Frontend

- React.js
- Vite
- Tailwind CSS
- Axios / Fetch API

## Backend

- FastAPI
- Pydantic
- SQLAlchemy
- Supabase Python Client
- JWT Authentication

## Database

- Supabase (PostgreSQL)
- Supabase Realtime

---

# Project Structure

```
Krackhack_WebD/
│
├── app/
│    ├── routes/
│    ├── schemas/
│    ├── services/
│    │   └── supabase_client.py
│    └── main.py
|── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── lib/
│   │   │   └── supbase.js
│   │   └── App.jsx
│   │
│   └── package.json
│
└── README.md
```

---

# Installation Guide

## Clone the repository

```
git clone <repository_url>
cd Krackhack_WebD
```

---

# Backend Setup

```
cd backend
python -m venv venv
venv\Scripts\activate

pip install -r requirements.txt
```

Run backend:

```
uvicorn app.main:app --reload
```

Backend runs on:

```
http://localhost:8000
```

API docs:

```
http://localhost:8000/docs
```

---

# Frontend Setup

```
cd frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

# Environment Variables

## Backend `.env`

```
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
SECRET_KEY=your_secret_key
API_PREFIX=/api
```

## Frontend `.env`

```
VITE_API_URL=http://localhost:8000
```

---

# API Endpoints

## Authority

```
GET /api/authority/courses
GET /api/admin/users/authority-dept/{user_id}
```

## Student

```
GET /api/student/courses
GET /api/student/opportunities
```

## Grievances

```
POST /api/grievances
GET /api/grievances
```

---

# Backend Requirements

Install `requirements.txt`


# Database Tables (Supabase)

```
profiles
courses
enrollments
grievances
opportunities
applications
attendance
audit_logs
service_depts
status_logs
system_metrices
tasks
```

---

# Key Features

Authentication
- JWT based authentication
- Role-based authorization


