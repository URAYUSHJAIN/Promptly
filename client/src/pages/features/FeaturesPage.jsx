import { useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

const features = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--lp-acc)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
    title: 'Version-Controlled Prompts',
    desc: 'Every prompt edit is tracked with full diff history. Roll back to any version instantly, compare changes side-by-side, and never lose a working iteration again.',
    detail: 'Built on Git-like branching. Create feature branches for experimental rewrites, then merge when ready.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--lp-acc)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
        <line x1="14" y1="4" x2="10" y2="20" />
      </svg>
    ),
    title: 'Cross-Model A/B Testing',
    desc: 'Run the same prompt across GPT-4, Claude, Llama, and Gemini simultaneously. Compare outputs side-by-side with automated quality scoring.',
    detail: 'Set up experiment matrices with variable inputs, temperature sweeps, and model combinations in a single click.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--lp-acc)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
    title: 'Workspace Collaboration',
    desc: 'Invite your team to shared workspaces with role-based access. Comment on prompts, request reviews, and approve changes through a familiar PR-style workflow.',
    detail: 'Supports org-level SSO, audit logging, and compliance-ready access controls for enterprise teams.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--lp-acc)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    title: 'Production Analytics',
    desc: 'Monitor every prompt execution in production. Track latency, token usage, cost, and output quality drift with real-time dashboards and alerting.',
    detail: 'Set up custom metrics, anomaly detection thresholds, and automated Slack/email alerts when performance degrades.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--lp-acc)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    title: 'API-First Architecture',
    desc: 'Integrate Promptly into any stack with our REST API and official SDKs for TypeScript, Python, and Go. Fetch prompts at runtime for zero-downtime updates.',
    detail: 'Supports webhook events, batch operations, and OpenAPI spec for auto-generated client libraries.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--lp-acc)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
    title: 'Custom Model Config',
    desc: 'Fine-tune model parameters per prompt — temperature, top-p, frequency penalty, stop sequences, and more. Save configs as reusable presets across your workspace.',
    detail: 'Supports custom model endpoints, proxy configurations, and self-hosted LLM integration.',
  },
];

function FeatureCard({ feature, index }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      style={{
        background: '#fff',
        border: '1px solid var(--lp-border)',
        borderRadius: '14px',
        padding: '36px 32px',
        transition: 'all 0.2s ease',
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(100,80,60,0.3)';
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(28,20,16,0.06)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--lp-border)';
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* Number */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          right: '24px',
          fontSize: '48px',
          fontWeight: 700,
          color: 'rgba(200,168,130,0.08)',
          lineHeight: 1,
        }}
      >
        {String(index + 1).padStart(2, '0')}
      </div>

      {/* Icon */}
      <div
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '12px',
          background: 'rgba(200,168,130,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '20px',
        }}
      >
        {feature.icon}
      </div>

      {/* Title */}
      <h3
        style={{
          fontSize: '18px',
          fontWeight: 700,
          color: 'var(--lp-text)',
          marginBottom: '10px',
        }}
      >
        {feature.title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontSize: '14px',
          color: 'var(--lp-muted)',
          lineHeight: 1.65,
          marginBottom: '16px',
        }}
      >
        {feature.desc}
      </p>

      {/* Expand detail */}
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          fontSize: '12px',
          fontWeight: 500,
          color: 'var(--lp-acc)',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontFamily: "'Ubuntu', sans-serif",
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          padding: 0,
          transition: 'gap 0.15s ease',
        }}
      >
        {expanded ? 'Show less' : 'Learn more'}
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--lp-acc)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            transition: 'transform 0.2s ease',
            transform: expanded ? 'rotate(180deg)' : 'rotate(0)',
          }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* Detail */}
      <div
        style={{
          maxHeight: expanded ? '100px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.25s ease',
        }}
      >
        <p
          style={{
            fontSize: '13px',
            color: 'var(--lp-muted)',
            lineHeight: 1.6,
            marginTop: '12px',
            paddingTop: '12px',
            borderTop: '1px solid var(--lp-border)',
          }}
        >
          {feature.detail}
        </p>
      </div>
    </div>
  );
}

export default function FeaturesPage() {
  return (
    <div style={{ background: 'var(--lp-bg)', minHeight: '100vh' }}>
      <Navbar />

      {/* ===== HERO ===== */}
      <section
        style={{
          padding: '64px 32px 0',
          textAlign: 'center',
          maxWidth: '800px',
          margin: '0 auto',
        }}
      >
        <span
          style={{
            display: 'inline-block',
            fontSize: '12px',
            fontWeight: 500,
            color: 'var(--lp-muted)',
            background: 'rgba(200,168,130,0.15)',
            padding: '6px 16px',
            borderRadius: '20px',
            marginBottom: '24px',
          }}
        >
          Platform capabilities
        </span>

        <h1
          style={{
            fontSize: '44px',
            fontWeight: 700,
            color: 'var(--lp-text)',
            lineHeight: 1.12,
            letterSpacing: '-0.5px',
            marginBottom: '16px',
          }}
        >
          Everything you need to
          <br />
          ship better prompts.
        </h1>

        <p
          style={{
            fontSize: '15px',
            color: 'var(--lp-muted)',
            maxWidth: '520px',
            margin: '0 auto',
            lineHeight: 1.65,
          }}
        >
          From version control to production monitoring — Promptly gives your
          team the complete toolkit to build, test, and deploy AI-powered
          applications with confidence.
        </p>
      </section>

      {/* ===== FEATURES GRID ===== */}
      <section
        style={{
          padding: '48px 32px 64px',
          maxWidth: '1100px',
          margin: '0 auto',
        }}
      >
        <div
          id="features-page-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '24px',
          }}
        >
          {features.map((f, i) => (
            <FeatureCard key={f.title} feature={f} index={i} />
          ))}
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section
        style={{
          padding: '0 32px 64px',
          maxWidth: '1100px',
          margin: '0 auto',
        }}
      >
        <div
          style={{
            background: 'var(--lp-dark)',
            borderRadius: '16px',
            padding: '48px 40px',
            textAlign: 'center',
          }}
        >
          <h2
            style={{
              fontSize: '28px',
              fontWeight: 700,
              color: '#fff',
              marginBottom: '12px',
            }}
          >
            Ready to take control of your prompts?
          </h2>
          <p
            style={{
              fontSize: '14px',
              color: 'rgba(255,255,255,0.5)',
              marginBottom: '28px',
              maxWidth: '420px',
              margin: '0 auto 28px',
              lineHeight: 1.6,
            }}
          >
            Start free — no credit card required. Upgrade when your team is
            ready.
          </p>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '12px',
              flexWrap: 'wrap',
            }}
          >
            <a
              href="/signup"
              style={{
                padding: '12px 28px',
                background: 'var(--lp-acc)',
                color: 'var(--lp-dark)',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'all 0.15s ease',
              }}
            >
              Get Started Free →
            </a>
            <a
              href="/docs"
              style={{
                padding: '12px 28px',
                background: 'rgba(255,255,255,0.08)',
                color: '#fff',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 500,
                textDecoration: 'none',
                border: '1px solid rgba(255,255,255,0.12)',
                transition: 'all 0.15s ease',
              }}
            >
              Read the Docs
            </a>
          </div>
        </div>
      </section>

      <Footer />

      {/* Responsive */}
      <style>{`
        @media (max-width: 768px) {
          #features-page-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
