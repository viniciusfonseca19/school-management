import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import './StudentDetails.css';

export default function StudentDetails({ toast }) {
  const { id }    = useParams();
  const navigate  = useNavigate();

  const [student,     setStudent]     = useState(null);
  const [enrollments, setEnrollments] = useState([]);
  const [courses,     setCourses]     = useState([]);
  const [classrooms,  setClassrooms]  = useState([]);
  const [loading,     setLoading]     = useState(true);

  useEffect(() => {
    async function fetchAll() {
      setLoading(true);
      try {
        const [stu, enrl, cors, rooms] = await Promise.allSettled([
          api.students.getById(id),
          api.enrollments.getAll(),
          api.courses.getAll(),
          api.classrooms.getAll(),
        ]);

        if (stu.status === 'fulfilled') setStudent(stu.value);
        else toast?.error('Student not found.');

        const allEnrollments = enrl.status === 'fulfilled' ? enrl.value || [] : [];
        setEnrollments(allEnrollments.filter((e) => String(e.studentId) === String(id)));
        setCourses(cors.status === 'fulfilled' ? cors.value || [] : []);
        setClassrooms(rooms.status === 'fulfilled' ? rooms.value || [] : []);
      } catch (e) {
        toast?.error('Error loading student details: ' + e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
  }, [id, toast]);

  if (loading) {
    return (
      <div className="page-content">
        <div className="loading-page"><div className="spinner" /></div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="page-content">
        <div className="empty-state">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <p>Student not found.</p>
          <button className="btn btn-secondary" onClick={() => navigate('/students')}>
            Back to Students
          </button>
        </div>
      </div>
    );
  }

  const initials = `${student.firstName?.[0] || ''}${student.lastName?.[0] || ''}`.toUpperCase();

  const STATUS_BADGE = {
    active:    'badge-success',
    pending:   'badge-warning',
    completed: 'badge-info',
    cancelled: 'badge-danger',
  };

  return (
    <div className="page-content">
      {/* Back */}
      <button className="btn btn-ghost btn-sm details-back" onClick={() => navigate('/students')}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
        Back to Students
      </button>

      {/* Profile header */}
      <div className="student-profile-card">
        <div className="student-profile-avatar">
          {initials}
        </div>
        <div className="student-profile-info">
          <h1 className="student-profile-name">
            {student.firstName} {student.lastName}
          </h1>
          <div className="student-profile-meta">
            <span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              {student.email || '—'}
            </span>
            {student.phone && (
              <span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 14a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.59 3h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 10.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                {student.phone}
              </span>
            )}
            {student.birthDate && (
              <span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8"  y1="2" x2="8"  y2="6"/>
                  <line x1="3"  y1="10" x2="21" y2="10"/>
                </svg>
                {student.birthDate}
              </span>
            )}
          </div>
          {student.address && (
            <div className="student-profile-address">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              {student.address}
            </div>
          )}
        </div>

        <div className="student-profile-badge">
          <span className="badge badge-success">● Active Student</span>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-disabled)', fontFamily: 'var(--font-mono)' }}>
            ID #{student.id}
          </span>
        </div>
      </div>

      {/* Stats row */}
      <div className="details-stats">
        <div className="details-stat">
          <span className="details-stat-value">{enrollments.length}</span>
          <span className="details-stat-label">Enrollments</span>
        </div>
        <div className="details-stat">
          <span className="details-stat-value">
            {enrollments.filter((e) => e.status?.toLowerCase() === 'active').length}
          </span>
          <span className="details-stat-label">Active Courses</span>
        </div>
        <div className="details-stat">
          <span className="details-stat-value">
            {enrollments.filter((e) => e.status?.toLowerCase() === 'completed').length}
          </span>
          <span className="details-stat-label">Completed</span>
        </div>
        <div className="details-stat">
          <span className="details-stat-value">
            {new Set(enrollments.map((e) => e.classroomId).filter(Boolean)).size}
          </span>
          <span className="details-stat-label">Classrooms</span>
        </div>
      </div>

      {/* Enrollments */}
      <div className="details-section">
        <div className="details-section-header">
          <h2>Enrollments</h2>
          <span className="badge badge-default">{enrollments.length}</span>
        </div>

        {enrollments.length === 0 ? (
          <div className="empty-state" style={{ minHeight: 160 }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
            </svg>
            <p>No enrollments found for this student.</p>
          </div>
        ) : (
          <div className="enrollment-cards">
            {enrollments.map((enrl) => {
              const course   = courses.find((c) => String(c.id) === String(enrl.courseId));
              const classroom = classrooms.find((r) => String(r.id) === String(enrl.classroomId));
              const status   = enrl.status?.toLowerCase() || 'active';

              return (
                <div key={enrl.id} className="enrollment-card">
                  <div className="enrollment-card-top">
                    <div className="enrollment-card-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                      </svg>
                    </div>
                    <span className={`badge ${STATUS_BADGE[status] || 'badge-default'}`}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </span>
                  </div>

                  <div className="enrollment-card-course">
                    {course ? course.name : `Course ID: ${enrl.courseId}`}
                  </div>
                  {course?.code && (
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)', marginTop: 2 }}>
                      {course.code}
                    </div>
                  )}

                  <div className="enrollment-card-details">
                    {classroom && (
                      <span className="enrollment-card-detail">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                        </svg>
                        {classroom.name}
                      </span>
                    )}
                    {enrl.enrollmentDate && (
                      <span className="enrollment-card-detail">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                          <line x1="16" y1="2" x2="16" y2="6"/>
                          <line x1="8"  y1="2" x2="8"  y2="6"/>
                          <line x1="3"  y1="10" x2="21" y2="10"/>
                        </svg>
                        {enrl.enrollmentDate}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}