import { useState, useEffect, useCallback } from 'react';
import Table from '../components/Table';
import AddModal from '../components/AddModal';
import api from '../services/api';

const FIELDS = [
  { name: 'firstName',  label: 'First Name',  type: 'text',  required: true,  placeholder: 'e.g. Carlos' },
  { name: 'lastName',   label: 'Last Name',   type: 'text',  required: true,  placeholder: 'e.g. Carvalho' },
  { name: 'email',      label: 'Email',       type: 'email', required: true,  placeholder: 'teacher@school.com', fullWidth: true },
  { name: 'phone',      label: 'Phone',       type: 'text',  required: false, placeholder: '+55 11 99999-0000' },
  { name: 'specialization', label: 'Specialization', type: 'text', required: false, placeholder: 'e.g. Mathematics' },
  { name: 'hireDate',   label: 'Hire Date',   type: 'date',  required: false },
];

const COLUMNS = [
  {
    key: 'name',
    label: 'Teacher',
    render: (_, row) => {
      const initials = `${row.firstName?.[0] || ''}${row.lastName?.[0] || ''}`.toUpperCase() || '?';
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div className="avatar" style={{ background: 'var(--success-muted)', color: 'var(--success)', border: '1px solid rgba(34,197,94,0.25)' }}>
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
  { key: 'specialization', label: 'Specialization' },
  { key: 'phone',          label: 'Phone' },
  { key: 'hireDate',       label: 'Hire Date' },
  {
    key: 'status',
    label: 'Status',
    render: () => <span className="badge badge-success">Active</span>,
  },
];

export default function Teachers({ toast }) {
  const [data, setData]         = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [search, setSearch]     = useState('');
  const [modal, setModal]       = useState({ open: false, mode: 'add', row: null });
  const [saving, setSaving]     = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.teachers.getAll();
      setData(res || []);
      setFiltered(res || []);
    } catch (e) {
      toast?.error('Failed to load teachers: ' + e.message);
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => { fetchData(); }, [fetchData]);

  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(
      data.filter(
        (t) =>
          `${t.firstName} ${t.lastName}`.toLowerCase().includes(q) ||
          t.email?.toLowerCase().includes(q) ||
          t.specialization?.toLowerCase().includes(q)
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
        await api.teachers.update(modal.row.id, formData);
        toast?.success('Teacher updated successfully!');
      } else {
        await api.teachers.create(formData);
        toast?.success('Teacher created successfully!');
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
    if (!window.confirm(`Delete teacher "${row.firstName} ${row.lastName}"?`)) return;
    try {
      await api.teachers.delete(row.id);
      toast?.success('Teacher deleted.');
      fetchData();
    } catch (e) {
      toast?.error('Delete failed: ' + e.message);
    }
  };

  return (
    <div className="page-content">
      <div className="page-header">
        <div className="page-header-left">
          <h1>Teachers</h1>
          <p>Manage your teaching staff and their assignments.</p>
        </div>
        <button className="btn btn-primary" onClick={openAdd}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Add Teacher
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
            placeholder="Search teachers…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <span className="badge badge-accent">{filtered.length} teachers</span>
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
        title={modal.mode === 'edit' ? 'Edit Teacher' : 'Add New Teacher'}
        submitLabel={modal.mode === 'edit' ? 'Update' : 'Create Teacher'}
        fields={FIELDS}
        initialData={modal.row || {}}
        loading={saving}
      />
    </div>
  );
}