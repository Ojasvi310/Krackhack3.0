import AppLayoutSidebar from "../../components/AppLayoutSidebar";
import GlassCardPart3 from "../../components/GlassCardPart3.jsx";

import {
  GraduationCap,
  Users,
  BookOpen,
  Settings,
  LayoutDashboard
} from "lucide-react";

const navLinks = [

  {
    path: "/admin/dashboardPart3",
    label: "Dashboard",
    icon: LayoutDashboard,
  },

  {
    path: "/admin/academics",
    label: "Academics",
    icon: GraduationCap,
  },

  {
    path: "/admin/Faculty",
    label: "Faculty",
    icon: Users,
  },

  {
    path: "/admin/courses",
    label: "Courses",
    icon: BookOpen,
  },

  {
    path: "/admin/Semesters",
    label: "Semesters",
    icon: Settings,
  },
  {
    path: "/admin/Students",
    label: "Students",
    icon: Settings,
  },
];


const stats = [

  {
    label: "Total Students",
    value: "1250",
    icon: Users,
  },

  {
    label: "Total Courses",
    value: "42",
    icon: BookOpen,
  },

  {
    label: "Faculty Members",
    value: "68",
    icon: GraduationCap,
  },

  {
    label: "Active Modules",
    value: "6",
    icon: Settings,
  },

];


const AdminDashboardPart3 = () => {

  return (

    <AppLayoutSidebar role="Admin" navLinks={navLinks}>

      <div className="mb-10">

        <h1 className="text-4xl font-serif text-[#1e293b] mb-2">

          Welcome, Admin

        </h1>

        <p className="text-[#64748b]">

          Manage academic and campus systems

        </p>

      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {stats.map(stat => (

          <GlassCardPart3 key={stat.label}>

            <div className="flex justify-between">

              <div>

                <p className="text-sm text-[#64748b]">
                  {stat.label}
                </p>

                <p className="text-3xl font-serif text-[#1e293b]">
                  {stat.value}
                </p>

              </div>

              <stat.icon className="w-8 h-8 text-[#1e293b]"/>

            </div>

          </GlassCardPart3>

        ))}

      </div>

    </AppLayoutSidebar>

  );

};

export default AdminDashboardPart3;

