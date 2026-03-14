import { useEffect, useState } from "react";
import { FaUsers, FaChalkboardTeacher, FaBook, FaDoorOpen, FaClipboardList } from "react-icons/fa";

import { getStudents } from "../api/studentsApi";
import { getTeachers } from "../api/teachersApi";
import { getCourses } from "../api/coursesApi";
import { getClassrooms } from "../api/classroomsApi";
import { getEnrollments } from "../api/enrollmentsApi";

export default function Dashboard(){

const [stats,setStats] = useState({
students:0,
teachers:0,
courses:0,
classrooms:0,
enrollments:0
})

const [loading, setLoading] = useState(true);

useEffect(()=>{

async function load(){

try{

const students = await getStudents()
const teachers = await getTeachers()
const courses = await getCourses()
const classrooms = await getClassrooms()
const enrollments = await getEnrollments()

setStats({
students:students.data.length,
teachers:teachers.data.length,
courses:courses.data.length,
classrooms:classrooms.data.length,
enrollments:enrollments.data.length
})

}catch(e){

console.error("Erro dashboard:",e)

} finally {
setLoading(false);
}

}

load()

},[])

if (loading) {
return <div className="loading">Loading...</div>;
}

return(

<div className="dashboard">

<div className="card">
<FaUsers className="card-icon" />
<h2>{stats.students}</h2>
<p>Students</p>
</div>

<div className="card">
<FaChalkboardTeacher className="card-icon" />
<h2>{stats.teachers}</h2>
<p>Teachers</p>
</div>

<div className="card">
<FaBook className="card-icon" />
<h2>{stats.courses}</h2>
<p>Courses</p>
</div>

<div className="card">
<FaDoorOpen className="card-icon" />
<h2>{stats.classrooms}</h2>
<p>Classrooms</p>
</div>

<div className="card">
<FaClipboardList className="card-icon" />
<h2>{stats.enrollments}</h2>
<p>Enrollments</p>
</div>

</div>

)

}