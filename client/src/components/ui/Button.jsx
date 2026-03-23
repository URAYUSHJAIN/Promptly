export default function Button({ children, variant = 'primary', style = {}, ...props }) {
  const base = {
    fontFamily: "'Ubuntu', system-ui, sans-serif",
    fontWeight: 500,
    borderRadius: '7px',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    border: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    lineHeight: 1,
  };

  const variants = {
    primary: {
      background: 'var(--lp-dark)',
      color: '#fff',
      padding: '12px 24px',
      fontSize: '14px',
    },
    secondary: {
      background: 'transparent',
      border: '1px solid var(--lp-border)',
      color: 'var(--lp-text)',
      padding: '12px 24px',
      fontSize: '14px',
    },
    nav: {
      background: 'var(--lp-dark)',
      color: '#fff',
      padding: '8px 18px',
      fontSize: '13px',
      borderRadius: '6px',
    },
    accent: {
      background: 'var(--lp-acc)',
      color: 'var(--lp-dark)',
      padding: '14px 28px',
      fontSize: '14px',
      fontWeight: 600,
      borderRadius: '8px',
    },
  };

  return (
    <button
      style={{ ...base, ...variants[variant], ...style }}
      {...props}
    >
      {children}
    </button>
  );
}
