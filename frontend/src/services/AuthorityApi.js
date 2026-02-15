// // src/services/authorityApi.js


// class AuthorityAPI {
//   constructor() {
//     this.baseURL = `${API_BASE_URL}/authority`;
//   }

//   // Helper method for making requests
//   async request(endpoint, options = {}) {
//     try {
//       const token = localStorage.getItem('access_token');
//       const headers = {
//         'Content-Type': 'application/json',
//         ...(token && { 'Authorization': `Bearer ${token}` }),
//         ...options.headers,
//       };

//       const response = await fetch(`${this.baseURL}${endpoint}`, {
//         ...options,
//         headers,
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       return await response.json();
//     } catch (error) {
//       console.error(`API request failed: ${endpoint}`, error);
//       throw error;
//     }
//   }

//   // Dashboard endpoints
//   async getDashboardMetrics() {
//     return this.request('/dashboard/metrics');
//   }

//   async getCourseOverview() {
//     return this.request('/dashboard/course-overview');
//   }

//   async getUpcomingEvents() {
//     return this.request('/dashboard/upcoming-events');
//   }

//   async getSystemAlerts() {
//     return this.request('/dashboard/alerts');
//   }

//   async getRecentActivities() {
//     return this.request('/dashboard/recent-activities');
//   }

//   async getAttendanceSummary() {
//     return this.request('/dashboard/attendance-summary');
//   }

//   async getAuthorityProfile(userId) {
//     return this.request(`/profile?user_id=${userId}`);
//   }
// }

// export const AuthorityApi = new AuthorityAPI();
// export default AuthorityApi;

// class AuthorityAPI {
//   constructor() {
//     // Adjust this based on your backend configuration
//     // If your settings.API_PREFIX is "/api", then:
//     this.baseURL = `${API_BASE_URL}${API_PREFIX}/authority`;
    
//     // If you don't use /api prefix, use:
//     // this.baseURL = `${API_BASE_URL}/authority`;
//   }

//   // Helper method for making requests with better error handling
//   async request(endpoint, options = {}) {
//     const url = `${this.baseURL}${endpoint}`;
    
//     try {
//       const token = localStorage.getItem('access_token');
//       const headers = {
//         'Content-Type': 'application/json',
//         ...(token && { 'Authorization': `Bearer ${token}` }),
//         ...options.headers,
//       };

//       console.log(`🔵 API Request: ${url}`); // Debug log

//       const response = await fetch(url, {
//         ...options,
//         headers,
//       });

//       console.log(`📊 Response Status: ${response.status}`); // Debug log

//       if (!response.ok) {
//         const errorData = await response.json().catch(() => ({}));
//         throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       console.log(`✅ API Success: ${endpoint}`, data); // Debug log
//       return data;

//     } catch (error) {
//       console.error(`❌ API request failed: ${url}`, error);
//       throw error;
//     }
//   }

//   // Dashboard endpoints
//   async getDashboardMetrics() {
//     return this.request('/dashboard/metrics');
//   }

//   async getCourseOverview() {
//     return this.request('/dashboard/course-overview');
//   }

//   async getUpcomingEvents() {
//     return this.request('/dashboard/upcoming-events');
//   }

//   async getSystemAlerts() {
//     return this.request('/dashboard/alerts');
//   }

//   async getRecentActivities() {
//     return this.request('/dashboard/recent-activities');
//   }

//   async getAttendanceSummary() {
//     return this.request('/dashboard/attendance-summary');
//   }

//   async getAuthorityProfile(userId) {
//     if (!userId) {
//       throw new Error('User ID is required');
//     }
//     return this.request(`/profile?user_id=${userId}`);
//   }

//   // Test connection method
//   async testConnection() {
//     try {
//       console.log(`Testing connection to: ${this.baseURL}`);
//       const response = await fetch(`${API_BASE_URL}/health`);
//       const data = await response.json();
//       console.log('✅ Backend connection successful:', data);
//       return data;
//     } catch (error) {
//       console.error('❌ Backend connection failed:', error);
//       throw error;
//     }
//   }
// }

// export const authorityApi = new AuthorityAPI();
// export default authorityApi;

// src/services/AuthorityApi.js
// Complete API service for all Authority pages
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const API_PREFIX = import.meta.env.REACT_APP_API_PREFIX || '/api';
import axios from "axios";

// const BASE_URL = "http://localhost:8000/api/authority";
const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/authority`;

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

  // ==================== STUDENTS ENDPOINTS ====================

  async getStudents(filters = {}) {
    const params = new URLSearchParams();
    
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
  }
}

// Create and export singleton instance
const AuthorityApi = new AuthorityAPI();
export default AuthorityApi;