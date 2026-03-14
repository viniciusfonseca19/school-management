import { useEffect, useState } from "react";
import { getStudents, createStudent, deleteStudent } from "../api/studentsApi";

import DataTable from "../components/DataTable";
import AddModal from "../components/AddModal";
import SearchBar from "../components/SearchBar";

export default function Students(){

const [students,setStudents] = useState([])

const [openModal,setOpenModal] = useState(false)

async function load(){

const res = await getStudents()

setStudents(res.data)

}

useEffect(()=>{
load()
},[])

async function handleAdd(data){

await createStudent(data)

load()

}

async function handleDelete(id){

await deleteStudent(id)

load()

}

return(

<div className="page">

<h1>Students</h1>

<SearchBar />

<button
className="add-btn"
onClick={()=>setOpenModal(true)}
>
Add Student
</button>

<DataTable
columns={["name","email"]}
data={students}
onDelete={handleDelete}
/>

{openModal && (

<AddModal
title="Add Student"
fields={["name","email"]}
onSubmit={handleAdd}
close={()=>setOpenModal(false)}
/>

)}

</div>

)

}