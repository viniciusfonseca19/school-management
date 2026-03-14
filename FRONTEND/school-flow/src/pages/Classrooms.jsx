import { useEffect, useState } from "react";
import { getClassrooms, createClassroom, deleteClassroom } from "../api/classroomsApi";

import DataTable from "../components/DataTable";
import AddModal from "../components/AddModal";

export default function Classrooms(){

const [classrooms,setClassrooms] = useState([])
const [openModal,setOpenModal] = useState(false)

async function load(){

const res = await getClassrooms()

setClassrooms(res.data)

}

useEffect(()=>{
load()
},[])

async function handleAdd(data){

await createClassroom(data)

load()

}

async function handleDelete(id){

await deleteClassroom(id)

load()

}

return(

<div className="page">

<h1>Classrooms</h1>

<button
className="add-btn"
onClick={()=>setOpenModal(true)}
>
Add Classroom
</button>

<DataTable
columns={["name"]}
data={classrooms}
onDelete={handleDelete}
/>

{openModal && (

<AddModal
title="Add Classroom"
fields={["name"]}
onSubmit={handleAdd}
close={()=>setOpenModal(false)}
/>

)}

</div>

)

}