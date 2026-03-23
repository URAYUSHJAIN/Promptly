import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

const navLinks = ['Product', 'Features', 'Pricing', 'Docs'];

export default function Navbar() {
  const [activeLink, setActiveLink] = useState(null);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const routerLinks = { Product: '/', Features: '/features', Pricing: '/pricing', Docs: '/docs' };

  return (
    <nav
      style={{
        background: 'var(--lp-bg)',
        borderBottom: '1px solid var(--lp-border)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '0 32px',
          height: '56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <a
          href="/"
          style={{
            fontFamily: "'Ubuntu', sans-serif",
            fontWeight: 600,
            fontSize: '18px',
            color: 'var(--lp-text)',
            textDecoration: 'none',
          }}
        >
          Promptly
        </a>

        {/* Center nav links — desktop */}
        <div
          id="navbar-links"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '28px',
          }}
        >
          {navLinks.map((link) => {
            const isRouterLink = !!routerLinks[link];
            const linkPath = routerLinks[link] || `#${link.toLowerCase()}`;
            const LinkComp = isRouterLink ? Link : 'a';
            const linkProps = isRouterLink ? { to: linkPath } : { href: linkPath };

            return (
              <LinkComp
                key={link}
                {...linkProps}
                onClick={() => setActiveLink(link)}
                onMouseEnter={() => setHoveredLink(link)}
                onMouseLeave={() => setHoveredLink(null)}
                style={{
                  fontSize: '14px',
                  color:
                    activeLink === link || hoveredLink === link
                      ? 'var(--lp-text)'
                      : 'var(--lp-muted)',
                  textDecoration: activeLink === link ? 'underline' : 'none',
                  textUnderlineOffset: '4px',
                  transition: 'color 0.15s ease',
                  fontWeight: 400,
                }}
              >
                {link}
              </LinkComp>
            );
          })}
        </div>

        {/* Right actions — desktop */}
        <div
          id="navbar-actions"
          style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
        >
          <Link
            to="/login"
            style={{
              fontSize: '13px',
              color: 'var(--lp-muted)',
              fontWeight: 500,
              transition: 'color 0.15s ease',
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => (e.target.style.color = 'var(--lp-text)')}
            onMouseLeave={(e) => (e.target.style.color = 'var(--lp-muted)')}
          >
            Log In
          </Link>
          <Link to="/signup" style={{ textDecoration: 'none' }}>
            <Button variant="nav">Get Started</Button>
          </Link>
        </div>

        {/* Hamburger — mobile only */}
        <button
          id="navbar-hamburger"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
          }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--lp-text)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {mobileMenuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div
          id="navbar-mobile-menu"
          style={{
            background: 'var(--lp-bg)',
            borderTop: '1px solid var(--lp-border)',
            padding: '16px 32px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          {navLinks.map((link) => {
            const isRouterLink = !!routerLinks[link];
            const linkPath = routerLinks[link] || `#${link.toLowerCase()}`;
            const LinkComp = isRouterLink ? Link : 'a';
            const linkProps = isRouterLink ? { to: linkPath } : { href: linkPath };

            return (
              <LinkComp
                key={link}
                {...linkProps}
                onClick={() => {
                  setActiveLink(link);
                  setMobileMenuOpen(false);
                }}
                style={{
                  fontSize: '15px',
                  color: 'var(--lp-text)',
                  textDecoration: 'none',
                  fontWeight: 400,
                  padding: '6px 0',
                  borderBottom: '1px solid var(--lp-border)',
                }}
              >
                {link}
              </LinkComp>
            );
          })}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginTop: '8px',
            }}
          >
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontSize: '14px',
                color: 'var(--lp-muted)',
                fontWeight: 500,
                textDecoration: 'none',
              }}
            >
              Log In
            </Link>
            <Link
              to="/signup"
              onClick={() => setMobileMenuOpen(false)}
              style={{ textDecoration: 'none' }}
            >
              <Button variant="nav">Get Started</Button>
            </Link>
          </div>
        </div>
      )}

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          #navbar-links {
            display: none !important;
          }
          #navbar-actions {
            display: none !important;
          }
          #navbar-hamburger {
            display: flex !important;
          }
        }
      `}</style>
    </nav>
  );
}
