import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../services/api';
import './Navbar.css';

const PAGE_TITLES = {
  '/':            'Dashboard',
  '/students':    'Students',
  '/teachers':    'Teachers',
  '/courses':     'Courses',
  '/classrooms':  'Classrooms',
  '/enrollments': 'Enrollments',
  '/login':       'Login',
};

const ENTITY_META = [
  { key: 'students',    label: 'Student',    path: '/students',    color: 'var(--accent)',  icon: '👤' },
  { key: 'teachers',    label: 'Teacher',    path: '/teachers',    color: 'var(--success)', icon: '🎓' },
  { key: 'courses',     label: 'Course',     path: '/courses',     color: 'var(--warning)', icon: '📚' },
  { key: 'classrooms',  label: 'Classroom',  path: '/classrooms',  color: 'var(--info)',    icon: '🏫' },
  { key: 'enrollments', label: 'Enrollment', path: '/enrollments', color: 'var(--accent)',  icon: '📋' },
];

function getLabel(item, key) {
  if (key === 'students')    return item.fullName || item.email || `Student #${item.id}`;
  if (key === 'teachers')    return item.fullName || `${item.firstName||''} ${item.lastName||''}`.trim() || item.email || `Teacher #${item.id}`;
  if (key === 'courses')     return item.name || `Course #${item.id}`;
  if (key === 'classrooms')  return item.name || `Room #${item.id}`;
  if (key === 'enrollments') return `Enrollment #${item.id}`;
  return `#${item.id}`;
}

function getSub(item, key) {
  if (key === 'students')    return item.email || item.registrationNumber || '';
  if (key === 'teachers')    return item.email || item.specialization || '';
  if (key === 'courses')     return item.code || item.category || '';
  if (key === 'classrooms')  return item.code || item.type || '';
  if (key === 'enrollments') return item.status || '';
  return '';
}

export default function Navbar({ onMenuToggle }) {
  const location = useLocation();
  const navigate = useNavigate();

  const path = Object.keys(PAGE_TITLES).find(
    (p) => p !== '/' && location.pathname.startsWith(p)
  ) || (location.pathname === '/' ? '/' : null);
  const title = PAGE_TITLES[path] || 'School-Flow';

  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery]           = useState('');
  const [results, setResults]       = useState([]);
  const [loading, setLoading]       = useState(false);
  const [allData, setAllData]       = useState(null);
  const [selected, setSelected]     = useState(0);
  const inputRef = useRef(null);

  // Ctrl+K / Cmd+K
  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
      if (e.key === 'Escape') setSearchOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Focus when opens
  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setResults([]);
      setSelected(0);
    }
  }, [searchOpen]);

  // Load all data once
  useEffect(() => {
    if (!searchOpen || allData) return;
    async function loadAll() {
      setLoading(true);
      try {
        const [stu, tea, cor, cls, enr] = await Promise.allSettled([
          api.students.getAll(),
          api.teachers.getAll(),
          api.courses.getAll(),
          api.classrooms.getAll(),
          api.enrollments.getAll(),
        ]);
        setAllData({
          students:    stu.status === 'fulfilled' ? stu.value || [] : [],
          teachers:    tea.status === 'fulfilled' ? tea.value || [] : [],
          courses:     cor.status === 'fulfilled' ? cor.value || [] : [],
          classrooms:  cls.status === 'fulfilled' ? cls.value || [] : [],
          enrollments: enr.status === 'fulfilled' ? enr.value || [] : [],
        });
      } finally {
        setLoading(false);
      }
    }
    loadAll();
  }, [searchOpen, allData]);

  // Filter
  useEffect(() => {
    if (!allData) return;
    const q = query.toLowerCase().trim();
    if (!q) { setResults([]); setSelected(0); return; }

    const hits = [];
    ENTITY_META.forEach(({ key, label, path, color, icon }) => {
      (allData[key] || []).forEach((item) => {
        const lbl = getLabel(item, key);
        const sub = getSub(item, key);
        if (lbl.toLowerCase().includes(q) || sub.toLowerCase().includes(q)) {
          hits.push({ id: item.id, key, label: lbl, sub, path, color, icon, entityLabel: label });
        }
      });
    });
    setResults(hits.slice(0, 12));
    setSelected(0);
  }, [query, allData]);

  const goTo = (result) => {
    navigate(result.path);
    setSearchOpen(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setSelected((v) => Math.min(v + 1, results.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setSelected((v) => Math.max(v - 1, 0)); }
    else if (e.key === 'Enter' && results[selected]) goTo(results[selected]);
  };

  return (
    <>
      <header className="navbar">
        <div className="navbar-left">
          <button className="navbar-burger btn btn-ghost" onClick={onMenuToggle} aria-label="Toggle menu">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6"  x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
          <div className="navbar-breadcrumb">
            <span className="navbar-breadcrumb-home">School-Flow</span>
            <span className="navbar-breadcrumb-sep">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </span>
            <span className="navbar-breadcrumb-current">{title}</span>
          </div>
        </div>

        <div className="navbar-right">
          <div
            className="navbar-search"
            onClick={() => setSearchOpen(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setSearchOpen(true)}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <span>Search…</span>
            <kbd>⌘K</kbd>
          </div>

          <button className="btn btn-ghost btn-icon navbar-action-btn" aria-label="Notifications">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            <span className="navbar-badge">3</span>
          </button>

          <div className="navbar-user">
            <div className="avatar" style={{ background: 'var(--accent-muted)', color: 'var(--accent)' }}>A</div>
            <div className="navbar-user-info">
              <span className="navbar-user-name">Admin</span>
              <span className="navbar-user-role">Administrator</span>
            </div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--text-tertiary)', flexShrink: 0 }}>
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </div>
        </div>
      </header>

      {/* Search Modal */}
      {searchOpen && (
        <div className="search-modal-backdrop" onClick={() => setSearchOpen(false)}>
          <div className="search-modal" onClick={(e) => e.stopPropagation()}>

            <div className="search-modal-input-row">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--text-tertiary)', flexShrink: 0 }}>
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                ref={inputRef}
                className="search-modal-input"
                placeholder="Search students, teachers, courses…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              {query && (
                <button className="search-modal-clear" onClick={() => setQuery('')}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              )}
              <kbd className="search-modal-esc" onClick={() => setSearchOpen(false)}>Esc</kbd>
            </div>

            <div className="search-modal-body">
              {loading && (
                <div className="search-modal-status">
                  <div className="spinner" style={{ width: 16, height: 16 }} />
                  <span>Loading data…</span>
                </div>
              )}

              {!loading && !query && (
                <div className="search-modal-hints">
                  <div className="search-hints-label">Quick navigation</div>
                  {ENTITY_META.map((m) => (
                    <button key={m.key} className="search-hint-item"
                      onClick={() => { navigate(m.path); setSearchOpen(false); }}>
                      <span className="search-hint-icon">{m.icon}</span>
                      <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Browse {m.label}s</span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                        style={{ marginLeft: 'auto', color: 'var(--text-disabled)' }}>
                        <polyline points="9 18 15 12 9 6"/>
                      </svg>
                    </button>
                  ))}
                </div>
              )}

              {!loading && query && results.length === 0 && (
                <div className="search-modal-status">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ opacity: 0.3 }}>
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                  <span>No results for "<strong>{query}</strong>"</span>
                </div>
              )}

              {!loading && results.length > 0 && (
                <div className="search-results-list">
                  {results.map((r, i) => (
                    <button
                      key={`${r.key}-${r.id}`}
                      className={`search-result-item ${i === selected ? 'selected' : ''}`}
                      onClick={() => goTo(r)}
                      onMouseEnter={() => setSelected(i)}
                    >
                      <span className="search-result-icon">{r.icon}</span>
                      <div className="search-result-info">
                        <span className="search-result-label">{r.label}</span>
                        {r.sub && <span className="search-result-sub">{r.sub}</span>}
                      </div>
                      <span className="search-result-type" style={{ color: r.color }}>{r.entityLabel}</span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                        style={{ color: 'var(--text-disabled)', flexShrink: 0 }}>
                        <polyline points="9 18 15 12 9 6"/>
                      </svg>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="search-modal-footer">
              <span><kbd>↑↓</kbd> navigate</span>
              <span><kbd>↵</kbd> open page</span>
              <span><kbd>Esc</kbd> close</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}