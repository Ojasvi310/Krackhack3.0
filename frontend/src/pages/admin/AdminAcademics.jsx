import AppLayoutSidebar from "../../components/AppLayoutSidebar";
import GlassCardPart3 from "../../components/GlassCardPart3.jsx";

import {
  GraduationCap,
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

];


const stats = [

  {
    label: "Total Courses",
    value: "42",
  },

  {
    label: "Total Faculty",
    value: "68",
  },

  {
    label: "Total Students",
    value: "1250",
  },

  {
    label: "Active Semester",
    value: "5",
  },

];


const AdminAcademics = () => {

  return (

    <AppLayoutSidebar role="Admin" navLinks={navLinks}>

      <div className="mb-10">

        <h1 className="text-4xl font-serif text-[#1e293b] mb-2">

          Academics Overview

        </h1>

        <p className="text-[#64748b]">

          View academic system summary

        </p>

      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {stats.map(stat => (

          <GlassCardPart3 key={stat.label}>

            <p className="text-sm text-[#64748b]">

              {stat.label}

            </p>

            <p className="text-3xl font-serif text-[#1e293b]">

              {stat.value}

            </p>

          </GlassCardPart3>

        ))}

      </div>

    </AppLayoutSidebar>

  );

};

export default AdminAcademics;
