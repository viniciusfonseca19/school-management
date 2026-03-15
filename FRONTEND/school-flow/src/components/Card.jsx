import './Card.css';

export default function Card({ title, value, subtitle, icon, color = 'accent', trend }) {
  const colorMap = {
    accent:  { bg: 'var(--accent-muted)',  color: 'var(--accent)' },
    success: { bg: 'var(--success-muted)', color: 'var(--success)' },
    warning: { bg: 'var(--warning-muted)', color: 'var(--warning)' },
    info:    { bg: 'var(--info-muted)',    color: 'var(--info)' },
    danger:  { bg: 'var(--danger-muted)',  color: 'var(--danger)' },
  };

  const c = colorMap[color] || colorMap.accent;

  return (
    <div className="stat-card">
      <div className="stat-card-header">
        <div className="stat-card-icon" style={{ background: c.bg, color: c.color }}>
          {icon}
        </div>
        {trend !== undefined && (
          <div className={`stat-card-trend ${trend >= 0 ? 'positive' : 'negative'}`}>
            {trend >= 0 ? (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="18 15 12 9 6 15"/>
              </svg>
            ) : (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            )}
            {Math.abs(trend)}%
          </div>
        )}
      </div>

      <div className="stat-card-body">
        <div className="stat-card-value">{value ?? '—'}</div>
        <div className="stat-card-title">{title}</div>
        {subtitle && <div className="stat-card-subtitle">{subtitle}</div>}
      </div>

      {/* Decorative bottom bar */}
      <div className="stat-card-bar" style={{ background: c.color }} />
    </div>
  );
}