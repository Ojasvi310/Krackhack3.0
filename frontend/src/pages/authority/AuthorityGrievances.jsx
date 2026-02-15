import React, { useEffect, useState } from "react";
import axios from "axios";
import { supabase } from "../../lib/supbase";

const AuthorityGrievances = () => {
  const [userId, setUserId] = useState(null);
  const [deptName, setDeptName] = useState("");
  const [grievances, setGrievances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError("");

        // 🔥 Step 1: Get logged-in user from Supabase
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();

        if (authError) {
          console.error("Auth error:", authError);
          setError("Authentication failed.");
          setLoading(false);
          return;
        }

        if (!user) {
          setError("User not logged in.");
          setLoading(false);
          return;
        }

        console.log("Authority User ID:", user.id);
        setUserId(user.id);

        // 🔥 Step 2: Get authority profile from backend
        const profileRes = await api.get("/authority/profile", {
    params: { user_id: user.id },
});

        console.log("Profile Response:", profileRes.data);

        const role = profileRes.data.role?.toLowerCase();
        const dept_id = profileRes.data.dept_id;
        const dept_name = profileRes.data.dept_name || "Department";

        if (role !== "authority") {
          setError("Access denied. Not an authority.");
          setLoading(false);
          return;
        }

        if (!dept_id) {
          setError("Department not found.");
          setLoading(false);
          return;
        }

        setDeptName(dept_name);

        // 🔥 Step 3: Fetch grievances for department
        const grievancesRes = await api.get(`/grievances/list-by-dept/${dept_id}`);
        console.log("Grievances Response:", grievancesRes.data);

        setGrievances(grievancesRes.data || []);
      } catch (err) {
        console.error("Dashboard Error:", err.response || err);
        setError(err.response?.data?.detail || "Failed to load dashboard.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // 🔄 Loading State
  if (loading) {
    return (
      <div className="p-10 text-center text-gray-500">Loading dashboard...</div>
    );
  }

  // ❌ Error State
  if (error) {
    return (
      <div className="p-10 text-center text-red-500 font-semibold">{error}</div>
    );
  }

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
                <button className="text-sm font-semibold text-blue-600 hover:text-blue-800">
                  Update Status
                </button>
                <button className="text-sm font-semibold text-gray-500 hover:text-gray-700">
                  View Attachments
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
            <p className="text-gray-500">
              No grievances reported for this department yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthorityGrievances;