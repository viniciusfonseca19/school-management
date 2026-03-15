import { useState, useEffect, useCallback } from 'react';
import Table from '../components/Table';
import AddModal from '../components/AddModal';
import api from '../services/api';

export default function Enrollments({ toast }) {
  const [data, setData]             = useState([]);
  const [filtered, setFiltered]     = useState([]);
  const [loading, setLoading]       = useState(true);
  const [search, setSearch]         = useState('');
  const [statusFilter, setStatus]   = useState('all');
  const [modal, setModal]           = useState({ open: false, mode: 'add', row: null });
  const [saving, setSaving]         = useState(false);
  const [students, setStudents]     = useState([]);
  const [courses, setCourses]       = useState([]);
  const [classrooms, setClassrooms] = useState([]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [enrollRes, stuRes, courRes, classRes] = await Promise.allSettled([
        api.enrollments.getAll(),
        api.students.getAll(),
        api.courses.getAll(),
        api.classrooms.getAll(),
      ]);
      setData(enrollRes.status === 'fulfilled' ? enrollRes.value || [] : []);
      setFiltered(enrollRes.status === 'fulfilled' ? enrollRes.value || [] : []);
      setStudents(stuRes.status === 'fulfilled' ? stuRes.value || [] : []);
      setCourses(courRes.status === 'fulfilled' ? courRes.value || [] : []);
      setClassrooms(classRes.status === 'fulfilled' ? classRes.value || [] : []);
    } catch (e) {
      toast?.error('Failed to load enrollments: ' + e.message);
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => { fetchData(); }, [fetchData]);

  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(
      data.filter((e) => {
        const matchSearch =
          e.studentName?.toLowerCase().includes(q) ||
          e.courseName?.toLowerCase().includes(q) ||
          String(e.studentId).includes(q);
        const matchStatus =
          statusFilter === 'all' ||
          e.status?.toLowerCase() === statusFilter;
        return matchSearch && matchStatus;
      })
    );
  }, [search, statusFilter, data]);

  // Build dynamic fields using fetched options
  const FIELDS = [
    {
      name: 'studentId', label: 'Student', type: 'select', required: true,
     options: students.map((s) => ({
        value: s.id,
        label: s.fullName || s.email,
      })),
    },
    {
      name: 'courseId', label: 'Course', type: 'select', required: true,
      options: courses.map((c) => ({ value: c.id, label: c.name })),
    },
    {
      name: 'classroomId', label: 'Classroom', type: 'select', required: false,
      options: classrooms.map((r) => ({ value: r.id, label: r.name })),
    },
    { name: 'enrollmentDate', label: 'Enrollment Date', type: 'date', required: false },
    {
      name: 'status', label: 'Status', type: 'select', required: false,
      options: [
        { value: 'active',    label: 'Active' },
        { value: 'pending',   label: 'Pending' },
        { value: 'completed', label: 'Completed' },
        { value: 'cancelled', label: 'Cancelled' },
      ],
    },
  ];

  const STATUS_BADGE = {
    active:    'badge-success',
    pending:   'badge-warning',
    completed: 'badge-info',
    cancelled: 'badge-danger',
  };

  const COLUMNS = [
    {
      key: 'studentId',
      label: 'Student',
      render: (_, row) => {
        const stu = students.find((s) => s.id === row.studentId);
        const name = stu ? (stu.fullName || stu.email) : row.studentName || `ID: ${row.studentId}`;
        const initials = name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div className="avatar" style={{ background: 'var(--accent-muted)', color: 'var(--accent)', border: '1px solid var(--accent-glow)' }}>
              {initials || '?'}
            </div>
            <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{name}</span>
          </div>
        );
      },
    },
    {
      key: 'courseId',
      label: 'Course',
      render: (_, row) => {
        const course = courses.find((c) => c.id === row.courseId);
        return course ? course.name : (row.courseName || `ID: ${row.courseId}`);
      },
    },
    {
      key: 'classroomId',
      label: 'Classroom',
      render: (_, row) => {
        const room = classrooms.find((r) => r.id === row.classroomId);
        return room ? room.name : (row.classroomName || '—');
      },
    },
    { key: 'enrollmentDate', label: 'Date' },
    {
      key: 'status',
      label: 'Status',
      render: (v) => {
        const val = v?.toLowerCase() || 'active';
        return (
          <span className={`badge ${STATUS_BADGE[val] || 'badge-default'}`}>
            {val.charAt(0).toUpperCase() + val.slice(1)}
          </span>
        );
      },
    },
  ];

  const openAdd    = () => setModal({ open: true, mode: 'add', row: null });
  const openEdit   = (row) => setModal({ open: true, mode: 'edit', row });
  const closeModal = () => setModal({ open: false, mode: 'add', row: null });

  const handleSubmit = async (formData) => {
    setSaving(true);
    try {
      if (modal.mode === 'edit') {
        await api.enrollments.update(modal.row.id, formData);
        toast?.success('Enrollment updated!');
      } else {
        await api.enrollments.create(formData);
        toast?.success('Enrollment created!');
      }
      closeModal();
      fetchData();
    } catch (e) {
      toast?.error('Error: ' + e.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (row) => {
    if (!window.confirm('Delete this enrollment?')) return;
    try {
      await api.enrollments.delete(row.id);
      toast?.success('Enrollment deleted.');
      fetchData();
    } catch (e) {
      toast?.error('Delete failed: ' + e.message);
    }
  };

  return (
    <div className="page-content">
      <div className="page-header">
        <div className="page-header-left">
          <h1>Enrollments</h1>
          <p>Track and manage student course registrations.</p>
        </div>
        <button className="btn btn-primary" onClick={openAdd}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Add Enrollment
        </button>
      </div>

      <div className="toolbar">
        <div className="search-wrapper">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            type="text"
            className="search-input"
            placeholder="Search enrollments…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="filter-tabs">
          {['all', 'active', 'pending', 'completed', 'cancelled'].map((s) => (
            <button
              key={s}
              className={`filter-tab ${statusFilter === s ? 'active' : ''}`}
              onClick={() => setStatus(s)}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>

        <span className="badge badge-accent">{filtered.length} records</span>
      </div>

      <Table
        columns={COLUMNS}
        data={filtered}
        loading={loading}
        onEdit={openEdit}
        onDelete={handleDelete}
      />

      <AddModal
        isOpen={modal.open}
        onClose={closeModal}
        onSubmit={handleSubmit}
        title={modal.mode === 'edit' ? 'Edit Enrollment' : 'New Enrollment'}
        submitLabel={modal.mode === 'edit' ? 'Update' : 'Enroll Student'}
        fields={FIELDS}
        initialData={modal.row || {}}
        loading={saving}
      />
    </div>
  );
}