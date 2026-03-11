import "../styles/page.css"
import { FaUserGraduate, FaChalkboardTeacher, FaBook, FaSchool } from "react-icons/fa"

export default function Dashboard() {

  return (

    <div>

      <h1 className="page-title">Dashboard</h1>

      <div className="dashboard-grid">

        <div className="card stat">
          <FaUserGraduate className="stat-icon"/>
          <h3>Students</h3>
          <p>120</p>
        </div>

        <div className="card stat">
          <FaChalkboardTeacher className="stat-icon"/>
          <h3>Teachers</h3>
          <p>25</p>
        </div>

        <div className="card stat">
          <FaBook className="stat-icon"/>
          <h3>Courses</h3>
          <p>15</p>
        </div>

        <div className="card stat">
          <FaSchool className="stat-icon"/>
          <h3>Classrooms</h3>
          <p>10</p>
        </div>

      </div>

    </div>

  )

}