import { useEffect, useState } from "react";
import { getCourses, createCourse, deleteCourse } from "../api/coursesApi";

import DataTable from "../components/DataTable";
import AddModal from "../components/AddModal";

export default function Courses(){

const [courses,setCourses] = useState([])
const [openModal,setOpenModal] = useState(false)

async function load(){

const res = await getCourses()

setCourses(res.data)

}

useEffect(()=>{
load()
},[])

async function handleAdd(data){

await createCourse(data)

load()

}

async function handleDelete(id){

await deleteCourse(id)

load()

}

return(

<div className="page">

<h1>Courses</h1>

<button
className="add-btn"
onClick={()=>setOpenModal(true)}
>
Add Course
</button>

<DataTable
columns={["name","description"]}
data={courses}
onDelete={handleDelete}
/>

{openModal && (

<AddModal
title="Add Course"
fields={["name","description"]}
onSubmit={handleAdd}
close={()=>setOpenModal(false)}
/>

)}

</div>

)

}