import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import useReveal from '../../hooks/useReveal';

export default function Hero() {
  const heroRef = useRef(null);
  const revealRef = useReveal();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  // Mouse parallax
  useEffect(() => {
    const handleMove = (e) => {
      const rect = heroRef.current?.getBoundingClientRect();
      if (!rect) return;
      setMouse({
        x: (e.clientX - rect.left - rect.width / 2) / rect.width,
        y: (e.clientY - rect.top - rect.height / 2) / rect.height,
      });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  // Auto-trigger reveals on mount for hero (above fold)
  useEffect(() => {
    setTimeout(() => {
      heroRef.current?.querySelectorAll('.reveal')
        .forEach(el => el.classList.add('visible'));
    }, 100);
  }, []);

  return (
    <section
      ref={heroRef}
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--lp-bg)',
        padding: '80px 32px 60px',
      }}
    >
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '60px',
          alignItems: 'center',
        }}
        id="hero-grid"
      >
        {/* ═══ LEFT COLUMN — Text ═══ */}
        <div ref={revealRef}>
          {/* Badge */}
          <div className="reveal" style={{ marginBottom: '24px' }}>
            <Badge dotColor="var(--lp-acc)">NOW IN OPEN BETA</Badge>
          </div>

          {/* H1 */}
          <div className="reveal reveal-delay-1">
            <h1
              id="hero-headline"
              style={{
                fontSize: '48px',
                fontWeight: 700,
                lineHeight: 1.1,
                color: 'var(--lp-text)',
                maxWidth: '600px',
              }}
            >
              Git for your AI{' '}
              <span
                style={{
                  background:
                    'linear-gradient(90deg, var(--lp-text) 0%, var(--lp-acc) 50%, var(--lp-text) 100%)',
                  backgroundSize: '200% auto',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  animation: 'shimmer 3s linear infinite',
                }}
              >
                prompts
              </span>
              ,
              <br />
              built for teams.
            </h1>
          </div>

          {/* Subtext */}
          <div className="reveal reveal-delay-2">
            <p
              style={{
                fontSize: '16px',
                color: 'var(--lp-muted)',
                maxWidth: '480px',
                margin: '16px 0 0',
                lineHeight: 1.65,
              }}
            >
              Stop losing your best outputs to Slack threads and spreadsheets.
              Version, test, and deploy prompts with editorial precision.
            </p>
          </div>

          {/* CTA buttons */}
          <div
            className="reveal reveal-delay-3"
            style={{
              marginTop: '28px',
              display: 'flex',
              gap: '12px',
              flexWrap: 'wrap',
            }}
          >
            <Link to="/signup" style={{ textDecoration: 'none' }}>
              <Button variant="primary">Start Prompting Free</Button>
            </Link>
            <Link to="/features" style={{ textDecoration: 'none' }}>
              <Button variant="secondary">Explore Features</Button>
            </Link>
          </div>

          {/* Micro note */}
          <div className="reveal reveal-delay-4">
            <p
              style={{
                fontSize: '11px',
                color: 'var(--lp-muted)',
                marginTop: '10px',
              }}
            >
              No credit card required · Deploy in minutes
            </p>
          </div>
        </div>

        {/* ═══ RIGHT COLUMN — Floating cards + mockup ═══ */}
        <div
          id="hero-right-col"
          style={{
            position: 'relative',
            height: '480px',
          }}
        >
          {/* Floating Card 1 — Quality Score */}
          <div
            style={{
              position: 'absolute',
              top: '8%',
              left: '-5%',
              background: 'white',
              border: '1px solid var(--lp-border)',
              borderRadius: '12px',
              padding: '14px 18px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
              animation: 'floatA 4s ease-in-out infinite',
              transform: `translate(${mouse.x * -18}px, ${mouse.y * -12}px)`,
              transition: 'transform 0.1s ease-out',
              zIndex: 3,
            }}
          >
            <div
              style={{
                fontSize: '10px',
                color: 'var(--lp-muted)',
                letterSpacing: '0.8px',
                textTransform: 'uppercase',
                marginBottom: '4px',
              }}
            >
              Quality Index
            </div>
            <div style={{ fontSize: '22px', fontWeight: 700, color: '#2A5E35' }}>
              98.2%
            </div>
            <div
              style={{
                height: '3px',
                background: '#EDF6EC',
                borderRadius: '2px',
                marginTop: '6px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: '98%',
                  background: '#2A5E35',
                  borderRadius: '2px',
                }}
              />
            </div>
          </div>

          {/* Floating Card 2 — Latency */}
          <div
            style={{
              position: 'absolute',
              top: '42%',
              right: '-8%',
              background: 'white',
              border: '1px solid var(--lp-border)',
              borderRadius: '12px',
              padding: '14px 18px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
              animation: 'floatB 5s ease-in-out infinite',
              animationDelay: '1s',
              transform: `translate(${mouse.x * 22}px, ${mouse.y * 16}px)`,
              transition: 'transform 0.1s ease-out',
              zIndex: 3,
            }}
          >
            <div
              style={{
                fontSize: '10px',
                color: 'var(--lp-muted)',
                letterSpacing: '0.8px',
                textTransform: 'uppercase',
                marginBottom: '4px',
              }}
            >
              Avg Latency
            </div>
            <div style={{ fontSize: '22px', fontWeight: 700, color: 'var(--lp-text)' }}>
              1.2s
            </div>
            <div style={{ fontSize: '11px', color: '#2A5E35', marginTop: '2px' }}>
              ↓ 0.3s vs last week
            </div>
          </div>

          {/* Floating Card 3 — Cost */}
          <div
            style={{
              position: 'absolute',
              bottom: '18%',
              left: '5%',
              background: 'white',
              border: '1px solid var(--lp-border)',
              borderRadius: '12px',
              padding: '14px 18px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
              animation: 'floatC 6s ease-in-out infinite',
              animationDelay: '2s',
              transform: `translate(${mouse.x * -14}px, ${mouse.y * -20}px)`,
              transition: 'transform 0.1s ease-out',
              zIndex: 3,
            }}
          >
            <div
              style={{
                fontSize: '10px',
                color: 'var(--lp-muted)',
                letterSpacing: '0.8px',
                textTransform: 'uppercase',
                marginBottom: '4px',
              }}
            >
              Cost per run
            </div>
            <div style={{ fontSize: '22px', fontWeight: 700, color: 'var(--lp-text)' }}>
              $0.04
            </div>
            <div style={{ fontSize: '11px', color: 'var(--lp-muted)', marginTop: '2px' }}>
              ↓ 12% this month
            </div>
          </div>

          {/* Main Mockup */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%) perspective(1000px) rotateX(${mouse.y * 6}deg) rotateY(${mouse.x * -6}deg)`,
              transition: 'transform 0.15s ease-out',
              width: '88%',
              zIndex: 2,
            }}
          >
            <div
              style={{
                borderRadius: '12px',
                overflow: 'hidden',
                border: '1px solid var(--lp-border)',
                position: 'relative',
              }}
            >
              {/* Browser bar */}
              <div
                style={{
                  background: 'var(--lp-dark)',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 14px',
                  gap: '8px',
                }}
              >
                <div style={{ display: 'flex', gap: '6px', marginRight: '12px' }}>
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: '#3a3028',
                      }}
                    />
                  ))}
                </div>
                <div
                  style={{
                    flex: 1,
                    background: 'rgba(255,255,255,0.08)',
                    borderRadius: '4px',
                    height: '22px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span
                    style={{
                      fontSize: '10px',
                      color: 'rgba(255,255,255,0.35)',
                      fontFamily: "'Ubuntu Mono', monospace",
                    }}
                  >
                    app.promptly.dev
                  </span>
                </div>
              </div>

              {/* Dashboard content */}
              <div style={{ background: '#F5F0EB', padding: '20px' }}>
                <div
                  style={{
                    display: 'flex',
                    gap: '12px',
                    marginBottom: '16px',
                  }}
                >
                  {[
                    { value: '98.2%', label: 'QUALITY INDEX' },
                    { value: '1.2s', label: 'AVG LATENCY' },
                    { value: '$ 0.04', label: 'COST PER RUN' },
                  ].map((m) => (
                    <div
                      key={m.label}
                      style={{
                        background: 'white',
                        border: '1px solid var(--lp-border)',
                        borderRadius: '8px',
                        padding: '10px 14px',
                        flex: 1,
                        textAlign: 'left',
                      }}
                    >
                      <div
                        style={{
                          fontSize: '14px',
                          fontWeight: 700,
                          color: 'var(--lp-text)',
                        }}
                      >
                        {m.value}
                      </div>
                      <div
                        style={{
                          fontSize: '8px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.6px',
                          color: 'var(--lp-muted)',
                          marginTop: '2px',
                        }}
                      >
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
                {/* Code block */}
                <div
                  style={{
                    background: 'white',
                    borderRadius: '8px',
                    padding: '12px',
                    border: '1px solid var(--lp-border)',
                  }}
                >
                  <pre
                    style={{
                      fontFamily: "'Ubuntu Mono', monospace",
                      fontSize: '10px',
                      color: 'var(--lp-muted)',
                      lineHeight: 1.7,
                      margin: 0,
                      whiteSpace: 'pre-wrap',
                      textAlign: 'left',
                    }}
                  >
{`system_message: "You are a professional letter..."
user_prompt: "Rewrite for clarity: {{draft_text}}"
temperature: 0.7`}
                  </pre>
                </div>
              </div>

              {/* Grain overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '12px',
                  background:
                    'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.04\'/%3E%3C/svg%3E")',
                  pointerEvents: 'none',
                  zIndex: 4,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 768px) {
          #hero-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
            text-align: center !important;
          }
          #hero-right-col {
            height: 320px !important;
          }
          #hero-headline {
            font-size: 32px !important;
            margin: 0 auto !important;
          }
        }
        @media (max-width: 480px) {
          #hero-headline {
            font-size: 26px !important;
          }
          #hero-right-col {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
