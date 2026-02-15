import React, { useEffect, useState } from "react";
import axios from "axios";
import { supabase } from "../../lib/supbase";
import api from "../../api/config";
const AuthorityGrievances = ({ userId }) => {
  const [deptName, setDeptName] = useState("");
  const [grievances, setGrievances] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // 1. Get Authority Profile (to get the dept_id UUID)
        // const profileRes = await axios.get(
        //   `http://localhost:8000/api/authority/profile?user_id=${userId}`,
        // );
        const profileRes = await api.get(`/authority/profile?user_id=${userId}`);
        const { dept_id, dept_name, role } = profileRes.data;

        if (role === "Authority" && dept_id) {
          setDeptName(dept_name);

          // 2. Fetch Grievances using your working path-parameter route
          // const grievancesRes = await axios.get(
          //   `http://localhost:8000/api/list-by-dept/${dept_id}`,
          // );
          const grievancesRes = await api.get(`/list-by-dept/${dept_id}`);
          // 3. Realtime Update (Optional but recommended)
          const channel = supabase
            .channel(`dept-${dept_id}`)
            .on(
              "postgres_changes",
              {
                event: "INSERT",
                schema: "public",
                table: "grievances",
                filter: `target_service_dept_id=eq.${dept_id}`,
              },
              (payload) => {
                setGrievances((prev) => [payload.new, ...prev]);
              },
            )
            .subscribe();

          return () => supabase.removeChannel(channel);
        }
      } catch (err) {
        console.error("Dashboard error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchDashboardData();
  }, [userId]);

  if (loading)
    return <div className="p-10 text-center">Loading {deptName} Portal...</div>;

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