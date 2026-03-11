import "../styles/page.css"
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa"

export default function Enrollments() {

  return (

    <div>

      <div className="page-header">

        <h1 className="page-title">Enrollments</h1>

        <button className="btn">
          <FaPlus/> New Enrollment
        </button>

      </div>

      <div className="card">

        <table className="table">

          <thead>

            <tr>
              <th>ID</th>
              <th>Student</th>
              <th>Course</th>
              <th>Actions</th>
            </tr>

          </thead>

          <tbody>

            <tr>
              <td>1</td>
              <td>João Silva</td>
              <td>Computer Science</td>

              <td className="actions">

                <button className="icon-btn edit">
                  <FaEdit/>
                </button>

                <button className="icon-btn delete">
                  <FaTrash/>
                </button>

              </td>

            </tr>

          </tbody>

        </table>

      </div>

    </div>

  )

}