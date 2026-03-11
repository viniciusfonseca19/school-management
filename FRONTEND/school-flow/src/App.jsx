import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Teachers from "./pages/Teachers";
import Courses from "./pages/Courses";
import Classrooms from "./pages/Classrooms";
import Enrollments from "./pages/Enrollments";
import Grades from "./pages/Grades";

function App() {
  return (
    <BrowserRouter>

      <div className="layout">

        <Sidebar />

        <div className="content">

          <Routes>

            <Route path="/" element={<Dashboard />} />
            <Route path="/students" element={<Students />} />
            <Route path="/teachers" element={<Teachers />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/classrooms" element={<Classrooms />} />
            <Route path="/enrollments" element={<Enrollments />} />
            <Route path="/grades" element={<Grades />} />

          </Routes>

        </div>

      </div>

    </BrowserRouter>
  );
}

export default App;