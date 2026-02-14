import AdminLayoutPart3 from "../../components/AdminLayoutPart3";
import GlassCardPart3 from "../../components/GlassCardPart3";
import { Calendar, Plus } from "lucide-react";

const AdminSemesters = () => {

  const semesters = [
    {
      name: "Semester 4",
      year: "2024",
      status: "Completed"
    },
    {
      name: "Semester 5",
      year: "2025",
      status: "Active"
    },
    {
      name: "Semester 6",
      year: "2025",
      status: "Upcoming"
    }
  ];

  return (
    <AdminLayoutPart3>

      <div className="flex justify-between items-center mb-6">

        <div>

          <h1 className="text-3xl font-bold text-[#1e293b]">
            Semester Management
          </h1>

          <p className="text-gray-500">
            Manage academic semesters
          </p>

        </div>

        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          <Plus size={18}/>
          Add Semester
        </button>

      </div>


      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {semesters.map((sem, index) => (

          <GlassCardPart3 key={index}>

            <div className="flex items-center gap-3 mb-3">

              <Calendar className="text-orange-600"/>

              <h2 className="font-semibold text-lg">
                {sem.name}
              </h2>

            </div>

            <p className="text-gray-600 text-sm">
              Year: {sem.year}
            </p>

            <p className="text-gray-600 text-sm">
              Status: {sem.status}
            </p>

          </GlassCardPart3>

        ))}

      </div>

    </AdminLayoutPart3>
  );
};

export default AdminSemesters;
