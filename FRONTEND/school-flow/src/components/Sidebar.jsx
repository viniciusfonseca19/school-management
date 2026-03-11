import { Link } from "react-router-dom";

function Sidebar() {

return (

<div className="sidebar">

<h2>School</h2>

<nav>

<Link to="/">Dashboard</Link>

<Link to="/students">Students</Link>
<Link to="/teachers">Teachers</Link>
<Link to="/courses">Courses</Link>
<Link to="/classrooms">Classrooms</Link>
<Link to="/enrollments">Enrollments</Link>
<Link to="/grades">Grades</Link>

</nav>

</div>

);

}

export default Sidebar;