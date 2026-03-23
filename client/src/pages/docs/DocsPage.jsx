import { useState } from 'react';
import { Link } from 'react-router-dom';

/* ─── Sidebar nav structure ─── */
const sidebar = [
  {
    section: 'GETTING STARTED',
    items: [
      { label: 'Quick start', id: 'quick-start', active: true },
      { label: 'Installation', id: 'installation' },
      { label: 'Authentication', id: 'authentication' },
    ],
  },
  {
    section: 'PROMPTS',
    items: [
      { label: 'Creating prompts', id: 'creating-prompts' },
      { label: 'Versioning', id: 'versioning' },
      { label: 'Diff view', id: 'diff-view' },
    ],
  },
  {
    section: 'EXPERIMENTS',
    items: [
      { label: 'A/B testing', id: 'ab-testing' },
      { label: 'Scoring', id: 'scoring' },
      { label: 'Metrics', id: 'metrics' },
    ],
  },
  {
    section: null,
    items: [
      { label: 'API Reference', id: 'api-reference', badge: 'REST' },
      { label: 'Integrations', id: 'integrations' },
      { label: 'Self-hosting', id: 'self-hosting' },
    ],
  },
];

/* ─── "On this page" right sidebar ─── */
const onThisPage = [
  { label: 'Introduction', id: 'intro' },
  { label: 'Prerequisites', id: 'prereqs' },
  { label: 'Step 1: Environment', id: 'step1', active: true },
  { label: 'Step 2: Sync Prompt', id: 'step2' },
  { label: 'Step 3: Test Variables', id: 'step3' },
  { label: 'Next steps', id: 'next-steps' },
];

/* ─── Code Block component ─── */
function CodeBlock({ label, children }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      style={{
        background: 'var(--lp-dark)',
        borderRadius: '10px',
        overflow: 'hidden',
        marginTop: '16px',
        marginBottom: '8px',
      }}
    >
      {/* Header bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '8px 16px',
          background: 'rgba(255,255,255,0.04)',
        }}
      >
        <span
          style={{
            fontSize: '10px',
            fontWeight: 500,
            color: 'rgba(255,255,255,0.35)',
            letterSpacing: '0.8px',
            textTransform: 'uppercase',
          }}
        >
          {label}
        </span>
        <button
          onClick={handleCopy}
          style={{
            fontSize: '10px',
            color: 'rgba(255,255,255,0.4)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontFamily: "'Ubuntu', sans-serif",
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            transition: 'color 0.15s ease',
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')
          }
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          {copied ? 'COPIED!' : 'COPY'}
        </button>
      </div>
      {/* Code */}
      <pre
        style={{
          padding: '16px 20px 20px',
          margin: 0,
          fontFamily: "'Ubuntu Mono', monospace",
          fontSize: '13px',
          lineHeight: 1.7,
          color: 'rgba(255,255,255,0.8)',
          overflowX: 'auto',
          whiteSpace: 'pre',
        }}
      >
        {children}
      </pre>
    </div>
  );
}

/* ─── Method badge ─── */
function MethodBadge({ method }) {
  const colors = {
    GET: { bg: '#E8F5E9', color: '#2E7D32' },
    POST: { bg: '#FFF3E0', color: '#E65100' },
    DELETE: { bg: '#FFEBEE', color: '#C62828' },
  };
  const c = colors[method] || colors.GET;
  return (
    <span
      style={{
        fontSize: '10px',
        fontWeight: 700,
        color: c.color,
        background: c.bg,
        padding: '2px 6px',
        borderRadius: '3px',
        letterSpacing: '0.3px',
        fontFamily: "'Ubuntu Mono', monospace",
        verticalAlign: 'middle',
      }}
    >
      {method}
    </span>
  );
}

/* ─── Step number circle ─── */
function StepCircle({ n }) {
  return (
    <div
      style={{
        width: '28px',
        height: '28px',
        borderRadius: '50%',
        background: 'var(--lp-acc)',
        color: 'var(--lp-dark)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '13px',
        fontWeight: 700,
        flexShrink: 0,
      }}
    >
      {n}
    </div>
  );
}

/* ─── Callout box ─── */
function Callout({ type = 'attention', children }) {
  const styles = {
    attention: { border: '#C75B5B', label: 'ATTENTION', labelColor: '#C75B5B' },
    info: { border: 'var(--lp-acc)', label: 'INFO', labelColor: 'var(--lp-acc)' },
  };
  const s = styles[type] || styles.attention;

  return (
    <div
      style={{
        background: 'rgba(245,240,235,0.6)',
        borderLeft: `3px solid ${s.border}`,
        borderRadius: '0 8px 8px 0',
        padding: '16px 20px',
        marginTop: '16px',
      }}
    >
      <div
        style={{
          fontSize: '10px',
          fontWeight: 700,
          color: s.labelColor,
          letterSpacing: '0.5px',
          marginBottom: '6px',
        }}
      >
        {s.label}
      </div>
      <p
        style={{
          fontSize: '13px',
          color: 'var(--lp-muted)',
          lineHeight: 1.6,
          margin: 0,
        }}
      >
        {children}
      </p>
    </div>
  );
}

/* ═══════════════════════════════════════ */
/*              DOCS PAGE                 */
/* ═══════════════════════════════════════ */

export default function DocsPage() {
  const [activeSidebarItem, setActiveSidebarItem] = useState('quick-start');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div style={{ background: '#fff', minHeight: '100vh', fontFamily: "'Ubuntu', sans-serif" }}>
      {/* ─── DOCS NAVBAR ─── */}
      <nav
        id="docs-nav"
        style={{
          height: '52px',
          background: '#fff',
          borderBottom: '1px solid var(--lp-border)',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          padding: '0 28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Left: Hamburger + Logo + Search */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Hamburger — visible on mobile */}
          <button
            id="docs-hamburger"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              flexShrink: 0,
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--lp-text)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {sidebarOpen ? (
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
          <Link
            to="/"
            style={{
              fontWeight: 700,
              fontSize: '15px',
              color: 'var(--lp-text)',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              whiteSpace: 'nowrap',
            }}
          >
            Promptly Docs
          </Link>
          {/* Search — hidden on mobile */}
          <div
            id="docs-search"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'var(--lp-bg)',
              borderRadius: '8px',
              padding: '7px 14px',
              width: '220px',
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--lp-muted)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span
              style={{
                fontSize: '13px',
                color: 'var(--lp-muted)',
              }}
            >
              Search documentation...
            </span>
          </div>
        </div>

        {/* Right */}
        <div id="docs-nav-right" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Link
            to="/"
            id="docs-back-link"
            style={{
              fontSize: '13px',
              color: 'var(--lp-muted)',
              textDecoration: 'none',
              transition: 'color 0.15s ease',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => (e.target.style.color = 'var(--lp-text)')}
            onMouseLeave={(e) => (e.target.style.color = 'var(--lp-muted)')}
          >
            Back to app
          </Link>
          {/* Help icon */}
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--lp-muted)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ cursor: 'pointer' }}
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </div>
      </nav>

      {/* ─── MOBILE SIDEBAR OVERLAY ─── */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed',
            top: '52px',
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.3)',
            zIndex: 90,
          }}
        />
      )}

      {/* ─── 3-COLUMN LAYOUT ─── */}
      <div
        id="docs-layout"
        style={{
          display: 'grid',
          gridTemplateColumns: '220px 1fr 200px',
          maxWidth: '1200px',
          margin: '0 auto',
          minHeight: 'calc(100vh - 52px)',
        }}
      >
        {/* ═══ LEFT SIDEBAR ═══ */}
        <aside
          id="docs-sidebar"
          style={{
            borderRight: '1px solid var(--lp-border)',
            padding: '28px 20px',
            position: 'sticky',
            top: '52px',
            height: 'calc(100vh - 52px)',
            overflowY: 'auto',
            transition: 'transform 0.25s ease',
          }}
        >
          {sidebar.map((group, gi) => (
            <div key={gi} style={{ marginBottom: '24px' }}>
              {group.section && (
                <div
                  style={{
                    fontSize: '10px',
                    fontWeight: 600,
                    color: 'var(--lp-muted)',
                    letterSpacing: '0.8px',
                    textTransform: 'uppercase',
                    marginBottom: '10px',
                  }}
                >
                  {group.section}
                </div>
              )}
              {group.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSidebarItem(item.id);
                    setSidebarOpen(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    width: '100%',
                    padding: '6px 0 6px 12px',
                    fontSize: '13px',
                    fontWeight: activeSidebarItem === item.id ? 600 : 400,
                    color:
                      activeSidebarItem === item.id
                        ? 'var(--lp-acc)'
                        : 'var(--lp-text)',
                    background: 'none',
                    border: 'none',
                    borderLeft:
                      activeSidebarItem === item.id
                        ? '2px solid var(--lp-acc)'
                        : '2px solid transparent',
                    cursor: 'pointer',
                    fontFamily: "'Ubuntu', sans-serif",
                    textAlign: 'left',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {item.label}
                  {item.badge && (
                    <span
                      style={{
                        fontSize: '9px',
                        fontWeight: 600,
                        color: '#C75B5B',
                        background: '#FFEBEE',
                        padding: '1px 5px',
                        borderRadius: '3px',
                        letterSpacing: '0.3px',
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>
          ))}
        </aside>

        {/* ═══ MAIN CONTENT ═══ */}
        <main
          id="docs-main"
          style={{
            padding: '40px 52px 80px',
            maxWidth: '700px',
          }}
        >
          {/* Title */}
          <h1
            style={{
              fontSize: '32px',
              fontWeight: 700,
              color: 'var(--lp-text)',
              marginBottom: '20px',
            }}
          >
            Quick start
          </h1>

          {/* Intro */}
          <p
            style={{
              fontSize: '15px',
              color: 'var(--lp-muted)',
              lineHeight: 1.7,
              marginBottom: '40px',
            }}
          >
            Welcome to Promptly. This guide will walk you through the core
            concepts of prompt engineering and version control, helping you
            deploy your first LLM application in minutes.
          </p>

          {/* ── Step 1 ── */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '14px',
            }}
          >
            <StepCircle n={1} />
            <h2
              style={{
                fontSize: '20px',
                fontWeight: 700,
                color: 'var(--lp-text)',
              }}
            >
              Initialize your environment
            </h2>
          </div>
          <p
            style={{
              fontSize: '14px',
              color: 'var(--lp-muted)',
              lineHeight: 1.65,
              marginBottom: '4px',
            }}
          >
            Install the CLI and authenticate with your API key to start managing
            prompts locally.
          </p>
          <CodeBlock label="TERMINAL">
{`npm install -g @promptly/cli
promptly auth login`}
          </CodeBlock>

          {/* ── Step 2 ── */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginTop: '44px',
              marginBottom: '14px',
            }}
          >
            <StepCircle n={2} />
            <h2
              style={{
                fontSize: '20px',
                fontWeight: 700,
                color: 'var(--lp-text)',
              }}
            >
              Sync your first prompt
            </h2>
          </div>
          <p
            style={{
              fontSize: '14px',
              color: 'var(--lp-muted)',
              lineHeight: 1.65,
            }}
          >
            Retrieve a versioned prompt from the Archive using our SDK. Use the{' '}
            <MethodBadge method="GET" /> endpoint for direct retrieval.
          </p>
          <CodeBlock label="TYPESCRIPT">
{`import { Promptly } from '@promptly/sdk';

const client = new Promptly({ apiKey: 'PROMPTLY_SECRET' });
const prompt = await client.prompts.get('welcome-email-v1');

console.log(prompt.content);`}
          </CodeBlock>

          {/* ── Step 3 ── */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginTop: '44px',
              marginBottom: '14px',
            }}
          >
            <StepCircle n={3} />
            <h2
              style={{
                fontSize: '20px',
                fontWeight: 700,
                color: 'var(--lp-text)',
              }}
            >
              Test with variables
            </h2>
          </div>
          <p
            style={{
              fontSize: '14px',
              color: 'var(--lp-muted)',
              lineHeight: 1.65,
            }}
          >
            Send a <MethodBadge method="POST" /> request to evaluate a prompt
            with dynamic user data.
          </p>
          <CodeBlock label="CURL">
{`curl -X POST https://api.promptly.sh/v1/eval \\
  -H "Authorization: Bearer $API_KEY" \\
  -d '{ "slug": "welcome-email", "inputs": { "name": "Alice" } }'`}
          </CodeBlock>

          <Callout type="attention">
            Remember that <MethodBadge method="DELETE" /> operations are
            permanent and cannot be undone via the API.
          </Callout>

          {/* ── Next Chapter ── */}
          <div
            style={{
              marginTop: '60px',
              border: '1px solid var(--lp-border)',
              borderRadius: '10px',
              padding: '24px 28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.borderColor = 'rgba(100,80,60,0.35)')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.borderColor = 'var(--lp-border)')
            }
          >
            <div>
              <div
                style={{
                  fontSize: '10px',
                  fontWeight: 600,
                  color: 'var(--lp-muted)',
                  letterSpacing: '0.8px',
                  textTransform: 'uppercase',
                  marginBottom: '4px',
                }}
              >
                NEXT CHAPTER
              </div>
              <div
                style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: 'var(--lp-text)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                Creating your first prompt →
              </div>
            </div>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--lp-acc)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </div>
        </main>

        {/* ═══ RIGHT SIDEBAR — On This Page ═══ */}
        <aside
          id="docs-on-this-page"
          style={{
            padding: '40px 16px 28px',
            position: 'sticky',
            top: '52px',
            height: 'calc(100vh - 52px)',
            overflowY: 'auto',
          }}
        >
          <div
            style={{
              fontSize: '10px',
              fontWeight: 600,
              color: 'var(--lp-muted)',
              letterSpacing: '0.8px',
              textTransform: 'uppercase',
              marginBottom: '14px',
            }}
          >
            ON THIS PAGE
          </div>
          {onThisPage.map((item) => (
            <div
              key={item.id}
              style={{
                fontSize: '12px',
                color: item.active ? 'var(--lp-text)' : 'var(--lp-muted)',
                fontWeight: item.active ? 600 : 400,
                padding: '5px 0 5px 12px',
                borderLeft: item.active
                  ? '2px solid var(--lp-acc)'
                  : '2px solid transparent',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {item.label}
            </div>
          ))}
        </aside>
      </div>

      {/* ─── Responsive ─── */}
      <style>{`
        /* Tablet: hide right TOC sidebar */
        @media (max-width: 1024px) {
          #docs-layout {
            grid-template-columns: 220px 1fr !important;
          }
          #docs-on-this-page {
            display: none !important;
          }
        }

        /* Mobile: full responsive */
        @media (max-width: 768px) {
          #docs-hamburger {
            display: flex !important;
          }
          #docs-search {
            display: none !important;
          }
          #docs-nav {
            padding: 0 16px !important;
          }
          #docs-layout {
            grid-template-columns: 1fr !important;
          }
          #docs-sidebar {
            position: fixed !important;
            top: 52px !important;
            left: 0 !important;
            width: 260px !important;
            height: calc(100vh - 52px) !important;
            background: #fff !important;
            z-index: 95 !important;
            border-right: 1px solid var(--lp-border) !important;
            transform: translateX(${sidebarOpen ? '0' : '-100%'}) !important;
            box-shadow: ${sidebarOpen ? '4px 0 24px rgba(0,0,0,0.08)' : 'none'} !important;
          }
          #docs-on-this-page {
            display: none !important;
          }
          #docs-main {
            padding: 28px 20px 60px !important;
            max-width: 100% !important;
          }
        }

        /* Small mobile */
        @media (max-width: 480px) {
          #docs-main h1 {
            font-size: 24px !important;
          }
          #docs-main h2 {
            font-size: 17px !important;
          }
          #docs-main pre {
            font-size: 11px !important;
            white-space: pre-wrap !important;
            word-break: break-all !important;
          }
          #docs-nav {
            padding: 0 12px !important;
          }
        }
      `}</style>
    </div>
  );
}
