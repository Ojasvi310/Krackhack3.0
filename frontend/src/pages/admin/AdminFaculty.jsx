import AdminLayoutPart3 from "../../components/AdminLayoutPart3";
import GlassCardPart3 from "../../components/GlassCardPart3";
import { UserCheck, Plus } from "lucide-react";

const AdminFaculty = () => {

  const faculty = [
    {
      name: "Dr. Sharma",
      department: "Computer Science",
      courses: 3
    },
    {
      name: "Dr. Mehta",
      department: "Information Technology",
      courses: 2
    },
    {
      name: "Dr. Gupta",
      department: "Computer Science",
      courses: 4
    }
  ];

  return (
    <AdminLayoutPart3>

      <div className="flex justify-between items-center mb-6">

        <div>
          <h1 className="text-3xl font-bold text-[#1e293b]">
            Faculty Management
          </h1>

          <p className="text-gray-500">
            Manage faculty and course assignments
          </p>

        </div>

        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          <Plus size={18}/>
          Add Faculty
        </button>

      </div>


      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {faculty.map((f, index) => (

          <GlassCardPart3 key={index}>

            <div className="flex items-center gap-3 mb-3">

              <UserCheck className="text-green-600"/>

              <h2 className="font-semibold text-lg">
                {f.name}
              </h2>

            </div>

            <p className="text-gray-600 text-sm">
              Department: {f.department}
            </p>

            <p className="text-gray-600 text-sm">
              Courses Assigned: {f.courses}
            </p>

          </GlassCardPart3>

        ))}

      </div>

    </AdminLayoutPart3>
  );
};

export default AdminFaculty;
