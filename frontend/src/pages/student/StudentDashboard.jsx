import AppLayout from "../../components/AppLayout";
import GlassCard from "../../components/GlassCard";
import StatusBadge from "../../components/StatusBadge";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { createClient } from "@supabase/supabase-js";
import { MessageSquareWarning, GraduationCap, Briefcase, Car, Calendar, BookOpen, ClipboardList, AlertCircle } from "lucide-react";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/student-opportunities`;

const TYPE_STYLES = {
  exam:     { bg: "bg-red-50",    text: "text-red-600",    dot: "bg-red-400",    label: "Exam",     icon: BookOpen },
  deadline: { bg: "bg-amber-50",  text: "text-amber-600",  dot: "bg-amber-400",  label: "Deadline", icon: AlertCircle },
  task:     { bg: "bg-blue-50",   text: "text-blue-600",   dot: "bg-blue-400",   label: "Task",     icon: ClipboardList },
  lecture:  { bg: "bg-purple-50", text: "text-purple-600", dot: "bg-purple-400", label: "Lecture",  icon: Calendar },
  other:    { bg: "bg-teal-50",   text: "text-teal-600",   dot: "bg-teal-400",   label: "Event",    icon: Calendar },
};

const getStyle = (type) => TYPE_STYLES[type] || TYPE_STYLES.other;

const quickLinks = [
  { label: "File Grievance",  path: "/student/grievances",   icon: MessageSquareWarning, desc: "Submit & track issues" },
  { label: "My Courses",      path: "/student/courses",      icon: GraduationCap,        desc: "Courses & credits" },
  { label: "Internships",     path: "/student/opportunities",icon: Briefcase,            desc: "Find gigs & internships" },
  { label: "Ride Share",      path: "/student/caravan",      icon: Car,                  desc: "Share campus rides" },
];

const StudentNav = () => (
  <div className="flex gap-6 font-sans text-sm font-medium">
    <Link to="/student/dashboard"     className="text-[#1e293b] hover:text-[#38b2ac]">Dashboard</Link>
    <Link to="/student/calendar"      className="text-[#64748b] hover:text-[#1e293b]">Calendar</Link>
    <Link to="/student/courses"       className="text-[#64748b] hover:text-[#1e293b]">Courses</Link>
    <Link to="/student/attendance"    className="text-[#64748b] hover:text-[#1e293b]">Attendance</Link>
    <Link to="/student/grievances"    className="text-[#64748b] hover:text-[#1e293b]">Grievances</Link>
    <Link to="/student/opportunities" className="text-[#64748b] hover:text-[#1e293b]">Opportunities</Link>
  </div>
);

const StudentDashboard = () => {

  const [stats, setStats] = useState([
    { label: "Active Grievances",  value: "0", icon: MessageSquareWarning, color: "text-[#1e293b]", path: "/student/grievances" },
    { label: "Courses Enrolled",   value: "0", icon: GraduationCap,        color: "text-[#1e293b]", path: "/student/courses" },
    { label: "Open Opportunities", value: "0", icon: Briefcase,            color: "text-[#1e293b]", path: "/student/opportunities" },
  ]);

  const [userId, setUserId]       = useState(null);
  const [upcoming, setUpcoming]   = useState([]);
  const [activity, setActivity]   = useState([]);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) setUserId(user.id);
    };
    getUser();
  }, []);

  useEffect(() => {
    const fetchDashboard = async () => {
      if (!userId) return;
      try {
        const [upcomingRes, actRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_BASE_URL}/dashboard/upcoming/${userId}`),
          axios.get(`${import.meta.env.VITE_API_BASE_URL}/dashboard/activity/${userId}`),
        ]);
        setUpcoming(upcomingRes.data);
        setActivity(actRes.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchDashboard();
  }, [userId]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        let oppCount = 0, grievanceCount = 0, courseCount = 0;

        const oppRes = await axios.get(`${BASE_URL}/`);
        oppCount = oppRes.data?.length || 0;

        if (userId) {
          const { data: grievances } = await supabase
            .from("grievances").select("id").eq("user_id", userId);
          grievanceCount = grievances?.length || 0;

          const courseRes = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/student-courses/details/${userId}`
          );
          courseCount = courseRes.data?.length || 0;
        }

        setStats(prev => prev.map(s => {
          if (s.label === "Open Opportunities")  return { ...s, value: oppCount };
          if (s.label === "Active Grievances")   return { ...s, value: grievanceCount };
          if (s.label === "Courses Enrolled")    return { ...s, value: courseCount };
          return s;
        }));
      } catch (err) {
        console.error("Stats fetch failed:", err);
      }
    };
    fetchStats();
  }, [userId]);

  return (
    <AppLayout navigation={<StudentNav />}>

      {/* HEADER */}
      <div className="mb-10 text-center lg:text-left">
        <h1 className="text-4xl font-serif text-[#1e293b] mb-2">
          Hello, <span className="text-[#1e293b]">Student</span>
        </h1>
      </div>

      {/* STATS */}
      <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((s) => {
          const Card = (
            <GlassCard key={s.label} className="border-[#e2e8f0] bg-white shadow-sm hover:shadow-md cursor-pointer">
              <div className="flex items-center justify-between p-2">
                <div>
                  <p className="text-[10px] uppercase tracking-wider font-semibold text-[#94a3b8]">{s.label}</p>
                  <p className="mt-1 text-3xl font-serif text-[#1e293b]">{s.value}</p>
                </div>
                <div className="h-12 w-12 rounded-xl bg-[#f1f5f9] flex items-center justify-center">
                  <s.icon className={`h-6 w-6 ${s.color}`} />
                </div>
              </div>
            </GlassCard>
          );
          return s.path ? <Link key={s.label} to={s.path}>{Card}</Link> : Card;
        })}
      </div>

      {/* UPCOMING EVENTS */}
      <GlassCard className="border-[#e2e8f0] bg-white p-6 mb-10">

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-serif text-[#1e293b] flex items-center gap-2">
            <Calendar className="h-5 w-5 text-[#38b2ac]" />
            Upcoming This Week
          </h2>
          <Link to="/student/calendar">
            <button className="text-[#38b2ac] text-sm hover:underline">
              View Calendar →
            </button>
          </Link>
        </div>

        <div className="space-y-3">
          {upcoming.length === 0 ? (
            <p className="text-sm text-[#64748b]">No upcoming events this week</p>
          ) : (
            upcoming.map((n, i) => {
              const s = getStyle(n.type);
              const IconComp = s.icon;
              return (
                <div key={i} className={`flex items-center justify-between p-3 rounded-lg ${s.bg}`}>
                  <div className="flex items-center gap-3">
                    <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${s.bg}`}>
                      <IconComp className={`h-4 w-4 ${s.text}`} />
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${s.text}`}>{n.text}</p>
                      {n.course && <p className="text-xs text-[#94a3b8]">{n.course}</p>}
                    </div>
                  </div>
                  <span className="text-xs text-[#94a3b8] whitespace-nowrap ml-4">
                    {new Date(n.time).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                  </span>
                </div>
              );
            })
          )}
        </div>

      </GlassCard>

      {/* QUICK LINKS + ACTIVITY */}
      <div className="grid gap-8 lg:grid-cols-3">

        {/* QUICK LINKS */}
        <div className="lg:col-span-2">
          <h2 className="mb-6 text-xl font-serif text-[#1e293b]">Quick Access</h2>
          <div className="grid grid-cols-2 gap-4">
            {quickLinks.map((l) => (
              <Link key={l.path} to={l.path}>
                <GlassCard className="flex flex-col items-center gap-3 py-8 text-center border-[#e2e8f0] bg-white">
                  <div className="h-10 w-10 rounded-lg bg-[#1e293b] flex items-center justify-center text-white">
                    <l.icon className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-semibold text-[#1e293b]">{l.label}</span>
                  <span className="text-xs text-[#64748b] px-4">{l.desc}</span>
                </GlassCard>
              </Link>
            ))}
          </div>
        </div>

        {/* RECENT ACTIVITY */}
        <div>
          <h2 className="mb-6 text-xl font-serif text-[#1e293b]">Recent Activity</h2>
          <GlassCard className="space-y-6 border-[#e2e8f0] bg-white p-6">
            {activity.length === 0 ? (
              <p className="text-sm text-[#64748b]">No recent activity</p>
            ) : (
              activity.map((a, i) => (
                <div key={i} className="flex items-center justify-between gap-4 border-b border-[#f1f5f9] pb-4 last:border-0">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-[#1e293b]">{a.text}</p>
                    <p className="text-[11px] text-[#94a3b8] mt-1">{new Date(a.time).toLocaleString()}</p>
                  </div>
                  <StatusBadge variant={a.variant}>{a.badge}</StatusBadge>
                </div>
              ))
            )}
          </GlassCard>
        </div>

      </div>

    </AppLayout>
  );
};

export default StudentDashboard;