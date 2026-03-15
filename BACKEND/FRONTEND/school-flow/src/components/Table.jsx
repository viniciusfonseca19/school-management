import './Table.css';

/**
 * Table component
 *
 * Props:
 *   columns   — array of { key, label, render? }
 *   data      — array of row objects
 *   onEdit    — fn(row)
 *   onDelete  — fn(row)
 *   onView    — fn(row) optional
 *   loading   — bool
 *   keyField  — string (default 'id')
 */
export default function Table({
  columns = [],
  data = [],
  onEdit,
  onDelete,
  onView,
  loading = false,
  keyField = 'id',
}) {
  if (loading) {
    return (
      <div className="table-wrapper">
        <div className="loading-page">
          <div className="spinner" />
        </div>
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="table-wrapper">
        <div className="empty-state">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
          </svg>
          <p>No records found.</p>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-disabled)' }}>
            Use the Add button to create your first entry.
          </span>
        </div>
      </div>
    );
  }

  const hasActions = onEdit || onDelete || onView;

  return (
    <div className="table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
            {hasActions && <th className="col-actions">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr
              key={row[keyField]}
              className={onView ? 'row-clickable' : ''}
              onClick={onView ? () => onView(row) : undefined}
            >
              {columns.map((col) => (
                <td key={col.key}>
                  {col.render ? col.render(row[col.key], row) : (row[col.key] ?? '—')}
                </td>
              ))}
              {hasActions && (
                <td className="col-actions" onClick={(e) => e.stopPropagation()}>
                  <div className="action-group">
                    {onView && (
                      <button
                        className="btn btn-ghost btn-sm"
                        title="View details"
                        onClick={() => onView(row)}
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                          <circle cx="12" cy="12" r="3"/>
                        </svg>
                        View
                      </button>
                    )}
                    {onEdit && (
                      <button
                        className="btn btn-ghost btn-sm"
                        title="Edit"
                        onClick={() => onEdit(row)}
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                        Edit
                      </button>
                    )}
                    {onDelete && (
                      <button
                        className="btn btn-danger btn-sm"
                        title="Delete"
                        onClick={() => onDelete(row)}
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6"/>
                          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                          <path d="M10 11v6"/>
                          <path d="M14 11v6"/>
                          <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                        </svg>
                        Delete
                      </button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="table-footer">
        <span className="table-count">{data.length} record{data.length !== 1 ? 's' : ''}</span>
      </div>
    </div>
  );
}