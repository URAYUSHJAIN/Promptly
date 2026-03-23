import { useEffect, useRef, useState } from 'react';
import useReveal from '../../hooks/useReveal';

const companies = ['ACME CORP', 'GLOBEX', 'STARK IND', 'SOYLENT', 'INITECH'];

const stats = [
  { value: '2.4k+', label: 'PROMPTS VERSIONED', end: 2.4, suffix: 'k+', decimal: 1 },
  { value: '18k+', label: 'AB TESTS', end: 18, suffix: 'k+', decimal: 0 },
  { value: '99.9%', label: 'UPTIME AROUND', end: 99.9, suffix: '%', decimal: 1 },
  { value: '14ms', label: 'AVG PRESS LATENCY', end: 14, suffix: 'ms', decimal: 0 },
];

export default function SocialProof() {
  const sectionRef = useReveal();
  const statsRef = useRef(null);
  const [counted, setCounted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted) {
          setCounted(true);
          animateCounters();
        }
      },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, [counted]);

  function animateCounters() {
    stats.forEach(({ end, suffix, decimal }, idx) => {
      const el = document.getElementById(`stat-${idx}`);
      if (!el) return;
      const start = 0;
      const duration = 1800;
      const startTime = performance.now();
      const tick = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = start + (end - start) * eased;
        el.textContent = value.toFixed(decimal) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }

  return (
    <section ref={sectionRef} style={{ background: 'var(--lp-bg)', padding: '52px 32px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Company logos strip */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid var(--lp-border)',
            paddingBottom: '28px',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          {companies.map((name, i) => (
            <span
              key={name}
              className={`reveal reveal-delay-${i + 1}`}
              style={{
                fontSize: '12px',
                fontWeight: 500,
                letterSpacing: '1px',
                color: 'var(--lp-muted)',
              }}
            >
              {name}
            </span>
          ))}
        </div>

        {/* Stats row */}
        <div
          ref={statsRef}
          id="social-proof-stats"
          style={{
            marginTop: '32px',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '24px',
            textAlign: 'center',
          }}
        >
          {stats.map((s, i) => (
            <div key={s.label} className={`reveal reveal-delay-${i + 1}`}>
              <div
                style={{
                  fontSize: '36px',
                  fontWeight: 700,
                  color: 'var(--lp-text)',
                }}
              >
                <span id={`stat-${i}`}>
                  {counted ? s.value : `0${s.suffix}`}
                </span>
              </div>
              <div
                style={{
                  fontSize: '10px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.8px',
                  color: 'var(--lp-muted)',
                  marginTop: '4px',
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #social-proof-stats {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
