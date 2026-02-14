// frontend/src/components/AppLayoutSidebar.jsx

import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";
import { useState } from "react";

const AppLayoutSidebar = ({
  children,
  role = "Admin",
  navLinks = []
}) => {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.clear();

    navigate("/login");

  };


  return (

    <div className="min-h-screen bg-[#f8fafc] flex font-sans">

      {/* MOBILE OVERLAY */}
      {sidebarOpen && (

        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />

      )}


      {/* SIDEBAR */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-[#e2e8f0]
          transform transition-transform duration-200
          lg:translate-x-0 lg:static lg:z-auto
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >

        {/* HEADER */}
        <div className="flex items-center justify-between h-16 px-6 border-b">

          <h1 className="font-serif text-xl font-bold text-[#1e293b]">

            AEGIS

          </h1>

          <button
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20}/>
          </button>

        </div>


        {/* ROLE */}
        <div className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase">

          {role}

        </div>


        {/* NAVIGATION */}
        <nav className="px-2 space-y-1">

          {navLinks.map(link => (

            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>

                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition

                ${isActive
                  ? "bg-[#f1f5f9] text-[#1e293b]"
                  : "text-[#64748b] hover:bg-[#f8fafc] hover:text-[#1e293b]"
                }`

              }
            >

              <link.icon size={18}/>

              {link.label}

            </NavLink>

          ))}

        </nav>


        {/* LOGOUT */}
        <div className="absolute bottom-0 w-full p-4 border-t">

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-600 text-sm"
          >

            <LogOut size={18}/>

            Logout

          </button>

        </div>

      </aside>



      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col">

        {/* TOP HEADER */}
        <header className="h-16 bg-white border-b flex items-center px-6">

          <button
            className="lg:hidden mr-4"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={20}/>
          </button>


          <h2 className="font-serif text-lg font-semibold text-[#1e293b]">

            {role} Dashboard

          </h2>

        </header>


        {/* PAGE CONTENT */}
        <main className="flex-1 p-6">

          {children}

        </main>

      </div>


    </div>

  );

};

export default AppLayoutSidebar;
