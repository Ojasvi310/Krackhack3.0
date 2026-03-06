import { useState, useEffect } from "react"
import AppLayout from "../components/AppLayout"
import GlassCard from "../components/GlassCard"
import GlassButton from "../components/GlassButton"
import GlassInput from "../components/GlassInput"
import axios from "axios"
import { Car, MapPin, Clock, Calculator } from "lucide-react"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/caravan`

const Caravan = () => {

  const [userId, setUserId] = useState(null)

  const [rides, setRides] = useState([])

  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [time, setTime] = useState("")
  const [seats, setSeats] = useState("")

  const [fare,setFare] = useState("")
  const [people,setPeople] = useState("")

  const split = fare && people ? (fare/people).toFixed(0) : null


  useEffect(() => {

    const getUser = async () => {
      const { data:{user} } = await supabase.auth.getUser()
      if(user) setUserId(user.id)
    }

    getUser()

  }, [])


  const fetchRides = async () => {

    const res = await axios.get(`${BASE_URL}/rides`)
    setRides(res.data)

  }


  useEffect(() => {

    fetchRides()

  }, [])


  const postRide = async () => {

  if(!userId) return alert("Login required")

  await axios.post(`${BASE_URL}/post`, {
    driver_id:userId,
    from_location:from,
    to_location:to,
    departure_time: new Date(time).toISOString(),
    total_seats:Number(seats)
  })

  setFrom("")
  setTo("")
  setTime("")
  setSeats("")

  fetchRides()
}

  const requestSeat = async (rideId) => {

    await axios.post(`${BASE_URL}/request/${rideId}/${userId}`)
    alert("Seat requested!")

  }


  return (
    <AppLayout>

      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-4xl font-serif text-[#1e293b]">
          Caravan Pool
        </h1>
        <p className="text-[#64748b] mt-1">
          Share rides with fellow campus travellers
        </p>
      </div>


      {/* POST RIDE */}
      <GlassCard className="mb-8 border-[#e2e8f0] bg-white shadow-sm p-6">

        <h2 className="font-serif text-xl mb-6 text-[#1e293b]">
          Post Travel Plan
        </h2>

        <div className="grid sm:grid-cols-2 gap-4">

          <GlassInput
            placeholder="From location"
            value={from}
            onChange={(e)=>setFrom(e.target.value)}
          />

          <GlassInput
            placeholder="Destination"
            value={to}
            onChange={(e)=>setTo(e.target.value)}
          />

          <GlassInput
            type="datetime-local"
            value={time}
            onChange={(e)=>setTime(e.target.value)}
          />

          <GlassInput
            placeholder="Available seats"
            value={seats}
            onChange={(e)=>setSeats(e.target.value)}
          />

        </div>

        <div className="mt-6">
          <GlassButton
            onClick={postRide}
            className="bg-[#1e293b] text-white hover:opacity-90"
          >
            Post Ride
          </GlassButton>
        </div>

      </GlassCard>


      {/* AVAILABLE RIDES */}
      <div className="mb-10">

        <h2 className="font-serif text-xl mb-6 text-[#1e293b]">
          Available Rides
        </h2>

        <div className="grid sm:grid-cols-2 gap-6">

          {rides.map((r)=>(

            <GlassCard key={r.id} hover className="border-[#e2e8f0] bg-white p-6">

              <div className="flex justify-between mb-3">

                <div className="flex gap-3 items-center">

                  <div className="h-10 w-10 rounded-lg bg-[#f1f5f9] flex items-center justify-center">
                    <Car className="w-5 h-5 text-[#1e293b]" />
                  </div>

                  <span className="font-semibold text-[#1e293b]">
                    {r.profiles?.full_name}
                  </span>

                </div>

                <span className="text-xs text-[#64748b]">
                  {r.seats_left} seats left
                </span>

              </div>


              <div className="text-sm text-[#64748b] flex gap-2 items-center">
                <MapPin className="w-4 h-4"/> {r.from_location} → {r.to_location}
              </div>

              <div className="text-sm text-[#64748b] flex gap-2 items-center mt-1">
                <Clock className="w-4 h-4"/> {new Date(r.departure_time).toLocaleString()}
              </div>


              <GlassButton
                onClick={()=>requestSeat(r.id)}
                className="mt-5 w-full bg-[#1e293b] text-white hover:opacity-90"
              >
                Request Seat
              </GlassButton>

            </GlassCard>

          ))}

        </div>

      </div>


      {/* COST SPLIT */}
      <GlassCard className="border-[#e2e8f0] bg-white p-6">

        <h2 className="font-serif text-xl mb-6 text-[#1e293b] flex gap-2 items-center">
          <Calculator className="w-5 h-5"/> Split Cab Fare
        </h2>

        <div className="grid sm:grid-cols-2 gap-4">

          <GlassInput
            placeholder="Total fare"
            value={fare}
            onChange={(e)=>setFare(e.target.value)}
          />

          <GlassInput
            placeholder="Number of people"
            value={people}
            onChange={(e)=>setPeople(e.target.value)}
          />

        </div>

        {split && (
          <p className="mt-6 text-lg font-semibold text-[#1e293b]">
            Each person pays ₹{split}
          </p>
        )}

      </GlassCard>

    </AppLayout>
  )

}

export default Caravan