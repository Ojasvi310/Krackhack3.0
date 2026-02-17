import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supbase";
import AuthorityApi from "../../services/AuthorityApi"; 

const AuthorityGrievances = () => {
  const [userId, setUserId] = useState(null);
  const [deptName, setDeptName] = useState("");
  const [grievances, setGrievances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGrievance, setSelectedGrievance] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [priority, setPriority] = useState("MEDIUM");
  const [remarks, setRemarks] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return setError("User not logged in.");
      setUserId(user.id);

      // 🔥 Use AuthorityApi instead of axios.get
      const profileData = await AuthorityApi.getAuthorityProfile(user.id);
      const { dept_id, dept_name } = profileData;
      setDeptName(dept_name);

      if (dept_id) {
        // 🔥 Use AuthorityApi instead of axios.get
        const grievancesData = await AuthorityApi.getGrievancesByDept(dept_id);
        setGrievances(grievancesData || []);
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      setError("Failed to load dashboard.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateClick = (grievance) => {
    setSelectedGrievance(grievance);
    setNewStatus(grievance.status);
    setIsModalOpen(true);
  };

  const submitStatusUpdate = async () => {
    if (!remarks) return alert("Please provide remarks for this update.");

    try {
      setUpdating(true);

      const payload = {
        grievance_id: selectedGrievance.id,
        new_status: newStatus,
        remarks: remarks,
        actor_id: userId,
        priority: priority,
        student_id: selectedGrievance.user_id || selectedGrievance.student_id, 
      };

      // 🔥 Use AuthorityApi instead of axios.post
      await AuthorityApi.updateGrievanceProgress(payload);

      setGrievances((prev) =>
        prev.map((g) =>
          g.id === selectedGrievance.id ? { ...g, status: newStatus } : g,
        ),
      );

      setIsModalOpen(false);
      setRemarks("");
      alert("Progress updated successfully!");
    } catch (err) {
      console.error("Update Error:", err.response?.data || err);
      alert(`Failed to update: ${err.response?.data?.detail || "Check console"}`);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div className="p-10 text-center">Loading dashboard...</div>;
  if (error) return <div className="p-10 text-center text-red-500">{error}</div>;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">{deptName} Dashboard</h1>
        <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg font-medium">
          Active Grievances: {grievances.length}
        </div>
      </div>

      <div className="space-y-4">
        {grievances.map((g) => (
          <div key={g.id} className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-bold">{g.title}</h3>
              <span className={`px-3 py-1 rounded text-xs font-bold uppercase ${
                  g.status === "PENDING" ? "bg-orange-100 text-orange-600" : "bg-green-100 text-green-600"
                }`}>
                {g.status}
              </span>
            </div>
            <p className="text-gray-600 mb-4">{g.description}</p>
            <div className="flex gap-3">
              <button onClick={() => handleUpdateClick(g)} className="text-sm font-semibold text-blue-600 hover:text-blue-800">
                Update Status
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal logic remains the same as your provided code */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Log Progress</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select className="w-full p-2 border rounded" value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
                  <option value="PENDING">PENDING</option>
                  <option value="IN_PROGRESS">IN_PROGRESS</option>
                  <option value="RESOLVED">RESOLVED</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Priority</label>
                <select className="w-full p-2 border rounded" value={priority} onChange={(e) => setPriority(e.target.value)}>
                  <option value="LOW">LOW</option>
                  <option value="MEDIUM">MEDIUM</option>
                  <option value="HIGH">HIGH</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Remarks</label>
                <textarea className="w-full p-2 border rounded h-24" value={remarks} onChange={(e) => setRemarks(e.target.value)} placeholder="What action was taken?" />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setIsModalOpen(false)} className="flex-1 py-2 bg-gray-100 rounded">Cancel</button>
              <button onClick={submitStatusUpdate} disabled={updating} className="flex-1 py-2 bg-blue-600 text-white rounded disabled:bg-blue-300">
                {updating ? "Saving..." : "Save Log"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthorityGrievances;