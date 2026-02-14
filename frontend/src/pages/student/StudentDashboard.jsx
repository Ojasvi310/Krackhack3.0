// // // // // // #frontend/arc/pages/auhority/StudentDashboard
// // // // // import AppLayout from "../../components/AppLayout";
// // // // // import GlassCard from "../../components/GlassCard";
// // // // // import StatusBadge from "../../components/StatusBadge";
// // // // // import {
// // // // //   MessageSquareWarning,
// // // // //   GraduationCap,
// // // // //   Briefcase,
// // // // //   Car,
// // // // //   Search,
// // // // //   AlertTriangle,
// // // // //   Users,
// // // // // } from "lucide-react";
// // // // // import { Link } from "react-router-dom";

// // // // // const stats = [
// // // // //   { label: "Active Grievances", value: "12", icon: MessageSquareWarning, color: "text-amber-500" },
// // // // //   { label: "Courses Enrolled", value: "6", icon: GraduationCap, color: "text-blue-700" },
// // // // //   { label: "Open Opportunities", value: "24", icon: Briefcase, color: "text-indigo-600" },
// // // // //   { label: "Campus Users", value: "1.2k", icon: Users, color: "text-emerald-600" },
// // // // // ];

// // // // // const quickLinks = [
// // // // //   { label: "File Grievance", path: "/student/grievances", icon: MessageSquareWarning, desc: "Submit & track issues" },
// // // // //   { label: "My Courses", path: "/student/academics", icon: GraduationCap, desc: "Courses & credits" },
// // // // //   { label: "Internships", path: "/student/opportunities", icon: Briefcase, desc: "Find gigs & internships" },
// // // // //   { label: "Ride Share", path: "/student/caravan", icon: Car, desc: "Share campus rides" },
// // // // //   { label: "Lost & Found", path: "/student/lost-found", icon: Search, desc: "Report or find items" },
// // // // //   { label: "SOS Flare", path: "/student/sos", icon: AlertTriangle, desc: "Emergency alerts" },
// // // // // ];

// // // // // const recentActivity = [
// // // // //   { text: "Grievance #104 resolved", badge: "Resolved", variant: "success", time: "2h ago" },
// // // // //   { text: "New internship: Google SWE", badge: "New", variant: "info", time: "5h ago" },
// // // // //   { text: "Lost item claimed: AirPods", badge: "Claimed", variant: "warning", time: "1d ago" },
// // // // //   { text: "SOS: Water outage Block C", badge: "Active", variant: "danger", time: "1d ago" },
// // // // // ];

// // // // // const StudentDashboard = () => (
// // // // //   <AppLayout>
// // // // //     <div className="mb-8">
// // // // //       <h1 className="text-3xl font-bold text-blue-800">
// // // // //         Good morning, <span className="text-indigo-700">Student</span>
// // // // //       </h1>
// // // // //       <p className="mt-1 text-gray-500">
// // // // //         Here's what's happening on campus today.
// // // // //       </p>
// // // // //     </div>

// // // // //     {/* Stats */}
// // // // //     <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
// // // // //       {stats.map((s) => (
// // // // //         <GlassCard key={s.label} hover>
// // // // //           <div className="flex items-center justify-between">
// // // // //             <div>
// // // // //               <p className="text-xs text-gray-500">{s.label}</p>
// // // // //               <p className="mt-1 text-2xl font-bold text-gray-800">
// // // // //                 {s.value}
// // // // //               </p>
// // // // //             </div>
// // // // //             <s.icon className={`h-8 w-8 ${s.color} opacity-80`} />
// // // // //           </div>
// // // // //         </GlassCard>
// // // // //       ))}
// // // // //     </div>

// // // // //     <div className="grid gap-6 lg:grid-cols-3">
      
// // // // //       {/* Quick Links */}
// // // // //       <div className="lg:col-span-2">
// // // // //         <h2 className="mb-4 text-lg font-semibold text-blue-800">
// // // // //           Quick Access
// // // // //         </h2>
// // // // //         <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
// // // // //           {quickLinks.map((l) => (
// // // // //             <Link key={l.path} to={l.path}>
// // // // //               <GlassCard hover className="flex flex-col items-center gap-2 py-6 text-center">
// // // // //                 <l.icon className="h-6 w-6 text-blue-700" />
// // // // //                 <span className="text-sm font-medium text-gray-800">
// // // // //                   {l.label}
// // // // //                 </span>
// // // // //                 <span className="text-xs text-gray-500">
// // // // //                   {l.desc}
// // // // //                 </span>
// // // // //               </GlassCard>
// // // // //             </Link>
// // // // //           ))}
// // // // //         </div>
// // // // //       </div>

// // // // //       {/* Activity */}
// // // // //       <div>
// // // // //         <h2 className="mb-4 text-lg font-semibold text-blue-800">
// // // // //           Recent Activity
// // // // //         </h2>
// // // // //         <GlassCard className="space-y-4">
// // // // //           {recentActivity.map((a, i) => (
// // // // //             <div key={i} className="flex items-center justify-between gap-2">
// // // // //               <div className="min-w-0">
// // // // //                 <p className="truncate text-sm text-gray-800">
// // // // //                   {a.text}
// // // // //                 </p>
// // // // //                 <p className="text-xs text-gray-500">
// // // // //                   {a.time}
// // // // //                 </p>
// // // // //               </div>
// // // // //               <StatusBadge variant={a.variant}>
// // // // //                 {a.badge}
// // // // //               </StatusBadge>
// // // // //             </div>
// // // // //           ))}
// // // // //         </GlassCard>
// // // // //       </div>
// // // // //     </div>
// // // // //   </AppLayout>
// // // // // );

// // // // // export default StudentDashboard;
// // // // // #frontend/src/pages/student/StudentDashboard.jsx
// // // // import AppLayout from "../../components/AppLayout";
// // // // import GlassCard from "../../components/GlassCard";
// // // // import StatusBadge from "../../components/StatusBadge";
// // // // import { Link } from "react-router-dom";
// // // // import {
// // // //   MessageSquareWarning,
// // // //   GraduationCap,
// // // //   Briefcase,
// // // //   Car,
// // // //   Search,
// // // //   AlertTriangle,
// // // //   Users,
// // // // } from "lucide-react";

// // // // const stats = [
// // // //   { label: "Active Grievances", value: "12", icon: MessageSquareWarning, color: "text-amber-500" },
// // // //   { label: "Courses Enrolled", value: "6", icon: GraduationCap, color: "text-blue-700" },
// // // //   { label: "Open Opportunities", value: "24", icon: Briefcase, color: "text-indigo-600" },
// // // //   { label: "Campus Users", value: "1.2k", icon: Users, color: "text-emerald-600" },
// // // // ];

// // // // const quickLinks = [
// // // //   { label: "File Grievance", path: "/student/grievances", icon: MessageSquareWarning, desc: "Submit & track issues" },
// // // //   { label: "My Courses", path: "/student/academics", icon: GraduationCap, desc: "Courses & credits" },
// // // //   { label: "Internships", path: "/student/opportunities", icon: Briefcase, desc: "Find gigs & internships" },
// // // //   { label: "Ride Share", path: "/student/caravan", icon: Car, desc: "Share campus rides" },
// // // //   { label: "Lost & Found", path: "/student/lost-found", icon: Search, desc: "Report or find items" },
// // // //   { label: "SOS Flare", path: "/student/sos", icon: AlertTriangle, desc: "Emergency alerts" },
// // // // ];

// // // // const recentActivity = [
// // // //   { text: "Grievance #104 resolved", badge: "Resolved", variant: "success", time: "2h ago" },
// // // //   { text: "New internship: Google SWE", badge: "New", variant: "info", time: "5h ago" },
// // // //   { text: "Lost item claimed: AirPods", badge: "Claimed", variant: "warning", time: "1d ago" },
// // // //   { text: "SOS: Water outage Block C", badge: "Active", variant: "danger", time: "1d ago" },
// // // // ];

// // // // // Student-specific navigation
// // // // const StudentNav = () => (
// // // //   <>
// // // //     <Link to="/student/dashboard" className="hover:text-blue-600 transition">
// // // //       Dashboard
// // // //     </Link>
// // // //     <Link to="/student/academics" className="hover:text-blue-600 transition">
// // // //       Academics
// // // //     </Link>
// // // //     <Link to="/student/grievances" className="hover:text-blue-600 transition">
// // // //       Grievances
// // // //     </Link>
// // // //     <Link to="/student/opportunities" className="hover:text-blue-600 transition">
// // // //       Opportunities
// // // //     </Link>
// // // //     <Link to="/student/caravan" className="hover:text-blue-600 transition">
// // // //       Caravan
// // // //     </Link>
// // // //     <Link to="/student/lost-found" className="hover:text-blue-600 transition">
// // // //       Lost & Found
// // // //     </Link>
// // // //     <Link to="/student/sos" className="hover:text-blue-600 transition">
// // // //       SOS
// // // //     </Link>
// // // //   </>
// // // // );

// // // // const StudentDashboard = () => (
// // // //   <AppLayout navigation={<StudentNav />}>
// // // //     <div className="mb-8">
// // // //       <h1 className="text-3xl font-bold text-blue-800">
// // // //         Good morning, <span className="text-indigo-700">Student</span>
// // // //       </h1>
// // // //       <p className="mt-1 text-gray-500">
// // // //         Here's what's happening on campus today.
// // // //       </p>
// // // //     </div>

// // // //     {/* Stats */}
// // // //     <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
// // // //       {stats.map((s) => (
// // // //         <GlassCard key={s.label} hover>
// // // //           <div className="flex items-center justify-between">
// // // //             <div>
// // // //               <p className="text-xs text-gray-500">{s.label}</p>
// // // //               <p className="mt-1 text-2xl font-bold text-gray-800">
// // // //                 {s.value}
// // // //               </p>
// // // //             </div>
// // // //             <s.icon className={`h-8 w-8 ${s.color} opacity-80`} />
// // // //           </div>
// // // //         </GlassCard>
// // // //       ))}
// // // //     </div>

// // // //     <div className="grid gap-6 lg:grid-cols-3">
// // // //       {/* Quick Links */}
// // // //       <div className="lg:col-span-2">
// // // //         <h2 className="mb-4 text-lg font-semibold text-blue-800">
// // // //           Quick Access
// // // //         </h2>
// // // //         <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
// // // //           {quickLinks.map((l) => (
// // // //             <Link key={l.path} to={l.path}>
// // // //               <GlassCard hover className="flex flex-col items-center gap-2 py-6 text-center">
// // // //                 <l.icon className="h-6 w-6 text-blue-700" />
// // // //                 <span className="text-sm font-medium text-gray-800">
// // // //                   {l.label}
// // // //                 </span>
// // // //                 <span className="text-xs text-gray-500">
// // // //                   {l.desc}
// // // //                 </span>
// // // //               </GlassCard>
// // // //             </Link>
// // // //           ))}
// // // //         </div>
// // // //       </div>

// // // //       {/* Activity */}
// // // //       <div>
// // // //         <h2 className="mb-4 text-lg font-semibold text-blue-800">
// // // //           Recent Activity
// // // //         </h2>
// // // //         <GlassCard className="space-y-4">
// // // //           {recentActivity.map((a, i) => (
// // // //             <div key={i} className="flex items-center justify-between gap-2">
// // // //               <div className="min-w-0">
// // // //                 <p className="truncate text-sm text-gray-800">
// // // //                   {a.text}
// // // //                 </p>
// // // //                 <p className="text-xs text-gray-500">
// // // //                   {a.time}
// // // //                 </p>
// // // //               </div>
// // // //               <StatusBadge variant={a.variant}>
// // // //                 {a.badge}
// // // //               </StatusBadge>
// // // //             </div>
// // // //           ))}
// // // //         </GlassCard>
// // // //       </div>
// // // //     </div>
// // // //   </AppLayout>
// // // // );

// // // // export default StudentDashboard;
// // // import AppLayout from "../../components/AppLayout";
// // // import GlassCard from "../../components/GlassCard";
// // // import StatusBadge from "../../components/StatusBadge";
// // // import { Link } from "react-router-dom";
// // // import {
// // //   MessageSquareWarning,
// // //   GraduationCap,
// // //   Briefcase,
// // //   Car,
// // //   Search,
// // //   AlertTriangle,
// // //   Users,
// // // } from "lucide-react";

// // // const stats = [
// // //   { label: "Active Grievances", value: "12", icon: MessageSquareWarning, color: "text-warning" },
// // //   { label: "Courses Enrolled", value: "6", icon: GraduationCap, color: "text-primary" },
// // //   { label: "Open Opportunities", value: "24", icon: Briefcase, color: "text-info" },
// // //   { label: "Campus Users", value: "1.2k", icon: Users, color: "text-success" },
// // // ];

// // // const quickLinks = [
// // //   { label: "File Grievance", path: "/student/grievances", icon: MessageSquareWarning, desc: "Submit & track issues" },
// // //   { label: "My Courses", path: "/student/academics", icon: GraduationCap, desc: "Courses & credits" },
// // //   { label: "Internships", path: "/student/opportunities", icon: Briefcase, desc: "Find gigs & internships" },
// // //   { label: "Ride Share", path: "/student/caravan", icon: Car, desc: "Share campus rides" },
// // //   { label: "Lost & Found", path: "/student/lost-found", icon: Search, desc: "Report or find items" },
// // //   { label: "SOS Flare", path: "/student/sos", icon: AlertTriangle, desc: "Emergency alerts" },
// // // ];

// // // const recentActivity = [
// // //   { text: "Grievance #104 resolved", badge: "Resolved", variant: "success", time: "2h ago" },
// // //   { text: "New internship: Google SWE", badge: "New", variant: "info", time: "5h ago" },
// // //   { text: "Lost item claimed: AirPods", badge: "Claimed", variant: "warning", time: "1d ago" },
// // //   { text: "SOS: Water outage Block C", badge: "Active", variant: "danger", time: "1d ago" },
// // // ];

// // // const StudentNav = () => (
// // //   <>
// // //     <Link to="/student/dashboard" className="hover:text-primary transition">Dashboard</Link>
// // //     <Link to="/student/academics" className="hover:text-primary transition">Academics</Link>
// // //     <Link to="/student/grievances" className="hover:text-primary transition">Grievances</Link>
// // //     <Link to="/student/opportunities" className="hover:text-primary transition">Opportunities</Link>
// // //     <Link to="/student/caravan" className="hover:text-primary transition">Caravan</Link>
// // //     <Link to="/student/lost-found" className="hover:text-primary transition">Lost & Found</Link>
// // //     <Link to="/student/sos" className="hover:text-primary transition">SOS</Link>
// // //   </>
// // // );

// // // const StudentDashboard = () => (
// // //   <AppLayout navigation={<StudentNav />}>

// // //     {/* HEADER */}
// // //     <div className="mb-8">
// // //       <h1 className="text-3xl font-bold text-foreground">
// // //         Good morning, <span className="text-primary">Student</span>
// // //       </h1>
// // //       <p className="mt-1 text-muted-foreground">
// // //         Here's what's happening on campus today.
// // //       </p>
// // //     </div>

// // //     {/* STATS */}
// // //     <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
// // //       {stats.map((s) => (
// // //         <GlassCard key={s.label} hover>
// // //           <div className="flex items-center justify-between">
// // //             <div>
// // //               <p className="text-xs text-muted-foreground">{s.label}</p>
// // //               <p className="mt-1 text-2xl font-bold text-foreground">
// // //                 {s.value}
// // //               </p>
// // //             </div>
// // //             <s.icon className={`h-8 w-8 ${s.color} opacity-80`} />
// // //           </div>
// // //         </GlassCard>
// // //       ))}
// // //     </div>

// // //     <div className="grid gap-6 lg:grid-cols-3">

// // //       {/* QUICK LINKS */}
// // //       <div className="lg:col-span-2">
// // //         <h2 className="mb-4 text-lg font-semibold text-foreground">
// // //           Quick Access
// // //         </h2>

// // //         <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
// // //           {quickLinks.map((l) => (
// // //             <Link key={l.path} to={l.path}>
// // //               <GlassCard hover className="flex flex-col items-center gap-2 py-6 text-center">
// // //                 <l.icon className="h-6 w-6 text-primary" />
// // //                 <span className="text-sm font-medium text-foreground">
// // //                   {l.label}
// // //                 </span>
// // //                 <span className="text-xs text-muted-foreground">
// // //                   {l.desc}
// // //                 </span>
// // //               </GlassCard>
// // //             </Link>
// // //           ))}
// // //         </div>
// // //       </div>

// // //       {/* ACTIVITY */}
// // //       <div>
// // //         <h2 className="mb-4 text-lg font-semibold text-foreground">
// // //           Recent Activity
// // //         </h2>

// // //         <GlassCard className="space-y-4">
// // //           {recentActivity.map((a, i) => (
// // //             <div key={i} className="flex items-center justify-between gap-2">
// // //               <div className="min-w-0">
// // //                 <p className="truncate text-sm text-foreground">
// // //                   {a.text}
// // //                 </p>
// // //                 <p className="text-xs text-muted-foreground">
// // //                   {a.time}
// // //                 </p>
// // //               </div>
// // //               <StatusBadge variant={a.variant}>
// // //                 {a.badge}
// // //               </StatusBadge>
// // //             </div>
// // //           ))}
// // //         </GlassCard>
// // //       </div>

// // //     </div>
// // //   </AppLayout>
// // // );

// // // export default StudentDashboard;

// // import AppLayout from "../../components/AppLayout";
// // import GlassCard from "../../components/GlassCard";
// // import StatusBadge from "../../components/StatusBadge";
// // import { Link } from "react-router-dom";
// // import {
// //   MessageSquareWarning,
// //   GraduationCap,
// //   Briefcase,
// //   Car,
// //   Search,
// //   AlertTriangle,
// //   Users,
// // } from "lucide-react";

// // const stats = [
// //   { label: "Active Grievances", value: "12", icon: MessageSquareWarning, color: "text-amber-500" },
// //   { label: "Courses Enrolled", value: "6", icon: GraduationCap, color: "text-[#1f3a8a]" },
// //   { label: "Open Opportunities", value: "24", icon: Briefcase, color: "text-[#3749b3]" },
// //   { label: "Campus Users", value: "1.2k", icon: Users, color: "text-emerald-600" },
// // ];

// // const quickLinks = [
// //   { label: "File Grievance", path: "/student/grievances", icon: MessageSquareWarning, desc: "Submit & track issues" },
// //   { label: "My Courses", path: "/student/academics", icon: GraduationCap, desc: "Courses & credits" },
// //   { label: "Internships", path: "/student/opportunities", icon: Briefcase, desc: "Find gigs & internships" },
// //   { label: "Ride Share", path: "/student/caravan", icon: Car, desc: "Share campus rides" },
// //   { label: "Lost & Found", path: "/student/lost-found", icon: Search, desc: "Report or find items" },
// //   { label: "SOS Flare", path: "/student/sos", icon: AlertTriangle, desc: "Emergency alerts" },
// // ];

// // const recentActivity = [
// //   { text: "Grievance #104 resolved", badge: "Resolved", variant: "success", time: "2h ago" },
// //   { text: "New internship: Google SWE", badge: "New", variant: "info", time: "5h ago" },
// //   { text: "Lost item claimed: AirPods", badge: "Claimed", variant: "warning", time: "1d ago" },
// //   { text: "SOS: Water outage Block C", badge: "Active", variant: "danger", time: "1d ago" },
// // ];

// // const StudentNav = () => (
// //   <>
// //     <Link to="/student/dashboard" className="hover:text-[#1f3a8a] transition">Dashboard</Link>
// //     <Link to="/student/academics" className="hover:text-[#1f3a8a] transition">Academics</Link>
// //     <Link to="/student/grievances" className="hover:text-[#1f3a8a] transition">Grievances</Link>
// //     <Link to="/student/opportunities" className="hover:text-[#1f3a8a] transition">Opportunities</Link>
// //     <Link to="/student/caravan" className="hover:text-[#1f3a8a] transition">Caravan</Link>
// //     <Link to="/student/lost-found" className="hover:text-[#1f3a8a] transition">Lost & Found</Link>
// //     <Link to="/student/sos" className="hover:text-[#1f3a8a] transition">SOS</Link>
// //   </>
// // );

// // const StudentDashboard = () => (
// //   <AppLayout navigation={<StudentNav />}>

// //     {/* HEADER */}
// //     <div className="mb-8">
// //       <h1 className="text-3xl font-bold text-[#0f172a]">
// //         Good morning, <span className="text-[#1f3a8a]">Student</span>
// //       </h1>
// //       <p className="mt-1 text-gray-500">
// //         Here's what's happening on campus today.
// //       </p>
// //     </div>

// //     {/* STATS */}
// //     <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
// //       {stats.map((s) => (
// //         <GlassCard key={s.label} hover>
// //           <div className="flex items-center justify-between">
// //             <div>
// //               <p className="text-xs text-gray-500">{s.label}</p>
// //               <p className="mt-1 text-2xl font-bold text-[#0f172a]">
// //                 {s.value}
// //               </p>
// //             </div>
// //             <s.icon className={`h-8 w-8 ${s.color} opacity-90`} />
// //           </div>
// //         </GlassCard>
// //       ))}
// //     </div>

// //     <div className="grid gap-6 lg:grid-cols-3">

// //       {/* QUICK LINKS */}
// //       <div className="lg:col-span-2">
// //         <h2 className="mb-4 text-lg font-semibold text-[#1f3a8a]">
// //           Quick Access
// //         </h2>

// //         <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
// //           {quickLinks.map((l) => (
// //             <Link key={l.path} to={l.path}>
// //               <GlassCard hover className="flex flex-col items-center gap-2 py-6 text-center">
// //                 <l.icon className="h-6 w-6 text-[#1f3a8a]" />
// //                 <span className="text-sm font-medium text-[#0f172a]">
// //                   {l.label}
// //                 </span>
// //                 <span className="text-xs text-gray-500">
// //                   {l.desc}
// //                 </span>
// //               </GlassCard>
// //             </Link>
// //           ))}
// //         </div>
// //       </div>

// //       {/* ACTIVITY */}
// //       <div>
// //         <h2 className="mb-4 text-lg font-semibold text-[#1f3a8a]">
// //           Recent Activity
// //         </h2>

// //         <GlassCard className="space-y-4">
// //           {recentActivity.map((a, i) => (
// //             <div key={i} className="flex items-center justify-between gap-2">
// //               <div className="min-w-0">
// //                 <p className="truncate text-sm text-[#0f172a]">
// //                   {a.text}
// //                 </p>
// //                 <p className="text-xs text-gray-500">
// //                   {a.time}
// //                 </p>
// //               </div>
// //               <StatusBadge variant={a.variant}>
// //                 {a.badge}
// //               </StatusBadge>
// //             </div>
// //           ))}
// //         </GlassCard>
// //       </div>

// //     </div>

// //   </AppLayout>
// // );

// // export default StudentDashboard;
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
  { label: "Active Grievances", value: "12", icon: MessageSquareWarning, color: "text-[#1e293b]" },
  { label: "Courses Enrolled", value: "6", icon: GraduationCap, color: "text-[#1e293b]" },
  { label: "Open Opportunities", value: "24", icon: Briefcase, color: "text-[#1e293b]" },
  { label: "Campus Users", value: "1.2k", icon: Users, color: "text-[#1e293b]" },
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

const StudentNav = () => (
  <div className="flex gap-6 font-sans text-sm font-medium">
    <Link to="/student/dashboard" className="text-[#1e293b] hover:text-[#38b2ac] transition-colors">Dashboard</Link>
    <Link to="/student/academics" className="text-[#64748b] hover:text-[#1e293b] transition-colors">Academics</Link>
    <Link to="/student/grievances" className="text-[#64748b] hover:text-[#1e293b] transition-colors">Grievances</Link>
    <Link to="/student/opportunities" className="text-[#64748b] hover:text-[#1e293b] transition-colors">Opportunities</Link>
  </div>
);

const StudentDashboard = () => (
  <AppLayout navigation={<StudentNav />}>
    {/* HEADER */}
    <div className="mb-10 text-center lg:text-left">
      <h1 className="text-4xl font-serif text-[#1e293b] mb-2">
        Good morning, <span className="text-[#1e293b]">Student</span>
      </h1>
      <p className="text-[#64748b] font-sans">
        A safe and transparent platform to manage your campus life.
      </p>
    </div>

    {/* STATS */}
    <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((s) => (
        <GlassCard key={s.label} className="border-[#e2e8f0] bg-white shadow-sm transition-all hover:shadow-md">
          <div className="flex items-center justify-between p-2">
            <div>
              <p className="text-[10px] uppercase tracking-wider font-semibold text-[#94a3b8]">{s.label}</p>
              <p className="mt-1 text-3xl font-serif text-[#1e293b]">
                {s.value}
              </p>
            </div>
            <div className="h-12 w-12 rounded-xl bg-[#f1f5f9] flex items-center justify-center">
              <s.icon className={`h-6 w-6 ${s.color}`} />
            </div>
          </div>
        </GlassCard>
      ))}
    </div>

    <div className="grid gap-8 lg:grid-cols-3">
      {/* QUICK LINKS */}
      <div className="lg:col-span-2">
        <h2 className="mb-6 text-xl font-serif text-[#1e293b]">
          Quick Access
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quickLinks.map((l) => (
            <Link key={l.path} to={l.path}>
              <GlassCard hover className="flex flex-col items-center gap-3 py-8 text-center border-[#e2e8f0] bg-white">
                <div className="h-10 w-10 rounded-lg bg-[#1e293b] flex items-center justify-center text-white">
                  <l.icon className="h-5 w-5" />
                </div>
                <span className="text-sm font-semibold text-[#1e293b] font-sans">
                  {l.label}
                </span>
                <span className="text-xs text-[#64748b] px-4">
                  {l.desc}
                </span>
              </GlassCard>
            </Link>
          ))}
        </div>
      </div>

      {/* ACTIVITY */}
      <div>
        <h2 className="mb-6 text-xl font-serif text-[#1e293b]">
          Recent Activity
        </h2>

        <GlassCard className="space-y-6 border-[#e2e8f0] bg-white p-6">
          {recentActivity.map((a, i) => (
            <div key={i} className="flex items-center justify-between gap-4 border-b border-[#f1f5f9] pb-4 last:border-0 last:pb-0">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-[#1e293b]">
                  {a.text}
                </p>
                <p className="text-[11px] text-[#94a3b8] mt-1">
                  {a.time}
                </p>
              </div>
              <StatusBadge variant={a.variant} className="text-[10px] uppercase tracking-tight">
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
// import AppLayout from "../../components/AppLayout";
// import GlassCard from "../../components/GlassCard";
// import StatusBadge from "../../components/StatusBadge";
// import { Link } from "react-router-dom";
// import {
//   MessageSquareWarning,
//   GraduationCap,
//   Briefcase,
//   Car,
//   Search,
//   AlertTriangle,
//   Users,
// } from "lucide-react";

// const stats = [
//   { label: "Active Grievances", value: "12", icon: MessageSquareWarning, color: "text-[#1e293b]" },
//   { label: "Courses Enrolled", value: "6", icon: GraduationCap, color: "text-[#1e293b]" },
//   { label: "Open Opportunities", value: "24", icon: Briefcase, color: "text-[#1e293b]" },
//   { label: "Campus Users", value: "1.2k", icon: Users, color: "text-[#1e293b]" },
// ];

// const quickLinks = [
//   { label: "File Grievance", path: "../grievances", icon: MessageSquareWarning, desc: "Submit & track issues" },
//   { label: "My Courses", path: "../academics", icon: GraduationCap, desc: "Courses & credits" },
//   { label: "Internships", path: "../opportunities", icon: Briefcase, desc: "Find gigs & internships" },

//   // ✅ THIS IS THE SAFE CARAVAN LINK
//   { label: "Ride Share", path: "../caravan", icon: Car, desc: "Share campus rides" },

//   { label: "Lost & Found", path: "../lost-found", icon: Search, desc: "Report or find items" },
//   { label: "SOS Flare", path: "../sos", icon: AlertTriangle, desc: "Emergency alerts" },
// ];

// const recentActivity = [
//   { text: "Grievance #104 resolved", badge: "Resolved", variant: "success", time: "2h ago" },
//   { text: "New internship: Google SWE", badge: "New", variant: "info", time: "5h ago" },
//   { text: "Lost item claimed: AirPods", badge: "Claimed", variant: "warning", time: "1d ago" },
//   { text: "SOS: Water outage Block C", badge: "Active", variant: "danger", time: "1d ago" },
// ];

// const StudentNav = () => (
//   <div className="flex gap-6 font-sans text-sm font-medium">
//     <Link to="/student/dashboard" className="text-[#1e293b] hover:text-blue-800 transition-colors">Dashboard</Link>
//     <Link to="/student/academics" className="text-[#64748b] hover:text-[#1e293b] transition-colors">Academics</Link>
//     <Link to="/student/grievances" className="text-[#64748b] hover:text-[#1e293b] transition-colors">Grievances</Link>
//     <Link to="/student/opportunities" className="text-[#64748b] hover:text-[#1e293b] transition-colors">Opportunities</Link>
//   </div>
// );

// const StudentDashboard = () => (
//   <AppLayout navigation={<StudentNav />}>

//     {/* HEADER */}
//     <div className="mb-10 text-center lg:text-left">
//       <h1 className="text-4xl font-serif text-[#1e293b] mb-2">
//         Good morning, <span className="text-blue-800">Student</span>
//       </h1>
//       <p className="text-[#64748b] font-sans">
//         A safe and transparent platform to manage your campus life.
//       </p>
//     </div>

//     {/* STATS */}
//     <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
//       {stats.map((s) => (
//         <GlassCard key={s.label} className="border-[#e2e8f0] bg-white shadow-sm transition-all hover:shadow-md">
//           <div className="flex items-center justify-between p-2">
//             <div>
//               <p className="text-[10px] uppercase tracking-wider font-semibold text-[#94a3b8]">{s.label}</p>
//               <p className="mt-1 text-3xl font-serif text-[#1e293b]">
//                 {s.value}
//               </p>
//             </div>
//             <div className="h-12 w-12 rounded-xl bg-[#f1f5f9] flex items-center justify-center">
//               <s.icon className={`h-6 w-6 ${s.color}`} />
//             </div>
//           </div>
//         </GlassCard>
//       ))}
//     </div>

//     <div className="grid gap-8 lg:grid-cols-3">

//       {/* QUICK LINKS */}
//       <div className="lg:col-span-2">
//         <h2 className="mb-6 text-xl font-serif text-[#1e293b]">
//           Quick Access
//         </h2>

//         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
//           {quickLinks.map((l) => (
//             <Link key={l.path} to={l.path}>
//               <GlassCard hover className="flex flex-col items-center gap-3 py-8 text-center border-[#e2e8f0] bg-white">
//                 <div className="h-10 w-10 rounded-lg bg-blue-900 flex items-center justify-center text-white">
//                   <l.icon className="h-5 w-5" />
//                 </div>
//                 <span className="text-sm font-semibold text-[#1e293b] font-sans">
//                   {l.label}
//                 </span>
//                 <span className="text-xs text-[#64748b] px-4">
//                   {l.desc}
//                 </span>
//               </GlassCard>
//             </Link>
//           ))}
//         </div>
//       </div>

//       {/* ACTIVITY */}
//       <div>
//         <h2 className="mb-6 text-xl font-serif text-[#1e293b]">
//           Recent Activity
//         </h2>

//         <GlassCard className="space-y-6 border-[#e2e8f0] bg-white p-6">
//           {recentActivity.map((a, i) => (
//             <div key={i} className="flex items-center justify-between gap-4 border-b border-[#f1f5f9] pb-4 last:border-0 last:pb-0">
//               <div className="min-w-0">
//                 <p className="truncate text-sm font-medium text-[#1e293b]">
//                   {a.text}
//                 </p>
//                 <p className="text-[11px] text-[#94a3b8] mt-1">
//                   {a.time}
//                 </p>
//               </div>
//               <StatusBadge variant={a.variant} className="text-[10px] uppercase tracking-tight">
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