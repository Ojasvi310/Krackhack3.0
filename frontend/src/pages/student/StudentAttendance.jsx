import { useState, useEffect } from "react";
import axios from "axios";
import { Loader2, Award, Info, AlertCircle, BookOpen } from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import AppLayout from "../../components/AppLayout";
import GlassCard from "../../components/GlassCard";
import StatusBadge from "../../components/StatusBadge";
import api from "../../api/config";
const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);
// const ATTENDANCE_API = "http://localhost:8000/api/attendance/details";
const ATTENDANCE_API = `${import.meta.env.VITE_API_BASE_URL}/attendance`;

const StudentAttendance = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttendance = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        try {
          const res = await axios.get(`${ATTENDANCE_API}/${user.id}`);
          setRecords(res.data || []);
        } catch (err) {
          console.error("Citadel Attendance Sync Failed:", err);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchAttendance();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#f8fafc]">
        <Loader2 className="w-10 h-10 animate-spin text-[#1e293b]" />
      </div>
    );
  }

  return (
    <AppLayout>
      <div className="mb-10">
        <h1 className="text-4xl font-serif text-[#1e293b]">Attendance Ledger</h1>
        <p className="text-[#64748b] mt-1">Detailed audit of your presence in the Citadel's lectures.</p>
      </div>

      <div className="grid gap-6">
        {records.length > 0 ? records.map((record) => {
          const ratio = record.total > 0 ? (record.attended / record.total) * 100 : 0;
          const isDanger = ratio < 75;

          return (
            <GlassCard key={record.id} className="bg-white border-[#e2e8f0] p-8 flex flex-col md:flex-row justify-between items-center shadow-sm hover:shadow-md transition-all">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-2xl font-serif text-[#1e293b]">
                    {record.courses?.course_name || "Course Unidentified"}
                  </h3>
                  <StatusBadge variant={isDanger ? "danger" : "success"}>
                    {isDanger ? "LOW STANDING" : "GOOD STANDING"}
                  </StatusBadge>
                </div>
                <p className="text-xs font-bold text-[#94a3b8] uppercase tracking-widest">{record.course_id}</p>
                <div className="mt-4 flex items-center gap-4 text-[10px] text-[#94a3b8] font-bold uppercase">
                  <span className="flex items-center gap-1"><Info className="w-3 h-3"/> Last Recorded: {new Date(record.updated_at).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="flex items-center gap-10 mt-6 md:mt-0">
                <div className="text-center">
                  <p className="text-2xl font-serif text-[#1e293b]">{record.attended} / {record.total}</p>
                  <p className="text-[10px] font-bold text-[#94a3b8] uppercase">Lectures</p>
                </div>
                <div className="text-center">
                  <p className={`text-4xl font-serif ${isDanger ? 'text-red-500' : 'text-[#1e293b]'}`}>
                    {Math.round(ratio)}%
                  </p>
                  <p className="text-[10px] font-bold text-[#94a3b8] uppercase">Final Ratio</p>
                </div>
              </div>
            </GlassCard>
          );
        }) : (
          <div className="py-20 text-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-100">
            <BookOpen className="w-12 h-12 text-gray-200 mx-auto mb-4" />
            <p className="text-gray-400 font-serif italic">No attendance records found for your identity.</p>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default StudentAttendance;