// // // #frontend/src/pages/admin/AdminDashboard
// // import AppLayout from "../../components/AppLayout";
// // import GlassCard from "../../components/GlassCard";
// // import {
// //   Users,
// //   Shield,
// //   Activity,
// //   Server,
// //   BarChart3,
// // } from "lucide-react";

// // const stats = [
// //   { label: "Total Users", value: "1,248", icon: Users, color: "text-blue-700" },
// //   { label: "Active Sessions", value: "312", icon: Activity, color: "text-indigo-600" },
// //   { label: "System Health", value: "99.9%", icon: Server, color: "text-emerald-600" },
// //   { label: "Security Alerts", value: "1", icon: Shield, color: "text-red-600" },
// // ];

// // const AdminDashboard = () => (
// //   <AppLayout>
// //     <div className="mb-8">
// //       <h1 className="text-3xl font-bold text-blue-800">
// //         Admin Dashboard
// //       </h1>
// //       <p className="mt-1 text-gray-500">
// //         Full system control and governance.
// //       </p>
// //     </div>

// //     <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
// //       {stats.map((s) => (
// //         <GlassCard key={s.label} hover>
// //           <div className="flex items-center justify-between">
// //             <div>
// //               <p className="text-xs text-gray-500">{s.label}</p>
// //               <p className="mt-1 text-2xl font-bold text-gray-800">
// //                 {s.value}
// //               </p>
// //             </div>
// //             <s.icon className={`h-8 w-8 ${s.color}`} />
// //           </div>
// //         </GlassCard>
// //       ))}
// //     </div>

// //     <div className="mt-8 grid gap-6 md:grid-cols-2">
// //       <GlassCard>
// //         <h3 className="font-semibold text-blue-800 mb-3">
// //           Role Distribution
// //         </h3>
// //         <div className="text-sm text-gray-500">
// //           Students: 980 <br />
// //           Faculty: 124 <br />
// //           Authority: 32 <br />
// //           Admin: 12
// //         </div>
// //       </GlassCard>

// //       <GlassCard>
// //         <h3 className="font-semibold text-blue-800 mb-3">
// //           Activity Logs
// //         </h3>
// //         <div className="text-sm text-gray-500">
// //           Recent login activity and system actions will appear here.
// //         </div>
// //       </GlassCard>
// //     </div>
// //   </AppLayout>
// // );

// // export default AdminDashboard;
// // #frontend/src/pages/admin/AdminDashboard.jsx
// import AppLayout from "../../components/AppLayout";
// import GlassCard from "../../components/GlassCard";
// import StatusBadge from "../../components/StatusBadge";
// import { Link } from "react-router-dom";
// import {
//   Users,
//   Shield,
//   Activity,
//   Server,
//   BarChart3,
//   UserPlus,
//   Settings,
//   Database,
//   Lock,
//   Bell,
//   FileText,
//   TrendingUp,
// } from "lucide-react";

// const stats = [
//   { label: "Total Users", value: "1,248", icon: Users, color: "text-blue-700" },
//   { label: "Active Sessions", value: "312", icon: Activity, color: "text-indigo-600" },
//   { label: "System Health", value: "99.9%", icon: Server, color: "text-emerald-600" },
//   { label: "Security Alerts", value: "1", icon: Shield, color: "text-red-600" },
// ];

// const quickLinks = [
//   { label: "User Management", path: "/admin/users", icon: Users, desc: "Add/edit users" },
//   { label: "System Logs", path: "/admin/logs", icon: FileText, desc: "Activity audit" },
//   { label: "Security", path: "/admin/security", icon: Lock, desc: "Manage access" },
//   { label: "Analytics", path: "/admin/analytics", icon: BarChart3, desc: "View metrics" },
//   { label: "Database", path: "/admin/database", icon: Database, desc: "Manage data" },
//   { label: "Settings", path: "/admin/settings", icon: Settings, desc: "System config" },
// ];

// const recentActivity = [
//   { text: "New user registered: faculty@iitmandi.ac.in", badge: "New", variant: "info", time: "10m ago" },
//   { text: "System backup completed", badge: "Success", variant: "success", time: "1h ago" },
//   { text: "Security alert: Failed login attempt", badge: "Alert", variant: "danger", time: "2h ago" },
//   { text: "Database optimization complete", badge: "Done", variant: "success", time: "3h ago" },
// ];

// const roleDistribution = [
//   { role: "Students", count: 980, percentage: 78.5, color: "bg-blue-600" },
//   { role: "Faculty", count: 124, percentage: 9.9, color: "bg-indigo-600" },
//   { role: "Authority", count: 32, percentage: 2.6, color: "bg-purple-600" },
//   { role: "Admin", count: 12, percentage: 1.0, color: "bg-emerald-600" },
// ];

// const systemMetrics = [
//   { metric: "API Response Time", value: "124ms", status: "good" },
//   { metric: "Database Load", value: "45%", status: "good" },
//   { metric: "Memory Usage", value: "62%", status: "warning" },
//   { metric: "Disk Space", value: "78%", status: "warning" },
// ];

// const recentLogins = [
//   { user: "student@students.iitmandi.ac.in", role: "Student", time: "5m ago", status: "success" },
//   { user: "faculty@faculty.iitmandi.ac.in", role: "Faculty", time: "12m ago", status: "success" },
//   { user: "admin@iitmandi.ac.in", role: "Admin", time: "1h ago", status: "success" },
//   { user: "unknown@gmail.com", role: "Unknown", time: "2h ago", status: "failed" },
// ];

// const AdminDashboard = () => (
//   <AppLayout>
//     <div className="mb-8">
//       <h1 className="text-3xl font-bold text-blue-800">
//         Good morning, <span className="text-indigo-700">Administrator</span>
//       </h1>
//       <p className="mt-1 text-gray-500">
//         Full system control and governance.
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

//       {/* Recent Activity */}
//       <div>
//         <h2 className="mb-4 text-lg font-semibold text-blue-800">
//           System Activity
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

//     {/* Role Distribution & System Health */}
//     <div className="mt-8 grid gap-6 lg:grid-cols-2">
//       {/* Role Distribution */}
//       <div>
//         <h2 className="mb-4 text-lg font-semibold text-blue-800">
//           Role Distribution
//         </h2>
//         <GlassCard className="space-y-4">
//           {roleDistribution.map((role, i) => (
//             <div key={i}>
//               <div className="flex justify-between items-center mb-2">
//                 <span className="text-sm font-medium text-gray-800">{role.role}</span>
//                 <span className="text-sm text-gray-600">{role.count} ({role.percentage}%)</span>
//               </div>
//               <div className="w-full bg-gray-200 rounded-full h-2">
//                 <div 
//                   className={`${role.color} h-2 rounded-full`}
//                   style={{ width: `${role.percentage}%` }}
//                 />
//               </div>
//             </div>
//           ))}
//         </GlassCard>
//       </div>

//       {/* System Metrics */}
//       <div>
//         <h2 className="mb-4 text-lg font-semibold text-blue-800">
//           System Health
//         </h2>
//         <GlassCard className="space-y-3">
//           {systemMetrics.map((metric, i) => (
//             <div key={i} className="flex items-center justify-between">
//               <span className="text-sm text-gray-800">{metric.metric}</span>
//               <div className="flex items-center gap-2">
//                 <span className="text-sm font-medium text-gray-800">{metric.value}</span>
//                 <div className={`h-2 w-2 rounded-full ${
//                   metric.status === 'good' ? 'bg-emerald-600' :
//                   metric.status === 'warning' ? 'bg-amber-500' : 'bg-red-600'
//                 }`} />
//               </div>
//             </div>
//           ))}
//         </GlassCard>
//       </div>
//     </div>

//     {/* Recent Logins */}
//     <div className="mt-8">
//       <h2 className="mb-4 text-lg font-semibold text-blue-800">
//         Recent Login Activity
//       </h2>
//       <GlassCard>
//         <div className="space-y-3">
//           {recentLogins.map((login, i) => (
//             <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
//               <div className="flex items-center gap-3">
//                 <Users className="h-4 w-4 text-gray-400" />
//                 <div>
//                   <p className="text-sm font-medium text-gray-800">{login.user}</p>
//                   <p className="text-xs text-gray-500">{login.role}</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-3">
//                 <span className="text-xs text-gray-500">{login.time}</span>
//                 <StatusBadge variant={login.status === 'success' ? 'success' : 'danger'}>
//                   {login.status}
//                 </StatusBadge>
//               </div>
//             </div>
//           ))}
//         </div>
//       </GlassCard>
//     </div>
//   </AppLayout>
// );

// export default AdminDashboard;

// #frontend/src/pages/admin/AdminDashboard.jsx
import AppLayout from "../../components/AppLayout";
import GlassCard from "../../components/GlassCard";
import StatusBadge from "../../components/StatusBadge";
import { Link } from "react-router-dom";
import {
  Users,
  Shield,
  Activity,
  Server,
  BarChart3,
  UserPlus,
  Settings,
  Database,
  Lock,
  Bell,
  FileText,
  TrendingUp,
} from "lucide-react";

const stats = [
  { label: "Total Users", value: "1,248", icon: Users, color: "text-blue-700" },
  { label: "Active Sessions", value: "312", icon: Activity, color: "text-indigo-600" },
  { label: "System Health", value: "99.9%", icon: Server, color: "text-emerald-600" },
  { label: "Security Alerts", value: "1", icon: Shield, color: "text-red-600" },
];

const quickLinks = [
  { label: "User Management", path: "/admin/users", icon: Users, desc: "Add/edit users" },
  { label: "System Logs", path: "/admin/logs", icon: FileText, desc: "Activity audit" },
  { label: "Security", path: "/admin/security", icon: Lock, desc: "Manage access" },
  { label: "Analytics", path: "/admin/analytics", icon: BarChart3, desc: "View metrics" },
  { label: "Database", path: "/admin/database", icon: Database, desc: "Manage data" },
  { label: "Settings", path: "/admin/settings", icon: Settings, desc: "System config" },
];

const recentActivity = [
  { text: "New user registered: faculty@iitmandi.ac.in", badge: "New", variant: "info", time: "10m ago" },
  { text: "System backup completed", badge: "Success", variant: "success", time: "1h ago" },
  { text: "Security alert: Failed login attempt", badge: "Alert", variant: "danger", time: "2h ago" },
  { text: "Database optimization complete", badge: "Done", variant: "success", time: "3h ago" },
];

const roleDistribution = [
  { role: "Students", count: 980, percentage: 78.5, color: "bg-blue-600" },
  { role: "Faculty", count: 124, percentage: 9.9, color: "bg-indigo-600" },
  { role: "Authority", count: 32, percentage: 2.6, color: "bg-purple-600" },
  { role: "Admin", count: 12, percentage: 1.0, color: "bg-emerald-600" },
];

const systemMetrics = [
  { metric: "API Response Time", value: "124ms", status: "good" },
  { metric: "Database Load", value: "45%", status: "good" },
  { metric: "Memory Usage", value: "62%", status: "warning" },
  { metric: "Disk Space", value: "78%", status: "warning" },
];

const recentLogins = [
  { user: "student@students.iitmandi.ac.in", role: "Student", time: "5m ago", status: "success" },
  { user: "faculty@faculty.iitmandi.ac.in", role: "Faculty", time: "12m ago", status: "success" },
  { user: "admin@iitmandi.ac.in", role: "Admin", time: "1h ago", status: "success" },
  { user: "unknown@gmail.com", role: "Unknown", time: "2h ago", status: "failed" },
];

// Admin-specific navigation
const AdminNav = () => (
  <>
    <Link to="/admin/dashboard" className="hover:text-blue-600 transition">
      Dashboard
    </Link>
    <Link to="/admin/users" className="hover:text-blue-600 transition">
      Users
    </Link>
    <Link to="/admin/security" className="hover:text-blue-600 transition">
      Security
    </Link>
    <Link to="/admin/analytics" className="hover:text-blue-600 transition">
      Analytics
    </Link>
    <Link to="/admin/database" className="hover:text-blue-600 transition">
      Database
    </Link>
    <Link to="/admin/logs" className="hover:text-blue-600 transition">
      Logs
    </Link>
    <Link to="/admin/settings" className="hover:text-blue-600 transition">
      Settings
    </Link>
  </>
);

const AdminDashboard = () => (
  <AppLayout navigation={<AdminNav />}>
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-blue-800">
        Good morning, <span className="text-indigo-700">Administrator</span>
      </h1>
      <p className="mt-1 text-gray-500">
        Full system control and governance.
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

      {/* Recent Activity */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-blue-800">
          System Activity
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

    {/* Role Distribution & System Health */}
    <div className="mt-8 grid gap-6 lg:grid-cols-2">
      {/* Role Distribution */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-blue-800">
          Role Distribution
        </h2>
        <GlassCard className="space-y-4">
          {roleDistribution.map((role, i) => (
            <div key={i}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-800">{role.role}</span>
                <span className="text-sm text-gray-600">{role.count} ({role.percentage}%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`${role.color} h-2 rounded-full`}
                  style={{ width: `${role.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </GlassCard>
      </div>

      {/* System Metrics */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-blue-800">
          System Health
        </h2>
        <GlassCard className="space-y-3">
          {systemMetrics.map((metric, i) => (
            <div key={i} className="flex items-center justify-between">
              <span className="text-sm text-gray-800">{metric.metric}</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-800">{metric.value}</span>
                <div className={`h-2 w-2 rounded-full ${
                  metric.status === 'good' ? 'bg-emerald-600' :
                  metric.status === 'warning' ? 'bg-amber-500' : 'bg-red-600'
                }`} />
              </div>
            </div>
          ))}
        </GlassCard>
      </div>
    </div>

    {/* Recent Logins */}
    <div className="mt-8">
      <h2 className="mb-4 text-lg font-semibold text-blue-800">
        Recent Login Activity
      </h2>
      <GlassCard>
        <div className="space-y-3">
          {recentLogins.map((login, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
              <div className="flex items-center gap-3">
                <Users className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-800">{login.user}</p>
                  <p className="text-xs text-gray-500">{login.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-500">{login.time}</span>
                <StatusBadge variant={login.status === 'success' ? 'success' : 'danger'}>
                  {login.status}
                </StatusBadge>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  </AppLayout>
);

export default AdminDashboard;