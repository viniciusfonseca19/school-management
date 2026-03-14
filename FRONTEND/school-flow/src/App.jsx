import { Routes, Route } from "react-router-dom"

import Sidebar from "./components/Sidebar"
import Navbar from "./components/Navbar"

import Dashboard from "./pages/Dashboard"
import Students from "./pages/Students"
import Teachers from "./pages/Teachers"
import Courses from "./pages/Courses"
import Classrooms from "./pages/Classrooms"
import Enrollments from "./pages/Enrollments"
import Login from "./pages/Login"

export default function App(){

return(

<div className="layout">

<Routes>

<Route path="/login" element={<Login />} />

<Route path="/" element={
  <>
    <Sidebar/>
    <div className="main">
      <Navbar/>
      <div className="page-content">
        <Dashboard/>
      </div>
    </div>
  </>
}/>

<Route path="/students" element={
  <>
    <Sidebar/>
    <div className="main">
      <Navbar/>
      <div className="page-content">
        <Students/>
      </div>
    </div>
  </>
}/>

<Route path="/teachers" element={
  <>
    <Sidebar/>
    <div className="main">
      <Navbar/>
      <div className="page-content">
        <Teachers/>
      </div>
    </div>
  </>
}/>

<Route path="/courses" element={
  <>
    <Sidebar/>
    <div className="main">
      <Navbar/>
      <div className="page-content">
        <Courses/>
      </div>
    </div>
  </>
}/>

<Route path="/classrooms" element={
  <>
    <Sidebar/>
    <div className="main">
      <Navbar/>
      <div className="page-content">
        <Classrooms/>
      </div>
    </div>
  </>
}/>

<Route path="/enrollments" element={
  <>
    <Sidebar/>
    <div className="main">
      <Navbar/>
      <div className="page-content">
        <Enrollments/>
      </div>
    </div>
  </>
}/>

</Routes>

</div>

)

}