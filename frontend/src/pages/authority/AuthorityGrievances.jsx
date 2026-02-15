<<<<<<< HEAD
// AuthorityGrievanceView.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { supabase } from "../supabaseClient";

const AuthorityGrievanceView = ({ userId }) => {
  const [dept, setDept] = useState(null);
  const [grievances, setGrievances] = useState([]);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // 1. Call your new SAFE endpoint
        const res = await axios.get(
          `http://localhost:8000/api/admin/users/authority-dept/${userId}`,
        );

        const { role, department } = res.data;

        if (role === "authority" && department) {
          setDept(department);

          // 2. Initial fetch for existing grievances in this department
          const { data } = await supabase
            .from("grievances")
            .select("*")
            .eq("category", department);
          setGrievances(data);

          // 3. Realtime listener for NEW grievances in this department
          const channel = supabase
            .channel(`dept-feed-${department}`)
            .on(
              "postgres_changes",
              {
                event: "INSERT",
                schema: "public",
                table: "grievances",
                filter: `category=eq.${department}`,
              },
              (payload) => {
                setGrievances((prev) => [payload.new, ...prev]);
              },
            )
            .subscribe();

          return () => supabase.removeChannel(channel);
        }
      } catch (err) {
        console.error("Authority Init Error:", err);
      }
    };

    if (userId) initializeAuth();
  }, [userId]);

  if (!dept)
    return <div className="p-10">Verifying Authority Credentials...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">{dept} Management Portal</h1>
      <div className="grid gap-4">
        {grievances.map((g) => (
          <div key={g.id} className="p-4 border rounded shadow-sm bg-white">
            <h3 className="font-semibold text-lg">{g.title}</h3>
            <p className="text-gray-600 mb-2">{g.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium px-2 py-1 bg-blue-100 text-blue-800 rounded">
                Status: {g.status}
              </span>
              <button className="text-blue-600 hover:underline">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
=======
 export default function AuthorityAnalytics() {}
>>>>>>> bdaf68e3ffcd0a93008d9a4f6e35d711ba54dac9
