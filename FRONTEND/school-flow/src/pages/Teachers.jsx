import { useEffect, useState } from "react";
import { getTeachers, createTeacher, deleteTeacher } from "../api/teachersApi";

import DataTable from "../components/DataTable";
import AddModal from "../components/AddModal";

export default function Teachers(){

const [teachers,setTeachers] = useState([])

const [openModal,setOpenModal] = useState(false)

async function load(){

const res = await getTeachers()

setTeachers(res.data)

}

useEffect(()=>{
load()
},[])

async function handleAdd(data){

await createTeacher(data)

load()

}

async function handleDelete(id){

await deleteTeacher(id)

load()

}

return(

<div className="page">

<h1>Teachers</h1>

<button
className="add-btn"
onClick={()=>setOpenModal(true)}
>
Add Teacher
</button>

<DataTable
columns={["name","email"]}
data={teachers}
onDelete={handleDelete}
/>

{openModal && (

<AddModal
title="Add Teacher"
fields={["name","email"]}
onSubmit={handleAdd}
close={()=>setOpenModal(false)}
/>

)}

</div>

)

}