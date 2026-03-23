import { useState } from 'react';
import useReveal from '../../hooks/useReveal';

const cards = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--lp-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    title: 'Indie Developers',
    desc: "Iterate faster. Manage dozens of prompt branches, rings, and tag 'golden' prompt versions for production.",
    num: '01',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--lp-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: 'Product Teams',
    desc: 'Collaborate across departments. Allow non-technical PMs to tweak prompts without touching a line of code.',
    num: '02',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--lp-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    title: 'Prompt Engineers',
    desc: 'The ultimate workbench. A/B test models, track latency, and run automated scoring at scale.',
    num: '03',
  },
];

const revealClasses = [
  'reveal reveal-left reveal-delay-1',
  'reveal reveal-delay-2',
  'reveal reveal-right reveal-delay-3',
];

export default function AudienceCards() {
  const sectionRef = useReveal();
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <section ref={sectionRef} style={{ background: 'white', padding: '60px 32px' }}>
      <div
        id="audience-grid"
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px',
        }}
      >
        {cards.map((card, i) => (
          <div
            key={card.title}
            className={revealClasses[i]}
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
            style={{
              border: '1px solid var(--lp-border)',
              borderRadius: '10px',
              padding: '28px 24px',
              transition: 'all 0.25s cubic-bezier(0.16,1,0.3,1)',
              cursor: 'default',
              position: 'relative',
              overflow: 'hidden',
              transform: hoveredIdx === i ? 'translateY(-4px)' : 'translateY(0)',
              borderColor:
                hoveredIdx === i
                  ? 'rgba(100,80,60,0.35)'
                  : 'var(--lp-border)',
              boxShadow:
                hoveredIdx === i
                  ? '0 12px 32px rgba(0,0,0,0.06)'
                  : 'none',
            }}
          >
            {/* Number watermark — shows on hover */}
            <div
              style={{
                position: 'absolute',
                top: '12px',
                right: '16px',
                fontSize: '48px',
                fontWeight: 700,
                color: 'var(--lp-text)',
                opacity: hoveredIdx === i ? 0.06 : 0,
                lineHeight: 1,
                transition: 'opacity 0.3s ease',
                userSelect: 'none',
                pointerEvents: 'none',
              }}
            >
              {card.num}
            </div>

            <div style={{ marginBottom: '14px' }}>{card.icon}</div>
            <h3
              style={{
                fontSize: '16px',
                fontWeight: 600,
                color: 'var(--lp-text)',
                marginBottom: '8px',
              }}
            >
              {card.title}
            </h3>
            <p
              style={{
                fontSize: '13px',
                color: 'var(--lp-muted)',
                lineHeight: 1.6,
              }}
            >
              {card.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 768px) {
          #audience-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
