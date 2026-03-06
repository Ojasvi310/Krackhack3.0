import AppLayout from "../../components/AppLayout";
import GlassCard from "../../components/GlassCard";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { createClient } from "@supabase/supabase-js";
import { ChevronLeft, ChevronRight, Calendar, BookOpen, ClipboardList, AlertCircle } from "lucide-react";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const TYPE_STYLES = {
  exam:     { bg: "bg-red-100",    text: "text-red-700",    dot: "bg-red-500",    label: "Exam" },
  assignment: { bg: "bg-amber-100", text: "text-amber-700", dot: "bg-amber-500",  label: "Assignment" },
  task:     { bg: "bg-blue-100",   text: "text-blue-700",   dot: "bg-blue-500",   label: "Task" },
  general:  { bg: "bg-teal-100",   text: "text-teal-700",   dot: "bg-teal-500",   label: "Event" },
  holiday:  { bg: "bg-green-100",  text: "text-green-700",  dot: "bg-green-500",  label: "Holiday" },
};

const getStyle = (type) => TYPE_STYLES[type] || TYPE_STYLES.general;

const StudentNav = () => (
  <div className="flex gap-6 font-sans text-sm font-medium">
    <Link to="/student/dashboard" className="text-[#64748b] hover:text-[#1e293b]">Dashboard</Link>
    <Link to="/student/calendar" className="text-[#1e293b] hover:text-[#38b2ac]">Calendar</Link>
    <Link to="/student/courses" className="text-[#64748b] hover:text-[#1e293b]">Courses</Link>
    <Link to="/student/attendance" className="text-[#64748b] hover:text-[#1e293b]">Attendance</Link>
    <Link to="/student/notifications" className="text-[#64748b] hover:text-[#1e293b]">Notifications</Link>
    <Link to="/student/grievances" className="text-[#64748b] hover:text-[#1e293b]">Grievances</Link>
    <Link to="/student/opportunities" className="text-[#64748b] hover:text-[#1e293b]">Opportunities</Link>
  </div>
);

export default function StudentCalendar() {
  const today = new Date();
  const [current, setCurrent] = useState({ year: today.getFullYear(), month: today.getMonth() });
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/calendar/events/${user.id}`
        );
        setEvents(res.data || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const prevMonth = () => setCurrent(c => {
    if (c.month === 0) return { year: c.year - 1, month: 11 };
    return { ...c, month: c.month - 1 };
  });

  const nextMonth = () => setCurrent(c => {
    if (c.month === 11) return { year: c.year + 1, month: 0 };
    return { ...c, month: c.month + 1 };
  });

  // Build calendar grid
  const firstDay = new Date(current.year, current.month, 1).getDay();
  const daysInMonth = new Date(current.year, current.month + 1, 0).getDate();
  const cells = Array(firstDay).fill(null).concat(
    Array.from({ length: daysInMonth }, (_, i) => i + 1)
  );

  const eventsForDate = (day) => {
    if (!day) return [];
    return events.filter(e => {
      if (!e.date) return false;
      const d = new Date(e.date);
      return d.getFullYear() === current.year &&
             d.getMonth() === current.month &&
             d.getDate() === day;
    });
  };

  const selectedEvents = selectedDate ? eventsForDate(selectedDate) : [];

  const isToday = (day) =>
    day === today.getDate() &&
    current.month === today.getMonth() &&
    current.year === today.getFullYear();

  // Upcoming events (next 7 days)
  const upcoming = events.filter(e => {
    if (!e.date) return false;
    const d = new Date(e.date);
    const diff = (d - today) / (1000 * 60 * 60 * 24);
    return diff >= 0 && diff <= 7;
  }).slice(0, 5);

  return (
    <AppLayout navigation={<StudentNav />}>

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-4xl font-serif text-[#1e293b] mb-1">Academic Calendar</h1>
        <p className="text-sm text-[#64748b]">Your schedule, events and deadlines</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">

        {/* CALENDAR */}
        <div className="lg:col-span-2">
          <GlassCard className="border-[#e2e8f0] bg-white shadow-sm p-6">

            {/* Month navigation */}
            <div className="flex items-center justify-between mb-6">
              <button onClick={prevMonth} className="h-8 w-8 rounded-lg border border-[#e2e8f0] flex items-center justify-center hover:bg-[#f1f5f9] transition-colors">
                <ChevronLeft className="h-4 w-4 text-[#64748b]" />
              </button>
              <h2 className="text-lg font-serif text-[#1e293b]">
                {MONTHS[current.month]} {current.year}
              </h2>
              <button onClick={nextMonth} className="h-8 w-8 rounded-lg border border-[#e2e8f0] flex items-center justify-center hover:bg-[#f1f5f9] transition-colors">
                <ChevronRight className="h-4 w-4 text-[#64748b]" />
              </button>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 mb-2">
              {DAYS.map(d => (
                <div key={d} className="text-center text-[10px] font-semibold uppercase tracking-wider text-[#94a3b8] py-1">
                  {d}
                </div>
              ))}
            </div>

            {/* Calendar cells */}
            <div className="grid grid-cols-7 gap-1">
              {cells.map((day, i) => {
                const dayEvents = eventsForDate(day);
                const selected = selectedDate === day;
                return (
                  <div
                    key={i}
                    onClick={() => day && setSelectedDate(selected ? null : day)}
                    className={`
                      relative min-h-[60px] rounded-lg p-1 cursor-pointer transition-all
                      ${!day ? "" : "hover:bg-[#f8fafc]"}
                      ${isToday(day) ? "ring-2 ring-[#38b2ac] ring-offset-1" : ""}
                      ${selected ? "bg-[#f0fdfa]" : ""}
                    `}
                  >
                    {day && (
                      <>
                        <span className={`
                          text-xs font-medium block text-center w-6 h-6 rounded-full flex items-center justify-center mx-auto
                          ${isToday(day) ? "bg-[#38b2ac] text-white" : "text-[#1e293b]"}
                        `}>
                          {day}
                        </span>
                        <div className="mt-1 space-y-0.5">
                          {dayEvents.slice(0, 2).map((e, j) => (
                            <div key={j} className={`text-[9px] truncate px-1 py-0.5 rounded ${getStyle(e.type).bg} ${getStyle(e.type).text} font-medium`}>
                              {e.title}
                            </div>
                          ))}
                          {dayEvents.length > 2 && (
                            <div className="text-[9px] text-[#94a3b8] text-center">
                              +{dayEvents.length - 2} more
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="mt-4 pt-4 border-t border-[#f1f5f9] flex flex-wrap gap-3">
              {Object.entries(TYPE_STYLES).map(([key, val]) => (
                <div key={key} className="flex items-center gap-1.5">
                  <div className={`h-2 w-2 rounded-full ${val.dot}`} />
                  <span className="text-[10px] text-[#64748b]">{val.label}</span>
                </div>
              ))}
            </div>

          </GlassCard>

          {/* Selected day events */}
          {selectedDate && (
            <GlassCard className="border-[#e2e8f0] bg-white shadow-sm p-6 mt-4">
              <h3 className="text-base font-serif text-[#1e293b] mb-4">
                {MONTHS[current.month]} {selectedDate}, {current.year}
              </h3>
              {selectedEvents.length === 0 ? (
                <p className="text-sm text-[#94a3b8]">No events on this day</p>
              ) : (
                <div className="space-y-3">
                  {selectedEvents.map((e, i) => {
                    const s = getStyle(e.type);
                    return (
                      <div key={i} className={`flex items-start gap-3 p-3 rounded-lg ${s.bg}`}>
                        <div className={`h-2 w-2 rounded-full mt-1.5 flex-shrink-0 ${s.dot}`} />
                        <div>
                          <p className={`text-sm font-semibold ${s.text}`}>{e.title}</p>
                          {e.course && <p className="text-xs text-[#64748b] mt-0.5">Course: {e.course}</p>}
                          {e.priority && <p className="text-xs text-[#64748b] mt-0.5">Priority: {e.priority}</p>}
                          <span className={`text-[10px] uppercase tracking-wider font-semibold ${s.text}`}>{s.label}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </GlassCard>
          )}
        </div>

        {/* SIDEBAR */}
        <div className="space-y-4">

          {/* Upcoming */}
          <GlassCard className="border-[#e2e8f0] bg-white shadow-sm p-6">
            <h3 className="text-base font-serif text-[#1e293b] mb-4 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-[#38b2ac]" />
              Next 7 Days
            </h3>
            {loading ? (
              <p className="text-sm text-[#94a3b8]">Loading...</p>
            ) : upcoming.length === 0 ? (
              <p className="text-sm text-[#94a3b8]">No upcoming events</p>
            ) : (
              <div className="space-y-3">
                {upcoming.map((e, i) => {
                  const s = getStyle(e.type);
                  const d = new Date(e.date);
                  return (
                    <div key={i} className="flex items-start gap-3">
                      <div className="text-center min-w-[36px]">
                        <div className="text-[10px] uppercase text-[#94a3b8] font-semibold">{MONTHS[d.getMonth()].slice(0,3)}</div>
                        <div className="text-lg font-serif text-[#1e293b] leading-none">{d.getDate()}</div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[#1e293b] truncate">{e.title}</p>
                        <span className={`text-[10px] font-semibold uppercase tracking-wider ${s.text}`}>{s.label}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </GlassCard>

          {/* Stats */}
          <GlassCard className="border-[#e2e8f0] bg-white shadow-sm p-6">
            <h3 className="text-base font-serif text-[#1e293b] mb-4">This Month</h3>
            <div className="space-y-3">
              {[
                { label: "Total Events", value: eventsForDate && cells.reduce((acc, day) => acc + eventsForDate(day).length, 0), icon: Calendar },
                { label: "Assignments", value: events.filter(e => e.type === "assignment" && new Date(e.date).getMonth() === current.month).length, icon: ClipboardList },
                { label: "Exams", value: events.filter(e => e.type === "exam" && new Date(e.date).getMonth() === current.month).length, icon: BookOpen },
                { label: "Tasks Due", value: events.filter(e => e.type === "task" && new Date(e.date).getMonth() === current.month).length, icon: AlertCircle },
              ].map((stat, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <stat.icon className="h-3.5 w-3.5 text-[#94a3b8]" />
                    <span className="text-xs text-[#64748b]">{stat.label}</span>
                  </div>
                  <span className="text-sm font-semibold text-[#1e293b]">{stat.value}</span>
                </div>
              ))}
            </div>
          </GlassCard>

        </div>
      </div>

    </AppLayout>
  );
}