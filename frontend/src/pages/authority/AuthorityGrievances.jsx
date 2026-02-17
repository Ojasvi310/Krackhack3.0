import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supbase";
import AuthorityApi from "../../services/AuthorityApi";
import axios from "axios";
import api from "../../api/config";

const AuthorityGrievances = () => {
  const [userId, setUserId] = useState(null);
  const [deptName, setDeptName] = useState("");
  const [grievances, setGrievances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Modal & Progress States
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
      setError("");
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setError("User not logged in.");
        return;
      }

      setUserId(user.id);
      const profileData = await AuthorityApi.getAuthorityProfile(user.id);

      if (profileData.role?.toLowerCase() !== "authority") {
        setError("Access denied. Not an authority.");
        return;
      }

      setDeptName(profileData.dept_name || "Department");
      if (profileData.dept_id) {
        const grievancesData = await AuthorityApi.getGrievancesByDept(
          profileData.dept_id,
        );
        setGrievances(grievancesData || []);
      }
    } catch (err) {
      setError(err.message || "Failed to load dashboard.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateClick = (grievance) => {
    setSelectedGrievance(grievance);
    setNewStatus(grievance.status);
    setRemarks("");
    setIsModalOpen(true);
  };

  const submitStatusUpdate = async () => {
    // 1. Validation
    if (!remarks.trim()) {
      return alert("Please provide remarks for this update.");
    }

    try {
      setUpdating(true);

      // 2. The exact JSON format your backend expects
      const payload = {
        grievance_id: selectedGrievance.id,
        new_status: newStatus,
        remarks: remarks,
        actor_id: userId,
        priority: priority,
      };

      // 3. Direct Axios Post Request
      const response = await api.post("/update-progress", payload, {
        headers: { "Content-Type": "application/json" },
        timeout: 60000, // 60s timeout to handle Render cold-start
      });

      // 4. Update local state immediately for the UI
      setGrievances((prev) =>
        prev.map((g) =>
          g.id === selectedGrievance.id ? { ...g, status: newStatus } : g,
        ),
      );

      // 5. Cleanup
      setIsModalOpen(false);
      setRemarks("");
      alert("Status updated successfully!");
    } catch (err) {
      console.error("Update Error:", err);
      // Handling the specific "timeout" or "404" errors
      const errorMsg =
        err.response?.data?.detail || err.message || "Request failed";
      alert(`Failed: ${errorMsg}`);
    } finally {
      setUpdating(false);
    }
  };

  if (loading)
    return (
      <div className="p-10 text-center text-gray-500">Loading dashboard...</div>
    );
  if (error)
    return (
      <div className="p-10 text-center text-red-500 font-semibold">{error}</div>
    );

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">
          {deptName} Dashboard
        </h1>
        <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg font-medium">
          Active Grievances: {grievances.length}
        </div>
      </div>

      <div className="space-y-4">
        {grievances.length > 0 ? (
          grievances.map((g) => (
            <div
              key={g.id}
              className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold">{g.title}</h3>
                <span
                  className={`px-3 py-1 rounded text-xs font-bold uppercase ${
                    g.status === "PENDING"
                      ? "bg-orange-100 text-orange-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {g.status}
                </span>
              </div>
              <p className="text-gray-600">{g.description}</p>
              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => handleUpdateClick(g)}
                  className="text-sm font-semibold text-blue-600 hover:text-blue-800"
                >
                  Update Status
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
            <p className="text-gray-500">No grievances reported yet.</p>
          </div>
        )}
      </div>

      {/* Progress Update Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-xl">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Log Progress
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  New Status
                </label>
                <select
                  className="w-full p-2 border rounded"
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                >
                  <option value="PENDING">PENDING</option>
                  <option value="IN_PROGRESS">IN_PROGRESS</option>
                  <option value="RESOLVED">RESOLVED</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Priority
                </label>
                <select
                  className="w-full p-2 border rounded"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="LOW">LOW</option>
                  <option value="MEDIUM">MEDIUM</option>
                  <option value="HIGH">HIGH</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Remarks
                </label>
                <textarea
                  className="w-full p-2 border rounded h-24"
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  placeholder="Actions taken..."
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-2 bg-gray-100 rounded font-medium"
              >
                Cancel
              </button>
              <button
                onClick={submitStatusUpdate}
                disabled={updating}
                className="flex-1 py-2 bg-blue-600 text-white rounded font-medium disabled:bg-blue-300"
              >
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
