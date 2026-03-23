import { useState } from 'react';
import useReveal from '../../hooks/useReveal';

const features = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: 'Prompt Versioning',
    desc: "Full history of every change. Branch, merge, and tag 'golden' prompt versions for production.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="6" y1="3" x2="6" y2="15" />
        <circle cx="18" cy="6" r="3" />
        <circle cx="6" cy="18" r="3" />
        <path d="M18 9a9 9 0 0 1-9 9" />
      </svg>
    ),
    title: 'A/B Experiments',
    desc: 'Test two versions of a prompt side-by-side with real-world traffic to see which model performs the best.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    title: 'AI Scoring',
    desc: 'Automatically score your outputs based on custom criteria: tone, accuracy, or bias.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: 'Team Collaboration',
    desc: 'Shared workspaces with granular permissions. Let your content team edit without breaking the API.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="1 4 1 10 7 10" />
        <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
      </svg>
    ),
    title: 'Instant Rollback',
    desc: 'Deploy a bad prompt? Revert to the previous stable state in milliseconds via our UI or API.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    title: 'Metrics & Alerts',
    desc: 'Monitor cost, latency, and success rates. Get alerted when your latency or burst limit is exceeded.',
  },
];

export default function Features() {
  const sectionRef = useReveal();
  const [hovered, setHovered] = useState(null);

  return (
    <section ref={sectionRef} style={{ background: 'white', padding: '72px 32px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div
            className="reveal"
            style={{
              fontSize: '10px',
              textTransform: 'uppercase',
              color: 'var(--lp-muted)',
              letterSpacing: '1px',
              marginBottom: '12px',
            }}
          >
            ENGINEERING FOR EXCELLENCE
          </div>
          <h2
            className="reveal reveal-delay-1"
            style={{
              fontSize: '24px',
              fontWeight: 700,
              color: 'var(--lp-text)',
            }}
          >
            Everything your LLM workflow needs.
          </h2>
        </div>

        {/* Feature Grid */}
        <div
          id="features-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
          }}
        >
          {features.map((f, i) => {
            const delay = i < 3 ? i + 1 : i - 2;
            const isHovered = hovered === i;

            return (
              <div
                key={f.title}
                className={`reveal reveal-delay-${delay}`}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  padding: '24px 20px',
                  borderRadius: '10px',
                  border: '1px solid transparent',
                  cursor: 'default',
                  transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
                  boxShadow: isHovered
                    ? '0 12px 32px rgba(0,0,0,0.08)'
                    : 'none',
                  borderColor: isHovered
                    ? 'rgba(100,80,60,0.35)'
                    : 'transparent',
                  transition: 'all 0.2s cubic-bezier(0.16,1,0.3,1)',
                }}
              >
                {/* Icon */}
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    border: '1px solid var(--lp-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '12px',
                    background: isHovered ? 'var(--lp-dark)' : 'transparent',
                    borderColor: isHovered
                      ? 'var(--lp-dark)'
                      : 'var(--lp-border)',
                    color: isHovered ? '#fff' : 'var(--lp-muted)',
                    transition: 'all 0.2s cubic-bezier(0.16,1,0.3,1)',
                  }}
                >
                  {f.icon}
                </div>

                <h3
                  style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: 'var(--lp-text)',
                    marginBottom: '0',
                  }}
                >
                  {f.title}
                </h3>

                {/* Animated accent line */}
                <div
                  style={{
                    height: '1px',
                    background: 'var(--lp-acc)',
                    marginTop: '8px',
                    marginBottom: '8px',
                    transformOrigin: 'left',
                    transform: isHovered ? 'scaleX(1)' : 'scaleX(0)',
                    transition:
                      'transform 0.3s cubic-bezier(0.16,1,0.3,1)',
                  }}
                />

                <p
                  style={{
                    fontSize: '13px',
                    color: 'var(--lp-muted)',
                    lineHeight: 1.6,
                  }}
                >
                  {f.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #features-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
