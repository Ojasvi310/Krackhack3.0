import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const authorityApiInstance = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  }
});

authorityApiInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

class AuthorityAPI {
  // ==================== DASHBOARD ENDPOINTS ====================
  
  async getDashboardMetrics() {
    const res = await authorityApiInstance.get('/authority/dashboard/metrics');
    return res.data;
  }

  async getCourseOverview() {
    const res = await authorityApiInstance.get('/authority/dashboard/course-overview');
    return res.data;
  }

  async getUpcomingEvents() {
    const res = await authorityApiInstance.get('/authority/dashboard/upcoming-events');
    return res.data;
  }

  async getSystemAlerts() {
    const res = await authorityApiInstance.get('/authority/dashboard/alerts');
    return res.data;
  }

  async getRecentActivities() {
    const res = await authorityApiInstance.get('/authority/dashboard/recent-activities');
    return res.data;
  }

  async getAttendanceSummary() {
    const res = await authorityApiInstance.get('/authority/dashboard/attendance-summary');
    return res.data;
  }

  async getAuthorityProfile(userId) {
    if (!userId) throw new Error('User ID is required');
    const res = await authorityApiInstance.get(`/authority/profile?user_id=${userId}`);
    return res.data;
  }

  // ==================== GRIEVANCES ENDPOINTS ====================

  async getGrievancesByDept(deptId) {
    if (!deptId) throw new Error('Department ID is required');
    const res = await authorityApiInstance.get(`/list-by-dept/${deptId}`);
    return res.data;
  }

  async updateGrievanceProgress(payload) {
    const res = await authorityApiInstance.post('/update-progress', payload);
    return res.data;
  }

  // ==================== COURSES ENDPOINTS ====================

  async getCourses() {
    const res = await authorityApiInstance.get('/authority/courses');
    return res.data;
  }

  async createCourse(courseData) {
    const res = await authorityApiInstance.post('/authority/courses', courseData);
    return res.data;
  }

  async updateCourse(courseId, courseData) {
    const res = await authorityApiInstance.patch(`/authority/courses/${courseId}`, courseData);
    return res.data;
  }

  async deleteCourse(courseId) {
    const res = await authorityApiInstance.delete(`/authority/courses/${courseId}`);
    return res.data;
  }

  // ==================== STUDENTS ENDPOINTS ====================

  async getStudents(filters = {}) {
    const params = new URLSearchParams();
    if (filters.department && filters.department !== 'All Departments') params.append('department', filters.department);
    if (filters.semester) params.append('semester', filters.semester);
    if (filters.status && filters.status !== 'All Status') params.append('status', filters.status);
    
    const res = await authorityApiInstance.get(`/authority/students?${params.toString()}`);
    return res.data;
  }

  async getStudentDetails(studentId) {
    const res = await authorityApiInstance.get(`/authority/students/${studentId}`);
    return res.data;
  }

  // ==================== NOTIFICATIONS ENDPOINTS ====================

  async sendNotification(notificationData) {
    const res = await authorityApiInstance.post('/authority/notifications/send', notificationData);
    return res.data;
  }

  async getNotificationHistory() {
    const res = await authorityApiInstance.get('/authority/notifications/history');
    return res.data;
  }

  // ==================== UTILITY METHODS ====================

  async testConnection() {
    try {
      const res = await authorityApiInstance.get('/health');
      return res.data;
    } catch (error) {
      console.error('❌ Backend connection failed:', error);
      throw error;
    }
  }
}

// Singleton export
const AuthorityApi = new AuthorityAPI();
export default AuthorityApi;