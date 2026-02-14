import { useState } from "react";
import AppLayout from "../../components/AppLayout";
import GlassCard from "../../components/GlassCard";
import StatusBadge from "../../components/StatusBadge";
import { FileText, BookOpen, Video, Bell, Upload } from "lucide-react";

const coursesData = [
  {
    id: "CS301",
    name: "Database Management Systems",
    professor: "Dr. Sharma",
    credits: 4,
    attendance: 85,

    lectures: [
      { title: "Normalization", date: "Mar 1", link: "#" },
      { title: "Indexing", date: "Mar 3", link: "#" },
    ],

    materials: [
      { title: "DBMS Notes Unit 1", type: "PDF", link: "#" },
      { title: "Transaction Management Notes", type: "PDF", link: "#" },
    ],

    pyqs: [
      { title: "Midsem PYQ 2023", year: 2023 },
      { title: "Endsem PYQ 2022", year: 2022 },
    ],

    announcements: [
      {
        text: "Assignment 2 released",
        date: "Mar 5",
        type: "important",
      },
    ],

    syllabus: [
      "Introduction",
      "Normalization",
      "Transactions",
      "Indexing",
    ],
  },

  {
    id: "CS302",
    name: "Operating Systems",
    professor: "Dr. Mehta",
    credits: 3,
    attendance: 78,

    lectures: [
      { title: "Process Scheduling", date: "Mar 2", link: "#" },
    ],

    materials: [
      { title: "OS Notes Unit 2", type: "PDF", link: "#" },
    ],

    pyqs: [
      { title: "OS PYQ 2023", year: 2023 },
    ],

    announcements: [
      {
        text: "Quiz on Friday",
        date: "Mar 6",
        type: "info",
      },
    ],

    syllabus: [
      "Processes",
      "Threads",
      "Scheduling",
    ],
  },
];

const tabs = [
  { id: "lectures", label: "Lectures", icon: Video },
  { id: "materials", label: "Study Materials", icon: BookOpen },
  { id: "pyqs", label: "PYQs", icon: FileText },
  { id: "announcements", label: "Announcements", icon: Bell },
  { id: "syllabus", label: "Syllabus", icon: FileText },
];

export default function StudentCourses() {
  const [selectedCourse, setSelectedCourse] = useState(coursesData[0]);
  const [activeTab, setActiveTab] = useState("lectures");

  const renderContent = () => {
    switch (activeTab) {
      case "lectures":
        return (
          <div className="space-y-3">
            {selectedCourse.lectures.map((lecture, i) => (
              <GlassCard key={i} className="p-4 flex justify-between">
                <div>
                  <p className="font-medium">{lecture.title}</p>
                  <p className="text-xs text-gray-500">{lecture.date}</p>
                </div>
                <button className="text-blue-500">View</button>
              </GlassCard>
            ))}
          </div>
        );

      case "materials":
        return (
          <div className="space-y-3">
            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded">
              <Upload size={16} />
              Upload Material
            </button>

            {selectedCourse.materials.map((mat, i) => (
              <GlassCard key={i} className="p-4 flex justify-between">
                <p>{mat.title}</p>
                <button className="text-blue-500">Download</button>
              </GlassCard>
            ))}
          </div>
        );

      case "pyqs":
        return (
          <div className="space-y-3">
            {selectedCourse.pyqs.map((pyq, i) => (
              <GlassCard key={i} className="p-4 flex justify-between">
                <p>{pyq.title}</p>
                <button className="text-blue-500">Download</button>
              </GlassCard>
            ))}
          </div>
        );

      case "announcements":
        return (
          <div className="space-y-3">
            {selectedCourse.announcements.map((ann, i) => (
              <GlassCard key={i} className="p-4 flex justify-between">
                <div>
                  <p>{ann.text}</p>
                  <p className="text-xs text-gray-500">{ann.date}</p>
                </div>

                <StatusBadge variant="warning">
                  {ann.type}
                </StatusBadge>
              </GlassCard>
            ))}
          </div>
        );

      case "syllabus":
        return (
          <div className="space-y-2">
            {selectedCourse.syllabus.map((topic, i) => (
              <GlassCard key={i} className="p-3">
                {topic}
              </GlassCard>
            ))}
          </div>
        );
    }
  };

  return (
    <AppLayout>

      <h1 className="text-3xl font-serif mb-6">
        My Courses
      </h1>

      {/* Course Selector */}

      <div className="flex gap-3 mb-6 flex-wrap">

        {coursesData.map((course) => (

          <button
            key={course.id}
            onClick={() => setSelectedCourse(course)}
            className={`px-4 py-2 rounded-lg border ${
              selectedCourse.id === course.id
                ? "bg-blue-600 text-white"
                : "bg-white"
            }`}
          >

            {course.name}

          </button>

        ))}

      </div>

      {/* Course Info */}

      <GlassCard className="p-5 mb-6">

        <div className="flex justify-between">

          <div>

            <h2 className="text-xl font-semibold">
              {selectedCourse.name}
            </h2>

            <p className="text-sm text-gray-500">
              Professor: {selectedCourse.professor}
            </p>

            <p className="text-sm text-gray-500">
              Credits: {selectedCourse.credits}
            </p>

          </div>

          <div>

            <p className="text-sm">
              Attendance
            </p>

            <StatusBadge variant="success">
              {selectedCourse.attendance}%
            </StatusBadge>

          </div>

        </div>

      </GlassCard>

      {/* Tabs */}

      <div className="flex gap-4 mb-6">

        {tabs.map((tab) => (

          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              activeTab === tab.id
                ? "bg-blue-600 text-white"
                : "bg-white"
            }`}
          >

            <tab.icon size={16} />

            {tab.label}

          </button>

        ))}

      </div>

      {/* Tab Content */}

      {renderContent()}

    </AppLayout>
  );
}
