import { useState, useEffect } from 'react';
import Card from '../components/Card';
import api from '../services/api';
import './Dashboard.css';

const RECENT_MOCK = [
  { id: 1, action: 'New student enrolled',   entity: 'Ana Souza',       time: '2 min ago',  type: 'student' },
  { id: 2, action: 'Course created',         entity: 'React Fundamentals', time: '18 min ago', type: 'course' },
  { id: 3, action: 'Teacher assigned',       entity: 'Prof. Carvalho',  time: '1h ago',     type: 'teacher' },
  { id: 4, action: 'Classroom updated',      entity: 'Room 204-B',      time: '2h ago',     type: 'classroom' },
  { id: 5, action: 'Enrollment confirmed',   entity: 'Pedro Lima',      time: '3h ago',     type: 'enrollment' },
];

const TYPE_ICONS = {
  student:    { color: 'var(--accent)',   label: 'S' },
  course:     { color: 'var(--success)', label: 'C' },
  teacher:    { color: 'var(--warning)', label: 'T' },
  classroom:  { color: 'var(--info)',    label: 'R' },
  enrollment: { color: 'var(--accent)',  label: 'E' },
};

export default function Dashboard() {
  const [stats, setStats] = useState({
    students: null, teachers: null, courses: null, classrooms: null, enrollments: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAll() {
      try {
        const [students, teachers, courses, classrooms, enrollments] = await Promise.allSettled([
          api.students.getAll(),
          api.teachers.getAll(),
          api.courses.getAll(),
          api.classrooms.getAll(),
          api.enrollments.getAll(),
        ]);

        setStats({
          students:    students.status    === 'fulfilled' ? students.value?.length    ?? 0 : 0,
          teachers:    teachers.status    === 'fulfilled' ? teachers.value?.length    ?? 0 : 0,
          courses:     courses.status     === 'fulfilled' ? courses.value?.length     ?? 0 : 0,
          classrooms:  classrooms.status  === 'fulfilled' ? classrooms.value?.length  ?? 0 : 0,
          enrollments: enrollments.status === 'fulfilled' ? enrollments.value?.length ?? 0 : 0,
        });
      } catch {
        // silently fail — stats show 0
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
  }, []);

  const cards = [
    {
      title: 'Total Students',
      value: loading ? '…' : stats.students,
      subtitle: 'Registered students',
      color: 'accent',
      trend: 12,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
    },
    {
      title: 'Total Teachers',
      value: loading ? '…' : stats.teachers,
      subtitle: 'Active instructors',
      color: 'success',
      trend: 5,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      ),
    },
    {
      title: 'Total Courses',
      value: loading ? '…' : stats.courses,
      subtitle: 'Available courses',
      color: 'warning',
      trend: 8,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
        </svg>
      ),
    },
    {
      title: 'Total Classrooms',
      value: loading ? '…' : stats.classrooms,
      subtitle: 'Active rooms',
      color: 'info',
      trend: -2,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      ),
    },
    {
      title: 'Enrollments',
      value: loading ? '…' : stats.enrollments,
      subtitle: 'Total registrations',
      color: 'accent',
      trend: 20,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
        </svg>
      ),
    },
  ];

  return (
    <div className="page-content">
      {/* Header */}
      <div className="page-header">
        <div className="page-header-left">
          <h1>Dashboard</h1>
          <p>Welcome back, Administrator. Here's what's happening.</p>
        </div>
        <div className="dashboard-date">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>

      {/* Stat cards */}
      <div className="stats-grid">
        {cards.map((c) => (
          <Card key={c.title} {...c} />
        ))}
      </div>

      {/* Bottom section */}
      <div className="dashboard-bottom">
        {/* Recent Activity */}
        <div className="dashboard-panel">
          <div className="panel-header">
            <h2 className="panel-title">Recent Activity</h2>
            <span className="badge badge-default">Live</span>
          </div>
          <div className="activity-list">
            {RECENT_MOCK.map((item) => {
              const t = TYPE_ICONS[item.type] || TYPE_ICONS.student;
              return (
                <div key={item.id} className="activity-item">
                  <div
                    className="activity-avatar"
                    style={{ background: `${t.color}20`, color: t.color, border: `1px solid ${t.color}40` }}
                  >
                    {t.label}
                  </div>
                  <div className="activity-info">
                    <span className="activity-action">{item.action}</span>
                    <span className="activity-entity">{item.entity}</span>
                  </div>
                  <span className="activity-time">{item.time}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Links */}
        <div className="dashboard-panel">
          <div className="panel-header">
            <h2 className="panel-title">Quick Actions</h2>
          </div>
          <div className="quick-actions">
            {[
              { label: 'Add Student',    path: '/students',    color: 'var(--accent)' },
              { label: 'Add Teacher',    path: '/teachers',    color: 'var(--success)' },
              { label: 'Create Course',  path: '/courses',     color: 'var(--warning)' },
              { label: 'New Classroom',  path: '/classrooms',  color: 'var(--info)' },
              { label: 'Enroll Student', path: '/enrollments', color: 'var(--accent)' },
            ].map((a) => (
              <a key={a.label} href={a.path} className="quick-action-item">
                <span className="quick-action-dot" style={{ background: a.color }} />
                {a.label}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginLeft: 'auto', color: 'var(--text-tertiary)' }}>
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </a>
            ))}
          </div>

          {/* System status */}
          <div className="system-status">
            <div className="status-row">
              <span className="status-label">API Status</span>
              <span className="badge badge-success">● Online</span>
            </div>
            <div className="status-row">
              <span className="status-label">Backend</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
                localhost:8080
              </span>
            </div>
            <div className="status-row">
              <span className="status-label">Version</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
                v1.0.0
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}