import { useEffect, useState } from "react"
import { getGrades, deleteGrade } from "../services/gradeService"

function Grades(){

const [grades,setGrades] = useState([])

async function loadGrades(){

const response = await getGrades()

setGrades(response.data)

}

useEffect(()=>{

loadGrades()

},[])

async function handleDelete(id){

await deleteGrade(id)

loadGrades()

}

return(

<div className="page">

<h1>Grades</h1>

<table>

<thead>

<tr>

<th>ID</th>
<th>Student</th>
<th>Classroom</th>
<th>Grade</th>
<th>Actions</th>

</tr>

</thead>

<tbody>

{grades.map(g =>(

<tr key={g.id}>

<td>{g.id}</td>
<td>{g.studentName}</td>
<td>{g.classroomName}</td>
<td>{g.value}</td>

<td>

<button
className="deleteBtn"
onClick={()=>handleDelete(g.id)}
>

Delete

</button>

</td>

</tr>

))}

</tbody>

</table>

</div>

)

}

export default Grades