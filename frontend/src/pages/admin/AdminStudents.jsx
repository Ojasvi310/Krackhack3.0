import AdminLayoutPart3 from "../../components/AdminLayoutPart3";
import GlassCardPart3 from "../../components/GlassCardPart3";
import { Users, Plus } from "lucide-react";

const AdminStudents = () => {

  const students = [
    {
      name: "Rahul Sharma",
      email: "rahul@gmail.com",
      semester: "5"
    },
    {
      name: "Priya Singh",
      email: "priya@gmail.com",
      semester: "6"
    },
    {
      name: "Amit Kumar",
      email: "amit@gmail.com",
      semester: "4"
    }
  ];

  return (
    <AdminLayoutPart3>

      <div className="flex justify-between items-center mb-6">

        <div>

          <h1 className="text-3xl font-bold text-[#1e293b]">
            Students Management
          </h1>

          <p className="text-gray-500">
            View and manage students
          </p>

        </div>

        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          <Plus size={18}/>
          Add Student
        </button>

      </div>


      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {students.map((student, index) => (

          <GlassCardPart3 key={index}>

            <div className="flex items-center gap-3 mb-3">

              <Users className="text-purple-600"/>

              <h2 className="font-semibold text-lg">
                {student.name}
              </h2>

            </div>

            <p className="text-gray-600 text-sm">
              Email: {student.email}
            </p>

            <p className="text-gray-600 text-sm">
              Semester: {student.semester}
            </p>

          </GlassCardPart3>

        ))}

      </div>

    </AdminLayoutPart3>
  );
};

export default AdminStudents;
