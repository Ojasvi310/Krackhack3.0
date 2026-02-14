// // // #frontend/arc/pages/auhority/FacultyDashboard
// // import AppLayout from "../../components/AppLayout";
// // import GlassCard from "../../components/GlassCard";
// // import StatusBadge from "../../components/StatusBadge";
// // import {
// //   Upload,
// //   CalendarPlus,
// //   Users,
// //   BookOpen,
// //   ClipboardList,
// //   BarChart3,
// // } from "lucide-react";

// // const stats = [
// //   { label: "Active Courses", value: "4", icon: BookOpen, color: "text-blue-700" },
// //   { label: "Total Enrollments", value: "186", icon: Users, color: "text-indigo-600" },
// //   { label: "Pending Verifications", value: "3", icon: ClipboardList, color: "text-amber-500" },
// //   { label: "Avg Attendance", value: "82%", icon: BarChart3, color: "text-emerald-600" },
// // ];

// // const FacultyDashboard = () => (
// //   <AppLayout>
// //     <div className="mb-8">
// //       <h1 className="text-3xl font-bold text-blue-800">
// //         Faculty Dashboard
// //       </h1>
// //       <p className="mt-1 text-gray-500">
// //         Manage courses, resources and academic engagement.
// //       </p>
// //     </div>

// //     {/* Stats */}
// //     <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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

// //     {/* Actions */}
// //     <div className="grid gap-6 md:grid-cols-2">
// //       <GlassCard hover className="flex items-center gap-4">
// //         <Upload className="h-8 w-8 text-blue-700" />
// //         <div>
// //           <h3 className="font-semibold text-gray-800">Upload Resources</h3>
// //           <p className="text-xs text-gray-500">
// //             Share verified study materials
// //           </p>
// //         </div>
// //       </GlassCard>

// //       <GlassCard hover className="flex items-center gap-4">
// //         <CalendarPlus className="h-8 w-8 text-indigo-600" />
// //         <div>
// //           <h3 className="font-semibold text-gray-800">Create Events</h3>
// //           <p className="text-xs text-gray-500">
// //             Schedule academic or department events
// //           </p>
// //         </div>
// //       </GlassCard>
// //     </div>
// //   </AppLayout>
// // );

// // export default FacultyDashboard;
// // #frontend/src/pages/faculty/FacultyDashboard.jsx
// import AppLayout from "../../components/AppLayout";
// import GlassCard from "../../components/GlassCard";
// import StatusBadge from "../../components/StatusBadge";
// import { Link } from "react-router-dom";
// import {
//   Upload,
//   CalendarPlus,
//   Users,
//   BookOpen,
//   ClipboardList,
//   BarChart3,
//   Briefcase,
//   MessageSquare,
//   FileText,
//   TrendingUp,
// } from "lucide-react";

// const stats = [
//   { label: "Active Courses", value: "4", icon: BookOpen, color: "text-blue-700" },
//   { label: "Total Enrollments", value: "186", icon: Users, color: "text-indigo-600" },
//   { label: "Open Opportunities", value: "5", icon: Briefcase, color: "text-purple-600" },
//   { label: "Avg Attendance", value: "82%", icon: BarChart3, color: "text-emerald-600" },
// ];

// const quickLinks = [
//   { label: "Upload Resources", path: "/faculty/upload-resources", icon: Upload, desc: "Share study materials" },
//   { label: "Post Opportunity", path: "/faculty/post-opportunity", icon: Briefcase, desc: "Create internship post" },
//   { label: "Create Event", path: "/faculty/create-event", icon: CalendarPlus, desc: "Schedule academic event" },
//   { label: "View Applicants", path: "/faculty/applications", icon: ClipboardList, desc: "Review applications" },
//   { label: "Course Analytics", path: "/faculty/analytics", icon: TrendingUp, desc: "Track performance" },
//   { label: "Announcements", path: "/faculty/announcements", icon: MessageSquare, desc: "Post updates" },
// ];

// const recentActivity = [
//   { text: "New application: CS201 Research", badge: "New", variant: "info", time: "1h ago" },
//   { text: "Resource uploaded: MA102 Notes", badge: "Published", variant: "success", time: "3h ago" },
//   { text: "Event created: Guest Lecture", badge: "Scheduled", variant: "warning", time: "5h ago" },
//   { text: "Course CS301 enrollment: 45/50", badge: "Active", variant: "info", time: "1d ago" },
// ];

// const activeCourses = [
//   { code: "CS201", name: "Data Structures", enrolled: 48, capacity: 50, attendance: 85 },
//   { code: "CS301", name: "Algorithms", enrolled: 45, capacity: 50, attendance: 88 },
//   { code: "CS401", name: "Machine Learning", enrolled: 42, capacity: 45, attendance: 92 },
// ];

// const FacultyDashboard = () => (
//   <AppLayout>
//     <div className="mb-8">
//       <h1 className="text-3xl font-bold text-blue-800">
//         Good morning, <span className="text-indigo-700">Professor</span>
//       </h1>
//       <p className="mt-1 text-gray-500">
//         Manage courses, opportunities, and academic engagement.
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

//     {/* Active Courses */}
//     <div className="mt-8">
//       <h2 className="mb-4 text-lg font-semibold text-blue-800">
//         My Active Courses
//       </h2>
//       <div className="grid gap-4 md:grid-cols-3">
//         {activeCourses.map((course) => (
//           <GlassCard key={course.code} hover>
//             <div className="flex items-center gap-3 mb-3">
//               <BookOpen className="h-5 w-5 text-blue-700" />
//               <div>
//                 <h3 className="font-semibold text-gray-800">{course.code}</h3>
//                 <p className="text-sm text-gray-500">{course.name}</p>
//               </div>
//             </div>
//             <div className="space-y-2">
//               <div className="flex justify-between text-sm">
//                 <span className="text-gray-600">Enrolled</span>
//                 <span className="font-medium text-gray-800">
//                   {course.enrolled}/{course.capacity}
//                 </span>
//               </div>
//               <div className="flex justify-between text-sm">
//                 <span className="text-gray-600">Attendance</span>
//                 <span className="font-medium text-emerald-600">
//                   {course.attendance}%
//                 </span>
//               </div>
//             </div>
//           </GlassCard>
//         ))}
//       </div>
//     </div>
//   </AppLayout>
// );

// export default FacultyDashboard;

// #frontend/src/pages/faculty/FacultyDashboard.jsx
import AppLayout from "../../components/AppLayout";
import GlassCard from "../../components/GlassCard";
import StatusBadge from "../../components/StatusBadge";
import { Link } from "react-router-dom";
import {
  Upload,
  CalendarPlus,
  Users,
  BookOpen,
  ClipboardList,
  BarChart3,
  Briefcase,
  MessageSquare,
  FileText,
  TrendingUp,
  Search,
  AlertTriangle,
} from "lucide-react";

const stats = [
  { label: "Active Courses", value: "4", icon: BookOpen, color: "text-blue-700" },
  { label: "Total Enrollments", value: "186", icon: Users, color: "text-indigo-600" },
  { label: "Open Opportunities", value: "5", icon: Briefcase, color: "text-purple-600" },
  { label: "Avg Attendance", value: "82%", icon: BarChart3, color: "text-emerald-600" },
];

const quickLinks = [
  { label: "Upload Resources", path: "/faculty/upload-resources", icon: Upload, desc: "Share study materials" },
  { label: "Post Opportunity", path: "/faculty/post-opportunity", icon: Briefcase, desc: "Create internship post" },
  { label: "Create Event", path: "/faculty/create-event", icon: CalendarPlus, desc: "Schedule academic event" },
  { label: "View Applicants", path: "/faculty/applications", icon: ClipboardList, desc: "Review applications" },
  { label: "Course Analytics", path: "/faculty/analytics", icon: TrendingUp, desc: "Track performance" },
  { label: "Announcements", path: "/faculty/announcements", icon: MessageSquare, desc: "Post updates" },
];

const recentActivity = [
  { text: "New application: CS201 Research", badge: "New", variant: "info", time: "1h ago" },
  { text: "Resource uploaded: MA102 Notes", badge: "Published", variant: "success", time: "3h ago" },
  { text: "Event created: Guest Lecture", badge: "Scheduled", variant: "warning", time: "5h ago" },
  { text: "Course CS301 enrollment: 45/50", badge: "Active", variant: "info", time: "1d ago" },
];

const activeCourses = [
  { code: "CS201", name: "Data Structures", enrolled: 48, capacity: 50, attendance: 85 },
  { code: "CS301", name: "Algorithms", enrolled: 45, capacity: 50, attendance: 88 },
  { code: "CS401", name: "Machine Learning", enrolled: 42, capacity: 45, attendance: 92 },
];

// Faculty-specific navigation
const FacultyNav = () => (
  <>
    <Link to="/faculty/dashboard" className="hover:text-blue-600 transition">
      Dashboard
    </Link>
    <Link to="/faculty/courses" className="hover:text-blue-600 transition">
      My Courses
    </Link>
    <Link to="/faculty/upload-resources" className="hover:text-blue-600 transition">
      Resources
    </Link>
    <Link to="/faculty/post-opportunity" className="hover:text-blue-600 transition">
      Opportunities
    </Link>
    <Link to="/faculty/applications" className="hover:text-blue-600 transition">
      Applications
    </Link>
    <Link to="/faculty/lost-found" className="hover:text-blue-600 transition">
      Lost & Found
    </Link>
    <Link to="/faculty/sos" className="hover:text-blue-600 transition">
      SOS
    </Link>
  </>
);

const FacultyDashboard = () => (
  <AppLayout navigation={<FacultyNav />}>
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-blue-800">
        Good morning, <span className="text-indigo-700">Professor</span>
      </h1>
      <p className="mt-1 text-gray-500">
        Manage courses, opportunities, and academic engagement.
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

    {/* Active Courses */}
    <div className="mt-8">
      <h2 className="mb-4 text-lg font-semibold text-blue-800">
        My Active Courses
      </h2>
      <div className="grid gap-4 md:grid-cols-3">
        {activeCourses.map((course) => (
          <GlassCard key={course.code} hover>
            <div className="flex items-center gap-3 mb-3">
              <BookOpen className="h-5 w-5 text-blue-700" />
              <div>
                <h3 className="font-semibold text-gray-800">{course.code}</h3>
                <p className="text-sm text-gray-500">{course.name}</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Enrolled</span>
                <span className="font-medium text-gray-800">
                  {course.enrolled}/{course.capacity}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Attendance</span>
                <span className="font-medium text-emerald-600">
                  {course.attendance}%
                </span>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  </AppLayout>
);

export default FacultyDashboard;