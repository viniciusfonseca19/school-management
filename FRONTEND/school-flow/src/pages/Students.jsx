import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '../components/Table';
import AddModal from '../components/AddModal';
import api from '../services/api';

const FIELDS = [
  { name: 'firstName',  label: 'First Name', type: 'text',  required: true,  placeholder: 'e.g. Ana' },
  { name: 'lastName',   label: 'Last Name',  type: 'text',  required: true,  placeholder: 'e.g. Souza' },
  { name: 'email',      label: 'Email',      type: 'email', required: true,  placeholder: 'student@school.com', fullWidth: true },
  { name: 'phone',      label: 'Phone',      type: 'text',  required: false, placeholder: '+55 11 99999-0000' },
  { name: 'birthDate',  label: 'Birth Date', type: 'date',  required: false },
  { name: 'address',    label: 'Address',    type: 'text',  required: false, placeholder: 'Street, City', fullWidth: true },
];

const COLUMNS = [
  {
    key: 'name',
    label: 'Student',
    render: (_, row) => {
      const initials = `${row.firstName?.[0] || ''}${row.lastName?.[0] || ''}`.toUpperCase() || '?';
      const colors = ['#6366f1', '#22c55e', '#f59e0b', '#38bdf8', '#ef4444'];
      const color = colors[(row.id || 0) % colors.length];
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div className="avatar" style={{ background: `${color}20`, color, border: `1px solid ${color}40` }}>
            {initials}
          </div>
          <div>
            <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
              {row.firstName} {row.lastName}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{row.email}</div>
          </div>
        </div>
      );
    },
  },
  { key: 'phone',     label: 'Phone' },
  { key: 'birthDate', label: 'Birth Date' },
  {
    key: 'status',
    label: 'Status',
    render: () => <span className="badge badge-success">Active</span>,
  },
];

export default function Students({ toast }) {
  const navigate = useNavigate();
  const [data, setData]         = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [search, setSearch]     = useState('');
  const [modal, setModal]       = useState({ open: false, mode: 'add', row: null });
  const [saving, setSaving]     = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.students.getAll();
      setData(res || []);
      setFiltered(res || []);
    } catch (e) {
      toast?.error('Failed to load students: ' + e.message);
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => { fetchData(); }, [fetchData]);

  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(
      data.filter(
        (s) =>
          `${s.firstName} ${s.lastName}`.toLowerCase().includes(q) ||
          s.email?.toLowerCase().includes(q)
      )
    );
  }, [search, data]);

  const openAdd  = () => setModal({ open: true, mode: 'add', row: null });
  const openEdit = (row) => setModal({ open: true, mode: 'edit', row });
  const closeModal = () => setModal({ open: false, mode: 'add', row: null });

  const handleSubmit = async (formData) => {
    setSaving(true);
    try {
      if (modal.mode === 'edit') {
        await api.students.update(modal.row.id, formData);
        toast?.success('Student updated successfully!');
      } else {
        await api.students.create(formData);
        toast?.success('Student created successfully!');
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
    if (!window.confirm(`Delete student "${row.firstName} ${row.lastName}"?`)) return;
    try {
      await api.students.delete(row.id);
      toast?.success('Student deleted.');
      fetchData();
    } catch (e) {
      toast?.error('Delete failed: ' + e.message);
    }
  };

  const handleView = (row) => navigate(`/students/${row.id}`);

  return (
    <div className="page-content">
      <div className="page-header">
        <div className="page-header-left">
          <h1>Students</h1>
          <p>Manage all student records in the system.</p>
        </div>
        <button className="btn btn-primary" onClick={openAdd}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Add Student
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
            placeholder="Search students…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <span className="badge badge-accent">{filtered.length} students</span>
      </div>

      <Table
        columns={COLUMNS}
        data={filtered}
        loading={loading}
        onEdit={openEdit}
        onDelete={handleDelete}
        onView={handleView}
      />

      <AddModal
        isOpen={modal.open}
        onClose={closeModal}
        onSubmit={handleSubmit}
        title={modal.mode === 'edit' ? 'Edit Student' : 'Add New Student'}
        submitLabel={modal.mode === 'edit' ? 'Update' : 'Create Student'}
        fields={FIELDS}
        initialData={modal.row || {}}
        loading={saving}
      />
    </div>
  );
}