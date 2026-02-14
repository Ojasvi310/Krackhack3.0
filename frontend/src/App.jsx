// // import { Routes, Route, Navigate } from "react-router-dom";
// // import { useAuth } from "./context/AuthContext";

// // import Login from "./pages/auth/Login";
// // import Signup from "./pages/auth/Signup";

// // import StudentDashboard from "./pages/student/StudentDashboard";
// // import FacultyDashboard from "./pages/faculty/FacultyDashboard";
// // import AuthorityDashboard from "./pages/authority/AuthorityDashboard";
// // import AdminDashboard from "./pages/admin/AdminDashboard";

// // const RoleRedirect = () => {
// //   const { role } = useAuth();

// //   if (role === "student") return <Navigate to="/student" />;
// //   if (role === "faculty") return <Navigate to="/faculty" />;
// //   if (role === "authority") return <Navigate to="/authority" />;
// //   if (role === "admin") return <Navigate to="/admin" />;

// //   return <Navigate to="/" />;
// // };

// // function App() {
// //   return (
// //     <Routes>
// //       <Route path="/" element={<Login />} />
// //       <Route path="/signup" element={<Signup />} />

// //       <Route path="/redirect" element={<RoleRedirect />} />

// //       <Route path="/student/*" element={<StudentDashboard />} />
// //       <Route path="/faculty/*" element={<FacultyDashboard />} />
// //       <Route path="/authority/*" element={<AuthorityDashboard />} />
// //       <Route path="/admin/*" element={<AdminDashboard />} />
// //     </Routes>
// //   );
// // }

// // export default App;
// // #frontend/src/App.jsx
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// // Pages
// import Login from './pages/auth/Login';
// import StudentDashboard from './pages/student/StudentDashboard';
// import FacultyDashboard from './pages/faculty/FacultyDashboard';
// import AuthorityDashboard from './pages/authority/AuthorityDashboard';
// import AdminDashboard from './pages/admin/AdminDashboard';

// // Components
// import ProtectedRoute from './components/auth/ProtectedRoute';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Public Routes */}
//         <Route path="/" element={<Navigate to="/login" replace />} />
//         <Route path="/login" element={<Login />} />

//         {/* Student Routes - Only accessible by STUDENT role */}
//         <Route
//           path="/student/*"
//           element={
//             <ProtectedRoute allowedRoles={['STUDENT']}>
//               <Routes>
//                 <Route path="dashboard" element={<StudentDashboard />} />
//                 {/* Add more student routes here */}
//                 <Route path="*" element={<Navigate to="/student/dashboard" replace />} />
//               </Routes>
//             </ProtectedRoute>
//           }
//         />

//         {/* Faculty Routes - Only accessible by FACULTY role */}
//         <Route
//           path="/faculty/*"
//           element={
//             <ProtectedRoute allowedRoles={['FACULTY']}>
//               <Routes>
//                 <Route path="dashboard" element={<FacultyDashboard />} />
//                 {/* Add more faculty routes here */}
//                 <Route path="*" element={<Navigate to="/faculty/dashboard" replace />} />
//               </Routes>
//             </ProtectedRoute>
//           }
//         />

//         {/* Authority Routes - Only accessible by AUTHORITY role */}
//         <Route
//           path="/authority/*"
//           element={
//             <ProtectedRoute allowedRoles={['AUTHORITY']}>
//               <Routes>
//                 <Route path="dashboard" element={<AuthorityDashboard />} />
//                 {/* Add more authority routes here */}
//                 <Route path="*" element={<Navigate to="/authority/dashboard" replace />} />
//               </Routes>
//             </ProtectedRoute>
//           }
//         />

//         {/* Admin Routes - Only accessible by ADMIN role */}
//         <Route
//           path="/admin/*"
//           element={
//             <ProtectedRoute allowedRoles={['ADMIN']}>
//               <Routes>
//                 <Route path="dashboard" element={<AdminDashboard />} />
//                 {/* Add more admin routes here */}
//                 <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
//               </Routes>
//             </ProtectedRoute>
//           }
//         />

//         {/* 404 - Redirect to login */}
//         <Route path="*" element={<Navigate to="/login" replace />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

// #frontend/src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Pages
import Login from './pages/auth/Login';
import StudentDashboard from './pages/student/StudentDashboard';
import FacultyDashboard from './pages/faculty/FacultyDashboard';
import AuthorityDashboard from './pages/authority/AuthorityDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';

// Components
import ProtectedRoute from './components/auth/ProtectedRoute';
// Admin Pages
import AdminAcademics from './pages/admin/AdminAcademics';
import AdminCourses from './pages/admin/AdminCourses';
import AdminFaculty from './pages/admin/AdminFaculty';
import AdminStudents from './pages/admin/AdminStudents';
import AdminSemesters from './pages/admin/AdminSemesters';
import AdminDashboardPart3 from './pages/admin/AdminDashBoardPart3';

function App() {
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
            <ProtectedRoute allowedRoles={['STUDENT', 'student']}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/*"
          element={
            <ProtectedRoute allowedRoles={['STUDENT', 'student']}>
              <Navigate to="/student/dashboard" replace />
            </ProtectedRoute>
          }
        />

        {/* Faculty Routes */}
        <Route
          path="/faculty/dashboard"
          element={
            <ProtectedRoute allowedRoles={['FACULTY', 'faculty']}>
              <FacultyDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/faculty/*"
          element={
            <ProtectedRoute allowedRoles={['FACULTY', 'faculty']}>
              <Navigate to="/faculty/dashboard" replace />
            </ProtectedRoute>
          }
        />

        {/* Authority Routes */}
        <Route
          path="/authority/dashboard"
          element={
            <ProtectedRoute allowedRoles={['AUTHORITY', 'authority']}>
              <AuthorityDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/authority/*"
          element={
            <ProtectedRoute allowedRoles={['AUTHORITY', 'authority']}>
              <Navigate to="/authority/dashboard" replace />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={['ADMIN', 'admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboardPart3"
          element={
            <ProtectedRoute allowedRoles={['ADMIN', 'admin']}>
              <AdminDashboardPart3 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/academics"
          element={
            <ProtectedRoute allowedRoles={['ADMIN', 'admin']}>
              <AdminAcademics />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/courses"
          element={
            <ProtectedRoute allowedRoles={['ADMIN', 'admin']}>
              <AdminCourses />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/faculty"
          element={
            <ProtectedRoute allowedRoles={['ADMIN', 'admin']}>
              <AdminFaculty />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/students"
          element={
            <ProtectedRoute allowedRoles={['ADMIN', 'admin']}>
              <AdminStudents />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/semesters"
          element={
            <ProtectedRoute allowedRoles={['ADMIN', 'admin']}>
              <AdminSemesters />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/*"
          element={
            <ProtectedRoute allowedRoles={['ADMIN', 'admin']}>
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