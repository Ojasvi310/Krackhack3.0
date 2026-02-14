
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";



import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Pages
import Login from './pages/auth/Login';
import StudentDashboard from './pages/student/StudentDashboard';
import FacultyDashboard from './pages/faculty/FacultyDashboard';
import AuthorityDashboard from './pages/authority/AuthorityDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';

// Components
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>

        {/* ---------- PUBLIC ---------- */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />


        {/* ---------- STUDENT ---------- */}

        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute allowedRoles={["STUDENT","student"]}>
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

        {/* fallback student redirect */}
        <Route
          path="/student/*"
          element={
            <ProtectedRoute allowedRoles={["STUDENT","student"]}>
              <Navigate to="/student/dashboard" replace />
            </ProtectedRoute>
          }
        />


        {/* ---------- FACULTY ---------- */}

        <Route
          path="/faculty/dashboard"
          element={
            <ProtectedRoute allowedRoles={["FACULTY","faculty"]}>
              <FacultyDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/faculty/*"
          element={
            <ProtectedRoute allowedRoles={["FACULTY","faculty"]}>
              <Navigate to="/faculty/dashboard" replace />
            </ProtectedRoute>
          }
        />


        {/* ---------- AUTHORITY ---------- */}

        <Route
          path="/authority/dashboard"
          element={
            <ProtectedRoute allowedRoles={["AUTHORITY","authority"]}>
              <AuthorityDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/authority/*"
          element={
            <ProtectedRoute allowedRoles={["AUTHORITY","authority"]}>
              <Navigate to="/authority/dashboard" replace />
            </ProtectedRoute>
          }
        />


        {/* ---------- ADMIN ---------- */}

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["ADMIN","admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute allowedRoles={["ADMIN","admin"]}>
              <Navigate to="/admin/dashboard" replace />
            </ProtectedRoute>
          }
        />


        {/* ---------- GLOBAL 404 ---------- */}

        <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>
    </Router>
  );
}

export default App;