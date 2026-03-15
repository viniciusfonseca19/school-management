import { useState, useEffect, useCallback } from 'react';
import Table from '../components/Table';
import AddModal from '../components/AddModal';
import api from '../services/api';

const FIELDS = [
  { name: 'name',        label: 'Course Name',  type: 'text',   required: true,  placeholder: 'e.g. React Fundamentals', fullWidth: true },
  { name: 'code',        label: 'Course Code',  type: 'text',   required: true,  placeholder: 'e.g. CS-101' },
  { name: 'duration',    label: 'Duration (h)', type: 'number', required: false, placeholder: 'e.g. 60' },
  { name: 'category',    label: 'Category',     type: 'select', required: false,
    options: [
      { value: 'technology', label: 'Technology' },
      { value: 'science',    label: 'Science' },
      { value: 'arts',       label: 'Arts' },
      { value: 'business',   label: 'Business' },
      { value: 'language',   label: 'Language' },
    ],
  },
  { name: 'description', label: 'Description', type: 'textarea', required: false, placeholder: 'Brief course description…', fullWidth: true },
];

const CATEGORY_COLORS = {
  technology: 'badge-accent',
  science:    'badge-success',
  arts:       'badge-warning',
  business:   'badge-info',
  language:   'badge-default',
};

const COLUMNS = [
  {
    key: 'name',
    label: 'Course',
    render: (_, row) => (
      <div>
        <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{row.name}</div>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
          {row.code}
        </div>
      </div>
    ),
  },
  { key: 'duration',    label: 'Duration', render: (v) => v ? `${v}h` : '—' },
  {
    key: 'category',
    label: 'Category',
    render: (v) =>
      v ? (
        <span className={`badge ${CATEGORY_COLORS[v] || 'badge-default'}`}>
          {v.charAt(0).toUpperCase() + v.slice(1)}
        </span>
      ) : '—',
  },
  {
    key: 'status',
    label: 'Status',
    render: () => <span className="badge badge-success">Active</span>,
  },
];

export default function Courses({ toast }) {
  const [data, setData]         = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [search, setSearch]     = useState('');
  const [modal, setModal]       = useState({ open: false, mode: 'add', row: null });
  const [saving, setSaving]     = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.courses.getAll();
      setData(res || []);
      setFiltered(res || []);
    } catch (e) {
      toast?.error('Failed to load courses: ' + e.message);
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
          c.category?.toLowerCase().includes(q)
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
        await api.courses.update(modal.row.id, formData);
        toast?.success('Course updated!');
      } else {
        await api.courses.create(formData);
        toast?.success('Course created!');
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
    if (!window.confirm(`Delete course "${row.name}"?`)) return;
    try {
      await api.courses.delete(row.id);
      toast?.success('Course deleted.');
      fetchData();
    } catch (e) {
      toast?.error('Delete failed: ' + e.message);
    }
  };

  return (
    <div className="page-content">
      <div className="page-header">
        <div className="page-header-left">
          <h1>Courses</h1>
          <p>Create and manage academic courses offered by the school.</p>
        </div>
        <button className="btn btn-primary" onClick={openAdd}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Add Course
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
            placeholder="Search courses…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <span className="badge badge-accent">{filtered.length} courses</span>
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
        title={modal.mode === 'edit' ? 'Edit Course' : 'Add New Course'}
        submitLabel={modal.mode === 'edit' ? 'Update' : 'Create Course'}
        fields={FIELDS}
        initialData={modal.row || {}}
        loading={saving}
      />
    </div>
  );
}