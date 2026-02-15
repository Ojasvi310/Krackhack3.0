import React, { useState, useEffect } from "react";
import AppLayout from "../../components/AppLayout";
import GlassCard from "../../components/GlassCard";
import StatusBadge from "../../components/StatusBadge";
import AuthorityNav from "./AuthorityNav";

import AuthorityApi from "../../services/AuthorityApi";
import { 
  Bell,
  Send,
  Users,
  Filter,
  Calendar,
  Clock,
  CheckCircle,
  FileText,
  Plus,
  Eye,
  Trash2,
  Copy
} from "lucide-react";

// ...existing code...


// Mock notification history
const notificationHistory = [
  {
    id: 1,
    subject: "Mid-Semester Exam Schedule",
    recipients: "CS301 Students (45)",
    sentDate: "2024-03-10",
    sentTime: "10:30 AM",
    status: "sent",
    deliveryRate: "100%"
  },
  {
    id: 2,
    subject: "Assignment 2 Due Date Extended",
    recipients: "CS302 Students (38)",
    sentDate: "2024-03-09",
    sentTime: "3:45 PM",
    status: "sent",
    deliveryRate: "98%"
  },
  {
    id: 3,
    subject: "Low Attendance Alert",
    recipients: "15 Students (Multiple Courses)",
    sentDate: "2024-03-08",
    sentTime: "9:00 AM",
    status: "sent",
    deliveryRate: "93%"
  },
];

const recipientTypes = [
  { value: "all", label: "All Students", description: "Send to all enrolled students" },
  { value: "course", label: "By Course", description: "Select specific courses" },
  { value: "semester", label: "By Semester", description: "Select specific semesters" },
  { value: "department", label: "By Department", description: "Select specific departments" },
  { value: "custom", label: "Custom Selection", description: "Manually select students" },
];

const courses = ["CS301", "CS302", "CS303", "CS401"];
const semesters = ["1", "2", "3", "4", "5", "6", "7", "8"];
const departments = ["Computer Science", "Mechanical Engineering", "Electrical Engineering"];

const tabs = [
  { id: "compose", label: "Compose Notification" },
  { id: "templates", label: "Templates" },
  { id: "history", label: "Notification History" },
];

export default function AuthorityNotifications() {
  const [activeTab, setActiveTab] = useState("compose");
  const [recipientType, setRecipientType] = useState("all");
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [selectedSemesters, setSelectedSemesters] = useState([]);
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [templates, setTemplates] = useState([]);
  // ...existing code...

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    const data = await AuthorityApi.getNotificationTemplates();
    setTemplates(data);
  };

  const [notificationForm, setNotificationForm] = useState({
    subject: "",
    message: "",
    scheduleDate: "",
    scheduleTime: "",
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNotificationForm({ ...notificationForm, [name]: value });
  };

  const handleCourseToggle = (course) => {
    setSelectedCourses(prev =>
      prev.includes(course) ? prev.filter(c => c !== course) : [...prev, course]
    );
  };

  const handleSemesterToggle = (semester) => {
    setSelectedSemesters(prev =>
      prev.includes(semester) ? prev.filter(s => s !== semester) : [...prev, semester]
    );
  };

  const handleDepartmentToggle = (department) => {
    setSelectedDepartments(prev =>
      prev.includes(department) ? prev.filter(d => d !== department) : [...prev, department]
    );
  };

  const handleUseTemplate = (template) => {
    setNotificationForm({
      ...notificationForm,
      subject: template.subject,
      message: template.content,
    });
    setActiveTab("compose");
  };

  const handleSendNotification = async () => {
  try {
    const result = await AuthorityApi.sendNotification({
      subject: notificationForm.subject,
      message: notificationForm.message,
      recipient_type: recipientType,
      course_ids: selectedCourses,
      semesters: selectedSemesters,
      departments: selectedDepartments
    });
    alert(`Sent to ${result.recipients_count} recipients!`);
  } catch (error) {
    alert('Error: ' + error.message);
  }
};

  const renderComposeTab = () => (
    <>
      <div className="grid grid-cols-3 gap-6 mb-6">
        {/* Compose Form */}
        <div className="col-span-2">
          <GlassCard className="p-6">
            <h3 className="text-lg font-semibold mb-4">Compose New Notification</h3>

            <div className="space-y-4">
              {/* Subject */}
              <div>
                <label className="block text-sm font-medium mb-2">Subject *</label>
                <input
                  type="text"
                  name="subject"
                  value={notificationForm.subject}
                  onChange={handleFormChange}
                  placeholder="Enter notification subject..."
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium mb-2">Message *</label>
                <textarea
                  name="message"
                  value={notificationForm.message}
                  onChange={handleFormChange}
                  rows="8"
                  placeholder="Enter your message here..."
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  You can use placeholders like {"{COURSE_NAME}"}, {"{DUE_DATE}"}, {"{STUDENT_NAME}"}
                </p>
              </div>

              {/* Schedule (Optional) */}
              <div>
                <label className="block text-sm font-medium mb-2">Schedule for Later (Optional)</label>
                <div className="flex gap-3">
                  <input
                    type="date"
                    name="scheduleDate"
                    value={notificationForm.scheduleDate}
                    onChange={handleFormChange}
                    className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="time"
                    name="scheduleTime"
                    value={notificationForm.scheduleTime}
                    onChange={handleFormChange}
                    className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Send Button */}
              <button
                onClick={handleSendNotification}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
              >
                <Send size={20} />
                {notificationForm.scheduleDate ? "Schedule Notification" : "Send Notification"}
              </button>
            </div>
          </GlassCard>
        </div>

        {/* Recipients Selection */}
        <div>
          <GlassCard className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Users size={20} />
              Select Recipients
            </h3>

            <div className="space-y-3">
              {recipientTypes.map((type) => (
                <label
                  key={type.value}
                  className={`flex items-start gap-3 p-3 border rounded-lg cursor-pointer transition ${
                    recipientType === type.value ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="recipientType"
                    value={type.value}
                    checked={recipientType === type.value}
                    onChange={(e) => setRecipientType(e.target.value)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{type.label}</p>
                    <p className="text-xs text-gray-600">{type.description}</p>
                  </div>
                </label>
              ))}
            </div>

            {/* Course Selection */}
            {recipientType === "course" && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium mb-2">Select Courses:</p>
                <div className="space-y-2">
                  {courses.map((course) => (
                    <label key={course} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedCourses.includes(course)}
                        onChange={() => handleCourseToggle(course)}
                      />
                      <span className="text-sm">{course}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Semester Selection */}
            {recipientType === "semester" && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium mb-2">Select Semesters:</p>
                <div className="grid grid-cols-4 gap-2">
                  {semesters.map((semester) => (
                    <label
                      key={semester}
                      className={`p-2 border rounded text-center text-sm cursor-pointer transition ${
                        selectedSemesters.includes(semester) ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedSemesters.includes(semester)}
                        onChange={() => handleSemesterToggle(semester)}
                        className="hidden"
                      />
                      Sem {semester}
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Department Selection */}
            {recipientType === "department" && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium mb-2">Select Departments:</p>
                <div className="space-y-2">
                  {departments.map((dept) => (
                    <label key={dept} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedDepartments.includes(dept)}
                        onChange={() => handleDepartmentToggle(dept)}
                      />
                      <span className="text-sm">{dept}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </GlassCard>
        </div>
      </div>
    </>
  );

  const renderTemplatesTab = () => (
    <div className="grid grid-cols-2 gap-6">
      {templates.map((template) => (
        <GlassCard key={template.id} className="p-6">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="font-semibold text-lg">{template.name}</h3>
              <StatusBadge variant="default" className="mt-2">
                {template.category}
              </StatusBadge>
            </div>
            <button
              onClick={() => handleUseTemplate(template)}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
            >
              <Copy size={16} />
              Use Template
            </button>
          </div>

          <div className="space-y-2 text-sm">
            <div>
              <p className="text-gray-600 font-medium">Subject:</p>
              <p className="text-gray-800">{template.subject}</p>
            </div>
            <div>
              <p className="text-gray-600 font-medium">Content:</p>
              <p className="text-gray-800">{template.content}</p>
            </div>
          </div>
        </GlassCard>
      ))}
    </div>
  );

  const renderHistoryTab = () => (
    <GlassCard className="p-6">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4">Subject</th>
              <th className="text-left py-3 px-4">Recipients</th>
              <th className="text-center py-3 px-4">Sent Date</th>
              <th className="text-center py-3 px-4">Sent Time</th>
              <th className="text-center py-3 px-4">Delivery Rate</th>
              <th className="text-center py-3 px-4">Status</th>
              <th className="text-center py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {notificationHistory.map((notification) => (
              <tr key={notification.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 font-medium">{notification.subject}</td>
                <td className="py-3 px-4 text-sm text-gray-600">{notification.recipients}</td>
                <td className="py-3 px-4 text-center text-sm">{notification.sentDate}</td>
                <td className="py-3 px-4 text-center text-sm">{notification.sentTime}</td>
                <td className="py-3 px-4 text-center">
                  <StatusBadge variant="success">{notification.deliveryRate}</StatusBadge>
                </td>
                <td className="py-3 px-4 text-center">
                  <StatusBadge variant="success">
                    <CheckCircle size={12} className="inline mr-1" />
                    {notification.status}
                  </StatusBadge>
                </td>
                <td className="py-3 px-4">
                  <div className="flex justify-center gap-2">
                    <button
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                      title="View"
                    >
                      <Eye size={18} />
                    </button>
                    <button
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
  );

  const renderContent = () => {
    switch (activeTab) {
      case "compose": return renderComposeTab();
      case "templates": return renderTemplatesTab();
      case "history": return renderHistoryTab();
      default: return null;
    }
  };

  return (
    <AppLayout navigation={<AuthorityNav />}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-serif">Notifications & Communication</h1>
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