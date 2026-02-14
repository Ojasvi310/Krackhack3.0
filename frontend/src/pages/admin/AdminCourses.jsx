import AppLayoutSidebar from "../../components/AppLayoutSidebar";
import GlassCardPart3 from "../../components/GlassCardPart3";
import StatusBadge from "../../components/StatusBadge";
import { ShieldCheck, CheckCircle2, AlertTriangle, Clock, MessageSquareWarning, Users } from "lucide-react";

const stats = [
  { label: "Pending Verification", value: "8", icon: ShieldCheck, color: "text-[#1e293b]" },
  { label: "Open Grievances", value: "12", icon: AlertTriangle, color: "text-[#1e293b]" },
  { label: "Active Courses", value: "34", icon: CheckCircle2, color: "text-[#1e293b]" },
  { label: "Resolution Time", value: "36h", icon: Clock, color: "text-[#1e293b]" },
];

const AuthorityDashboardPart3 = () => (
  <AppLayoutSidebar>
    <div className="mb-10">
      <h1 className="text-4xl font-serif text-[#1e293b] mb-2">
        Good morning, <span className="text-[#1e293b]">Authority</span>
      </h1>
      <p className="text-[#64748b] font-sans">Monitor departmental integrity and academic operations.</p>
    </div>

    <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((s) => (
        <GlassCardPart3 key={s.label} className="border-[#e2e8f0] bg-white shadow-sm">
          <div className="flex items-center justify-between p-2">
            <div>
              <p className="text-[10px] uppercase tracking-wider font-semibold text-[#94a3b8]">{s.label}</p>
              <p className="mt-1 text-3xl font-serif text-[#1e293b]">{s.value}</p>
            </div>
            <div className="h-12 w-12 rounded-xl bg-[#f1f5f9] flex items-center justify-center">
              <s.icon className={`h-6 w-6 ${s.color}`} />
            </div>
          </div>
        </GlassCardPart3>
      ))}
    </div>

    <div className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <h2 className="mb-6 text-xl font-serif text-[#1e293b]">Departmental Overview</h2>
        <div className="grid grid-cols-1 gap-4">
          {["Computer Science", "Mechanical Eng."].map((dept) => (
            <GlassCardPart3 key={dept} className="border-[#e2e8f0] bg-white p-5 flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-[#1e293b]">{dept}</h3>
                <p className="text-xs text-[#64748b]">Avg. Resolution: 24h</p>
              </div>
              <div className="flex gap-3">
                <StatusBadge variant="warning">5 Pending</StatusBadge>
                <StatusBadge variant="success">12 Resolved</StatusBadge>
              </div>
            </GlassCardPart3>
          ))}
        </div>
      </div>

      <GlassCardPart3 className="border-[#e2e8f0] bg-white p-6">
        <h2 className="mb-6 text-xl font-serif text-[#1e293b]">Priority Actions</h2>
        <div className="space-y-4">
          <div className="p-3 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
            <p className="text-xs font-bold text-red-700">URGENT</p>
            <p className="text-sm text-red-900">Resolve 3 High-Priority Grievances</p>
          </div>
          <div className="p-3 bg-blue-50 border-l-4 border-[#1e293b] rounded-r-lg">
            <p className="text-xs font-bold text-[#1e293b]">PENDING</p>
            <p className="text-sm text-[#1e293b]">Review 8 Study Material Uploads</p>
          </div>
        </div>
      </GlassCardPart3>
    </div>
  </AppLayoutSidebar>
);

export default AuthorityDashboardPart3;