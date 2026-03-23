import useReveal from '../../hooks/useReveal';

const testimonials = [
  {
    quote:
      'Promptly saved us weeks of engineering time. We can now iterate on our prompt logic without waiting for a deployment cycle.',
    name: 'Alex Rivera',
    role: 'CTO at Luna Systems',
    initials: 'AR',
  },
  {
    quote:
      "The editorial feel of the interface makes prompt engineering feel like creative writing again. It's the only tool my PMs actually like using.",
    name: 'Sarah Chen',
    role: 'Product Lead at Flux Creative',
    initials: 'SC',
  },
  {
    quote:
      'Crucial for high-stakes enterprise AI. The rollback feature alone has saved us from several hallucination disasters in production.',
    name: 'Marcus Thorne',
    role: 'Lead AI at Scale Systems',
    initials: 'MT',
  },
];

const revealClasses = [
  'reveal reveal-left reveal-delay-1',
  'reveal reveal-delay-2',
  'reveal reveal-right reveal-delay-3',
];

function StarRow() {
  return (
    <div style={{ display: 'flex', gap: '2px', marginBottom: '14px' }}>
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="var(--lp-acc)"
          stroke="var(--lp-acc)"
          strokeWidth="1.5"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const sectionRef = useReveal();

  return (
    <section ref={sectionRef} style={{ background: 'var(--lp-bg)', padding: '72px 32px' }}>
      <div
        id="testimonials-grid"
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px',
        }}
      >
        {testimonials.map((t, i) => (
          <div
            key={t.name}
            className={revealClasses[i]}
            style={{
              background: 'white',
              border: '1px solid var(--lp-border)',
              borderRadius: '10px',
              padding: '24px',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.25s cubic-bezier(0.16,1,0.3,1)',
              cursor: 'default',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow =
                '0 16px 40px rgba(0,0,0,0.07)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {/* Quote mark decoration */}
            <div
              style={{
                fontSize: '64px',
                lineHeight: 1,
                color: 'var(--lp-border)',
                fontFamily: 'Georgia, serif',
                position: 'absolute',
                top: '8px',
                left: '14px',
                userSelect: 'none',
                pointerEvents: 'none',
              }}
            >
              &ldquo;
            </div>

            <StarRow />
            <p
              style={{
                fontSize: '14px',
                color: 'var(--lp-muted)',
                lineHeight: 1.65,
                fontStyle: 'italic',
                marginBottom: '16px',
                position: 'relative',
                zIndex: 1,
              }}
            >
              &ldquo;{t.quote}&rdquo;
            </p>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              {/* Avatar */}
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  background: 'var(--lp-border)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '11px',
                  fontWeight: 500,
                  color: 'var(--lp-muted)',
                  flexShrink: 0,
                }}
              >
                {t.initials}
              </div>
              <div>
                <div
                  style={{
                    fontSize: '13px',
                    fontWeight: 500,
                    color: 'var(--lp-text)',
                  }}
                >
                  {t.name}
                </div>
                <div
                  style={{
                    fontSize: '11px',
                    color: 'var(--lp-muted)',
                  }}
                >
                  {t.role}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          #testimonials-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
