import { useEffect, useRef } from 'react';
import './AddModal.css';

/**
 * AddModal — reusable modal
 *
 * Props:
 *   isOpen      bool
 *   onClose     fn()
 *   onSubmit    fn(formData)
 *   title       string
 *   submitLabel string (default 'Save')
 *   fields      array of { name, label, type, required, options, placeholder }
 *   initialData object (for edit mode)
 *   loading     bool
 */
export default function AddModal({
  isOpen,
  onClose,
  onSubmit,
  title = 'Add Record',
  submitLabel = 'Save',
  fields = [],
  initialData = {},
  loading = false,
}) {
  const formRef = useRef(null);

  // Close on ESC
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  // Trap scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(formRef.current);
    const data = Object.fromEntries(fd.entries());
    onSubmit(data);
  };

  return (
    <div className="modal-backdrop" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-container" role="dialog" aria-modal="true">
        {/* Header */}
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <button className="modal-close btn btn-ghost btn-icon" onClick={onClose} aria-label="Close">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Body */}
        <form ref={formRef} onSubmit={handleSubmit} noValidate>
          <div className="modal-body">
            <div className="modal-fields">
              {fields.map((field) => (
                <div key={field.name} className={`form-group ${field.fullWidth ? 'full-width' : ''}`}>
                  <label className="form-label" htmlFor={field.name}>
                    {field.label}
                    {field.required && <span className="form-required">*</span>}
                  </label>

                  {field.type === 'select' ? (
                    <select
                      id={field.name}
                      name={field.name}
                      className="form-input"
                      defaultValue={initialData[field.name] ?? ''}
                      required={field.required}
                    >
                      <option value="">Select {field.label}…</option>
                      {(field.options || []).map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  ) : field.type === 'textarea' ? (
                    <textarea
                      id={field.name}
                      name={field.name}
                      className="form-input form-textarea"
                      placeholder={field.placeholder || ''}
                      defaultValue={initialData[field.name] ?? ''}
                      required={field.required}
                      rows={3}
                    />
                  ) : (
                    <input
                      id={field.name}
                      name={field.name}
                      type={field.type || 'text'}
                      className="form-input"
                      placeholder={field.placeholder || ''}
                      defaultValue={initialData[field.name] ?? ''}
                      required={field.required}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? (
                <>
                  <div className="spinner" style={{ width: 14, height: 14 }} />
                  Saving…
                </>
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  {submitLabel}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}