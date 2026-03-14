import { useEffect, useState } from "react";

import { getEnrollments, createEnrollment, deleteEnrollment }
from "../api/enrollmentsApi";

import DataTable from "../components/DataTable";
import AddModal from "../components/AddModal";

export default function Enrollments(){

const [enrollments,setEnrollments] = useState([])
const [openModal,setOpenModal] = useState(false)

async function load(){

const res = await getEnrollments()

setEnrollments(res.data)

}

useEffect(()=>{
load()
},[])

async function handleAdd(data){

await createEnrollment(data)

load()

}

async function handleDelete(id){

await deleteEnrollment(id)

load()

}

return(

<div className="page">

<h1>Enrollments</h1>

<button
className="add-btn"
onClick={()=>setOpenModal(true)}
>
Add Enrollment
</button>

<DataTable
columns={["studentId","courseId"]}
data={enrollments}
onDelete={handleDelete}
/>

{openModal && (

<AddModal
title="Add Enrollment"
fields={["studentId","courseId"]}
onSubmit={handleAdd}
close={()=>setOpenModal(false)}
/>

)}

</div>

)

}