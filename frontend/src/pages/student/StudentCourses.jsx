
import { useState, useEffect } from "react";
import AppLayout from "../../components/AppLayout";
import GlassCard from "../../components/GlassCard";
import axios from "axios";
import { BookOpen, FileText, Download, Award, Calendar, Loader2 } from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import api from "../../api/config";
const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);

const StudentCourses = () => {
  const [userId, setUserId] = useState(null);
  // ✅ FIX: Use consistent names for state and setter
  const [courses, setCourses] = useState([]); 
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) setUserId(user.id);
    };
    getSession();
  }, []);

  const fetchCourses = async () => {
    if (!userId) return;
    try {
      setLoading(true);
      // Ensure this matches your backend @router.get("/details/{user_id}")
      const response = await api.get(`/student-courses/details/${userId}`);
     
      // ✅ FIX: Use the correct setter name defined in your state
      setCourses(response.data); 
      if (response.data.length > 0) setSelectedCourse(response.data[0]);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) fetchCourses();
  }, [userId]);

  return (
    <AppLayout>
      <div className="mb-10">
        <h1 className="text-4xl font-serif text-[#1e293b]">Academic Mastery</h1>
        <p className="text-[#64748b]">Access your courses, attendance, and the resource vault.</p>
      </div>

      {/* Course Selection Tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {courses.map((course) => (
          <button
            key={course.course_id}
            onClick={() => setSelectedCourse(course)}
            className={`px-6 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${
              selectedCourse?.course_id === course.course_id
                ? "bg-[#1e293b] text-white shadow-lg"
                : "bg-white text-[#64748b] border border-[#e2e8f0] hover:bg-[#f8fafc]"
            }`}
          >
            {course.course_id}
          </button>
        ))}
      </div>

      {selectedCourse && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Attendance Section */}
          <GlassCard className="bg-white border-[#e2e8f0] p-6 h-fit">
            <h2 className="text-xl font-serif text-[#1e293b] mb-4">Course Intelligence</h2>
            <div className="space-y-4">
              <div>
                <p className="text-[10px] uppercase font-bold text-[#94a3b8]">Full Title</p>
                <p className="text-[#1e293b] font-medium">{selectedCourse.course_name}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-[#94a3b8]">Attendance Status</p>
                <div className="flex justify-between items-end mt-1">
                  <p className="text-2xl font-serif text-[#1e293b]">
                    {selectedCourse.attendance.total > 0 
                      ? Math.round((selectedCourse.attendance.attended / selectedCourse.attendance.total) * 100) 
                      : 0}%
                  </p>
                  <p className="text-xs text-[#64748b]">{selectedCourse.attendance.attended}/{selectedCourse.attendance.total} Lectures</p>
                </div>
                <div className="w-full h-2 bg-[#f1f5f9] rounded-full mt-2 overflow-hidden">
                  <div 
                    className="h-full bg-[#1e293b]" 
                    style={{ width: `${(selectedCourse.attendance.attended / selectedCourse.attendance.total) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Resources Vault */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-serif text-[#1e293b]">The Resource Vault</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedCourse.resources?.length > 0 ? (
                selectedCourse.resources.map((res) => (
                  <GlassCard key={res.id} hover className="bg-white border-[#e2e8f0] p-5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-[#f1f5f9] rounded-lg">
                        <FileText className="w-5 h-5 text-[#1e293b]" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#1e293b]">{res.resource_type} - {res.year}</p>
                        <div className="flex gap-1 mt-1">
                          {res.tags?.map(tag => (
                            <span key={tag} className="text-[9px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded">{tag}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <a href={res.file_url} target="_blank" rel="noreferrer" className="text-[#64748b] hover:text-[#1e293b]">
                      <Download className="w-5 h-5" />
                    </a>
                  </GlassCard>
                ))
              ) : (
                <div className="col-span-2 py-10 text-center bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                  <p className="text-[#64748b] text-sm">No verified resources available for this sector yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
};

export default StudentCourses;