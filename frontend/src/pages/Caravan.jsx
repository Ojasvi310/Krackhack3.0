import { useState } from "react";
import AppLayout from "../components/AppLayout";
import GlassCard from "../components/GlassCard";
import GlassButton from "../components/GlassButton";
import GlassInput from "../components/GlassInput";
import { Car, MapPin, Clock, Calculator } from "lucide-react";

const Caravan = () => {

  const [fare,setFare] = useState("");
  const [people,setPeople] = useState("");

  const rides = [
    { from:"Campus Gate",to:"Railway Station",time:"5:30 PM",seats:2,driver:"Arjun"},
    { from:"Hostel A",to:"Airport",time:"7:00 AM",seats:3,driver:"Priya"},
  ];

  const split = fare && people ? (fare/people).toFixed(0) : null;

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
          <GlassInput placeholder="From location"/>
          <GlassInput placeholder="Destination"/>
          <GlassInput placeholder="Time"/>
          <GlassInput placeholder="Available seats"/>
        </div>

        <div className="mt-6">
          <GlassButton className="bg-[#1e293b] text-white hover:opacity-90">
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

          {rides.map((r,i)=>(

            <GlassCard key={i} hover className="border-[#e2e8f0] bg-white p-6">

              <div className="flex justify-between mb-3">

                <div className="flex gap-3 items-center">

                  <div className="h-10 w-10 rounded-lg bg-[#f1f5f9] flex items-center justify-center">
                    <Car className="w-5 h-5 text-[#1e293b]" />
                  </div>

                  <span className="font-semibold text-[#1e293b]">
                    {r.driver}
                  </span>

                </div>

                <span className="text-xs text-[#64748b]">
                  {r.seats} seats left
                </span>

              </div>


              <div className="text-sm text-[#64748b] flex gap-2 items-center">
                <MapPin className="w-4 h-4"/> {r.from} → {r.to}
              </div>

              <div className="text-sm text-[#64748b] flex gap-2 items-center mt-1">
                <Clock className="w-4 h-4"/> {r.time}
              </div>


              <GlassButton className="mt-5 w-full bg-[#1e293b] text-white hover:opacity-90">
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
  );
};

export default Caravan;