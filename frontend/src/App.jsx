import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { supabase } from "./lib/supbase";

// ---------- AUTH ----------
import Login from "./pages/auth/Login";

// ---------- STUDENT ----------
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentCourses from "./pages/student/StudentCourses";
import StudentCalendar from "./pages/student/StudentCalender";
import StudentAttendance from "./pages/student/StudentAttendance";
import StudentNotifications from "./pages/student/StudentNotification";
import StudentResources from "./pages/student/StudentResources";
import StudentGrievances from "./pages/student/StudentGrievances";
import Caravan from "./pages/Caravan";
import StudentOpportunities from "./pages/student/StudentOpportunities";
// ---------- FACULTY ----------
import FacultyDashboard from "./pages/faculty/FacultyDashboard";
import FacultyCourses from "./pages/faculty/FacultyCourses";
import FacultyAttendance from "./pages/faculty/FacultyAttendance";
import FacultyResources from "./pages/faculty/FacultyResources";
import FacultyAnnouncements from "./pages/faculty/FacultyAnnouncements";
import FacultyCalendar from "./pages/faculty/FacultyCalendar";
import FacultyGrade from "./pages/faculty/FacultyGrade";
import FacultyProfile from "./pages/faculty/FacultyProfile";
import FacultyStudents from "./pages/faculty/FacultyStudents";
import StudentAttendance from "./pages/student/StudentAttendance";

// ---------- AUTHORITY ----------
import AuthorityDashboard from "./pages/authority/AuthorityDashboard";
import AuthorityAnalytics from "./pages/authority/AuthorityAnalytics";
import AuthorityNotifications from "./pages/authority/AuthorityNotifications";
import AuthorityCourses from "./pages/authority/AuthorityCourses";
import AuthorityStudents from "./pages/authority/AuthorityStudents";

// ---------- ADMIN ----------
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminDashboardPart3 from "./pages/admin/AdminDashBoardPart3";
import AdminAcademics from "./pages/admin/AdminAcademics";
import AdminCourses from "./pages/admin/AdminCourses";
import AdminFaculty from "./pages/admin/AdminFaculty";
import AdminStudents from "./pages/admin/AdminStudents";
import AdminSemesters from "./pages/admin/AdminSemesters";
import UserManagement from "./pages/UserManagement";

// ---------- COMPONENT ----------
import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {

  // restore Supabase session
  useEffect(() => {
    const restore = async () => {
      const access = localStorage.getItem("access_token");
      const refresh = localStorage.getItem("refresh_token");

      if (access && refresh) {
        await supabase.auth.setSession({
          access_token: access,
          refresh_token: refresh,
        });
      }
    };

    restore();
  }, []);

  return (
    <Router>
      <Routes>

        {/* PUBLIC */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />


        {/* STUDENT */}

        <Route path="/student/dashboard" element={
          <ProtectedRoute allowedRoles={["STUDENT"]}>
            <StudentDashboard />
          </ProtectedRoute>
        }/>
        {/* STUDENT OPPORTUNITIES */}
        <Route 
        path="/student/opportunities" 
        element={
            <ProtectedRoute allowedRoles={["STUDENT"]}>
            <StudentOpportunities />
            </ProtectedRoute>
        } 
        />
        <Route path="/student/caravan" element={
          <ProtectedRoute allowedRoles={["STUDENT"]}>
            <Caravan />
          </ProtectedRoute>
        }/>

        <Route path="/student/courses" element={
          <ProtectedRoute allowedRoles={["STUDENT"]}>
            <StudentCourses />
          </ProtectedRoute>
        }/>

        <Route path="/student/calendar" element={
          <ProtectedRoute allowedRoles={["STUDENT"]}>
            <StudentCalendar />
          </ProtectedRoute>
        }/>

       
        <Route 
        path="/student/attendance" 
        element={
            <ProtectedRoute allowedRoles={["STUDENT"]}>
            <StudentAttendance />
            </ProtectedRoute>
        } 
        />

        <Route path="/student/notifications" element={
          <ProtectedRoute allowedRoles={["STUDENT"]}>
            <StudentNotifications />
          </ProtectedRoute>
        }/>

        <Route path="/student/resources" element={
          <ProtectedRoute allowedRoles={["STUDENT"]}>
            <StudentResources />
          </ProtectedRoute>
        }/>

        <Route path="/student/grievances" element={
          <ProtectedRoute allowedRoles={["STUDENT"]}>
            <StudentGrievances />
          </ProtectedRoute>
        }/>

        <Route path="/student/*" element={<Navigate to="/student/dashboard" replace />} />


        {/* FACULTY */}

        <Route path="/faculty/dashboard" element={
          <ProtectedRoute allowedRoles={["FACULTY"]}>
            <FacultyDashboard />
          </ProtectedRoute>
        }/>

        <Route path="/faculty/courses" element={<ProtectedRoute allowedRoles={["FACULTY"]}><FacultyCourses/></ProtectedRoute>} />
        <Route path="/faculty/attendance" element={<ProtectedRoute allowedRoles={["FACULTY"]}><FacultyAttendance/></ProtectedRoute>} />
        <Route path="/faculty/resources" element={<ProtectedRoute allowedRoles={["FACULTY"]}><FacultyResources/></ProtectedRoute>} />
        <Route path="/faculty/announcements" element={<ProtectedRoute allowedRoles={["FACULTY"]}><FacultyAnnouncements/></ProtectedRoute>} />
        <Route path="/faculty/calendar" element={<ProtectedRoute allowedRoles={["FACULTY"]}><FacultyCalendar/></ProtectedRoute>} />
        <Route path="/faculty/grade" element={<ProtectedRoute allowedRoles={["FACULTY"]}><FacultyGrade/></ProtectedRoute>} />
        <Route path="/faculty/profile" element={<ProtectedRoute allowedRoles={["FACULTY"]}><FacultyProfile/></ProtectedRoute>} />
        <Route path="/faculty/students" element={<ProtectedRoute allowedRoles={["FACULTY"]}><FacultyStudents/></ProtectedRoute>} />

        <Route path="/faculty/*" element={<Navigate to="/faculty/dashboard" replace />} />


        {/* AUTHORITY */}

        <Route path="/authority/dashboard" element={<ProtectedRoute allowedRoles={["AUTHORITY"]}><AuthorityDashboard/></ProtectedRoute>} />
        <Route path="/authority/courses" element={<ProtectedRoute allowedRoles={["AUTHORITY"]}><AuthorityCourses/></ProtectedRoute>} />
        <Route path="/authority/analytics" element={<ProtectedRoute allowedRoles={["AUTHORITY"]}><AuthorityAnalytics/></ProtectedRoute>} />
        <Route path="/authority/notifications" element={<ProtectedRoute allowedRoles={["AUTHORITY"]}><AuthorityNotifications/></ProtectedRoute>} />
        <Route path="/authority/students" element={<ProtectedRoute allowedRoles={["AUTHORITY"]}><AuthorityStudents/></ProtectedRoute>} />
        <Route path="/authority/*" element={<Navigate to="/authority/dashboard" replace />} />


        {/* ADMIN */}

        <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={["ADMIN"]}><AdminDashboard/></ProtectedRoute>} />
        <Route path="/admin/dashboardPart3" element={<ProtectedRoute allowedRoles={["ADMIN"]}><AdminDashboardPart3/></ProtectedRoute>} />
        <Route path="/admin/academics" element={<ProtectedRoute allowedRoles={["ADMIN"]}><AdminAcademics/></ProtectedRoute>} />
        <Route path="/admin/courses" element={<ProtectedRoute allowedRoles={["ADMIN"]}><AdminCourses/></ProtectedRoute>} />
        <Route path="/admin/faculty" element={<ProtectedRoute allowedRoles={["ADMIN"]}><AdminFaculty/></ProtectedRoute>} />
        <Route path="/admin/students" element={<ProtectedRoute allowedRoles={["ADMIN"]}><AdminStudents/></ProtectedRoute>} />
        <Route path="/admin/semesters" element={<ProtectedRoute allowedRoles={["ADMIN"]}><AdminSemesters/></ProtectedRoute>} />
        <Route path="/admin/users" element={<ProtectedRoute allowedRoles={["ADMIN"]}><UserManagement/></ProtectedRoute>} />

        <Route path="/admin/*" element={<Navigate to="/admin/dashboard" replace />} />


        {/* 404 */}
        <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>
    </Router>
  );
}

export default App;