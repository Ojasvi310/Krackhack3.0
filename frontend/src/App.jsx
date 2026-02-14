
// // // import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";



// // // // Pages
// // // import Login from './pages/auth/Login';
// // // import StudentDashboard from './pages/student/StudentDashboard';
// // // import FacultyDashboard from './pages/faculty/FacultyDashboard';
// // // import AuthorityDashboard from './pages/authority/AuthorityDashboard';
// // // import AdminDashboard from './pages/admin/AdminDashboard';

// // // // Components
// // // import ProtectedRoute from './components/auth/ProtectedRoute';

// // // function App() {
// // //   return (
// // //     <Router>
// // //       <Routes>

// // //         {/* ---------- PUBLIC ---------- */}
// // //         <Route path="/" element={<Navigate to="/login" replace />} />
// // //         <Route path="/login" element={<Login />} />


// // //         {/* ---------- STUDENT ---------- */}

// // //         <Route
// // //           path="/student/dashboard"
// // //           element={
// // //             <ProtectedRoute allowedRoles={["STUDENT","student"]}>
// // //               <StudentDashboard />
// // //             </ProtectedRoute>
// // //           }
// // //         />

// // //         {/* ✅ CARAVAN ROUTE (MUST BE ABOVE /student/* ) */}
// // //         <Route
// // //           path="/student/caravan"
// // //           element={
// // //             <ProtectedRoute allowedRoles={["STUDENT","student"]}>
// // //               <Caravan />
// // //             </ProtectedRoute>
// // //           }
// // //         />

// // //         {/* fallback student redirect */}
// // //         <Route
// // //           path="/student/*"
// // //           element={
// // //             <ProtectedRoute allowedRoles={["STUDENT","student"]}>
// // //               <Navigate to="/student/dashboard" replace />
// // //             </ProtectedRoute>
// // //           }
// // //         />


// // //         {/* ---------- FACULTY ---------- */}

// // //         <Route
// // //           path="/faculty/dashboard"
// // //           element={
// // //             <ProtectedRoute allowedRoles={["FACULTY","faculty"]}>
// // //               <FacultyDashboard />
// // //             </ProtectedRoute>
// // //           }
// // //         />

// // //         <Route
// // //           path="/faculty/*"
// // //           element={
// // //             <ProtectedRoute allowedRoles={["FACULTY","faculty"]}>
// // //               <Navigate to="/faculty/dashboard" replace />
// // //             </ProtectedRoute>
// // //           }
// // //         />


// // //         {/* ---------- AUTHORITY ---------- */}

// // //         <Route
// // //           path="/authority/dashboard"
// // //           element={
// // //             <ProtectedRoute allowedRoles={["AUTHORITY","authority"]}>
// // //               <AuthorityDashboard />
// // //             </ProtectedRoute>
// // //           }
// // //         />

// // //         <Route
// // //           path="/authority/*"
// // //           element={
// // //             <ProtectedRoute allowedRoles={["AUTHORITY","authority"]}>
// // //               <Navigate to="/authority/dashboard" replace />
// // //             </ProtectedRoute>
// // //           }
// // //         />


// // //         {/* ---------- ADMIN ---------- */}

// // //         <Route
// // //           path="/admin/dashboard"
// // //           element={
// // //             <ProtectedRoute allowedRoles={["ADMIN","admin"]}>
// // //               <AdminDashboard />
// // //             </ProtectedRoute>
// // //           }
// // //         />
// // //         <Route
// // //           path="/admin/*"
// // //           element={
// // //             <ProtectedRoute allowedRoles={["ADMIN","admin"]}>
// // //               <Navigate to="/admin/dashboard" replace />
// // //             </ProtectedRoute>
// // //           }
// // //         />


// // //         {/* ---------- GLOBAL 404 ---------- */}

// // //         <Route path="*" element={<Navigate to="/login" replace />} />

// // //       </Routes>
// // //     </Router>
// // //   );
// // // }

// // // export default App;


// // // AUTH PAGE
// // import Login from "./pages/auth/Login";

// // // DASHBOARDS
// // import StudentDashboard from "./pages/student/StudentDashboard";
// // import FacultyDashboard from "./pages/faculty/FacultyDashboard";
// // import AuthorityDashboard from "./pages/authority/AuthorityDashboard";
// // import AdminDashboard from "./pages/admin/AdminDashboard";

// // // CARAVAN PAGE  ✅ CORRECT PATH
// // import Caravan from "./pages/Caravan";
// // import ProtectedRoute from "./components/auth/ProtectedRoute";

// // function App() {
// //   return (
// //     <Router>
// //       <Routes>

// //         {/* ---------- PUBLIC ---------- */}
// //         <Route path="/" element={<Navigate to="/login" replace />} />
// //         <Route path="/login" element={<Login />} />


// //         {/* ---------- STUDENT ---------- */}

// //         <Route
// //           path="/student/dashboard"
// //           element={
// //             <ProtectedRoute allowedRoles={["STUDENT","student"]}>
// //               <StudentDashboard />
// //             </ProtectedRoute>
// //           }
// //         />

// //         {/* ✅ CARAVAN ROUTE (MUST BE ABOVE /student/* ) */}
// //         <Route
// //           path="/student/caravan"
// //           element={
// //             <ProtectedRoute allowedRoles={["STUDENT","student"]}>
// //               <Caravan />
// //             </ProtectedRoute>
// //           }
// //         />

// //         {/* fallback student redirect */}
// //         <Route
// //           path="/student/*"
// //           element={
// //             <ProtectedRoute allowedRoles={["STUDENT","student"]}>
// //               <Navigate to="/student/dashboard" replace />
// //             </ProtectedRoute>
// //           }
// //         />


// //         {/* ---------- FACULTY ---------- */}

// //         <Route
// //           path="/faculty/dashboard"
// //           element={
// //             <ProtectedRoute allowedRoles={["FACULTY","faculty"]}>
// //               <FacultyDashboard />
// //             </ProtectedRoute>
// //           }
// //         />

// //         <Route
// //           path="/faculty/*"
// //           element={
// //             <ProtectedRoute allowedRoles={["FACULTY","faculty"]}>
// //               <Navigate to="/faculty/dashboard" replace />
// //             </ProtectedRoute>
// //           }
// //         />


// //         {/* ---------- AUTHORITY ---------- */}

// //         <Route
// //           path="/authority/dashboard"
// //           element={
// //             <ProtectedRoute allowedRoles={["AUTHORITY","authority"]}>
// //               <AuthorityDashboard />
// //             </ProtectedRoute>
// //           }
// //         />

// //         <Route
// //           path="/authority/*"
// //           element={
// //             <ProtectedRoute allowedRoles={["AUTHORITY","authority"]}>
// //               <Navigate to="/authority/dashboard" replace />
// //             </ProtectedRoute>
// //           }
// //         />


// //         {/* ---------- ADMIN ---------- */}

// //         <Route
// //           path="/admin/dashboard"
// //           element={
// //             <ProtectedRoute allowedRoles={["ADMIN","admin"]}>
// //               <AdminDashboard />
// //             </ProtectedRoute>
// //           }
// //         />
// //         <Route
// //           path="/admin/*"
// //           element={
// //             <ProtectedRoute allowedRoles={["ADMIN","admin"]}>
// //               <Navigate to="/admin/dashboard" replace />
// //             </ProtectedRoute>
// //           }
// //         />


// //         {/* ---------- GLOBAL 404 ---------- */}

// //         <Route path="*" element={<Navigate to="/login" replace />} />

// //       </Routes>
// //     </Router>
// //   );
// // }

// // export default App;

// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// // AUTH PAGE
// import Login from "./pages/auth/Login";

// // DASHBOARDS
// import StudentDashboard from "./pages/student/StudentDashboard";
// import FacultyDashboard from "./pages/faculty/FacultyDashboard";
// import AuthorityDashboard from "./pages/authority/AuthorityDashboard";
// import AdminDashboard from "./pages/admin/AdminDashboard";

// // CARAVAN PAGE  ✅ CORRECT PATH
// import Caravan from "./pages/Caravan";

// // PROTECTED ROUTE
// import ProtectedRoute from "./components/auth/ProtectedRoute";

// function App() {
//   return (
//     <Router>
//       <Routes>

//         {/* ---------- PUBLIC ---------- */}
//         <Route path="/" element={<Navigate to="/login" replace />} />
//         <Route path="/login" element={<Login />} />


//         {/* ---------- STUDENT ---------- */}

//         <Route
//           path="/student/dashboard"
//           element={
//             <ProtectedRoute allowedRoles={["STUDENT","student"]}>
//               <StudentDashboard />
//             </ProtectedRoute>
//           }
//         />

//         {/* ✅ CARAVAN ROUTE (MUST BE ABOVE /student/* ) */}
//         <Route
//           path="/student/caravan"
//           element={
//             <ProtectedRoute allowedRoles={["STUDENT","student"]}>
//               <Caravan />
//             </ProtectedRoute>
//           }
//         />

//         {/* fallback student redirect */}
//         <Route
//           path="/student/*"
//           element={
//             <ProtectedRoute allowedRoles={["STUDENT","student"]}>
//               <Navigate to="/student/dashboard" replace />
//             </ProtectedRoute>
//           }
//         />


//         {/* ---------- FACULTY ---------- */}

//         <Route
//           path="/faculty/dashboard"
//           element={
//             <ProtectedRoute allowedRoles={["FACULTY","faculty"]}>
//               <FacultyDashboard />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/faculty/*"
//           element={
//             <ProtectedRoute allowedRoles={["FACULTY","faculty"]}>
//               <Navigate to="/faculty/dashboard" replace />
//             </ProtectedRoute>
//           }
//         />


//         {/* ---------- AUTHORITY ---------- */}

//         <Route
//           path="/authority/dashboard"
//           element={
//             <ProtectedRoute allowedRoles={["AUTHORITY","authority"]}>
//               <AuthorityDashboard />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/authority/*"
//           element={
//             <ProtectedRoute allowedRoles={["AUTHORITY","authority"]}>
//               <Navigate to="/authority/dashboard" replace />
//             </ProtectedRoute>
//           }
//         />


//         {/* ---------- ADMIN ---------- */}

//         <Route
//           path="/admin/dashboard"
//           element={
//             <ProtectedRoute allowedRoles={["ADMIN","admin"]}>
//               <AdminDashboard />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/admin/*"
//           element={
//             <ProtectedRoute allowedRoles={["ADMIN","admin"]}>
//               <Navigate to="/admin/dashboard" replace />
//             </ProtectedRoute>
//           }
//         />


//         {/* ---------- GLOBAL 404 ---------- */}

//         <Route path="*" element={<Navigate to="/login" replace />} />

//       </Routes>
//     </Router>
//   );
// }

// export default App;

// #frontend/src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Pages
import Caravan from "./pages/Caravan";
import UserManagement from "./pages/UserManagement";
import Login from './pages/auth/Login';
import StudentDashboard from './pages/student/StudentDashboard';
import FacultyDashboard from './pages/faculty/FacultyDashboard';
import AuthorityDashboard from './pages/authority/AuthorityDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';

// Components
import ProtectedRoute from './components/auth/ProtectedRoute';
// Admin Pages
import AdminAcademics from './pages/admin/AdminAcademics';
import Academics from './pages/Academics';
import AdminCourses from './pages/admin/AdminCourses';
import AdminFaculty from './pages/admin/AdminFaculty';
import AdminStudents from './pages/admin/AdminStudents';
import AdminSemesters from './pages/admin/AdminSemesters';
import AdminDashboardPart3 from './pages/admin/AdminDashBoardPart3';
import StudentCourses from './pages/student/StudentCourses';
import StudentCalendar from "./pages/student/StudentCalender";
import StudentAttendance from './pages/student/StudentAttendance';
import StudentNotifications from './pages/student/StudentNotification';
import StudentResources from './pages/student/StudentResources.jsx';

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
         {/* ✅ CARAVAN ROUTE (MUST BE ABOVE /student/* ) */}
        <Route
          path="/student/caravan"
          element={
            <ProtectedRoute allowedRoles={["STUDENT","student"]}>
              <Caravan />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/courses"
          element={
            <ProtectedRoute allowedRoles={['STUDENT', 'student']}>
              <StudentCourses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/calendar"
          element={
            <ProtectedRoute allowedRoles={['STUDENT', 'student']}>
              <StudentCalendar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/attendance"
          element={
            <ProtectedRoute allowedRoles={['STUDENT', 'student']}>
              <StudentAttendance />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/notifications"
          element={
            <ProtectedRoute allowedRoles={['STUDENT', 'student']}>
              <StudentNotifications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/resources"
          element={
            <ProtectedRoute allowedRoles={['STUDENT', 'student']}>
              <StudentResources />
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
        {/* Faculty Routes */}
        <Route
          path="/Academics"
          element={
            <ProtectedRoute allowedRoles={['STUDENT', 'student']}>
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
            <ProtectedRoute allowedRoles={["ADMIN","admin"]}>
              <AdminDashboardPart3 />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/academics"
          element={
            <ProtectedRoute allowedRoles={["ADMIN","admin"]}>
              <AdminAcademics />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/courses"
          element={
            <ProtectedRoute allowedRoles={["ADMIN","admin"]}>
              <AdminCourses />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/faculty"
          element={
            <ProtectedRoute allowedRoles={["ADMIN","admin"]}>
              <AdminFaculty />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/students"
          element={
            <ProtectedRoute allowedRoles={["ADMIN","admin"]}>
              <AdminStudents />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/semesters"
          element={
            <ProtectedRoute allowedRoles={["ADMIN","admin"]}>
              <AdminSemesters />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute allowedRoles={["ADMIN","admin"]}>
              <UserManagement />
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