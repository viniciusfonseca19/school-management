import { useEffect, useState } from "react";
import { getStudent } from "../api/studentsApi";
import { useParams } from "react-router-dom";

export default function StudentDetails() {

  const { id } = useParams();

  const [student, setStudent] = useState(null);

  useEffect(() => {

    async function load() {

      const res = await getStudent(id);

      setStudent(res.data);

    }

    load();

  }, [id]);

  if (!student) return <p>Loading...</p>;

  return (

    <div className="details">

      <h1>{student.name}</h1>

      <div className="details-card">

        <p>
          <strong>Course:</strong>
          {student.course?.name}
        </p>

        <p>
          <strong>Classroom:</strong>
          {student.classroom?.name}
        </p>

        <p>
          <strong>Teachers:</strong>
        </p>

        <ul>

          {student.teachers?.map(t => (

            <li key={t.id}>
              {t.name}
            </li>

          ))}

        </ul>

      </div>

    </div>
  );
}