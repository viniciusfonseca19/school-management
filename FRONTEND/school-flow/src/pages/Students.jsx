import {useEffect,useState} from "react"
import {getStudents,deleteStudent} from "../services/studentService"
import Table from "../components/Table"

function Students(){

const[students,setStudents]=useState([])

async function loadStudents(){

const response = await getStudents()

setStudents(response.data)

}

useEffect(()=>{

loadStudents()

},[])

async function handleDelete(id){

await deleteStudent(id)

loadStudents()

}

return(

<div>

    <h2>Students</h2>

    <Table

        columns={["id","name","email"]} 
        data={students}
        onDelete={handleDelete}

    />

</div>

)

}

export default Students