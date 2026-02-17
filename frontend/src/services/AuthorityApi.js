<<<<<<< HEAD
// // src/services/AuthorityApi.js
// import axios from "axios";
// import api from "../api/config";
// // 1. Centralized configuration
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

// const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   }
// });

// // 2. Add Request Interceptor to automatically add the token
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('access_token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// }, (error) => Promise.reject(error));

// class AuthorityAPI {
//   // All endpoints now use 'api.get' or 'api.post' which automatically
//   // starts with your Vercel VITE_API_BASE_URL (e.g., ...onrender.com/api)

//   // ==================== DASHBOARD ENDPOINTS ====================
//   async getDashboardMetrics() {
//     const res = await api.get('/authority/dashboard/metrics');
//     return res.data;
//   }

//   async getCourseOverview() {
//     const res = await api.get('/authority/dashboard/course-overview');
//     return res.data;
//   }

//   async getUpcomingEvents() {
//     const res = await api.get('/authority/dashboard/upcoming-events');
//     return res.data;
//   }

//   async getSystemAlerts() {
//     const res = await api.get('/authority/dashboard/alerts');
//     return res.data;
//   }

//   async getRecentActivities() {
//     const res = await api.get('/authority/dashboard/recent-activities');
//     return res.data;
//   }

//   async getAuthorityProfile(userId) {
//     if (!userId) throw new Error('User ID is required');
//     const res = await api.get(`/authority/profile?user_id=${userId}`);
//     return res.data;
//   }

//   // ==================== COURSES ENDPOINTS ====================
//   async getCourses() {
//     const res = await api.get('/authority/courses');
//     return res.data;
//   }

//   async createCourse(courseData) {
//     const res = await api.post('/authority/courses', courseData);
//     return res.data;
//   }

//   // ==================== STUDENTS ENDPOINTS ====================
//   async getStudents(filters = {}) {
//     const params = new URLSearchParams();
//     if (filters.department && filters.department !== 'All Departments') params.append('department', filters.department);
//     if (filters.semester) params.append('semester', filters.semester);
//     if (filters.status && filters.status !== 'All Status') params.append('status', filters.status);

//     const res = await api.get(`/authority/students?${params.toString()}`);
//     return res.data;
//   }

//   async getStudentDetails(studentId) {
//     const res = await api.get(`/authority/students/${studentId}`);
//     return res.data;
//   }
// }

// const AuthorityApi = new AuthorityAPI();
// export default AuthorityApi;
import axios from "axios";

// 1. Centralized configuration
// This instance is local to this file, so it won't conflict with others.
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

const authorityApiInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 2. Add Request Interceptor to automatically add the token
authorityApiInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);
=======
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const API_PREFIX = import.meta.env.REACT_APP_API_PREFIX || '/api';
import axios from "axios";
// from fastapi import APIRouter, HTTPException
// from app.services.supabase_client import supabase
const BASE_URL = "http://localhost:8000/api/authority";
>>>>>>> 1a03c6b238029c1fbb2b572a582f54594db35088

class AuthorityAPI {
  constructor() {
    this.baseURL = `${API_BASE_URL}/api/authority`;
  }

  // Helper method for making requests
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    try {
      const token = localStorage.getItem('access_token');
      const headers = {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers,
      };

      console.log(`🔵 API Request: ${url}`);

      const response = await fetch(url, {
        ...options,
        headers,
      });

      console.log(`📊 Response Status: ${response.status}`);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(`✅ API Success:`, data);
      return data;

    } catch (error) {
      console.error(`❌ API request failed: ${url}`, error);
      throw error;
    }
  }

  // ==================== DASHBOARD ENDPOINTS ====================
  
  async getDashboardMetrics() {
<<<<<<< HEAD
    const res = await authorityApiInstance.get("/authority/dashboard/metrics");
    return res.data;
  }

  async getCourseOverview() {
    const res = await authorityApiInstance.get(
      "/authority/dashboard/course-overview",
    );
    return res.data;
  }

  async getUpcomingEvents() {
    const res = await authorityApiInstance.get(
      "/authority/dashboard/upcoming-events",
    );
    return res.data;
  }

  async getSystemAlerts() {
    const res = await authorityApiInstance.get("/authority/dashboard/alerts");
    return res.data;
  }

  async getRecentActivities() {
    const res = await authorityApiInstance.get(
      "/authority/dashboard/recent-activities",
    );
    return res.data;
  }

  async getAuthorityProfile(userId) {
    if (!userId) throw new Error("User ID is required");
    const res = await authorityApiInstance.get(
      `/authority/profile?user_id=${userId}`,
    );
    return res.data;
  }

  // ==================== GRIEVANCES ENDPOINTS ====================
  async getGrievancesByDept(deptId) {
    if (!deptId) throw new Error("Department ID is required");
    const res = await authorityApiInstance.get(`/list-by-dept/${deptId}`);
    return res.data;
  }

  // ==================== COURSES ENDPOINTS ====================
  async getCourses() {
    const res = await authorityApiInstance.get("/authority/courses");
    return res.data;
  }

  async createCourse(courseData) {
    const res = await authorityApiInstance.post(
      "/authority/courses",
      courseData,
    );
    return res.data;
  }
=======
    return this.request('/dashboard/metrics');
  }

  async getCourseOverview() {
    return this.request('/dashboard/course-overview');
  }

  async getUpcomingEvents() {
    return this.request('/dashboard/upcoming-events');
  }

  async getSystemAlerts() {
    return this.request('/dashboard/alerts');
  }

  async getRecentActivities() {
    return this.request('/dashboard/recent-activities');
  }

  async getAttendanceSummary() {
    return this.request('/dashboard/attendance-summary');
  }

  async getAuthorityProfile(userId) {
    if (!userId) {
      throw new Error('User ID is required');
    }
    return this.request(`/profile?user_id=${userId}`);
  }

  // ==================== COURSES ENDPOINTS ====================

 // ==================== COURSES ENDPOINTS ====================

async getCourses() {
  const res = await axios.get(`${BASE_URL}/courses`);
  return res.data;
}

async createCourse(courseData) {
  return this.request('/courses', {
    method: 'POST',
    body: JSON.stringify(courseData),
  });
}

async updateCourse(courseId, courseData) {
  return this.request(`/courses/${courseId}`, {
    method: 'PATCH',
    body: JSON.stringify(courseData),
  });
}

async deleteCourse(courseId) {
  return this.request(`/courses/${courseId}`, {
    method: 'DELETE',
  });
}
>>>>>>> 1a03c6b238029c1fbb2b572a582f54594db35088

  // ==================== STUDENTS ENDPOINTS ====================

  async getStudents(filters = {}) {
    const params = new URLSearchParams();
<<<<<<< HEAD
    if (filters.department && filters.department !== "All Departments")
      params.append("department", filters.department);
    if (filters.semester) params.append("semester", filters.semester);
    if (filters.status && filters.status !== "All Status")
      params.append("status", filters.status);

    const res = await authorityApiInstance.get(
      `/authority/students?${params.toString()}`,
    );
    return res.data;
  }

  async getStudentDetails(studentId) {
    const res = await authorityApiInstance.get(
      `/authority/students/${studentId}`,
    );
    return res.data;
=======
    
    if (filters.department && filters.department !== 'All Departments') {
      params.append('department', filters.department);
    }
    if (filters.semester) {
      params.append('semester', filters.semester);
    }
    if (filters.status && filters.status !== 'All Status') {
      params.append('status', filters.status);
    }
    
    const queryString = params.toString();
    return this.request(`/students${queryString ? '?' + queryString : ''}`);
  }

  async getStudentDetails(studentId) {
    return this.request(`/students/${studentId}`);
  }

  async sendStudentNotification(studentId, message) {
    return this.request(`/students/${studentId}/notify`, {
      method: 'POST',
      body: JSON.stringify({ message }),
    });
  }

  async resetStudentPassword(studentId) {
    return this.request(`/students/${studentId}/reset-password`, {
      method: 'POST',
    });
  }

  // ==================== NOTIFICATIONS ENDPOINTS ====================

  async sendNotification(notificationData) {
    return this.request('/notifications/send', {
      method: 'POST',
      body: JSON.stringify(notificationData),
    });
  }

  async getNotificationHistory() {
    return this.request('/notifications/history');
  }

  async getNotificationTemplates() {
    // For now, return predefined templates
    // You can make this a backend endpoint later
    return [
      {
        id: 1,
        name: "Assignment Reminder",
        subject: "Assignment Submission Reminder",
        content: "This is a reminder that your assignment for {COURSE_NAME} is due on {DUE_DATE}. Please submit before the deadline.",
        category: "Assignment"
      },
      {
        id: 2,
        name: "Exam Notification",
        subject: "Upcoming Exam - {COURSE_NAME}",
        content: "This is to inform you that the exam for {COURSE_NAME} is scheduled on {EXAM_DATE} at {EXAM_TIME}. Venue: {VENUE}. Please prepare accordingly.",
        category: "Exam"
      },
      {
        id: 3,
        name: "Low Attendance Warning",
        subject: "Attendance Warning",
        content: "Dear Student, your attendance in {COURSE_NAME} is currently {ATTENDANCE}%, which is below the required 75%. Please improve your attendance.",
        category: "Attendance"
      },
      {
        id: 4,
        name: "General Announcement",
        subject: "Important Announcement",
        content: "This is an important announcement regarding {TOPIC}. {DETAILS}",
        category: "General"
      },
    ];
  }

  // ==================== ANALYTICS ENDPOINTS ====================

//   async getAnalyticsOverview() {
//     return this.request('/analytics/overview');
//   }

//   async getCoursePerformance() {
//     return this.request('/analytics/course-performance');
//   }

  async getStudentPerformance() {
    // Return mock data for now - implement backend endpoint later
    return {
      highPerformers: Math.floor(342 * 0.35),
      averagePerformers: Math.floor(342 * 0.50),
      atRisk: Math.floor(342 * 0.15),
    };
  }

  async getGradeDistribution() {
    // Return mock data for now - implement backend endpoint later
    return [
      { grade: "A+", count: 45, percentage: 13.2 },
      { grade: "A", count: 68, percentage: 19.9 },
      { grade: "B+", count: 82, percentage: 24.0 },
      { grade: "B", count: 71, percentage: 20.8 },
      { grade: "C+", count: 45, percentage: 13.2 },
      { grade: "C", count: 21, percentage: 6.1 },
      { grade: "F", count: 10, percentage: 2.9 },
    ];
  }

  async getResourceUsage() {
    // Return mock data for now - implement backend endpoint later
    return [
      { type: "Lecture Notes", count: 156, downloads: 4523 },
      { type: "Presentations", count: 89, downloads: 3201 },
      { type: "PYQs", count: 45, downloads: 5678 },
      { type: "Assignments", count: 67, downloads: 2891 },
      { type: "Reference Materials", count: 34, downloads: 1456 },
    ];
  }

  async downloadReport(reportType) {
    // Implement report download
    console.log(`Downloading ${reportType} report...`);
    // For now, just return success
    return { status: 'success', message: 'Report download started' };
  }

  // ==================== UTILITY METHODS ====================

  async testConnection() {
    try {
      console.log(`Testing connection to: ${this.baseURL}`);
      const response = await fetch(`${API_BASE_URL}/health`);
      const data = await response.json();
      console.log('✅ Backend connection successful:', data);
      return data;
    } catch (error) {
      console.error('❌ Backend connection failed:', error);
      throw error;
    }
  }

  async exportData(type, format = 'csv') {
    console.log(`Exporting ${type} as ${format}...`);
    // Implement actual export logic
    return { status: 'success' };
>>>>>>> 1a03c6b238029c1fbb2b572a582f54594db35088
  }
}

// Create and export singleton instance
const AuthorityApi = new AuthorityAPI();
export default AuthorityApi;
