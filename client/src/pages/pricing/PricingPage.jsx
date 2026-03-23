import { useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

const plans = [
  {
    name: 'FREE',
    monthly: 0,
    annual: 0,
    annualNote: '',
    desc: 'For individuals and students',
    features: [
      '5 active prompts',
      '10 experiments/month',
      'Community support',
      '1 workspace',
      '30-day rollback history',
    ],
    cta: 'Get started free',
    ctaStyle: 'ghost',
    popular: false,
    highlight: false,
  },
  {
    name: 'PRO',
    monthly: 799,
    annual: 649,
    annualNote: '₹649/mo billed annually',
    desc: 'For indie devs and small teams',
    features: [
      'Unlimited prompts',
      '200 experiments/month',
      'AI scoring + ranking',
      '3 workspaces',
      'Priority support',
      '90-day rollback history',
      'Custom model config',
    ],
    cta: 'Start 14-day free trial',
    ctaStyle: 'filled',
    popular: true,
    highlight: false,
  },
  {
    name: 'TEAM',
    monthly: 2499,
    annual: 1999,
    annualNote: '₹1,999/mo billed annually',
    desc: 'For growing product teams',
    features: [
      { text: 'Everything in Pro', bold: true },
      '10 workspaces',
      'SSO login',
      'Audit logs',
      '1-year rollback',
      'SLA support',
      'Dedicated onboarding',
    ],
    cta: 'Contact sales',
    ctaStyle: 'ghost',
    popular: false,
    highlight: false,
  },
];

const faqs = [
  {
    q: 'Can I switch plans later?',
    a: "Absolutely. You can upgrade, downgrade, or cancel your plan at any time from your workspace settings. Changes take effect at the start of your next billing cycle, and we'll prorate any differences.",
  },
  {
    q: 'Do you offer educational discounts?',
    a: 'Yes! We offer 50% off our Pro plan for verified students and educators. Contact us with your .edu email address to get started.',
  },
  {
    q: 'What counts as an "experiment"?',
    a: 'An experiment is a single A/B test run between two or more prompt variants. Each experiment can include multiple completions, but it counts as one experiment regardless of the number of test runs within it.',
  },
];

function CheckIcon({ accent }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke={accent ? 'var(--lp-acc)' : 'var(--lp-muted)'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flexShrink: 0, marginTop: '2px' }}
    >
      <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
      <polyline points="16 9 10.5 15 8 12.5" />
    </svg>
  );
}

function ChevronDown({ open }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--lp-muted)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        transition: 'transform 0.2s ease',
        transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
        flexShrink: 0,
      }}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function formatPrice(n) {
  return n.toLocaleString('en-IN');
}

export default function PricingPage() {
  const [billing, setBilling] = useState('monthly');
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div style={{ background: 'var(--lp-bg)', minHeight: '100vh' }}>
      <Navbar />

      {/* ===== HERO ===== */}
      <section
        style={{
          padding: '64px 32px 0',
          textAlign: 'center',
          maxWidth: '1100px',
          margin: '0 auto',
        }}
      >
        {/* Badge */}
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
          Simple, honest pricing
        </span>

        <h1
          style={{
            fontSize: '44px',
            fontWeight: 700,
            color: 'var(--lp-text)',
            lineHeight: 1.12,
            letterSpacing: '-0.5px',
            maxWidth: '560px',
            margin: '0 auto 16px',
          }}
        >
          Pay for what you use.
          <br />
          Nothing hidden.
        </h1>

        <p
          style={{
            fontSize: '15px',
            color: 'var(--lp-muted)',
            maxWidth: '480px',
            margin: '0 auto',
            lineHeight: 1.65,
          }}
        >
          All plans include unlimited prompt history and API access. No credit
          card required to explore our free tier.
        </p>

        {/* Billing Toggle */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            marginTop: '32px',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              background: '#fff',
              border: '1px solid var(--lp-border)',
              borderRadius: '8px',
              padding: '3px',
            }}
          >
            {['monthly', 'annual'].map((b) => (
              <button
                key={b}
                onClick={() => setBilling(b)}
                style={{
                  padding: '8px 20px',
                  fontSize: '13px',
                  fontWeight: 500,
                  fontFamily: "'Ubuntu', sans-serif",
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  background:
                    billing === b ? 'var(--lp-dark)' : 'transparent',
                  color: billing === b ? '#fff' : 'var(--lp-text)',
                  transition: 'all 0.15s ease',
                }}
              >
                {b === 'monthly' ? 'Monthly' : 'Annual'}
              </button>
            ))}
          </div>
          {billing === 'annual' && (
            <span
              style={{
                fontSize: '11px',
                fontWeight: 600,
                color: '#5A8C3E',
                background: 'rgba(90,140,62,0.12)',
                padding: '4px 10px',
                borderRadius: '12px',
                letterSpacing: '0.3px',
              }}
            >
              SAVE 20%
            </span>
          )}
        </div>
      </section>

      {/* ===== PRICING CARDS ===== */}
      <section
        style={{
          padding: '48px 32px 32px',
          maxWidth: '1100px',
          margin: '0 auto',
        }}
      >
        <div
          id="pricing-cards-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
            alignItems: 'start',
          }}
        >
          {plans.map((plan) => {
            const price =
              billing === 'annual' ? plan.annual : plan.monthly;
            return (
              <div
                key={plan.name}
                style={{
                  background: '#fff',
                  border: plan.popular
                    ? '2px solid var(--lp-dark)'
                    : '1px solid var(--lp-border)',
                  borderRadius: '12px',
                  padding: '32px 28px',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.15s ease',
                }}
              >
                {/* Popular badge */}
                {plan.popular && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '-1px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '10px',
                        fontWeight: 600,
                        color: 'var(--lp-acc)',
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        background: '#fff',
                        padding: '0 12px',
                        position: 'relative',
                        top: '-10px',
                        borderTop: '2px solid var(--lp-acc)',
                        paddingTop: '6px',
                      }}
                    >
                      MOST POPULAR
                    </div>
                  </div>
                )}

                {/* Plan name */}
                <div
                  style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    color: 'var(--lp-text)',
                    letterSpacing: '0.5px',
                    marginBottom: '12px',
                    marginTop: plan.popular ? '8px' : '0',
                  }}
                >
                  {plan.name}
                </div>

                {/* Price */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: '2px',
                    marginBottom: '4px',
                  }}
                >
                  <span
                    style={{
                      fontSize: '40px',
                      fontWeight: 700,
                      color: 'var(--lp-text)',
                      lineHeight: 1,
                    }}
                  >
                    ₹{formatPrice(price)}
                  </span>
                  <span
                    style={{
                      fontSize: '14px',
                      color: 'var(--lp-muted)',
                      fontWeight: 400,
                    }}
                  >
                    {' '}
                    / month
                  </span>
                </div>

                {/* Annual note */}
                {billing === 'annual' && plan.annualNote && (
                  <div
                    style={{
                      fontSize: '12px',
                      color: 'var(--lp-muted)',
                      textDecoration: 'line-through',
                      marginBottom: '4px',
                    }}
                  >
                    ₹{formatPrice(plan.monthly)}/mo billed annually
                  </div>
                )}

                {/* Desc */}
                <p
                  style={{
                    fontSize: '13px',
                    color: 'var(--lp-muted)',
                    marginBottom: '24px',
                    marginTop: '4px',
                    lineHeight: 1.5,
                  }}
                >
                  {plan.desc}
                </p>

                {/* Divider */}
                <div
                  style={{
                    height: '1px',
                    background: 'var(--lp-border)',
                    marginBottom: '20px',
                  }}
                />

                {/* Features */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    flex: 1,
                    marginBottom: '28px',
                  }}
                >
                  {plan.features.map((f, i) => {
                    const text = typeof f === 'string' ? f : f.text;
                    const bold = typeof f === 'object' && f.bold;
                    return (
                      <div
                        key={i}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '10px',
                        }}
                      >
                        <CheckIcon accent={plan.popular} />
                        <span
                          style={{
                            fontSize: '13px',
                            color: 'var(--lp-text)',
                            fontWeight: bold ? 600 : 400,
                            lineHeight: 1.4,
                          }}
                        >
                          {text}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* CTA Button */}
                <button
                  style={{
                    width: '100%',
                    padding: '12px 20px',
                    fontSize: '13px',
                    fontWeight: 500,
                    fontFamily: "'Ubuntu', sans-serif",
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    ...(plan.ctaStyle === 'filled'
                      ? {
                          background: 'var(--lp-dark)',
                          color: '#fff',
                          border: 'none',
                        }
                      : {
                          background: '#fff',
                          color: 'var(--lp-text)',
                          border: '1px solid var(--lp-border)',
                        }),
                  }}
                  onMouseEnter={(e) => {
                    if (plan.ctaStyle === 'filled') {
                      e.currentTarget.style.background = 'var(--lp-dark2)';
                    } else {
                      e.currentTarget.style.borderColor =
                        'rgba(100,80,60,0.4)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (plan.ctaStyle === 'filled') {
                      e.currentTarget.style.background = 'var(--lp-dark)';
                    } else {
                      e.currentTarget.style.borderColor =
                        'var(--lp-border)';
                    }
                  }}
                >
                  {plan.cta}
                </button>
              </div>
            );
          })}
        </div>

        {/* Compare link */}
        <div
          style={{
            textAlign: 'center',
            marginTop: '40px',
          }}
        >
          <button
            style={{
              fontSize: '13px',
              fontWeight: 500,
              color: 'var(--lp-text)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: "'Ubuntu', sans-serif",
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              textDecoration: 'underline',
              textUnderlineOffset: '3px',
            }}
          >
            Compare all features
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--lp-text)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section
        style={{
          padding: '32px 32px 48px',
          maxWidth: '760px',
          margin: '0 auto',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          {faqs.map((faq, i) => {
            const isOpen = openFaq === i;
            return (
              <div
                key={i}
                style={{
                  background: '#fff',
                  border: '1px solid var(--lp-border)',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  transition: 'all 0.15s ease',
                }}
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  style={{
                    width: '100%',
                    padding: '18px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: "'Ubuntu', sans-serif",
                    textAlign: 'left',
                  }}
                >
                  <span
                    style={{
                      fontSize: '14px',
                      fontWeight: 600,
                      color: 'var(--lp-text)',
                    }}
                  >
                    {faq.q}
                  </span>
                  <ChevronDown open={isOpen} />
                </button>
                <div
                  style={{
                    maxHeight: isOpen ? '200px' : '0',
                    overflow: 'hidden',
                    transition: 'max-height 0.25s ease',
                  }}
                >
                  <p
                    style={{
                      padding: '0 24px 18px',
                      fontSize: '13px',
                      color: 'var(--lp-muted)',
                      lineHeight: 1.65,
                    }}
                  >
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ===== BOTTOM NOTE ===== */}
      <div
        style={{
          textAlign: 'center',
          padding: '0 32px 40px',
          fontSize: '11px',
          color: 'var(--lp-muted)',
        }}
      >
        All prices in INR ₹. GST applicable at checkout. Promptly is a
        registered trademark.
      </div>

      <Footer />

      {/* Responsive */}
      <style>{`
        @media (max-width: 768px) {
          #pricing-cards-grid {
            grid-template-columns: 1fr !important;
            max-width: 420px;
            margin: 0 auto;
          }
        }
      `}</style>
    </div>
  );
}
