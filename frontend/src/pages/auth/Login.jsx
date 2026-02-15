// // #frontend/src/pages/auth/Login.jsx
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../../services/api";

// const Login = () => {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     console.log('🔐 Login attempt:', email);

//     try {
//       const response = await API.post('/auth/login', {
//         email,
//         password,
//       });

//       console.log('✅ Login response:', response.data);

//       const { access_token, refresh_token, profile } = response.data;

//       if (!access_token || !profile) {
//         throw new Error('Invalid response format');
//       }

//       // Store tokens
//       localStorage.setItem("access_token", access_token);
//       localStorage.setItem("refresh_token", refresh_token);

//       // Store user info
//       localStorage.setItem("user_id", profile.id);
//       localStorage.setItem("user_email", profile.email);
//       localStorage.setItem("user_role", profile.role);

//       console.log('💾 Stored in localStorage:', {
//         token: !!localStorage.getItem('access_token'),
//         role: localStorage.getItem('user_role'),
//         email: localStorage.getItem('user_email')
//       });

//       // Navigate based on role
//       const roleRoutes = {
//         STUDENT: '/student/dashboard',
//         student: '/student/dashboard',
//         FACULTY: '/faculty/dashboard',
//         faculty: '/faculty/dashboard',
//         AUTHORITY: '/authority/dashboard',
//         authority: '/authority/dashboard',
//         ADMIN: '/admin/dashboard',
//         admin: '/admin/dashboard',
//       };

//       const route = roleRoutes[profile.role] || '/student/dashboard';

//       console.log('🚀 Navigating to:', route);

//       // Small delay to ensure localStorage is set
//       setTimeout(() => {
//         navigate(route, { replace: true });
//       }, 100);

//     } catch (err) {
//       console.error('❌ Login Error:', err);
//       console.error('Error details:', err.response?.data);

//       const errorMessage = err.response?.data?.detail ||
//                           err.message ||
//                           'Login failed. Please try again.';
//       setError(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-blue-50">
//       <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow w-96 space-y-4">
//         <h1 className="text-xl font-bold text-blue-700 text-center">Login to AEGIS</h1>

//         {error && (
//           <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
//             {error}
//           </div>
//         )}

//         <input
//           type="email"
//           placeholder="Email (e.g., b24136@students.iitmandi.ac.in)"
//           className="w-full border p-2 rounded"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//           disabled={loading}
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full border p-2 rounded"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//           disabled={loading}
//         />

//         <button
//           type="submit"
//           className="w-full bg-blue-700 text-white py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-800"
//           disabled={loading}
//         >
//           {loading ? 'Signing in...' : 'Sign In'}
//         </button>

//         <p className="text-center text-xs text-gray-500">
//           Only institute email addresses are allowed
//         </p>

//       </form>
//     </div>
//   );
// };

// export default Login;
// #frontend/src/pages/auth/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
// 1. Import your supabase client
import { supabase } from "../../lib/supbase";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    if (!email || !email.includes("@")) {
      return "Invalid email format";
    }

    const domain = email.split("@")[1]?.toLowerCase();
    if (!domain || !domain.endsWith("iitmandi.ac.in")) {
      return "Email must be from IIT Mandi domain (e.g., user@students.iitmandi.ac.in)";
    }

    return null;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const emailError = validateEmail(email);
    if (emailError) {
      setError(emailError);
      return;
    }

    setLoading(true);

    try {
      // Step A: Login to your FastAPI Backend
      const response = await API.post("/auth/login", {
        email: email.toLowerCase(),
        password,
      });

      console.log("✅ FastAPI Login Success");

      const { access_token, refresh_token, profile } = response.data;

      if (!access_token || !profile) {
        throw new Error("Invalid response format from server");
      }

      // Step B: Sync the session with the Supabase Client
      // This is the CRITICAL part you were missing
      const { data, error: syncError } = await supabase.auth.setSession({
        access_token: access_token,
        refresh_token: refresh_token,
      });

      if (syncError) {
        console.error("❌ Supabase Sync Error:", syncError.message);
        throw new Error("Failed to sync database session");
      }

      console.log("🚀 Supabase Client Authenticated");

      // Step C: Store tokens and profile locally
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
      localStorage.setItem("user_id", profile.id);
      localStorage.setItem("user_email", profile.email);
      localStorage.setItem("user_role", profile.role);

      // Step D: Navigate based on role
      const roleRoutes = {
        STUDENT: "/student/dashboard",
        student: "/student/dashboard",
        FACULTY: "/faculty/dashboard",
        faculty: "/faculty/dashboard",
        AUTHORITY: "/authority/dashboard",
        authority: "/authority/dashboard",
        ADMIN: "/admin/dashboard",
        admin: "/admin/dashboard",
      };

      const route = roleRoutes[profile.role] || "/student/dashboard";

      // Small delay to ensure state/storage is settled
      setTimeout(() => {
        navigate(route, { replace: true });
      }, 100);
    } catch (err) {
      console.error("❌ Login Error:", err);
      let errorMessage = "Login failed. Please try again.";

      if (err.response?.data) {
        const errorData = err.response.data;
        if (errorData.detail) {
          errorMessage =
            typeof errorData.detail === "string"
              ? errorData.detail
              : JSON.stringify(errorData.detail);
        }
      } else if (err.message) {
        errorMessage = err.message;
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleLogin}
          className="bg-white p-8 rounded-2xl shadow-xl space-y-6"
        >
          <div className="text-center">
            <h1 className="text-3xl font-bold text-blue-700 mb-2">
              Welcome to AEGIS
            </h1>
            <p className="text-gray-600">Sign in with your IIT Mandi email</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your institute email"
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError("");
              }}
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-lg hover:shadow-xl"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Signing in...
              </span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
