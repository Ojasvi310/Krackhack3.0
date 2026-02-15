
import AppLayout from "../../components/AppLayout";
import GlassCard from "../../components/GlassCard";
import StatusBadge from "../../components/StatusBadge";
import AuthorityNav from "./AuthorityNav";
import React, { useState, useEffect } from "react";
import AuthorityApi from "../../services/AuthorityApi";
import { 
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  BookOpen,
  Download,
  Calendar,
  Award,
  AlertTriangle,
  CheckCircle,
  Eye,
  FileText,
  PieChart,
  Activity
} from "lucide-react";



const coursePerformance = [
  { code: "CS301", name: "Database Management Systems", enrolled: 45, avgMarks: 71.3, attendance: 82.5, passRate: 91 },
  { code: "CS302", name: "Operating Systems", enrolled: 38, avgMarks: 68.7, attendance: 79.8, passRate: 87 },
  { code: "CS303", name: "Computer Networks", enrolled: 42, avgMarks: 74.5, attendance: 85.2, passRate: 95 },
  { code: "CS401", name: "Machine Learning", enrolled: 36, avgMarks: 76.2, attendance: 88.1, passRate: 97 },
];

const attendanceTrends = [
  { semester: "Fall 2023", average: 82.1 },
  { semester: "Spring 2023", average: 80.5 },
  { semester: "Fall 2022", average: 79.8 },
  { semester: "Spring 2024", average: 84.2 },
];

const gradeDistribution = [
  { grade: "A+", count: 45, percentage: 13.2 },
  { grade: "A", count: 68, percentage: 19.9 },
  { grade: "B+", count: 82, percentage: 24.0 },
  { grade: "B", count: 71, percentage: 20.8 },
  { grade: "C+", count: 45, percentage: 13.2 },
  { grade: "C", count: 21, percentage: 6.1 },
  { grade: "F", count: 10, percentage: 2.9 },
];

const resourceUsage = [
  { type: "Lecture Notes", count: 156, downloads: 4523 },
  { type: "Presentations", count: 89, downloads: 3201 },
  { type: "PYQs", count: 45, downloads: 5678 },
  { type: "Assignments", count: 67, downloads: 2891 },
  { type: "Reference Materials", count: 34, downloads: 1456 },
];

const studentProgress = {
  onTrack: 289,
  needsAttention: 38,
  critical: 15,
};

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "courses", label: "Course Analytics" },
  { id: "students", label: "Student Analytics" },
  { id: "resources", label: "Resource Analytics" },
];

const reportTypes = [
  { id: "attendance", name: "Attendance Report", description: "Detailed attendance statistics by course and semester" },
  { id: "performance", name: "Performance Report", description: "Academic performance metrics and grade distribution" },
  { id: "enrollment", name: "Enrollment Report", description: "Course enrollment and capacity utilization" },
  { id: "faculty", name: "Faculty Report", description: "Faculty workload and course assignments" },
];

export default function AuthorityAnalytics() {
  const [activeTab, setActiveTab] = useState("overview");
  const [overviewStats, setOverviewStats] = useState({});
  const [loading, setLoading] = useState(true);

  const handleDownloadReport = (reportType) => {
    alert(`Downloading ${reportType} report...`);
  };

  useEffect(() => {
    fetchAnalytics();
  }, [activeTab]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const data = await AuthorityApi.getAnalyticsOverview();
      setOverviewStats(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };
  const renderOverviewTab = () => (
    <>
      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
        <GlassCard className="p-4">
          <div className="text-center">
            <Users size={32} className="mx-auto mb-2 text-blue-600" />
            <p className="text-2xl font-bold text-gray-900">{overviewStats.totalStudents}</p>
            <p className="text-xs text-gray-600">Total Students</p>
          </div>
        </GlassCard>

        <GlassCard className="p-4">
          <div className="text-center">
            <BookOpen size={32} className="mx-auto mb-2 text-green-600" />
            <p className="text-2xl font-bold text-gray-900">{overviewStats.totalCourses}</p>
            <p className="text-xs text-gray-600">Active Courses</p>
          </div>
        </GlassCard>

        <GlassCard className="p-4">
          <div className="text-center">
            <Users size={32} className="mx-auto mb-2 text-purple-600" />
            <p className="text-2xl font-bold text-gray-900">{overviewStats.totalFaculty}</p>
            <p className="text-xs text-gray-600">Faculty Members</p>
          </div>
        </GlassCard>

        <GlassCard className="p-4">
          <div className="text-center">
            <Activity size={32} className="mx-auto mb-2 text-orange-600" />
            <p className="text-2xl font-bold text-gray-900">{overviewStats.avgAttendance}%</p>
            <p className="text-xs text-gray-600">Avg Attendance</p>
          </div>
        </GlassCard>

        <GlassCard className="p-4">
          <div className="text-center">
            <Award size={32} className="mx-auto mb-2 text-yellow-600" />
            <p className="text-2xl font-bold text-gray-900">{overviewStats.avgCGPA}</p>
            <p className="text-xs text-gray-600">Avg CGPA</p>
          </div>
        </GlassCard>

        <GlassCard className="p-4">
          <div className="text-center">
            <CheckCircle size={32} className="mx-auto mb-2 text-teal-600" />
            <p className="text-2xl font-bold text-gray-900">{overviewStats.passRate}%</p>
            <p className="text-xs text-gray-600">Pass Rate</p>
          </div>
        </GlassCard>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Student Progress */}
        <GlassCard className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <TrendingUp size={20} />
            Student Progress Overview
          </h3>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-green-600">On Track</span>
                <span className="font-bold">{studentProgress.onTrack} students</span>
              </div>
              <div className="w-full h-6 bg-gray-200 rounded-lg overflow-hidden">
                <div
                  className="h-full bg-green-500"
                  style={{ width: `${(studentProgress.onTrack / overviewStats.totalStudents) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-orange-600">Needs Attention</span>
                <span className="font-bold">{studentProgress.needsAttention} students</span>
              </div>
              <div className="w-full h-6 bg-gray-200 rounded-lg overflow-hidden">
                <div
                  className="h-full bg-orange-500"
                  style={{ width: `${(studentProgress.needsAttention / overviewStats.totalStudents) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-red-600">Critical</span>
                <span className="font-bold">{studentProgress.critical} students</span>
              </div>
              <div className="w-full h-6 bg-gray-200 rounded-lg overflow-hidden">
                <div
                  className="h-full bg-red-500"
                  style={{ width: `${(studentProgress.critical / overviewStats.totalStudents) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Attendance Trends */}
        <GlassCard className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Calendar size={20} />
            Attendance Trends
          </h3>

          <div className="space-y-3">
            {attendanceTrends.map((trend, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">{trend.semester}</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-blue-600">{trend.average}%</span>
                  {index > 0 && trend.average > attendanceTrends[index - 1].average ? (
                    <TrendingUp size={16} className="text-green-600" />
                  ) : index > 0 && (
                    <TrendingDown size={16} className="text-red-600" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Grade Distribution */}
      <GlassCard className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <PieChart size={20} />
          Overall Grade Distribution
        </h3>

        <div className="space-y-3">
          {gradeDistribution.map((item) => (
            <div key={item.grade}>
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium">Grade {item.grade}</span>
                <span className="text-sm text-gray-600">
                  {item.count} students ({item.percentage}%)
                </span>
              </div>
              <div className="w-full h-6 bg-gray-200 rounded-lg overflow-hidden">
                <div
                  className={`h-full ${
                    item.grade.includes("A") ? "bg-green-500" :
                    item.grade.includes("B") ? "bg-blue-500" :
                    item.grade.includes("C") ? "bg-yellow-500" :
                    "bg-red-500"
                  }`}
                  style={{ width: `${item.percentage * 3}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </>
  );

  const renderCoursesTab = () => (
    <>
      <GlassCard className="p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Course Performance Summary</h3>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Course</th>
                <th className="text-center py-3 px-4">Enrolled</th>
                <th className="text-center py-3 px-4">Avg Marks</th>
                <th className="text-center py-3 px-4">Attendance</th>
                <th className="text-center py-3 px-4">Pass Rate</th>
                <th className="text-center py-3 px-4">Performance</th>
              </tr>
            </thead>
            <tbody>
              {coursePerformance.map((course) => (
                <tr key={course.code} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-medium">{course.code}</p>
                      <p className="text-sm text-gray-600">{course.name}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">{course.enrolled}</td>
                  <td className="py-3 px-4 text-center">
                    <StatusBadge variant={course.avgMarks >= 75 ? "success" : course.avgMarks >= 60 ? "warning" : "error"}>
                      {course.avgMarks}%
                    </StatusBadge>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <StatusBadge variant={course.attendance >= 85 ? "success" : course.attendance >= 75 ? "warning" : "error"}>
                      {course.attendance}%
                    </StatusBadge>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <StatusBadge variant={course.passRate >= 90 ? "success" : course.passRate >= 75 ? "warning" : "error"}>
                      {course.passRate}%
                    </StatusBadge>
                  </td>
                  <td className="py-3 px-4 text-center">
                    {course.avgMarks >= 75 && course.attendance >= 85 ? (
                      <StatusBadge variant="success">
                        <CheckCircle size={12} className="inline mr-1" />
                        Excellent
                      </StatusBadge>
                    ) : course.avgMarks >= 60 && course.attendance >= 75 ? (
                      <StatusBadge variant="warning">
                        <AlertTriangle size={12} className="inline mr-1" />
                        Average
                      </StatusBadge>
                    ) : (
                      <StatusBadge variant="error">
                        <AlertTriangle size={12} className="inline mr-1" />
                        Needs Improvement
                      </StatusBadge>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      <div className="grid grid-cols-2 gap-6">
        <GlassCard className="p-6">
          <h3 className="text-lg font-semibold mb-4">Top Performing Courses</h3>
          <div className="space-y-3">
            {coursePerformance
              .sort((a, b) => b.avgMarks - a.avgMarks)
              .slice(0, 3)
              .map((course, index) => (
                <div key={course.code} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="font-bold text-green-600">#{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{course.code}</p>
                    <p className="text-xs text-gray-600">{course.name}</p>
                  </div>
                  <StatusBadge variant="success">{course.avgMarks}%</StatusBadge>
                </div>
              ))}
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <h3 className="text-lg font-semibold mb-4">Courses Needing Attention</h3>
          <div className="space-y-3">
            {coursePerformance
              .filter(c => c.avgMarks < 70 || c.attendance < 80)
              .map((course) => (
                <div key={course.code} className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                  <AlertTriangle size={20} className="text-orange-600" />
                  <div className="flex-1">
                    <p className="font-medium">{course.code}</p>
                    <p className="text-xs text-gray-600">{course.name}</p>
                  </div>
                  <StatusBadge variant="warning">{course.avgMarks}%</StatusBadge>
                </div>
              ))}
          </div>
        </GlassCard>
      </div>
    </>
  );

  const renderStudentsTab = () => (
    <>
      <div className="grid grid-cols-3 gap-6 mb-6">
        <GlassCard className="p-6">
          <h3 className="text-sm text-gray-600 mb-2">High Performers (CGPA ≥ 8)</h3>
          <p className="text-3xl font-bold text-green-600">
            {Math.floor(overviewStats.totalStudents * 0.35)}
          </p>
          <p className="text-sm text-gray-600 mt-1">35% of students</p>
        </GlassCard>

        <GlassCard className="p-6">
          <h3 className="text-sm text-gray-600 mb-2">Average Performers (6.5-8)</h3>
          <p className="text-3xl font-bold text-blue-600">
            {Math.floor(overviewStats.totalStudents * 0.50)}
          </p>
          <p className="text-sm text-gray-600 mt-1">50% of students</p>
        </GlassCard>

        <GlassCard className="p-6">
          <h3 className="text-sm text-gray-600 mb-2">At Risk (CGPA &lt; 6.5)</h3>
          <p className="text-3xl font-bold text-red-600">
            {Math.floor(overviewStats.totalStudents * 0.15)}
          </p>
          <p className="text-sm text-gray-600 mt-1">15% of students</p>
        </GlassCard>
      </div>

      <GlassCard className="p-6">
        <h3 className="text-lg font-semibold mb-4">Student Performance Distribution</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm">CGPA 9.0 - 10.0 (Outstanding)</span>
              <span className="text-sm font-medium">12%</span>
            </div>
            <div className="w-full h-4 bg-gray-200 rounded-lg overflow-hidden">
              <div className="h-full bg-green-600" style={{ width: "12%" }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm">CGPA 8.0 - 9.0 (Excellent)</span>
              <span className="text-sm font-medium">23%</span>
            </div>
            <div className="w-full h-4 bg-gray-200 rounded-lg overflow-hidden">
              <div className="h-full bg-green-500" style={{ width: "23%" }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm">CGPA 7.0 - 8.0 (Good)</span>
              <span className="text-sm font-medium">35%</span>
            </div>
            <div className="w-full h-4 bg-gray-200 rounded-lg overflow-hidden">
              <div className="h-full bg-blue-500" style={{ width: "35%" }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm">CGPA 6.5 - 7.0 (Average)</span>
              <span className="text-sm font-medium">15%</span>
            </div>
            <div className="w-full h-4 bg-gray-200 rounded-lg overflow-hidden">
              <div className="h-full bg-yellow-500" style={{ width: "15%" }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm">CGPA &lt; 6.5 (Below Average)</span>
              <span className="text-sm font-medium">15%</span>
            </div>
            <div className="w-full h-4 bg-gray-200 rounded-lg overflow-hidden">
              <div className="h-full bg-red-500" style={{ width: "15%" }} />
            </div>
          </div>
        </div>
      </GlassCard>
    </>
  );

  const renderResourcesTab = () => (
    <>
      <GlassCard className="p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Resource Usage Statistics</h3>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Resource Type</th>
                <th className="text-center py-3 px-4">Total Resources</th>
                <th className="text-center py-3 px-4">Total Downloads</th>
                <th className="text-center py-3 px-4">Avg Downloads/Resource</th>
                <th className="text-center py-3 px-4">Popularity</th>
              </tr>
            </thead>
            <tbody>
              {resourceUsage.map((resource) => {
                const avgDownloads = (resource.downloads / resource.count).toFixed(1);
                return (
                  <tr key={resource.type} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{resource.type}</td>
                    <td className="py-3 px-4 text-center">{resource.count}</td>
                    <td className="py-3 px-4 text-center font-medium">{resource.downloads}</td>
                    <td className="py-3 px-4 text-center">{avgDownloads}</td>
                    <td className="py-3 px-4 text-center">
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500"
                          style={{ width: `${(resource.downloads / 6000) * 100}%` }}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </GlassCard>

      <div className="grid grid-cols-2 gap-6">
        <GlassCard className="p-6">
          <h3 className="text-lg font-semibold mb-4">Most Downloaded Resources</h3>
          <div className="space-y-3">
            {resourceUsage
              .sort((a, b) => b.downloads - a.downloads)
              .slice(0, 3)
              .map((resource, index) => (
                <div key={resource.type} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="font-bold text-blue-600">#{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{resource.type}</p>
                    <p className="text-xs text-gray-600">{resource.count} resources</p>
                  </div>
                  <StatusBadge variant="success">{resource.downloads}</StatusBadge>
                </div>
              ))}
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <h3 className="text-lg font-semibold mb-4">Download Reports</h3>
          <div className="space-y-3">
            {reportTypes.map((report) => (
              <button
                key={report.id}
                onClick={() => handleDownloadReport(report.name)}
                className="w-full flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition"
              >
                <div className="text-left">
                  <p className="font-medium">{report.name}</p>
                  <p className="text-xs text-gray-600">{report.description}</p>
                </div>
                <Download size={20} className="text-blue-600" />
              </button>
            ))}
          </div>
        </GlassCard>
      </div>
    </>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "overview": return renderOverviewTab();
      case "courses": return renderCoursesTab();
      case "students": return renderStudentsTab();
      case "resources": return renderResourcesTab();
      default: return null;
    }
  };

  return (
    <AppLayout navigation={<AuthorityNav />}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-serif">Analytics & Reports</h1>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          <Download size={20} />
          Export All Reports
        </button>
      </div>

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
    </AppLayout>
  );
}