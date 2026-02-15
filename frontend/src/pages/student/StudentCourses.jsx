// // import { useState, useEffect } from "react";
// // import AppLayout from "../../components/AppLayout";
// // import axios from "axios";
// // import { createClient } from "@supabase/supabase-js";

// // const supabase = createClient(
// //   import.meta.env.VITE_SUPABASE_URL,
// //   import.meta.env.VITE_SUPABASE_ANON_KEY
// // );

// // export default function StudentCourses(){

// //   const [userId,setUserId]=useState(null);
// //   const [courses,setCourses]=useState([]);
// //   const [loading,setLoading]=useState(true);

// //   // SAME AS GRIEVANCES
// //   useEffect(()=>{
// //     const getUser=async()=>{
// //       const {data:{user}} = await supabase.auth.getUser();
// //       if(user) setUserId(user.id);
// //     };
// //     getUser();
// //   },[]);

// //   // SAME AS GRIEVANCES FETCH
// //   useEffect(()=>{
// //     const load=async()=>{
// //       if(!userId) return;

// //       try{
// //         const res = await axios.get(
// //           `http://localhost:8000/api/student-courses/list/${userId}`
// //         );

// //         setCourses(res.data || []);
// //       }
// //       catch(err){
// //         console.error(err);
// //       }
// //       finally{
// //         setLoading(false);
// //       }
// //     };

// //     load();
// //   },[userId]);

// //   if(loading) return <div>Loading courses...</div>;

// //   return (
// //     <AppLayout>

// //       <h1 className="text-3xl font-bold mb-6">My Courses</h1>

// //       {courses.length===0 && <div>No courses found</div>}

// //       {courses.map(c=>(
// //         <div key={c.id} className="p-4 border rounded mb-3">
// //           <div className="font-semibold">{c.course_name}</div>
// //           <div className="text-sm text-gray-500">{c.course_code}</div>
// //         </div>
// //       ))}

// //     </AppLayout>
// //   );

// // }
// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import AppLayout from "../../components/AppLayout";
// import GlassCard from "../../components/GlassCard";
// import StatusBadge from "../../components/StatusBadge";
// import axios from "axios";
// import { BookOpen, Calendar, Award, ArrowLeft, Loader2, Info } from "lucide-react";
// import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
// const supabase = createClient(supabaseUrl, supabaseKey);

// const StudentNav = () => (
//   <div className="flex gap-6 font-sans text-sm font-medium">
//     <Link to="/student/dashboard" className="text-[#64748b] hover:text-[#1e293b]">Dashboard</Link>
//     <Link to="/student/courses" className="text-[#1e293b] border-b-2 border-[#1e293b]">Courses</Link>
//     <Link to="/student/grievances" className="text-[#64748b] hover:text-[#1e293b]">Grievances</Link>
//   </div>
// );

// const StudentCourses = () => {
//   const [userId, setUserId] = useState(null);
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const getUser = async () => {
//       const { data: { user } } = await supabase.auth.getUser();
//       if (user) setUserId(user.id);
//     };
//     getUser();
//   }, []);

//   // const fetchCourses = async () => {
//   //   if (!userId) return;
//   //   try {
//   //     const response = await axios.get(`http://localhost:8000/api/student-courses/my-courses/${userId}`);
//   //     setCourses(response.data);
//   //   } catch (error) {
//   //     console.error("Error fetching courses:", error);
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };
//   const fetchCourses = async () => {
//   if (!userId) return;
//   try {
//     setLoading(true);
//     // Ensure the path matches the backend: /api/student-courses/details/
//     const response = await axios.get(
//       `http://localhost:8000/api/student-courses/details/${userId}`
//     );
//     setCourseData(response.data);
//     if (response.data.length > 0) setSelectedCourse(response.data[0]);
//   } catch (error) {
//     console.error("Error fetching courses:", error);
//   } finally {
//     setLoading(false);
//   }
// };

//   useEffect(() => {
//     if (userId) fetchCourses();
//   }, [userId]);

//   return (
//     <AppLayout navigation={<StudentNav />}>
//       <div className="mb-8 flex items-center gap-4">
//         <Link to="/student/dashboard">
//           <button className="flex items-center gap-2 text-[#64748b] hover:text-[#1e293b] transition-colors">
//             <ArrowLeft className="w-4 h-4" />
//             <span className="text-sm font-medium">Back to Dashboard</span>
//           </button>
//         </Link>
//       </div>

//       <div className="mb-10 text-center lg:text-left">
//         <h1 className="text-4xl font-serif text-[#1e293b] mb-2">My Academic Courses</h1>
//         <p className="text-[#64748b] font-sans">View your enrollments and track attendance</p>
//       </div>

//       {loading ? (
//         <div className="flex flex-col items-center justify-center py-20">
//           <Loader2 className="w-10 h-10 text-[#1e293b] animate-spin mb-4" />
//           <p className="text-[#64748b] animate-pulse">Loading your academic record...</p>
//         </div>
//       ) : courses.length === 0 ? (
//         <GlassCard className="p-12 text-center border-[#e2e8f0] bg-white">
//           <BookOpen className="w-16 h-16 text-[#cbd5e1] mx-auto mb-4" />
//           <h3 className="text-xl font-serif text-[#1e293b]">No Enrollments Found</h3>
//           <p className="text-[#64748b] mt-2">You haven't been enrolled in any courses for the current semester.</p>
//         </GlassCard>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {courses.map((item) => (
//             <GlassCard key={item.course_id} hover className="border-[#e2e8f0] bg-white p-6 transition-all">
//               <div className="flex justify-between items-start mb-4">
//                 <div>
//                   <span className="text-[10px] uppercase tracking-widest font-bold text-[#94a3b8]">{item.course_id}</span>
//                   <h3 className="text-xl font-serif text-[#1e293b] mt-1">{item.course_name}</h3>
//                 </div>
//                 <StatusBadge variant={item.status === 'ACTIVE' ? 'success' : 'info'}>
//                   {item.status}
//                 </StatusBadge>
//               </div>

//               <div className="grid grid-cols-2 gap-4 mb-6">
//                 <div className="flex items-center gap-2 text-sm text-[#64748b]">
//                   <Award className="w-4 h-4" />
//                   <span>{item.credits} Credits</span>
//                 </div>
//                 <div className="flex items-center gap-2 text-sm text-[#64748b]">
//                   <Calendar className="w-4 h-4" />
//                   <span>Semester {item.semester}</span>
//                 </div>
//               </div>

//               {/* Attendance Bar */}
//               <div className="space-y-2">
//                 <div className="flex justify-between text-xs font-semibold">
//                   <span className="text-[#64748b] uppercase tracking-tighter">Attendance</span>
//                   <span className={item.attendance.percentage < 75 ? "text-red-500" : "text-emerald-600"}>
//                     {item.attendance.percentage}%
//                   </span>
//                 </div>
//                 <div className="w-full h-2 bg-[#f1f5f9] rounded-full overflow-hidden">
//                   <div 
//                     className={`h-full transition-all duration-500 ${item.attendance.percentage < 75 ? "bg-red-500" : "bg-emerald-500"}`}
//                     style={{ width: `${item.attendance.percentage}%` }}
//                   />
//                 </div>
//                 <p className="text-[10px] text-[#94a3b8] text-right">
//                   {item.attendance.attended} / {item.attendance.total} Lectures
//                 </p>
//               </div>
//             </GlassCard>
//           ))}
//         </div>
//       )}
//     </AppLayout>
//   );
// };

// export default StudentCourses;
import { useState, useEffect } from "react";
import AppLayout from "../../components/AppLayout";
import GlassCard from "../../components/GlassCard";
import axios from "axios";
import { BookOpen, FileText, Download, Award, Calendar, Loader2 } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

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
      const response = await axios.get(`http://localhost:8000/api/student-courses/details/${userId}`);
      
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