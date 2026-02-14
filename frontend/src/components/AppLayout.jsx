// #frontend/src/components/AppLayout.jsx
import { useNavigate } from "react-router-dom";
import { LogOut, User, ChevronDown } from "lucide-react";
import { useState } from "react";

const AppLayout = ({ children, navigation }) => {
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Get user info from localStorage
  const userEmail = localStorage.getItem("user_email") || "User";
  const userRole = localStorage.getItem("user_role") || "Guest";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col">
      {/* Top Navbar */}
      <nav className="bg-white border-b border-blue-100 shadow-sm px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">AEGIS</h1>

        {/* Role-specific navigation passed as prop */}
        {navigation && (
          <div className="flex gap-6 text-sm font-medium text-gray-600">
            {navigation}
          </div>
        )}

        {/* User Menu with Logout */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-blue-50 transition"
          >
            <User className="w-5 h-5 text-gray-600" />
            <div className="text-left">
              <p className="text-sm font-medium text-gray-800">
                {userEmail.split("@")[0]}
              </p>
              <p className="text-xs text-gray-500 capitalize">{userRole}</p>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>

          {/* Dropdown Menu */}
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-800">{userEmail}</p>
                <p className="text-xs text-gray-500 capitalize">{userRole}</p>
              </div>

              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Page Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
};

export default AppLayout;