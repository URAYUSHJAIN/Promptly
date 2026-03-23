export default function AuthLayout({ children }) {
  return (
    <div
      className="auth-grid"
      style={{
        display: 'grid',
        gridTemplateColumns: '45fr 55fr',
        minHeight: '100vh',
        fontFamily: "'Ubuntu', sans-serif",
      }}
    >
      {/* ═══ LEFT PANEL — Dark branded ═══ */}
      <div
        className="auth-left"
        style={{
          background: '#1C1410',
          padding: '48px 52px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* TOP */}
        <div>
          {/* Logo */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '64px',
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'rgba(200,168,130,0.15)',
                border: '1px solid rgba(200,168,130,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="#C8A882"
                strokeWidth="1.5"
              >
                <path
                  d="M2 4h12M2 8h8M2 12h10"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <span
              style={{
                fontSize: '17px',
                fontWeight: 700,
                color: 'white',
                letterSpacing: '-0.3px',
              }}
            >
              Promptly
            </span>
          </div>

          {/* Headline */}
          <div
            style={{
              fontSize: '32px',
              fontWeight: 800,
              color: 'white',
              lineHeight: 1.15,
              letterSpacing: '-0.8px',
              marginBottom: '20px',
              maxWidth: '340px',
            }}
          >
            The architect's canvas for AI orchestration.
          </div>

          {/* Feature list */}
          {[
            {
              title: 'Curated Prompt Library',
              desc: 'Version control and organize every iteration of your linguistic logic.',
            },
            {
              title: 'Cross-Model Experiments',
              desc: 'Compare outputs across GPT-4, Claude, and Llama side-by-side.',
            },
            {
              title: 'Production Analytics',
              desc: 'Monitor latency, cost, and drift with editorial precision.',
            },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                gap: '14px',
                marginBottom: '24px',
                animation: `fadeUp 0.5s ease ${0.1 + i * 0.1}s both`,
              }}
            >
              <div
                style={{
                  width: '22px',
                  height: '22px',
                  borderRadius: '50%',
                  border: '1.5px solid rgba(200,168,130,0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: '1px',
                }}
              >
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="#C8A882"
                  strokeWidth="2"
                >
                  <path
                    d="M2 6l3 3 5-5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <div
                  style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: 'white',
                    marginBottom: '3px',
                  }}
                >
                  {item.title}
                </div>
                <div
                  style={{
                    fontSize: '12px',
                    color: 'rgba(255,255,255,0.4)',
                    lineHeight: 1.55,
                  }}
                >
                  {item.desc}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM — Testimonial */}
        <div>
          <div
            style={{
              height: '1px',
              background: 'rgba(255,255,255,0.07)',
              marginBottom: '20px',
            }}
          />
          <div
            style={{
              fontSize: '13px',
              color: 'rgba(255,255,255,0.5)',
              lineHeight: 1.65,
              fontStyle: 'italic',
              marginBottom: '12px',
            }}
          >
            "Promptly has completely transformed how our engineering team
            bridges the gap between creative intent and technical
            execution."
          </div>
          <div
            style={{
              fontSize: '10px',
              fontWeight: 700,
              color: '#C8A882',
              letterSpacing: '1px',
              textTransform: 'uppercase',
            }}
          >
            Lead AI Architect, Synthesis Labs
          </div>
        </div>

        {/* Decorative circles */}
        <div
          style={{
            position: 'absolute',
            bottom: '-80px',
            right: '-80px',
            width: '320px',
            height: '320px',
            borderRadius: '50%',
            border: '1px solid rgba(200,168,130,0.06)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-40px',
            right: '-40px',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            border: '1px solid rgba(200,168,130,0.04)',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* ═══ RIGHT PANEL — Form area ═══ */}
      <div
        style={{
          background: '#FAFAF9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '48px 40px',
        }}
      >
        <div style={{ width: '100%', maxWidth: '400px' }}>
          {children}
        </div>
      </div>

      {/* Keyframes used by the left-panel feature list */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
