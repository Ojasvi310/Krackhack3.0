import axios from "axios";

// 1. Centralized configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

const authorityHttpClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

// 2. Add Request Interceptor to automatically add the token
authorityHttpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

class AuthorityAPI {
  // ==================== DASHBOARD ENDPOINTS ====================
  async getDashboardMetrics() {
    const res = await authorityHttpClient.get('/authority/dashboard/metrics');
    return res.data;
  }

  async getCourseOverview() {
    const res = await authorityHttpClient.get('/authority/dashboard/course-overview');
    return res.data;
  }

  async getUpcomingEvents() {
    const res = await authorityHttpClient.get('/authority/dashboard/upcoming-events');
    return res.data;
  }

  async getSystemAlerts() {
    const res = await authorityHttpClient.get('/authority/dashboard/alerts');
    return res.data;
  }

  async getRecentActivities() {
    const res = await authorityHttpClient.get('/authority/dashboard/recent-activities');
    return res.data;
  }

  async getAuthorityProfile(userId) {
    if (!userId) throw new Error('User ID is required');
    const res = await authorityHttpClient.get(`/authority/profile?user_id=${userId}`);
    return res.data;
  }

  // ==================== GRIEVANCES ENDPOINTS ====================
  async getGrievancesByDept(deptId) {
    if (!deptId) throw new Error('Department ID is required');
    // Note: Adjusted path to match your backend's grievance_router prefix logic
    const res = await authorityHttpClient.get(`/grievances/list-by-dept/${deptId}`);
    return res.data;
  }

  // ==================== COURSES ENDPOINTS ====================
  async getCourses() {
    const res = await authorityHttpClient.get('/authority/courses');
    return res.data;
  }

  async createCourse(courseData) {
    const res = await authorityHttpClient.post('/authority/courses', courseData);
    return res.data;
  }

  // ==================== STUDENTS ENDPOINTS ====================
  async getStudents(filters = {}) {
    const params = new URLSearchParams();
    if (filters.department && filters.department !== 'All Departments') params.append('department', filters.department);
    if (filters.semester) params.append('semester', filters.semester);
    if (filters.status && filters.status !== 'All Status') params.append('status', filters.status);
    
    const res = await authorityHttpClient.get(`/authority/students?${params.toString()}`);
    return res.data;
  }

  async getStudentDetails(studentId) {
    const res = await authorityHttpClient.get(`/authority/students/${studentId}`);
    return res.data;
  }
}

const AuthorityApi = new AuthorityAPI();
export default AuthorityApi;