import { useState, useEffect } from "react";
import AppLayout from "../../components/AppLayout";
import GlassCard from "../../components/GlassCard";
import StatusBadge from "../../components/StatusBadge";
import axios from "axios";
import api from "../../api/config";
import { 
  Search, Briefcase, Calendar, Loader2, Send, 
  Clock, CheckCircle2, XCircle, User, Mail, Trash2 
} from "lucide-react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);
// const BASE_URL = "http://localhost:8000/api/student-opportunities";
const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/student-opportunities`;

const StudentOpportunities = () => {
  const [userId, setUserId] = useState(null);
  const [activeTab, setActiveTab] = useState("browse");
  const [opportunities, setOpportunities] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const statusConfig = {
    "Applied": { variant: "warning", icon: <Clock className="w-3 h-3" /> },
    "Shortlisted": { variant: "success", icon: <CheckCircle2 className="w-3 h-3" /> },
    "Rejected": { variant: "danger", icon: <XCircle className="w-3 h-3" /> },
    "default": { variant: "info", icon: <Clock className="w-3 h-3" /> }
  };

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) setUserId(user.id);
    };
    getUser();
  }, []);

  const fetchData = async () => {
    if (!userId) return;
    setLoading(true);
    try {
      // const oppRes = await axios.get(`${BASE_URL}/`);
      // const appRes = await axios.get(`${BASE_URL}/my-applications/${userId}`);
      const oppRes = await axios.get(`${BASE_URL}/`);
      const appRes = await axios.get(`${BASE_URL}/my-applications/${userId}`);
      setOpportunities(oppRes.data || []);
      setApplications(appRes.data || []);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { if (userId) fetchData(); }, [userId]);

  const handleApply = async (oppId) => {
    try {
      const res = await axios.post(`${BASE_URL}/apply/${oppId}/${userId}`);
      if (res.data.status === "success_verified") {
        alert("Application Authorized.");
        fetchData(); 
      }
    } catch (err) { alert(err.response?.data?.detail || "Failed"); }
  };

  const handleWithdraw = async (oppId) => {
    if (!window.confirm("Are you sure you want to withdraw this application?")) return;
    try {
      const res = await axios.delete(`${BASE_URL}/withdraw/${oppId}/${userId}`);
      if (res.data.status === "success_verified") {
        alert("Application Withdrawn.");
        fetchData();
      }
    } catch (err) { alert("Withdrawal failed."); }
  };

  const handleContact = (opp) => {
    window.location.href = `mailto:${opp.profiles?.email}?subject=Inquiry: ${opp.title}`;
  };

  const filteredOpps = opportunities.filter(opp => 
    opp.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="mb-10">
        <h1 className="text-4xl font-serif text-[#1e293b]">Citadel Opportunities</h1>
        <p className="text-[#64748b]">Manage your career path and applications.</p>
      </div>

      <div className="flex bg-white p-1 border border-[#e2e8f0] rounded-xl w-fit mb-8 shadow-sm">
        <button onClick={() => setActiveTab("browse")} className={`px-8 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'browse' ? 'bg-[#1e293b] text-white shadow-md' : 'text-[#64748b]'}`}>Browse</button>
        <button onClick={() => setActiveTab("apps")} className={`px-8 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'apps' ? 'bg-[#1e293b] text-white shadow-md' : 'text-[#64748b]'}`}>My Applications ({applications.length})</button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="animate-spin text-[#1e293b]" /></div>
      ) : activeTab === "browse" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOpps.map(opp => (
            <GlassCard key={opp.id} className="bg-white p-6 border-[#e2e8f0] flex flex-col hover:shadow-lg transition-all">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-serif text-xl text-[#1e293b]">{opp.title}</h3>
                <StatusBadge variant="info">OPEN</StatusBadge>
              </div>
              <div className="flex items-center justify-between mb-4 bg-slate-50 p-2 rounded-lg">
                <div className="flex items-center gap-2">
                  <User className="w-3 h-3 text-[#1e293b]" />
                  <span className="text-[11px] font-bold text-[#1e293b]">{opp.profiles?.full_name}</span>
                </div>
                <button onClick={() => handleContact(opp)} className="flex items-center gap-1 text-[10px] font-bold text-[#1e293b] hover:underline"><Mail className="w-3 h-3" /> CONTACT</button>
              </div>
              <p className="text-sm text-[#64748b] mb-6 flex-1 line-clamp-3">{opp.description}</p>
              <button onClick={() => handleApply(opp.id)} className="w-full py-3.5 bg-[#1e293b] text-white rounded-xl font-bold hover:bg-[#334155] transition-all flex items-center justify-center gap-2"><Send className="w-4 h-4" /> APPLY NOW</button>
            </GlassCard>
          ))}
        </div>
      ) : (
        <div className="max-w-4xl mx-auto space-y-4">
          {applications.map(app => {
            const config = statusConfig[app.status] || statusConfig.default;
            return (
              <GlassCard key={app.id} className="bg-white border-[#e2e8f0] p-5 flex justify-between items-center shadow-sm">
                <div className="flex items-center gap-4">
                  <Briefcase className="w-5 h-5 text-[#1e293b]" />
                  <div>
                    <h4 className="font-bold text-[#1e293b] font-serif">{app.opportunities?.title}</h4>
                    <p className="text-[10px] text-[#94a3b8] font-semibold">TO: {app.opportunities?.profiles?.full_name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <StatusBadge variant={config.variant} className="flex items-center gap-2 px-4 py-1.5 min-w-[120px] justify-center">
                    {config.icon} <span className="font-bold uppercase tracking-tighter">{app.status}</span>
                  </StatusBadge>
                  <button 
                    onClick={() => handleWithdraw(app.opportunity_id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Withdraw Application"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </GlassCard>
            );
          })}
        </div>
      )}
    </AppLayout>
  );
};

export default StudentOpportunities;