import AppLayout from "./AppLayout";
import { NavLink } from "react-router-dom";

const AdminLayoutPart3 = ({ children }) => {

  const navigation = (
    <>
      <NavLink to="/admin/dashboardPart3">Dashboard</NavLink>
      <NavLink to="/admin/academics">Academics</NavLink>
      <NavLink to="/admin/courses">Courses</NavLink>
      <NavLink to="/admin/faculty">Faculty</NavLink>
      <NavLink to="/admin/students">Students</NavLink>
      <NavLink to="/admin/semesters">Semesters</NavLink>
    </>
  );

  return (
    <AppLayout navigation={navigation}>
      {children}
    </AppLayout>
  );
};

export default AdminLayoutPart3;
