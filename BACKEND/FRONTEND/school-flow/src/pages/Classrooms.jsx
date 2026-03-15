import { useState, useEffect, useCallback } from 'react';
import Table from '../components/Table';
import AddModal from '../components/AddModal';
import api from '../services/api';

const FIELDS = [
  { name: 'name',     label: 'Room Name',   type: 'text',   required: true,  placeholder: 'e.g. Room 204-B' },
  { name: 'code',     label: 'Room Code',   type: 'text',   required: true,  placeholder: 'e.g. R-204' },
  { name: 'capacity', label: 'Capacity',    type: 'number', required: false, placeholder: 'e.g. 30' },
  {
    name: 'type', label: 'Room Type', type: 'select', required: false,
    options: [
      { value: 'lecture',    label: 'Lecture Hall' },
      { value: 'lab',        label: 'Laboratory' },
      { value: 'seminar',    label: 'Seminar Room' },
      { value: 'workshop',   label: 'Workshop' },
      { value: 'auditorium', label: 'Auditorium' },
    ],
  },
  { name: 'building', label: 'Building', type: 'text', required: false, placeholder: 'e.g. Block A' },
  { name: 'floor',    label: 'Floor',    type: 'text', required: false, placeholder: 'e.g. 2nd Floor' },
];

const TYPE_COLORS = {
  lecture:    'badge-accent',
  lab:        'badge-success',
  seminar:    'badge-info',
  workshop:   'badge-warning',
  auditorium: 'badge-default',
};

const COLUMNS = [
  {
    key: 'name',
    label: 'Classroom',
    render: (_, row) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div className="avatar" style={{ background: 'var(--info-muted)', color: 'var(--info)', border: '1px solid rgba(56,189,248,0.25)', borderRadius: 'var(--radius-sm)' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
        </div>
        <div>
          <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{row.name}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
            {row.code}
          </div>
        </div>
      </div>
    ),
  },
  { key: 'capacity', label: 'Capacity', render: (v) => v ? `${v} seats` : '—' },
  {
    key: 'type',
    label: 'Type',
    render: (v) =>
      v ? (
        <span className={`badge ${TYPE_COLORS[v] || 'badge-default'}`}>
          {v.charAt(0).toUpperCase() + v.slice(1)}
        </span>
      ) : '—',
  },
  { key: 'building', label: 'Building' },
  { key: 'floor',    label: 'Floor' },
  {
    key: 'status',
    label: 'Status',
    render: () => <span className="badge badge-success">Available</span>,
  },
];

export default function Classrooms({ toast }) {
  const [data, setData]         = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [search, setSearch]     = useState('');
  const [modal, setModal]       = useState({ open: false, mode: 'add', row: null });
  const [saving, setSaving]     = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.classrooms.getAll();
      setData(res || []);
      setFiltered(res || []);
    } catch (e) {
      toast?.error('Failed to load classrooms: ' + e.message);
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => { fetchData(); }, [fetchData]);

  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(
      data.filter(
        (c) =>
          c.name?.toLowerCase().includes(q) ||
          c.code?.toLowerCase().includes(q) ||
          c.building?.toLowerCase().includes(q) ||
          c.type?.toLowerCase().includes(q)
      )
    );
  }, [search, data]);

  const openAdd    = () => setModal({ open: true, mode: 'add', row: null });
  const openEdit   = (row) => setModal({ open: true, mode: 'edit', row });
  const closeModal = () => setModal({ open: false, mode: 'add', row: null });

  const handleSubmit = async (formData) => {
    setSaving(true);
    try {
      if (modal.mode === 'edit') {
        await api.classrooms.update(modal.row.id, formData);
        toast?.success('Classroom updated!');
      } else {
        await api.classrooms.create(formData);
        toast?.success('Classroom created!');
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
    if (!window.confirm(`Delete classroom "${row.name}"?`)) return;
    try {
      await api.classrooms.delete(row.id);
      toast?.success('Classroom deleted.');
      fetchData();
    } catch (e) {
      toast?.error('Delete failed: ' + e.message);
    }
  };

  return (
    <div className="page-content">
      <div className="page-header">
        <div className="page-header-left">
          <h1>Classrooms</h1>
          <p>Manage physical rooms and their availability.</p>
        </div>
        <button className="btn btn-primary" onClick={openAdd}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Add Classroom
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
            placeholder="Search classrooms…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <span className="badge badge-accent">{filtered.length} classrooms</span>
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
        title={modal.mode === 'edit' ? 'Edit Classroom' : 'Add New Classroom'}
        submitLabel={modal.mode === 'edit' ? 'Update' : 'Create Classroom'}
        fields={FIELDS}
        initialData={modal.row || {}}
        loading={saving}
      />
    </div>
  );
}