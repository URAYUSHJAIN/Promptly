import { useState } from 'react';
import useReveal from '../../hooks/useReveal';

/* ─── Line number helper ─── */
function LineNo({ n }) {
  return (
    <span
      style={{
        color: 'rgba(255,255,255,0.12)',
        marginRight: 20,
        userSelect: 'none',
        display: 'inline-block',
        minWidth: 16,
        textAlign: 'right',
      }}
    >
      {n}
    </span>
  );
}

/* ─── Diff lines data ─── */
const diffLines = [
  { type: 'meta', text: '@@ -1,9 +1,12 @@ prompt/customer-onboarding.yaml' },
  { type: 'neutral', text: '  system_prompt: |' },
  { type: 'removed', text: '- You are an assistant. Help the user.' },
  { type: 'added', text: '+ You are a professional writing assistant' },
  { type: 'added', text: '+ specializing in high-converting copy.' },
  { type: 'added', text: '+ Always match the brand voice provided.' },
  { type: 'neutral', text: '' },
  { type: 'neutral', text: '  user_prompt: >' },
  { type: 'removed', text: '- {{input}}' },
  { type: 'added', text: '+ Rewrite {{input}} for clarity and' },
  { type: 'added', text: '+ emotional impact. Focus on: {{goals}}' },
  { type: 'neutral', text: '' },
  { type: 'removed', text: '- temperature: 0.9' },
  { type: 'added', text: '+ temperature: 0.7' },
  { type: 'removed', text: '- model: gpt-3.5-turbo' },
  { type: 'added', text: '+ model: mistral-7b' },
  { type: 'added', text: '+ max_tokens: 800' },
];

const beforeLines = [
  'system_prompt: |',
  '  You are an assistant. Help the',
  '  user with their request.',
  '',
  'user_prompt: >',
  '  {{input}}',
  '',
  'temperature: 0.9',
  'model: gpt-3.5-turbo',
];

const afterLines = [
  'system_prompt: |',
  '  You are a professional writing assistant',
  '  specializing in high-converting copy.',
  '  Always match the brand voice provided.',
  '',
  'user_prompt: >',
  '  Rewrite {{input}} for clarity and',
  '  emotional impact. Focus on: {{goals}}',
  '',
  'temperature: 0.7',
  'model: mistral-7b',
  'max_tokens: 800',
];

export default function Problem() {
  const sectionRef = useReveal(0.1);
  const [open, setOpen] = useState('solution');
  const [activeTab, setActiveTab] = useState('diff');

  return (
    <section
      ref={sectionRef}
      style={{
        background: 'var(--lp-dark)',
        padding: '80px 32px',
      }}
    >
      <div
        id="problem-grid"
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '60px',
          alignItems: 'center',
        }}
      >
        {/* ═══ LEFT COLUMN ═══ */}
        <div className="reveal reveal-left">
          {/* Micro label */}
          <div
            style={{
              fontSize: '10px',
              textTransform: 'uppercase',
              color: 'var(--lp-acc)',
              letterSpacing: '1px',
              marginBottom: '16px',
            }}
          >
            THE SHIFT
          </div>

          {/* H2 */}
          <h2
            style={{
              fontSize: '36px',
              fontWeight: 700,
              color: 'white',
              lineHeight: 1.2,
              marginBottom: '32px',
            }}
          >
            Stop treating prompts like static text.
          </h2>

          {/* ── Accordion: The Problem ── */}
          <div
            onClick={() => setOpen(open === 'problem' ? null : 'problem')}
            style={{ cursor: 'pointer', userSelect: 'none' }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: open === 'problem' ? '10px' : '0',
              }}
            >
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background:
                    open === 'problem'
                      ? '#E8645A'
                      : 'rgba(232,100,90,0.4)',
                  transition: 'background 0.2s ease',
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontSize: '15px',
                  fontWeight: open === 'problem' ? 600 : 400,
                  color:
                    open === 'problem'
                      ? 'white'
                      : 'rgba(255,255,255,0.5)',
                  transition: 'all 0.2s ease',
                }}
              >
                The Problem
              </span>
              <svg
                style={{
                  marginLeft: 'auto',
                  transform:
                    open === 'problem'
                      ? 'rotate(180deg)'
                      : 'rotate(0deg)',
                  transition:
                    'transform 0.3s cubic-bezier(0.16,1,0.3,1)',
                  opacity: 0.4,
                }}
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                stroke="white"
                strokeWidth="1.5"
              >
                <path d="M4 6l4 4 4-4" strokeLinecap="round" />
              </svg>
            </div>

            <div
              style={{
                maxHeight: open === 'problem' ? '300px' : '0px',
                overflow: 'hidden',
                transition:
                  'max-height 0.4s cubic-bezier(0.16,1,0.3,1)',
                paddingLeft: '18px',
              }}
            >
              <div
                style={{
                  fontSize: '13px',
                  color: 'rgba(255,255,255,0.45)',
                  lineHeight: 1.7,
                  paddingBottom: '16px',
                  borderLeft: '1px solid rgba(255,255,255,0.08)',
                  paddingLeft: '14px',
                }}
              >
                Prompts live in Notion docs, Slack threads, and someone's
                local .txt file. No history. No collaboration. No rollback
                when outputs break in production.
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  paddingLeft: '14px',
                  paddingBottom: '8px',
                }}
              >
                {[
                  'No version history or audit trail',
                  'Cannot rollback a broken prompt',
                  'Zero collaboration across teams',
                  'No way to A/B test variants',
                ].map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '12px',
                      color: 'rgba(255,255,255,0.35)',
                    }}
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="#E8645A"
                      strokeWidth="2"
                    >
                      <path
                        d="M4 4l8 8M12 4l-8 8"
                        strokeLinecap="round"
                      />
                    </svg>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div
            style={{
              height: '1px',
              background: 'rgba(255,255,255,0.06)',
              margin: '16px 0',
            }}
          />

          {/* ── Accordion: With Promptly ── */}
          <div
            onClick={() =>
              setOpen(open === 'solution' ? null : 'solution')
            }
            style={{ cursor: 'pointer', userSelect: 'none' }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: open === 'solution' ? '10px' : '0',
              }}
            >
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background:
                    open === 'solution'
                      ? '#4CAF7D'
                      : 'rgba(76,175,125,0.4)',
                  transition: 'background 0.2s ease',
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontSize: '15px',
                  fontWeight: open === 'solution' ? 600 : 400,
                  color:
                    open === 'solution'
                      ? 'var(--lp-acc)'
                      : 'rgba(255,255,255,0.5)',
                  transition: 'all 0.2s ease',
                }}
              >
                With Promptly
              </span>
              <svg
                style={{
                  marginLeft: 'auto',
                  transform:
                    open === 'solution'
                      ? 'rotate(180deg)'
                      : 'rotate(0deg)',
                  transition:
                    'transform 0.3s cubic-bezier(0.16,1,0.3,1)',
                  opacity: 0.4,
                }}
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                stroke="white"
                strokeWidth="1.5"
              >
                <path d="M4 6l4 4 4-4" strokeLinecap="round" />
              </svg>
            </div>

            <div
              style={{
                maxHeight: open === 'solution' ? '300px' : '0px',
                overflow: 'hidden',
                transition:
                  'max-height 0.4s cubic-bezier(0.16,1,0.3,1)',
                paddingLeft: '18px',
              }}
            >
              <div
                style={{
                  fontSize: '13px',
                  color: 'rgba(255,255,255,0.45)',
                  lineHeight: 1.7,
                  paddingBottom: '16px',
                  borderLeft: '1px solid rgba(255,255,255,0.08)',
                  paddingLeft: '14px',
                }}
              >
                Full audit trail, instant rollback, and collaborative
                version control — built for LLM workflows.
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  paddingLeft: '14px',
                  paddingBottom: '8px',
                }}
              >
                {[
                  'Full version history + diff view',
                  'One-click rollback to any version',
                  'Team collaboration with role access',
                  'Automated A/B testing + AI scoring',
                ].map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '12px',
                      color: 'rgba(255,255,255,0.5)',
                      animation: open === 'solution'
                        ? `fadeUp 0.4s ease ${i * 0.08}s both`
                        : 'none',
                    }}
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="#4CAF7D"
                      strokeWidth="2.5"
                    >
                      <path
                        d="M3 8l3.5 3.5L13 4.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ═══ RIGHT COLUMN — Code Diff Visualization ═══ */}
        <div
          className="reveal reveal-right reveal-delay-2"
          style={{
            background: '#161210',
            borderRadius: '14px',
            border: '1px solid rgba(255,255,255,0.07)',
            overflow: 'hidden',
            height: '380px',
            position: 'relative',
          }}
        >
          {/* Tab bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              padding: '0 16px',
              height: '42px',
            }}
          >
            {/* 3 dots */}
            <div
              style={{
                display: 'flex',
                gap: '6px',
                marginRight: '16px',
              }}
            >
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#3A2E2A',
                  }}
                />
              ))}
            </div>

            {/* Tabs */}
            {['diff', 'before', 'after'].map((tab) => (
              <button
                key={tab}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveTab(tab);
                }}
                style={{
                  fontFamily: "'Ubuntu Mono', monospace",
                  fontSize: '11px',
                  padding: '4px 12px',
                  borderRadius: '5px',
                  border: 'none',
                  cursor: 'pointer',
                  marginRight: '4px',
                  background:
                    activeTab === tab
                      ? 'rgba(200,168,130,0.15)'
                      : 'transparent',
                  color:
                    activeTab === tab
                      ? '#C8A882'
                      : 'rgba(255,255,255,0.25)',
                  transition: 'all 0.15s ease',
                }}
              >
                {tab === 'diff'
                  ? 'Diff view'
                  : tab === 'before'
                    ? 'v3.1'
                    : 'v4.0 ✓'}
              </button>
            ))}

            {/* Score */}
            <div
              style={{
                marginLeft: 'auto',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <div
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#4CAF7D',
                }}
              />
              <span
                style={{
                  fontSize: '10px',
                  color: 'rgba(255,255,255,0.25)',
                  fontFamily: "'Ubuntu Mono', monospace",
                }}
              >
                score: 91/100
              </span>
            </div>
          </div>

          {/* Code content */}
          <div
            style={{
              padding: '16px 20px',
              fontFamily: "'Ubuntu Mono', monospace",
              fontSize: '12px',
              lineHeight: 1.8,
              overflowY: 'auto',
              height: 'calc(100% - 42px - 36px)',
            }}
          >
            {activeTab === 'diff' && (
              <>
                <div
                  style={{
                    color: 'rgba(255,255,255,0.2)',
                    marginBottom: '8px',
                    fontSize: '11px',
                  }}
                >
                  @@ -1,9 +1,12 @@ prompt/customer-onboarding.yaml
                </div>
                {diffLines
                  .filter((l) => l.type !== 'meta')
                  .map((line, i) => {
                    let style = {
                      color: 'rgba(255,255,255,0.3)',
                      paddingLeft: '10px',
                    };
                    if (line.type === 'removed') {
                      style = {
                        background: 'rgba(232,100,90,0.12)',
                        borderLeft: '2px solid rgba(232,100,90,0.5)',
                        color: 'rgba(232,100,90,0.8)',
                        paddingLeft: '10px',
                      };
                    } else if (line.type === 'added') {
                      style = {
                        background: 'rgba(76,175,125,0.1)',
                        borderLeft:
                          '2px solid rgba(76,175,125,0.4)',
                        color: 'rgba(76,175,125,0.85)',
                        paddingLeft: '10px',
                      };
                    }
                    return (
                      <div key={i} style={{ ...style, borderRadius: '2px', marginBottom: '1px' }}>
                        <LineNo n={i + 1} />
                        {line.text || '\u00A0'}
                      </div>
                    );
                  })}
              </>
            )}

            {activeTab === 'before' &&
              beforeLines.map((line, i) => (
                <div key={i}>
                  <LineNo n={i + 1} />
                  <span style={{ color: 'rgba(255,255,255,0.45)' }}>
                    {line || '\u00A0'}
                  </span>
                </div>
              ))}

            {activeTab === 'after' &&
              afterLines.map((line, i) => (
                <div key={i}>
                  <LineNo n={i + 1} />
                  <span style={{ color: 'rgba(255,255,255,0.65)' }}>
                    {line || '\u00A0'}
                  </span>
                </div>
              ))}
          </div>

          {/* Bottom status bar */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '36px',
              borderTop: '1px solid rgba(255,255,255,0.05)',
              background: 'rgba(0,0,0,0.2)',
              display: 'flex',
              alignItems: 'center',
              padding: '0 16px',
              gap: '16px',
            }}
          >
            <span
              style={{
                fontSize: '10px',
                fontFamily: "'Ubuntu Mono', monospace",
                color: 'rgba(255,255,255,0.2)',
              }}
            >
              promptly / customer-onboarding
            </span>
            <span
              style={{
                fontSize: '10px',
                fontFamily: "'Ubuntu Mono', monospace",
                color: 'rgba(76,175,125,0.6)',
              }}
            >
              +5 additions
            </span>
            <span
              style={{
                fontSize: '10px',
                fontFamily: "'Ubuntu Mono', monospace",
                color: 'rgba(232,100,90,0.6)',
              }}
            >
              -4 deletions
            </span>
            <div
              style={{
                marginLeft: 'auto',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <div
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#4CAF7D',
                  animation: 'pulse 2s ease-in-out infinite',
                }}
              />
              <span
                style={{
                  fontSize: '10px',
                  fontFamily: "'Ubuntu Mono', monospace",
                  color: 'rgba(255,255,255,0.2)',
                }}
              >
                v4.0 active
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #problem-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
