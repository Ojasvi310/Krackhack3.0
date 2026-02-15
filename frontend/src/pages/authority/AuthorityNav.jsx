import { Link } from "react-router-dom";

const AuthorityNav = () => (
  <>
    <Link to="/authority/dashboard" className="hover:text-blue-600 transition">Dashboard</Link>
    <Link to="/authority/courses" className="hover:text-blue-600 transition">Courses</Link>
    {/* <Link to="/authority/analytics" className="hover:text-blue-600 transition">Analytics</Link> */}
    
    <Link to="/authority/students" className="hover:text-blue-600 transition">Students</Link>
     <Link to="/authority/grievances" className="hover:text-blue-600 transition">Grievances</Link>
     <Link to="/authority/notifications" className="hover:text-blue-600 transition">Notifications</Link>
  </>
);

export default AuthorityNav;
