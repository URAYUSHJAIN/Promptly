import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import useReveal from '../../hooks/useReveal';

const trustItems = ['ENTERPRISE SECURE', 'SETUP IN 2 MINS', 'GLOBAL EDGE PROXY'];

export default function CTA() {
  const sectionRef = useReveal();

  return (
    <section ref={sectionRef} style={{ padding: '0 32px', marginBottom: '64px' }}>
      <div
        style={{
          background: 'var(--lp-dark)',
          borderRadius: '16px',
          maxWidth: '1036px',
          margin: '0 auto',
          padding: '72px 48px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Animated border glow */}
        <div
          style={{
            position: 'absolute',
            inset: '-1px',
            borderRadius: '17px',
            background:
              'linear-gradient(135deg, rgba(200,168,130,0.3) 0%, transparent 50%, rgba(200,168,130,0.15) 100%)',
            zIndex: 0,
            animation: 'shimmer 4s linear infinite',
            backgroundSize: '200% auto',
          }}
        />

        {/* Content — above border glow */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2
            className="reveal"
            style={{
              fontSize: '40px',
              fontWeight: 700,
              color: 'white',
              letterSpacing: '-0.5px',
            }}
          >
            Ready to stop guessing?
          </h2>

          <div className="reveal reveal-delay-1" style={{ marginTop: '28px' }}>
            <Link to="/signup" style={{ textDecoration: 'none' }}>
              <button
                style={{
                  padding: '14px 32px',
                  background: 'var(--lp-acc)',
                  color: 'var(--lp-dark)',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: 600,
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: "'Ubuntu', sans-serif",
                  transition: 'all 0.2s cubic-bezier(0.16,1,0.3,1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    'translateY(-2px) scale(1.02)';
                  e.currentTarget.style.boxShadow =
                    '0 8px 24px rgba(200,168,130,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform =
                    'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Create Your Free Account
              </button>
            </Link>
          </div>

          {/* Trust strip */}
          <div
            className="reveal reveal-delay-2"
            style={{
              marginTop: '20px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '24px',
              flexWrap: 'wrap',
            }}
          >
            {trustItems.map((item) => (
              <span
                key={item}
                style={{
                  fontSize: '11px',
                  color: 'rgba(255,255,255,0.35)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                }}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="rgba(255,255,255,0.35)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
