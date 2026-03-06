import AppLayout from "../../components/AppLayout";
import GlassCard from "../../components/GlassCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { createClient } from "@supabase/supabase-js";
import { Bell, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function StudentNotifications(){

  const [userId,setUserId] = useState(null)
  const [notifications,setNotifications] = useState([])
  const [loading,setLoading] = useState(true)

  /* GET USER */
  useEffect(()=>{

    const getUser = async ()=>{
      const { data:{user} } = await supabase.auth.getUser()
      if(user) setUserId(user.id)
    }

    getUser()

  },[])

  /* FETCH NOTIFICATIONS */
  useEffect(()=>{

    const fetchNotifications = async ()=>{

      if(!userId) return

      try{

        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/dashboard/notifications/${userId}`
        )

        setNotifications(res.data)

      }catch(err){
        console.error("Notification fetch failed",err)
      }

      setLoading(false)

    }

    fetchNotifications()

  },[userId])


  return(

    <AppLayout>

      {/* HEADER */}
      <div className="mb-8 flex items-center justify-between">

        <div className="flex items-center gap-3">
          <Bell className="w-6 h-6 text-[#1e293b]" />
          <h1 className="text-3xl font-serif text-[#1e293b]">
            Notifications
          </h1>
        </div>

        <Link to="/student/dashboard">
          <button className="text-sm text-[#64748b] hover:text-[#1e293b] flex items-center gap-1">
            <ArrowLeft className="w-4 h-4"/>
            Back
          </button>
        </Link>

      </div>


      {/* NOTIFICATION LIST */}
      <GlassCard className="bg-white border-[#e2e8f0] p-6 space-y-4">

        {loading && (
          <p className="text-sm text-[#64748b]">
            Loading notifications...
          </p>
        )}

        {!loading && notifications.length === 0 && (
          <p className="text-sm text-[#64748b]">
            No notifications yet
          </p>
        )}

        {notifications.map((n,i)=>(

          <div
            key={i}
            className="flex items-center justify-between border-b border-[#f1f5f9] pb-4 last:border-0"
          >

            <div>
              <p className="text-sm font-medium text-[#1e293b]">
                {n.text}
              </p>

              <p className="text-xs text-[#94a3b8] mt-1">
                {new Date(n.time).toLocaleString()}
              </p>
            </div>

          </div>

        ))}

      </GlassCard>

    </AppLayout>

  )

}