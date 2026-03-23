import { Link } from 'react-router-dom';

const footerLinks = ['Product', 'Terms', 'Privacy', 'Changelog', 'Docs'];

export default function Footer() {
  return (
    <footer
      style={{
        background: 'var(--lp-bg)',
        borderTop: '1px solid var(--lp-border)',
        padding: '28px 32px',
      }}
    >
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        {/* Logo */}
        <span
          style={{
            fontSize: '14px',
            fontWeight: 600,
            color: 'var(--lp-text)',
          }}
        >
          Promptly
        </span>

        {/* Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {footerLinks.map((link) => {
            if (link === 'Docs') {
              return (
                <Link
                  key={link}
                  to="/docs"
                  style={{
                    fontSize: '12px',
                    color: 'var(--lp-muted)',
                    transition: 'color 0.15s ease',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => (e.target.style.color = 'var(--lp-text)')}
                  onMouseLeave={(e) => (e.target.style.color = 'var(--lp-muted)')}
                >
                  {link}
                </Link>
              );
            }
            return (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                style={{
                  fontSize: '12px',
                  color: 'var(--lp-muted)',
                  transition: 'color 0.15s ease',
                }}
                onMouseEnter={(e) => (e.target.style.color = 'var(--lp-text)')}
                onMouseLeave={(e) => (e.target.style.color = 'var(--lp-muted)')}
              >
                {link}
              </a>
            );
          })}
        </div>

        {/* Copyright */}
        <span style={{ fontSize: '12px', color: 'var(--lp-muted)' }}>
          © 2025 Promptly
        </span>
      </div>
    </footer>
  );
}
