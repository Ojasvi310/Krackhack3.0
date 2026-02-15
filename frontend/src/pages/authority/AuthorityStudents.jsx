import { useState } from "react";
import AppLayout from "../../components/AppLayout";
import GlassCard from "../../components/GlassCard";
import StatusBadge from "../../components/StatusBadge";
import AuthorityNav from "./AuthorityNav";
import { useEffect } from "react";
import AuthorityApi from "../../services/AuthorityApi";
import { 
  Users,
  User,
  Search,
  Filter,
  Download,
  Mail,
  Eye,
  Edit2,
  Lock,
  AlertTriangle,
  CheckCircle,
  TrendingDown,
  BookOpen,
  Award,
  X,
  Send
} from "lucide-react";

// Mock students data
const initialStudents = [
  {
    id: "S001",
    name: "Rahul Sharma",
    rollNo: "20CS001",
    email: "rahul.sharma@student.edu",
    phone: "+91 98765 43210",
    department: "Computer Science",
    semester: 6,
    enrolledCourses: ["CS301", "CS302", "CS303"],
    totalCredits: 18,
    cgpa: 8.5,
    attendance: 92,
    status: "active",
    alerts: []
  },
  {
    id: "S002",
    name: "Priya Patel",
    rollNo: "20CS002",
    email: "priya.patel@student.edu",
    phone: "+91 98765 43211",
    department: "Computer Science",
    semester: 6,
    enrolledCourses: ["CS301", "CS302", "CS303", "CS401"],
    totalCredits: 21,
    cgpa: 9.2,
    attendance: 100,
    status: "active",
    alerts: []
  },
  {
    id: "S003",
    name: "Amit Kumar",
    rollNo: "20CS003",
    email: "amit.kumar@student.edu",
    phone: "+91 98765 43212",
    department: "Computer Science",
    semester: 6,
    enrolledCourses: ["CS301", "CS302"],
    totalCredits: 15,
    cgpa: 6.8,
    attendance: 73,
    status: "warning",
    alerts: ["Low attendance (73%)", "Below average CGPA"]
  },
  {
    id: "S004",
    name: "Sneha Gupta",
    rollNo: "20CS004",
    email: "sneha.gupta@student.edu",
    phone: "+91 98765 43213",
    department: "Computer Science",
    semester: 6,
    enrolledCourses: ["CS301", "CS302", "CS303"],
    totalCredits: 18,
    cgpa: 8.8,
    attendance: 96,
    status: "active",
    alerts: []
  },
  {
    id: "S005",
    name: "Vikram Singh",
    rollNo: "20CS005",
    email: "vikram.singh@student.edu",
    phone: "+91 98765 43214",
    department: "Computer Science",
    semester: 6,
    enrolledCourses: ["CS301"],
    totalCredits: 12,
    cgpa: 5.5,
    attendance: 65,
    status: "critical",
    alerts: ["Critical attendance (65%)", "Low CGPA (5.5)", "Insufficient credits"]
  },
];

const departments = ["All Departments", "Computer Science", "Mechanical Engineering", "Electrical Engineering"];
const semesters = ["All Semesters", "6", "5", "4", "3", "2", "1"];
const statusFilters = ["All Status", "active", "warning", "critical"];

export default function AuthorityStudents() {
  const [filterDepartment, setFilterDepartment] = useState("All Departments");
  const [filterSemester, setFilterSemester] = useState("All Semesters");
  const [filterStatus, setFilterStatus] = useState("All Status");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, [filterDepartment, filterSemester, filterStatus]);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const data = await AuthorityApi.getStudents({
        department: filterDepartment === "All Departments" ? "" : filterDepartment,
        semester: filterSemester === "All Semesters" ? "" : filterSemester,
        status: filterStatus === "All Status" ? "" : filterStatus
      });
      setStudents(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter students
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.rollNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = filterDepartment === "All Departments" || student.department === filterDepartment;
    const matchesSem = filterSemester === "All Semesters" || student.semester === parseInt(filterSemester);
    const matchesStatus = filterStatus === "All Status" || student.status === filterStatus;
    return matchesSearch && matchesDept && matchesSem && matchesStatus;
  });

  // Calculate statistics
  const totalStudents = students.length;
  const activeStudents = students.filter(s => s.status === "active").length;
  const warningStudents = students.filter(s => s.status === "warning").length;
  const criticalStudents = students.filter(s => s.status === "critical").length;
  const avgCGPA = (students.reduce((sum, s) => sum + s.cgpa, 0) / students.length).toFixed(2);
  const avgAttendance = (students.reduce((sum, s) => sum + s.attendance, 0) / students.length).toFixed(1);

  const handleViewDetails = (student) => {
    setSelectedStudent(student);
    setShowDetailsModal(true);
  };

  const handleSendNotification = (student) => {
    alert(`Sending notification to ${student.name}`);
  };

  const handleResetPassword = (student) => {
    if (confirm(`Reset password for ${student.name}?`)) {
      alert(`Password reset link sent to ${student.email}`);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active": return "success";
      case "warning": return "warning";
      case "critical": return "error";
      default: return "default";
    }
  };

  return (
    <AppLayout navigation={<AuthorityNav />}>
      <h1 className="text-3xl font-serif mb-6">Student Management</h1>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
        <GlassCard className="p-4">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Total Students</p>
            <p className="text-3xl font-bold text-blue-600">{totalStudents}</p>
          </div>
        </GlassCard>

        <GlassCard className="p-4">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Active</p>
            <p className="text-3xl font-bold text-green-600">{activeStudents}</p>
          </div>
        </GlassCard>

        <GlassCard className="p-4">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Warning</p>
            <p className="text-3xl font-bold text-orange-600">{warningStudents}</p>
          </div>
        </GlassCard>

        <GlassCard className="p-4">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Critical</p>
            <p className="text-3xl font-bold text-red-600">{criticalStudents}</p>
          </div>
        </GlassCard>

        <GlassCard className="p-4">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Avg CGPA</p>
            <p className="text-3xl font-bold text-purple-600">{avgCGPA}</p>
          </div>
        </GlassCard>

        <GlassCard className="p-4">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Avg Attendance</p>
            <p className="text-3xl font-bold text-teal-600">{avgAttendance}%</p>
          </div>
        </GlassCard>
      </div>

      {/* Filters */}
      <GlassCard className="p-5 mb-6">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-gray-600" />
            <span className="font-medium">Filters:</span>
          </div>

          {/* Search */}
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, roll number, or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Department Filter */}
          <select
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>

          {/* Semester Filter */}
          <select
            value={filterSemester}
            onChange={(e) => setFilterSemester(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {semesters.map(sem => (
              <option key={sem} value={sem}>{sem === "All Semesters" ? sem : `Semester ${sem}`}</option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {statusFilters.map(status => (
              <option key={status} value={status}>{status === "All Status" ? status : status.charAt(0).toUpperCase() + status.slice(1)}</option>
            ))}
          </select>

          {/* Export Button */}
          <button className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition">
            <Download size={20} />
            Export CSV
          </button>
        </div>
      </GlassCard>

      {/* Students List */}
      <div className="mb-4">
        <p className="text-gray-600">
          Showing {filteredStudents.length} of {students.length} students
        </p>
      </div>

      <GlassCard className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Roll No</th>
                <th className="text-left py-3 px-4">Student Name</th>
                <th className="text-center py-3 px-4">Department</th>
                <th className="text-center py-3 px-4">Semester</th>
                <th className="text-center py-3 px-4">Courses</th>
                <th className="text-center py-3 px-4">Credits</th>
                <th className="text-center py-3 px-4">CGPA</th>
                <th className="text-center py-3 px-4">Attendance</th>
                <th className="text-center py-3 px-4">Status</th>
                <th className="text-center py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id} className={`border-b hover:bg-gray-50 ${student.status === 'critical' ? 'bg-red-50' : ''}`}>
                  <td className="py-3 px-4 font-medium">{student.rollNo}</td>
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-xs text-gray-600">{student.email}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center text-sm">{student.department}</td>
                  <td className="py-3 px-4 text-center">
                    <StatusBadge variant="default">{student.semester}</StatusBadge>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="text-sm">{student.enrolledCourses.length} courses</span>
                  </td>
                  <td className="py-3 px-4 text-center font-medium">{student.totalCredits}</td>
                  <td className="py-3 px-4 text-center">
                    <StatusBadge variant={student.cgpa >= 8 ? "success" : student.cgpa >= 6.5 ? "warning" : "error"}>
                      {student.cgpa}
                    </StatusBadge>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <StatusBadge variant={student.attendance >= 85 ? "success" : student.attendance >= 75 ? "warning" : "error"}>
                      {student.attendance}%
                    </StatusBadge>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <StatusBadge variant={getStatusColor(student.status)}>
                      {student.status}
                    </StatusBadge>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleViewDetails(student)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        title="View Details"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => handleSendNotification(student)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                        title="Send Notification"
                      >
                        <Mail size={18} />
                      </button>
                      <button
                        onClick={() => handleResetPassword(student)}
                        className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition"
                        title="Reset Password"
                      >
                        <Lock size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* Student Details Modal */}
      {showDetailsModal && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <GlassCard className="max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <User size={40} className="text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{selectedStudent.name}</h2>
                  <p className="text-gray-600">{selectedStudent.rollNo}</p>
                  <StatusBadge variant={getStatusColor(selectedStudent.status)} className="mt-2">
                    {selectedStudent.status}
                  </StatusBadge>
                </div>
              </div>
              <button onClick={() => setShowDetailsModal(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            {/* Contact & Academic Info */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-semibold mb-3">Contact Information</h3>
                <div className="space-y-2 text-sm">
                  <p className="flex items-center gap-2">
                    <Mail size={16} className="text-gray-500" />
                    {selectedStudent.email}
                  </p>
                  <p className="flex items-center gap-2">
                    <User size={16} className="text-gray-500" />
                    {selectedStudent.phone}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Academic Information</h3>
                <div className="space-y-2 text-sm">
                  <p className="flex justify-between">
                    <span className="text-gray-600">Department:</span>
                    <span className="font-medium">{selectedStudent.department}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-600">Semester:</span>
                    <span className="font-medium">{selectedStudent.semester}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-600">Total Credits:</span>
                    <span className="font-medium">{selectedStudent.totalCredits}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Performance Metrics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">CGPA</p>
                  <p className="text-3xl font-bold text-purple-600">{selectedStudent.cgpa}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Attendance</p>
                  <p className="text-3xl font-bold text-blue-600">{selectedStudent.attendance}%</p>
                </div>
              </div>
            </div>

            {/* Enrolled Courses */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Enrolled Courses</h3>
              <div className="flex flex-wrap gap-2">
                {selectedStudent.enrolledCourses.map((course) => (
                  <StatusBadge key={course} variant="default">{course}</StatusBadge>
                ))}
              </div>
            </div>

            {/* Alerts */}
            {selectedStudent.alerts.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold mb-3 text-red-600">Active Alerts</h3>
                <div className="space-y-2">
                  {selectedStudent.alerts.map((alert, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <AlertTriangle size={16} className="text-red-600" />
                      <span className="text-sm text-red-700">{alert}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => handleSendNotification(selectedStudent)}
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition flex-1"
              >
                <Send size={16} />
                Send Notification
              </button>
              <button
                onClick={() => handleResetPassword(selectedStudent)}
                className="flex items-center gap-2 border border-blue-600 text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50 transition flex-1"
              >
                <Lock size={16} />
                Reset Password
              </button>
            </div>
          </GlassCard>
        </div>
      )}
    </AppLayout>
  );
}