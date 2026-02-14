// 

import AppLayout from "../../components/AppLayout";
import GlassCard from "../../components/GlassCard";
import StatusBadge from "../../components/StatusBadge";
import { Link } from "react-router-dom";

import {
  Users,
  Shield,
  Activity,
  Server,
  BookOpen,
  GraduationCap,
  Calendar,
  UserCheck,
  Settings,
  Database
} from "lucide-react";


// Stats
const stats = [
  { label: "Total Users", value: "1,248", icon: Users },
  { label: "Active Sessions", value: "312", icon: Activity },
  { label: "System Health", value: "99.9%", icon: Server },
  { label: "Security Alerts", value: "1", icon: Shield },
];


// Updated Admin Navigation
const AdminNav = () => (
  <div className="flex gap-6 font-sans text-sm font-medium">

    <Link to="/admin/dashboard"
      className="text-[#1e293b] hover:text-[#38b2ac]">
      Dashboard
    </Link>

    <Link to="/admin/courses"
      className="text-[#64748b] hover:text-[#1e293b]">
      Courses
    </Link>

    <Link to="/admin/faculty"
      className="text-[#64748b] hover:text-[#1e293b]">
      Faculty
    </Link>

    <Link to="/admin/students"
      className="text-[#64748b] hover:text-[#1e293b]">
      Students
    </Link>

    <Link to="/admin/semesters"
      className="text-[#64748b] hover:text-[#1e293b]">
      Semesters
    </Link>

    <Link to="/admin/settings"
      className="text-[#64748b] hover:text-[#1e293b]">
      Settings
    </Link>

  </div>
);


// Quick access cards
const quickAccess = [
  {
    title: "Manage Courses",
    icon: BookOpen,
    link: "/admin/courses",
    desc: "Create and manage courses"
  },
  {
    title: "Manage Faculty",
    icon: GraduationCap,
    link: "/admin/faculty",
    desc: "Assign faculty to courses"
  },
  {
    title: "Manage Students",
    icon: Users,
    link: "/admin/students",
    desc: "View and manage students"
  },
  {
    title: "Manage Semesters",
    icon: Calendar,
    link: "/admin/semesters",
    desc: "Control semester structure"
  },
];



const AdminDashboard = () => (
  <AppLayout navigation={<AdminNav />}>

    {/* Header */}

    <div className="mb-10">

      <h1 className="text-4xl font-serif text-[#1e293b] mb-2">
        Administrator Dashboard
      </h1>

      <p className="text-[#64748b]">
        Full system control and academic management
      </p>

    </div>


    {/* Stats */}

    <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

      {stats.map((s) => (

        <GlassCard key={s.label}>

          <div className="flex items-center justify-between">

            <div>

              <p className="text-xs text-gray-500">
                {s.label}
              </p>

              <p className="text-3xl font-bold text-[#1e293b]">
                {s.value}
              </p>

            </div>

            <s.icon className="w-8 h-8 text-[#1e293b]" />

          </div>

        </GlassCard>

      ))}

    </div>



    {/* Quick Access Section */}

    <div className="mb-10">

      <h2 className="text-xl font-serif text-[#1e293b] mb-6">
        Academic Management
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

        {quickAccess.map((item) => (

          <Link to={item.link} key={item.title}>

            <GlassCard className="hover:shadow-md transition">

              <item.icon className="w-10 h-10 text-blue-600 mb-3"/>

              <h3 className="font-semibold text-[#1e293b]">
                {item.title}
              </h3>

              <p className="text-sm text-gray-500">
                {item.desc}
              </p>

            </GlassCard>

          </Link>

        ))}

      </div>

    </div>



    {/* System Health */}

    <GlassCard>

      <h2 className="mb-4 text-xl font-serif text-[#1e293b]">
        System Health
      </h2>

      <div className="space-y-4">

        {["API Response", "Database", "Memory"].map((item) => (

          <div key={item}
            className="flex justify-between">

            <span>{item}</span>

            <StatusBadge variant="success">
              Optimal
            </StatusBadge>

          </div>

        ))}

      </div>

    </GlassCard>

  </AppLayout>
);

export default AdminDashboard;
