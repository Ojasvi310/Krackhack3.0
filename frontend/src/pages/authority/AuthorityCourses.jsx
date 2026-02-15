import { useEffect, useState } from "react";
import AppLayout from "../../components/AppLayout";
import GlassCard from "../../components/GlassCard";
import StatusBadge from "../../components/StatusBadge";
import AuthorityNav from "./AuthorityNav";
import axios from "axios";
import AuthorityApi from "../../services/AuthorityApi";
import { 
  BookOpen,
  Plus,
  Edit2,
  Trash2,
  Users,
  Download,
  Upload,
  Search,
  Filter,
  UserPlus,
  Award,
  BarChart3,
  AlertTriangle,
  Eye,
  X,
  Save
} from "lucide-react";

// Mock courses data
const initialCourses = [
  {
    id: 1,
    code: "CS301",
    name: "Database Management Systems",
    semester: "Spring 2024",
    credits: 4,
    type: "Major",
    
    enrolled: 45,
   
    lowAttendance: 3,
  },
  {
    id: 2,
    code: "CS302",
    name: "Operating Systems",
    semester: "Spring 2024",
    credits: 3,
    type: "Major",
   
    enrolled: 38,
    
    lowAttendance: 5,
  },
  {
    id: 3,
    code: "CS303",
    name: "Computer Networks",
    semester: "Spring 2024",
    credits: 4,
    type: "Major",
   
    enrolled: 42,
   
    lowAttendance: 2,
  },
  {
    id: 4,
    code: "CS401",
    name: "Machine Learning",
    semester: "Spring 2024",
    credits: 4,
    type: "Elective",
   
    enrolled: 36,
    
    lowAttendance: 1,
  },
  {
    id: 5,
    code: "MA201",
    name: "Linear Algebra",
    semester: "Spring 2024",
    credits: 3,
    type: "Minor",
    
    enrolled: 52,

    lowAttendance: 4,
  },
];

// Mock students for enrollment
const mockStudents = [
  { id: "S001", name: "Rahul Sharma", rollNo: "20CS001", major: "CS", credits: 18 },
  { id: "S002", name: "Priya Patel", rollNo: "20CS002", major: "CS", credits: 21 },
  { id: "S003", name: "Amit Kumar", rollNo: "20CS003", major: "CS", credits: 15 },
];

const courseTypes = ["All Types", "Major", "Minor", "Elective"];
const semesterMap = {
  "Spring 2024": 8,
  "Fall 2023": 7,
  "Spring 2023": 6
};
const semesters = ["All Semesters", ...Object.keys(semesterMap)];



const tabs = [
  { id: "list", label: "Course List" },
  { id: "enrollment", label: "Enrollment Tracker" },
  { id: "credits", label: "Credit Distribution" },
];

export default function AuthorityCourses() {
  const [activeTab, setActiveTab] = useState("list");
  const [courses, setCourses] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  fetchCourses();
}, []);

const fetchCourses = async () => {
  try {
    setLoading(true);

    const data = await AuthorityApi.getCourses();

    // Convert DB format → frontend format
    const formattedCourses = data.map(course => ({
      id: course.course_id,
      code: course.course_id,
      name: course.course_name,
      semester:
        course.semester === 8 ? "Spring 2024" :
        course.semester === 7 ? "Fall 2023" :
        course.semester === 6 ? "Spring 2023" :
        `Semester ${course.semester}`,
      credits: course.credits,
      type: course.department || "Major",

      // default values if not in DB
      enrolled: course.enrolled || 0,
      lowAttendance: course.lowAttendance || 0
    }));

    setCourses(formattedCourses);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    setLoading(false);
  }
};

  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("All Types");
  const [filterSemester, setFilterSemester] = useState("All Semesters");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  // Form state
  const [courseForm, setCourseForm] = useState({
    code: "",
    name: "",
    semester: "Spring 2024",
    credits: 3,
    type: "Major",
   
   
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setCourseForm({ ...courseForm, [name]: value });
  };

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     if (editingCourse) {
//       setCourses(courses.map(c => 
//         c.id === editingCourse.id 
//           ? { ...c, ...courseForm, enrolled: c.enrolled, lowAttendance: c.lowAttendance }
//           : c
//       ));
//       setEditingCourse(null);
//     } else {
//       const newCourse = {
//         id: courses.length + 1,
//         ...courseForm,
//         enrolled: 0,
//         lowAttendance: 0,
//       };
//       setCourses([...courses, newCourse]);
//     }

//     setCourseForm({
//       code: "",
//       name: "",
//       semester: "Spring 2024",
//       credits: 3,
//       type: "Major",
     
     
//     });
//     setShowAddModal(false);
//   };

const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    // Convert semester string to number
    let semesterNum = 1; // Default
    if (courseForm.semester === "Spring 2024") semesterNum = 8;
    else if (courseForm.semester === "Fall 2023") semesterNum = 7;
    else if (courseForm.semester === "Spring 2023") semesterNum = 6;
    
    const courseData = {
      course_id: courseForm.code,           // CS-671
      course_name: courseForm.name,         // Deep Learning
      credits: parseInt(courseForm.credits), // 4
      semester: semesterNum,                // 8
      department: courseForm.type || "CSE", // Major → CSE or use actual department
      status: "active"
    };
    
    console.log('Sending to API:', courseData); // Debug log
    
    if (editingCourse) {
      await AuthorityApi.updateCourse(courseForm.code, {
        course_name: courseData.course_name,
        credits: courseData.credits,
        status: courseData.status
      });
      alert('Course updated successfully!');
    } else {
      await AuthorityApi.createCourse(courseData);
      alert('Course created successfully!');
    }
    
    // Refresh from database
    await fetchCourses();
    
    // Close modal
    setShowAddModal(false);
    setEditingCourse(null);
    setCourseForm({
      code: "",
      name: "",
      semester: "Spring 2024",
      credits: 3,
      type: "Major",
      professor: "",
    
    });
    
  } catch (error) {
    console.error('Error saving course:', error);
    alert('Failed to save course: ' + error.message);
  }
};
  const handleEdit = (course) => {
    setCourseForm({
      code: course.code,
      name: course.name,
      semester: course.semester,
      credits: course.credits,
      type: course.type,
     
      
    });
    setEditingCourse(course);
    setShowAddModal(true);
  };

  const handleDelete = async (id) => {
  if (!confirm("Are you sure you want to delete this course?")) return;

  try {
    await AuthorityApi.deleteCourse(id);
    await fetchCourses();
  } catch (error) {
    console.error(error);
    alert("Failed to delete course");
  }
};


  const handleCancel = () => {
    setCourseForm({
      code: "",
      name: "",
      semester: "Spring 2024",
      credits: 3,
      type: "Major",
      
      
    });
    setEditingCourse(null);
    setShowAddModal(false);
  };

  // Filter courses
  const filteredCourses = courses.filter(course => {
  const matchesSearch =
    course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.name.toLowerCase().includes(searchQuery.toLowerCase());

  const matchesType =
    filterType === "All Types" || course.type === filterType;

  const matchesSemester =
    filterSemester === "All Semesters" ||
    course.semester === filterSemester;

  return matchesSearch && matchesType && matchesSemester;
});

  // Calculate statistics
  const totalEnrolled = courses.reduce((sum, c) => sum + c.enrolled, 0);
  

  const totalLowAttendance = courses.reduce((sum, c) => sum + c.lowAttendance, 0);

  // Credit distribution data
  const creditDistribution = {
    major: courses.filter(c => c.type === "Major").reduce((sum, c) => sum + (c.credits * c.enrolled), 0),
    minor: courses.filter(c => c.type === "Minor").reduce((sum, c) => sum + (c.credits * c.enrolled), 0),
    elective: courses.filter(c => c.type === "Elective").reduce((sum, c) => sum + (c.credits * c.enrolled), 0),
  };

  const renderCourseListTab = () => (
    <>
      {/* Statistics Cards */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        <GlassCard className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <BookOpen size={24} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Courses</p>
              <p className="text-3xl font-bold">{courses.length}</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Users size={24} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Enrolled</p>
              <p className="text-3xl font-bold">{totalEnrolled}</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <BarChart3 size={24} className="text-purple-600" />
            </div>
            
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle size={24} className="text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Low Attendance</p>
              <p className="text-3xl font-bold">{totalLowAttendance}</p>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Filters and Actions */}
      <GlassCard className="p-5 mb-6">
        <div className="flex items-center gap-4 flex-wrap">
          {/* Search */}
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Filters */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {courseTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>

          <select
            value={filterSemester}
            onChange={(e) => setFilterSemester(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {semesters.map(sem => (
              <option key={sem} value={sem}>{sem}</option>
            ))}
          </select>

          {/* Actions */}
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <Plus size={20} />
            Add Course
          </button>

          <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
            <Upload size={20} />
            Bulk Upload
          </button>

          <button className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition">
            <Download size={20} />
            Export CSV
          </button>
        </div>
      </GlassCard>

      {/* Courses Table */}
      <GlassCard className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Course Code</th>
                <th className="text-left py-3 px-4">Course Name</th>
                <th className="text-center py-3 px-4">Semester</th>
                <th className="text-center py-3 px-4">Credits</th>
                <th className="text-center py-3 px-4">Type</th>
                
                <th className="text-center py-3 px-4">Enrollment</th>
                <th className="text-center py-3 px-4">Alerts</th>
                <th className="text-center py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.map((course) => (
                <tr key={course.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{course.code}</td>
                  <td className="py-3 px-4">{course.name}</td>
                  <td className="py-3 px-4 text-center text-sm text-gray-600">{course.semester}</td>
                  <td className="py-3 px-4 text-center">
                    <StatusBadge variant="default">{course.credits}</StatusBadge>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <StatusBadge variant={
                      course.type === "Major" ? "success" :
                      course.type === "Minor" ? "warning" : "default"
                    }>
                      {course.type}
                    </StatusBadge>
                  </td>
                 
                  <td className="py-3 px-4 text-center">
                    <StatusBadge variant="default">
                        {course.enrolled}
                    </StatusBadge>
                    </td>
                  <td className="py-3 px-4 text-center">
                    {course.lowAttendance > 0 && (
                      <StatusBadge variant="error">
                        <AlertTriangle size={12} className="inline mr-1" />
                        {course.lowAttendance}
                      </StatusBadge>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex justify-center gap-2">
                      <button
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        title="View Details"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => handleEdit(course)}
                        className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition"
                        title="Edit"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(course.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </>
  );

  const renderEnrollmentTab = () => (
    <>
      <GlassCard className="p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Enrollment Statistics by Course</h3>
        <div className="space-y-4">
          {courses.map((course) => {
            
            return (
              <div key={course.id}>
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <span className="font-medium">{course.code}</span>
                    <span className="text-sm text-gray-600 ml-2">{course.name}</span>
                  </div>
                  <span className="text-sm text-gray-600">
                    {course.enrolled} enrolled
                  </span>
                </div>
                </div>
            );
          }
          )}
        </div>
      </GlassCard>

      <GlassCard className="p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Enrollments</h3>
        <div className="space-y-3">
          {mockStudents.map((student) => (
            <div key={student.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">{student.name}</p>
                <p className="text-sm text-gray-600">Roll No: {student.rollNo}</p>
              </div>
              <StatusBadge variant="success">Enrolled</StatusBadge>
            </div>
          ))}
        </div>
      </GlassCard>
    </>
  );

  const renderCreditsTab = () => (
    <>
      <div className="grid grid-cols-3 gap-6 mb-6">
        <GlassCard className="p-6">
          <h3 className="text-sm text-gray-600 mb-2">Major Credits</h3>
          <p className="text-3xl font-bold text-blue-600">{creditDistribution.major}</p>
          <p className="text-sm text-gray-600 mt-1">Total credit hours</p>
        </GlassCard>

        <GlassCard className="p-6">
          <h3 className="text-sm text-gray-600 mb-2">Minor Credits</h3>
          <p className="text-3xl font-bold text-orange-600">{creditDistribution.minor}</p>
          <p className="text-sm text-gray-600 mt-1">Total credit hours</p>
        </GlassCard>

        <GlassCard className="p-6">
          <h3 className="text-sm text-gray-600 mb-2">Elective Credits</h3>
          <p className="text-3xl font-bold text-green-600">{creditDistribution.elective}</p>
          <p className="text-sm text-gray-600 mt-1">Total credit hours</p>
        </GlassCard>
      </div>

      <GlassCard className="p-6">
        <h3 className="text-lg font-semibold mb-4">Student Credit Distribution</h3>
        <div className="space-y-4">
          {mockStudents.map((student) => (
            <div key={student.id} className="p-4 border rounded-lg">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <p className="font-medium">{student.name}</p>
                  <p className="text-sm text-gray-600">{student.rollNo} • {student.major} Major</p>
                </div>
                <StatusBadge variant="success">{student.credits} Credits</StatusBadge>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Major:</span>
                  <span className="font-medium ml-2">12 credits</span>
                </div>
                <div>
                  <span className="text-gray-600">Minor:</span>
                  <span className="font-medium ml-2">6 credits</span>
                </div>
                <div>
                  <span className="text-gray-600">Elective:</span>
                  <span className="font-medium ml-2">3 credits</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </>
  );
if (loading) {
  return (
    <AppLayout navigation={<AuthorityNav />}>
      <div className="text-center mt-10 text-lg">Loading courses...</div>
    </AppLayout>
  );
}

  const renderContent = () => {
    switch (activeTab) {
      case "list": return renderCourseListTab();
      case "enrollment": return renderEnrollmentTab();
      case "credits": return renderCreditsTab();
      default: return null;
    }
  };

  return (
    <AppLayout navigation={<AuthorityNav />}>
      <h1 className="text-3xl font-serif mb-6">Course Management</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg transition ${
              activeTab === tab.id
                ? "bg-blue-600 text-white"
                : "bg-white hover:bg-gray-50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {renderContent()}

      {/* Add/Edit Course Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <GlassCard className="max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {editingCourse ? "Edit Course" : "Add New Course"}
              </h2>
              <button onClick={handleCancel} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Course Code *</label>
                  <input
                    type="text"
                    name="code"
                    value={courseForm.code}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Credits *</label>
                  <input
                    type="number"
                    name="credits"
                    value={courseForm.credits}
                    onChange={handleFormChange}
                    required
                    min="1"
                    max="6"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Course Name *</label>
                <input
                  type="text"
                  name="name"
                  value={courseForm.name}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Semester *</label>
                  <select
                    name="semester"
                    value={courseForm.semester}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Spring 2024">Spring 2024</option>
                    <option value="Fall 2023">Fall 2023</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Type *</label>
                  <select
                    name="type"
                    value={courseForm.type}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Major">Major</option>
                    <option value="Minor">Minor</option>
                    <option value="Elective">Elective</option>
                  </select>
                </div>
              </div>

             
                

                





              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition flex-1"
                >
                  <Save size={16} />
                  {editingCourse ? "Update Course" : "Add Course"}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-2 border rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </GlassCard>
        </div>
      )}
    </AppLayout>
  );
}