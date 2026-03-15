import { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import Sidebar         from './components/Sidebar';
import Navbar          from './components/Navbar';
import ToastContainer  from './components/ToastContainer';
import { useToast }    from './hooks/useToast';

import Dashboard       from './pages/Dashboard';
import Students        from './pages/Students';
import Teachers        from './pages/Teachers';
import Courses         from './pages/Courses';
import Classrooms      from './pages/Classrooms';
import Enrollments     from './pages/Enrollments';
import Login           from './pages/Login';
import StudentDetails  from './pages/StudentDetails';

import './styles/global.css';

/**
 * Inner layout — needs to be inside BrowserRouter
 * so useLocation works.
 */
function AppLayout() {
  const location               = useLocation();
  const [sidebarOpen, setSidebar] = useState(false);
  const { toasts, toast }      = useToast();

  const isLoginPage = location.pathname === '/login';

  const toggleSidebar = () => setSidebar((v) => !v);

  if (isLoginPage) {
    return (
      <>
        <Login toast={toast} />
        <ToastContainer toasts={toasts} />
      </>
    );
  }

  return (
    <div className="app-layout">
      {/* Sidebar */}
      <Sidebar collapsed={!sidebarOpen} onToggle={toggleSidebar} />

      {/* Main */}
      <div className="main-wrapper">
        <Navbar onMenuToggle={toggleSidebar} />

        <Routes>
          <Route path="/"               element={<Dashboard    toast={toast} />} />
          <Route path="/students"       element={<Students     toast={toast} />} />
          <Route path="/students/:id"   element={<StudentDetails toast={toast} />} />
          <Route path="/teachers"       element={<Teachers     toast={toast} />} />
          <Route path="/courses"        element={<Courses      toast={toast} />} />
          <Route path="/classrooms"     element={<Classrooms   toast={toast} />} />
          <Route path="/enrollments"    element={<Enrollments  toast={toast} />} />
          {/* Catch-all → Dashboard */}
          <Route path="*"               element={<Dashboard    toast={toast} />} />
        </Routes>
      </div>

      <ToastContainer toasts={toasts} />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}