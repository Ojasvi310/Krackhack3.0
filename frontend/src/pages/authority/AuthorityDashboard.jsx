import { useState, useEffect } from "react";
import AppLayout from "../../components/AppLayout";
import GlassCard from "../../components/GlassCard";
import StatusBadge from "../../components/StatusBadge";
import { Link } from "react-router-dom";
import { 
  ShieldCheck, 
  Users, 
  BookOpen, 
  Calendar,
  AlertTriangle,
  Clock,
  Upload,
  Bell,
  BarChart3,
  GraduationCap,
  UserCheck,
  Plus,
  ArrowRight
} from "lucide-react";
import AuthorityApi from "../../services/AuthorityApi";

const AuthorityNav = () => (
  <div className="flex gap-6 font-sans text-sm font-medium">
    <Link to="/authority/dashboard" className="text-[#1e293b] hover:text-[#38b2ac] transition-colors">Dashboard</Link>
    <Link to="/authority/Students" className="text-[#64748b] hover:text-[#1e293b] transition-colors">Students</Link>
    <Link to="/authority/courses" className="text-[#64748b] hover:text-[#1e293b]">Courses</Link>
    <Link to="/authority/grievances" className="text-[#64748b] hover:text-[#1e293b]">Grievances</Link>  
    <Link to="/authority/notifications" className="text-[#64748b] hover:text-[#1e293b]">Notifications</Link>
  </div>
);

// Quick actions configuration
const quickActions = [
  { label: "Add New Course", icon: Plus, link: "/authority/courses", color: "bg-blue-600" },
  { label: "Upload Resources", icon: Upload, link: "/authority/resources", color: "bg-green-600" },
  { label: "View Calendar", icon: Calendar, link: "/authority/calendar", color: "bg-purple-600" },
  { label: "Send Notification", icon: Bell, link: "/authority/notifications", color: "bg-orange-600" },
];

export default function AuthorityDashboard() {
  // State for all dashboard data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [authorityData, setAuthorityData] = useState(null);
  const [metrics, setMetrics] = useState([]);
  const [courseOverview, setCourseOverview] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [systemAlerts, setSystemAlerts] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  // const [attendanceSummary, setAttendanceSummary] = useState(null);

  // Fetch all dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Get user ID from localStorage or your auth context
        const userId = localStorage.getItem('user_id');
        
        // Fetch all data in parallel
        const [
          profileData,
          metricsData,
          coursesData,
          eventsData,
          alertsData,
          activitiesData,
          // attendanceData
        ] = await Promise.all([
          AuthorityApi.getAuthorityProfile(userId),
          AuthorityApi.getDashboardMetrics(),
          AuthorityApi.getCourseOverview(),
          AuthorityApi.getUpcomingEvents(),
          AuthorityApi.getSystemAlerts(),
          AuthorityApi.getRecentActivities(),
          // AuthorityApi.getAttendanceSummary()
        ]);

        // Set authority profile
        setAuthorityData(profileData);

        // Format metrics with icons and colors
        const formattedMetrics = [
          { 
            label: "Total Students", 
            value: metricsData.totalStudents.toString(), 
            change: "+12 this semester",
            icon: Users, 
            color: "text-blue-600",
            bgColor: "bg-blue-100"
          },
          { 
            label: "Active Courses", 
            value: metricsData.activeCourses.toString(), 
            change: "Spring 2024",
            icon: BookOpen, 
            color: "text-green-600",
            bgColor: "bg-green-100"
          },
          { 
            label: "Faculty Members", 
            value: metricsData.facultyMembers.toString(), 
            change: "All departments",
            icon: GraduationCap, 
            color: "text-purple-600",
            bgColor: "bg-purple-100"
          },
        //   { 
        //     label: "Avg Attendance", 
        //     value: `${metricsData.avgAttendance}%`, 
        //     change: "+2.3% vs last sem",
        //     icon: UserCheck, 
        //     color: "text-orange-600",
        //     bgColor: "bg-orange-100"
        //   },
         ];

        setMetrics(formattedMetrics);
        setCourseOverview(coursesData);
        setUpcomingEvents(eventsData);
        setSystemAlerts(alertsData);
        setRecentActivities(activitiesData);
        // setAttendanceSummary(attendanceData);

      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();

    // Refresh data every 5 minutes
    const interval = setInterval(fetchDashboardData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Helper function to get icon component for recent activities
  const getActivityIcon = (text) => {
    if (text.includes('course')) return BookOpen;
    if (text.includes('exam') || text.includes('schedule')) return Calendar;
    // if (text.includes('attendance')) return UserCheck;
    if (text.includes('material') || text.includes('upload')) return Upload;
    return Clock;
  };

  if (loading) {
    return (
      <AppLayout navigation={<AuthorityNav />}>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  if (error) {
    return (
      <AppLayout navigation={<AuthorityNav />}>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <AlertTriangle size={48} className="text-red-600 mx-auto mb-4" />
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout navigation={<AuthorityNav />}>
      {/* Welcome Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-serif text-gray-900 mb-2">
              Welcome back, <span className="text-blue-600">{authorityData?.name || 'User'}</span>
            </h1>
            <p className="text-gray-600 flex items-center gap-2">
              <ShieldCheck size={18} className="text-blue-600" />
              {authorityData?.role || 'Authority'} • {authorityData?.department || 'Department'}
            </p>
          </div>
          {/* <div className="flex gap-3">
            <Link to="/authority/analytics">
              <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                <BarChart3 size={18} />
                View Reports
              </button>
            </Link>
          </div> */}
        </div>
      </div>
     
      {/* Key Metrics */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <GlassCard key={metric.label} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-1">{metric.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mb-1">{metric.value}</p>
                  <p className="text-xs text-gray-500">{metric.change}</p>
                </div>
                <div className={`w-12 h-12 ${metric.bgColor} rounded-lg flex items-center justify-center`}>
                  <Icon size={24} className={metric.color} />
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link key={action.label} to={action.link}>
                <button className={`${action.color} text-white p-4 rounded-lg hover:opacity-90 transition flex items-center justify-between w-full`}>
                  <span className="font-medium">{action.label}</span>
                  <Icon size={20} />
                </button>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          {/* Course Overview */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Course Overview</h2>
              <Link to="/authority/courses">
                <button className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1">
                  View All <ArrowRight size={16} />
                </button>
              </Link>
            </div>
            <div className="space-y-3">
              {courseOverview.length > 0 ? (
                courseOverview.map((course) => (
                  <GlassCard key={course.code} className="p-5">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-gray-900">{course.code}</h3>
                          <span className="text-sm text-gray-600">{course.name}</span>
                          {course.alerts > 0 && (
                            <StatusBadge variant="error">
                              <AlertTriangle size={12} className="inline mr-1" />
                              {course.alerts} alerts
                            </StatusBadge>
                          )}
                        </div>
                        <div className="flex items-center gap-6 text-sm">
                          <span className="flex items-center gap-1 text-gray-600">
                            <Users size={14} />
                            {course.enrolled} students
                          </span>
                          {/* <span className="flex items-center gap-1">
                            <UserCheck size={14} />
                            <span className={course.attendance >= 85 ? "text-green-600" : course.attendance >= 75 ? "text-orange-600" : "text-red-600"}>
                              {course.attendance}% attendance
                            </span>
                          </span> */}
                          <span className="flex items-center gap-1">
                            <BarChart3 size={14} />
                            <span className={course.avgMarks >= 75 ? "text-green-600" : course.avgMarks >= 60 ? "text-orange-600" : "text-red-600"}>
                              {course.avgMarks}% avg marks
                            </span>
                          </span>
                        </div>
                      </div>
                      <button className="text-blue-600 hover:text-blue-700">
                        <ArrowRight size={20} />
                      </button>
                    </div>
                  </GlassCard>
                ))
              ) : (
                <p className="text-gray-500 text-center py-8">No courses available</p>
              )}
            </div>
          </div>

          {/* Upcoming Events */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Upcoming Events (Next 7 Days)</h2>
            <div className="space-y-3">
              {upcomingEvents.length > 0 ? (
                upcomingEvents.map((event) => (
                  <GlassCard key={event.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          event.type === 'exam' ? 'bg-red-100' :
                          event.type === 'assignment' ? 'bg-blue-100' :
                          'bg-green-100'
                        }`}>
                          <Calendar size={20} className={
                            event.type === 'exam' ? 'text-red-600' :
                            event.type === 'assignment' ? 'text-blue-600' :
                            'text-green-600'
                          } />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{event.title}</p>
                          <p className="text-sm text-gray-600">Course: {event.course} • {event.date}</p>
                        </div>
                      </div>
                      <StatusBadge variant={event.daysLeft <= 3 ? "error" : "warning"}>
                        {event.daysLeft} days left
                      </StatusBadge>
                    </div>
                  </GlassCard>
                ))
              ) : (
                <p className="text-gray-500 text-center py-8">No upcoming events</p>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar
        <div className="space-y-6">
          {/* System Alerts */}
          {/* <GlassCard className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <AlertTriangle size={20} className="text-orange-600" />
              Priority Alerts
            </h3>
            <div className="space-y-3">
              {systemAlerts.length > 0 ? (
                systemAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-3 rounded-lg border-l-4 ${
                      alert.severity === 'critical' ? 'bg-red-50 border-red-500' :
                      alert.severity === 'warning' ? 'bg-orange-50 border-orange-500' :
                      'bg-blue-50 border-blue-500'
                    }`}
                  >
                    <p className={`text-xs font-bold uppercase mb-1 ${
                      alert.severity === 'critical' ? 'text-red-700' :
                      alert.severity === 'warning' ? 'text-orange-700' :
                      'text-blue-700'
                    }`}>
                      {alert.severity}
                    </p>
                    <p className={`text-sm ${
                      alert.severity === 'critical' ? 'text-red-900' :
                      alert.severity === 'warning' ? 'text-orange-900' :
                      'text-blue-900'
                    }`}>
                      {alert.text}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">Course: {alert.course}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm text-center py-4">No alerts</p>
              )}
            </div>
          </GlassCard> */} 

          {/* Recent Activities */}
          {/* <GlassCard className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Clock size={20} className="text-blue-600" />
              Recent Activities
            </h3>
            <div className="space-y-4">
              {recentActivities.length > 0 ? (
                recentActivities.map((activity) => {
                  const Icon = getActivityIcon(activity.text);
                  return (
                    <div key={activity.id} className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon size={16} className="text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{activity.text}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-gray-500 text-sm text-center py-4">No recent activities</p>
              )}
            </div>
          </GlassCard> */}

          {/* Attendance Summary
          {attendanceSummary && (
            <GlassCard className="p-6">
              <h3 className="text-lg font-semibold mb-4">Attendance Summary</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Overall Average</span>
                    <span className="font-semibold text-green-600">{attendanceSummary.overall}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500" style={{ width: `${attendanceSummary.overall}%` }} />
                  </div>
                </div>

                <div className="pt-3 border-t space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Above 85%</span>
                    <span className="font-medium text-green-600">{attendanceSummary.above85}% students</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">75-85%</span>
                    <span className="font-medium text-orange-600">{attendanceSummary.between75and85}% students</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Below 75%</span>
                    <span className="font-medium text-red-600">{attendanceSummary.below75}% students</span>
                  </div>
                </div>
              </div>
            </GlassCard>
          )} */}
        {/* </div> */}
      </div>
    </AppLayout>
  );
}