import { Link, useLocation } from "react-router-dom"

import {
FaHome,
FaUserGraduate,
FaChalkboardTeacher,
FaBook,
FaSchool,
FaClipboardList
} from "react-icons/fa"

import "../styles/sidebar.css"

export default function Sidebar(){

const location = useLocation()

const menu = [

{ name:"Dashboard", path:"/", icon:<FaHome/> },

{ name:"Students", path:"/students", icon:<FaUserGraduate/> },

{ name:"Teachers", path:"/teachers", icon:<FaChalkboardTeacher/> },

{ name:"Courses", path:"/courses", icon:<FaBook/> },

{ name:"Classrooms", path:"/classrooms", icon:<FaSchool/> },

{ name:"Enrollments", path:"/enrollments", icon:<FaClipboardList/> }

]

return(

<div className="sidebar">

<h2 className="logo">EduManager</h2>

<ul>

{menu.map((item)=> (

<li
key={item.path}
className={location.pathname===item.path ? "active":""}
>

<Link to={item.path}>

<span className="icon">{item.icon}</span>

<span>{item.name}</span>

</Link>

</li>

))}

</ul>

</div>

)

}