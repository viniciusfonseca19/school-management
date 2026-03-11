function Table({columns,data,onDelete}){

return(

<table>

<thead>

<tr>

{columns.map((col)=>(
<th key={col}>{col}</th>
))}

<th>Actions</th>

</tr>

</thead>

<tbody>

{data.map((item)=>(

<tr key={item.id}>

{columns.map((col)=>(
<td key={col}>{item[col]}</td>
))}

<td>

<button onClick={()=>onDelete(item.id)}>
Delete
</button>

</td>

</tr>

))}

</tbody>

</table>

)

}

export default Table