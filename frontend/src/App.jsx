import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect } from "react";
import { supabase } from "./lib/supbase";
// Pages
import Caravan from "./pages/Caravan";
import UserManagement from "./pages/UserManagement";
import Login from "./pages/auth/Login";
import StudentDashboard from "./pages/student/StudentDashboard";
import AuthorityDashboard from "./pages/authority/AuthorityDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
// Components
import ProtectedRoute from "./components/auth/ProtectedRoute";
// Admin Pages
import AdminAcademics from "./pages/admin/AdminAcademics";
import Academics from "./pages/Academics";
import AdminCourses from "./pages/admin/AdminCourses";
import AdminFaculty from "./pages/admin/AdminFaculty";
import AdminStudents from "./pages/admin/AdminStudents";
import AdminSemesters from "./pages/admin/AdminSemesters";
import AdminDashboardPart3 from "./pages/admin/AdminDashBoardPart3";
import StudentCourses from "./pages/student/StudentCourses";
import StudentCalendar from "./pages/student/StudentCalender";
import StudentAttendance from "./pages/student/StudentAttendance";
import StudentNotifications from "./pages/student/StudentNotification";
import StudentResources from "./pages/student/StudentResources.jsx";
import StudentGrievances from "./pages/student/StudentGrievances";
import FacultyDashboard from "./pages/faculty/FacultyDashboard";
import FacultyCourses from "./pages/faculty/FacultyCourses";
import FacultyAttendance from "./pages/faculty/FacultyAttendance";
import FacultyResources from "./pages/faculty/FacultyResources";
import FacultyAnnouncements from "./pages/faculty/FacultyAnnouncements";
import FacultyCalendar from "./pages/faculty/FacultyCalendar";
import FacultyGrade from "./pages/faculty/FacultyGrade";
import FacultyProfile from "./pages/faculty/FacultyProfile";
import FacultyStudents from "./pages/faculty/FacultyStudents";
import AuthorityAnalytics from "./pages/authority/AuthorityAnalytics.jsx";
import AuthorityNotifications from "./pages/authority/AuthorityNotifications.jsx";
import AuthorityCourses from "./pages/authority/AuthorityCourses.jsx";
import AuthorityStudents from "./pages/authority/AuthorityStudents.jsx";

function App() {
  useEffect(() => {
    const restoreSession = async () => {
      const accessToken = localStorage.getItem("access_token");
      const refreshToken = localStorage.getItem("refresh_token");

      if (accessToken && refreshToken) {
        const { error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });

        if (error) {
          console.error("Session recovery failed:", error.message);
          // Optional: clear storage if session is invalid
          // localStorage.clear();
        } else {
          console.log("Supabase session restored successfully");
        }
      }
    };

    restoreSession();
  }, []);
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />

        {/* Student Routes */}
        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute allowedRoles={["STUDENT", "student"]}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        {/* ✅ CARAVAN ROUTE (MUST BE ABOVE /student/* ) */}
        <Route
          path="/student/caravan"
          element={
            <ProtectedRoute allowedRoles={["STUDENT", "student"]}>
              <Caravan />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/courses"
          element={
            <ProtectedRoute allowedRoles={["STUDENT", "student"]}>
              <StudentCourses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/calendar"
          element={
            <ProtectedRoute allowedRoles={["STUDENT", "student"]}>
              <StudentCalendar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/attendance"
          element={
            <ProtectedRoute allowedRoles={["STUDENT", "student"]}>
              <StudentAttendance />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/notifications"
          element={
            <ProtectedRoute allowedRoles={["STUDENT", "student"]}>
              <StudentNotifications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/resources"
          element={
            <ProtectedRoute allowedRoles={["STUDENT", "student"]}>
              <StudentResources />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/grievances"
          element={
            <ProtectedRoute allowedRoles={["STUDENT", "student"]}>
              <StudentGrievances />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/*"
          element={
            <ProtectedRoute allowedRoles={["STUDENT", "student"]}>
              <Navigate to="/student/dashboard" replace />
            </ProtectedRoute>
          }
        />

        {/* Faculty Routes */}

        <Route
          path="/faculty/dashboard"
          element={
            <ProtectedRoute allowedRoles={["FACULTY"]}>
              <FacultyDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/faculty/courses"
          element={
            <ProtectedRoute allowedRoles={["FACULTY"]}>
              <FacultyCourses />
            </ProtectedRoute>
          }
        />

        <Route
          path="/faculty/attendance"
          element={
            <ProtectedRoute allowedRoles={["FACULTY"]}>
              <FacultyAttendance />
            </ProtectedRoute>
          }
        />

        <Route
          path="/faculty/resources"
          element={
            <ProtectedRoute allowedRoles={["FACULTY"]}>
              <FacultyResources />
            </ProtectedRoute>
          }
        />

        <Route
          path="/faculty/announcements"
          element={
            <ProtectedRoute allowedRoles={["FACULTY"]}>
              <FacultyAnnouncements />
            </ProtectedRoute>
          }
        />

        <Route
          path="/faculty/calendar"
          element={
            <ProtectedRoute allowedRoles={["FACULTY"]}>
              <FacultyCalendar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/faculty/grade"
          element={
            <ProtectedRoute allowedRoles={["FACULTY"]}>
              <FacultyGrade />
            </ProtectedRoute>
          }
        />

        <Route
          path="/faculty/profile"
          element={
            <ProtectedRoute allowedRoles={["FACULTY"]}>
              <FacultyProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/faculty/students"
          element={
            <ProtectedRoute allowedRoles={["FACULTY"]}>
              <FacultyStudents />
            </ProtectedRoute>
          }
        />
        <Route
          path="/faculty/*"
          element={
            <ProtectedRoute allowedRoles={["FACULTY"]}>
              <Navigate to="/faculty/dashboard" replace />
            </ProtectedRoute>
          }
        />

        {/* Faculty Routes */}
        <Route
          path="/faculty/dashboard"
          element={
            <ProtectedRoute allowedRoles={["FACULTY", "faculty"]}>
              <FacultyDashboard />
            </ProtectedRoute>
          }
        />
        {/* Faculty Routes */}
        <Route
          path="/Academics"
          element={
            <ProtectedRoute allowedRoles={["STUDENT", "student"]}>
              <FacultyDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/faculty/*"
          element={
            <ProtectedRoute allowedRoles={["FACULTY", "faculty"]}>
              <Navigate to="/faculty/dashboard" replace />
            </ProtectedRoute>
          }
        />

        {/* Authority Routes */}
        <Route
          path="/authority/dashboard"
          element={
            <ProtectedRoute allowedRoles={["AUTHORITY", "authority"]}>
              <AuthorityDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/authority/Courses"
          element={
            <ProtectedRoute allowedRoles={["AUTHORITY", "authority"]}>
              <AuthorityCourses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/authority/Analytics"
          element={
            <ProtectedRoute allowedRoles={["AUTHORITY", "authority"]}>
              <AuthorityAnalytics />
            </ProtectedRoute>
          }
        />
        <Route
          path="/authority/Notifications"
          element={
            <ProtectedRoute allowedRoles={["AUTHORITY", "authority"]}>
              <AuthorityNotifications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/authority/Students"
          element={
            <ProtectedRoute allowedRoles={["AUTHORITY", "authority"]}>
              <AuthorityStudents />
            </ProtectedRoute>
          }
        />
        <Route
          path="/authority/*"
          element={
            <ProtectedRoute allowedRoles={["AUTHORITY", "authority"]}>
              <Navigate to="/authority/dashboard" replace />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/dashboardPart3"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "admin"]}>
              <AdminDashboardPart3 />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/academics"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "admin"]}>
              <AdminAcademics />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/courses"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "admin"]}>
              <AdminCourses />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/faculty"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "admin"]}>
              <AdminFaculty />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/students"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "admin"]}>
              <AdminStudents />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/semesters"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "admin"]}>
              <AdminSemesters />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "admin"]}>
              <UserManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "admin"]}>
              <Navigate to="/admin/dashboard" replace />
            </ProtectedRoute>
          }
        />

        {/* 404 - Redirect to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
