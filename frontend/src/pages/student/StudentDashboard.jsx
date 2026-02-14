// // #frontend/arc/pages/auhority/StudentDashboard
// import AppLayout from "../../components/AppLayout";
// import GlassCard from "../../components/GlassCard";
// import StatusBadge from "../../components/StatusBadge";
// import {
//   MessageSquareWarning,
//   GraduationCap,
//   Briefcase,
//   Car,
//   Search,
//   AlertTriangle,
//   Users,
// } from "lucide-react";
// import { Link } from "react-router-dom";

// const stats = [
//   { label: "Active Grievances", value: "12", icon: MessageSquareWarning, color: "text-amber-500" },
//   { label: "Courses Enrolled", value: "6", icon: GraduationCap, color: "text-blue-700" },
//   { label: "Open Opportunities", value: "24", icon: Briefcase, color: "text-indigo-600" },
//   { label: "Campus Users", value: "1.2k", icon: Users, color: "text-emerald-600" },
// ];

// const quickLinks = [
//   { label: "File Grievance", path: "/student/grievances", icon: MessageSquareWarning, desc: "Submit & track issues" },
//   { label: "My Courses", path: "/student/academics", icon: GraduationCap, desc: "Courses & credits" },
//   { label: "Internships", path: "/student/opportunities", icon: Briefcase, desc: "Find gigs & internships" },
//   { label: "Ride Share", path: "/student/caravan", icon: Car, desc: "Share campus rides" },
//   { label: "Lost & Found", path: "/student/lost-found", icon: Search, desc: "Report or find items" },
//   { label: "SOS Flare", path: "/student/sos", icon: AlertTriangle, desc: "Emergency alerts" },
// ];

// const recentActivity = [
//   { text: "Grievance #104 resolved", badge: "Resolved", variant: "success", time: "2h ago" },
//   { text: "New internship: Google SWE", badge: "New", variant: "info", time: "5h ago" },
//   { text: "Lost item claimed: AirPods", badge: "Claimed", variant: "warning", time: "1d ago" },
//   { text: "SOS: Water outage Block C", badge: "Active", variant: "danger", time: "1d ago" },
// ];

// const StudentDashboard = () => (
//   <AppLayout>
//     <div className="mb-8">
//       <h1 className="text-3xl font-bold text-blue-800">
//         Good morning, <span className="text-indigo-700">Student</span>
//       </h1>
//       <p className="mt-1 text-gray-500">
//         Here's what's happening on campus today.
//       </p>
//     </div>

//     {/* Stats */}
//     <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
//       {stats.map((s) => (
//         <GlassCard key={s.label} hover>
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-xs text-gray-500">{s.label}</p>
//               <p className="mt-1 text-2xl font-bold text-gray-800">
//                 {s.value}
//               </p>
//             </div>
//             <s.icon className={`h-8 w-8 ${s.color} opacity-80`} />
//           </div>
//         </GlassCard>
//       ))}
//     </div>

//     <div className="grid gap-6 lg:grid-cols-3">
      
//       {/* Quick Links */}
//       <div className="lg:col-span-2">
//         <h2 className="mb-4 text-lg font-semibold text-blue-800">
//           Quick Access
//         </h2>
//         <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
//           {quickLinks.map((l) => (
//             <Link key={l.path} to={l.path}>
//               <GlassCard hover className="flex flex-col items-center gap-2 py-6 text-center">
//                 <l.icon className="h-6 w-6 text-blue-700" />
//                 <span className="text-sm font-medium text-gray-800">
//                   {l.label}
//                 </span>
//                 <span className="text-xs text-gray-500">
//                   {l.desc}
//                 </span>
//               </GlassCard>
//             </Link>
//           ))}
//         </div>
//       </div>

//       {/* Activity */}
//       <div>
//         <h2 className="mb-4 text-lg font-semibold text-blue-800">
//           Recent Activity
//         </h2>
//         <GlassCard className="space-y-4">
//           {recentActivity.map((a, i) => (
//             <div key={i} className="flex items-center justify-between gap-2">
//               <div className="min-w-0">
//                 <p className="truncate text-sm text-gray-800">
//                   {a.text}
//                 </p>
//                 <p className="text-xs text-gray-500">
//                   {a.time}
//                 </p>
//               </div>
//               <StatusBadge variant={a.variant}>
//                 {a.badge}
//               </StatusBadge>
//             </div>
//           ))}
//         </GlassCard>
//       </div>
//     </div>
//   </AppLayout>
// );

// export default StudentDashboard;
// #frontend/src/pages/student/StudentDashboard.jsx
import AppLayout from "../../components/AppLayout";
import GlassCard from "../../components/GlassCard";
import StatusBadge from "../../components/StatusBadge";
import { Link } from "react-router-dom";
import {
  MessageSquareWarning,
  GraduationCap,
  Briefcase,
  Car,
  Search,
  AlertTriangle,
  Users,
} from "lucide-react";

const stats = [
  { label: "Active Grievances", value: "12", icon: MessageSquareWarning, color: "text-amber-500" },
  { label: "Courses Enrolled", value: "6", icon: GraduationCap, color: "text-blue-700" },
  { label: "Open Opportunities", value: "24", icon: Briefcase, color: "text-indigo-600" },
  { label: "Campus Users", value: "1.2k", icon: Users, color: "text-emerald-600" },
];

const quickLinks = [
  { label: "File Grievance", path: "/student/grievances", icon: MessageSquareWarning, desc: "Submit & track issues" },
  { label: "My Courses", path: "/student/academics", icon: GraduationCap, desc: "Courses & credits" },
  { label: "Internships", path: "/student/opportunities", icon: Briefcase, desc: "Find gigs & internships" },
  { label: "Ride Share", path: "/student/caravan", icon: Car, desc: "Share campus rides" },
  { label: "Lost & Found", path: "/student/lost-found", icon: Search, desc: "Report or find items" },
  { label: "SOS Flare", path: "/student/sos", icon: AlertTriangle, desc: "Emergency alerts" },
];

const recentActivity = [
  { text: "Grievance #104 resolved", badge: "Resolved", variant: "success", time: "2h ago" },
  { text: "New internship: Google SWE", badge: "New", variant: "info", time: "5h ago" },
  { text: "Lost item claimed: AirPods", badge: "Claimed", variant: "warning", time: "1d ago" },
  { text: "SOS: Water outage Block C", badge: "Active", variant: "danger", time: "1d ago" },
];

// Student-specific navigation
const StudentNav = () => (
  <>
    <Link to="/student/dashboard" className="hover:text-blue-600 transition">
      Dashboard
    </Link>
    <Link to="/student/academics" className="hover:text-blue-600 transition">
      Academics
    </Link>
    <Link to="/student/grievances" className="hover:text-blue-600 transition">
      Grievances
    </Link>
    <Link to="/student/opportunities" className="hover:text-blue-600 transition">
      Opportunities
    </Link>
    <Link to="/student/caravan" className="hover:text-blue-600 transition">
      Caravan
    </Link>
    <Link to="/student/lost-found" className="hover:text-blue-600 transition">
      Lost & Found
    </Link>
    <Link to="/student/sos" className="hover:text-blue-600 transition">
      SOS
    </Link>
  </>
);

const StudentDashboard = () => (
  <AppLayout navigation={<StudentNav />}>
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-blue-800">
        Good morning, <span className="text-indigo-700">Student</span>
      </h1>
      <p className="mt-1 text-gray-500">
        Here's what's happening on campus today.
      </p>
    </div>

    {/* Stats */}
    <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((s) => (
        <GlassCard key={s.label} hover>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">{s.label}</p>
              <p className="mt-1 text-2xl font-bold text-gray-800">
                {s.value}
              </p>
            </div>
            <s.icon className={`h-8 w-8 ${s.color} opacity-80`} />
          </div>
        </GlassCard>
      ))}
    </div>

    <div className="grid gap-6 lg:grid-cols-3">
      {/* Quick Links */}
      <div className="lg:col-span-2">
        <h2 className="mb-4 text-lg font-semibold text-blue-800">
          Quick Access
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {quickLinks.map((l) => (
            <Link key={l.path} to={l.path}>
              <GlassCard hover className="flex flex-col items-center gap-2 py-6 text-center">
                <l.icon className="h-6 w-6 text-blue-700" />
                <span className="text-sm font-medium text-gray-800">
                  {l.label}
                </span>
                <span className="text-xs text-gray-500">
                  {l.desc}
                </span>
              </GlassCard>
            </Link>
          ))}
        </div>
      </div>

      {/* Activity */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-blue-800">
          Recent Activity
        </h2>
        <GlassCard className="space-y-4">
          {recentActivity.map((a, i) => (
            <div key={i} className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="truncate text-sm text-gray-800">
                  {a.text}
                </p>
                <p className="text-xs text-gray-500">
                  {a.time}
                </p>
              </div>
              <StatusBadge variant={a.variant}>
                {a.badge}
              </StatusBadge>
            </div>
          ))}
        </GlassCard>
      </div>
    </div>
  </AppLayout>
);

export default StudentDashboard;