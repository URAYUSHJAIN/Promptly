import { useUser, useClerk } from '@clerk/react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const NAV_ITEMS = [
  { id: 'overview', label: 'Overview', icon: <GridIcon />, path: '/dashboard' },
  { id: 'prompts', label: 'Prompts', icon: <PromptIcon />, path: '/dashboard/prompts' },
  { id: 'experiments', label: 'Experiments', icon: <ExperimentIcon />, path: '/dashboard/experiments' },
  { id: 'analytics', label: 'Analytics', icon: <AnalyticsIcon />, path: '/dashboard/analytics' },
];

const NAV_BOTTOM = [
  { id: 'team', label: 'Team', icon: <TeamIcon />, path: '/dashboard/team' },
  { id: 'settings', label: 'Settings', icon: <SettingsIcon />, path: '/dashboard/settings' },
];

const EXPERIMENTS = [
  { name: 'Tone Consistency Test', id: 'exp_001', type: 'A/B TEST', status: 'RUNNING', progress: 65, variantA: 'Professional', variantB: 'Friendly', winner: null, date: 'Mar 12, 2024' },
  { name: 'Conciseness Optimizer', id: 'exp_002', type: 'OPTIMIZATION', status: 'COMPLETED', progress: 100, variantA: 'Short', variantB: 'Ultra-Short', winner: 'Variant A', date: 'Mar 08, 2024' },
  { name: 'Reasoning Step-by-Step', id: 'exp_003', type: 'A/B TEST', status: 'PAUSED', progress: 42, variantA: 'CoT Enabled', variantB: 'Standard', winner: null, date: 'Mar 05, 2024' },
];

export default function ExperimentsPage() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [promptA, setPromptA] = useState("Write a professional response to a customer who is unhappy about a delay in their order.");
  const [promptB, setPromptB] = useState("Explain to a customer that their order is late and offer a 10% discount in a friendly, apologetic tone.");
  const activeNav = 'experiments';

  const firstName = user?.firstName || user?.username || user?.emailAddresses?.[0]?.emailAddress?.split('@')[0] || 'there';
  const initials = (user?.firstName?.[0] || '') + (user?.lastName?.[0] || '') || firstName[0]?.toUpperCase() || 'U';

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: "'Ubuntu', sans-serif", background: '#F7F5F2', overflow: 'hidden' }}>

      {/* ═══ SIDEBAR ═══ */}
      <aside style={{ width: '200px', flexShrink: 0, background: '#1C1410', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '28px 0 20px' }}>
        <div>
          <div style={{ padding: '0 20px 28px' }}>
            <div style={{ fontSize: '18px', fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.3px', cursor: 'pointer' }} onClick={() => navigate('/dashboard')}>Promptly</div>
            <div style={{ fontSize: '10px', color: 'rgba(200,168,130,0.5)', letterSpacing: '0.5px', marginTop: '2px' }}>v1.0.4</div>
          </div>

          <nav>
            {NAV_ITEMS.map((item) => (
              <button key={item.id} onClick={() => navigate(item.path)}
                style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', padding: '10px 20px', border: 'none', cursor: 'pointer', fontFamily: "'Ubuntu', sans-serif", fontSize: '13px', fontWeight: activeNav === item.id ? 600 : 400, color: activeNav === item.id ? '#FFFFFF' : 'rgba(255,255,255,0.45)', background: activeNav === item.id ? 'rgba(200,168,130,0.12)' : 'transparent', borderLeft: activeNav === item.id ? '2px solid #C8A882' : '2px solid transparent', transition: 'all 0.15s ease' }}>
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div>
          <nav style={{ marginBottom: '16px' }}>
            {NAV_BOTTOM.map((item) => (
              <button key={item.id} onClick={() => navigate(item.path)}
                style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', padding: '10px 20px', border: 'none', cursor: 'pointer', fontFamily: "'Ubuntu', sans-serif", fontSize: '13px', fontWeight: activeNav === item.id ? 600 : 400, color: activeNav === item.id ? '#FFFFFF' : 'rgba(255,255,255,0.45)', background: activeNav === item.id ? 'rgba(200,168,130,0.12)' : 'transparent', borderLeft: activeNav === item.id ? '2px solid #C8A882' : '2px solid transparent', transition: 'all 0.15s ease' }}>
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>

          <div style={{ padding: '0 16px' }}>
            <button
              style={{ width: '100%', padding: '10px', background: 'rgba(200,168,130,0.1)', border: '1px solid rgba(200,168,130,0.2)', borderRadius: '8px', color: 'rgba(200,168,130,0.9)', fontSize: '11px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer', fontFamily: "'Ubuntu', sans-serif", transition: 'all 0.15s ease' }}>
              New Experiment
            </button>
          </div>
        </div>
      </aside>

      {/* ═══ MAIN CONTENT ═══ */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* ─ Top bar ─ */}
        <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px', height: '56px', background: '#FAFAF9', borderBottom: '1px solid rgba(100,80,60,0.08)', flexShrink: 0 }}>
          <div />
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ position: 'relative' }}>
              <button onClick={() => setShowNotifications(!showNotifications)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B5C4E', display: 'flex', padding: '4px', position: 'relative' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
                <span style={{ position: 'absolute', top: '2px', right: '2px', width: '7px', height: '7px', borderRadius: '50%', background: '#dc2626' }} />
              </button>
              {showNotifications && <NotificationPanel onClose={() => setShowNotifications(false)} />}
            </div>

            <div style={{ position: 'relative' }}>
              <button onClick={() => setShowUserMenu(!showUserMenu)}
                style={{ width: '34px', height: '34px', borderRadius: '50%', background: '#1C1410', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                {user?.imageUrl
                  ? <img src={user.imageUrl} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : <span style={{ fontSize: '12px', fontWeight: 700, color: '#C8A882', fontFamily: "'Ubuntu', sans-serif" }}>{initials}</span>}
              </button>

              {showUserMenu && (
                <div style={{ position: 'absolute', right: 0, top: '42px', background: '#FFFFFF', border: '1px solid rgba(100,80,60,0.12)', borderRadius: '10px', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', minWidth: '180px', zIndex: 50, overflow: 'hidden' }}>
                  <div style={{ padding: '12px 14px', borderBottom: '1px solid rgba(100,80,60,0.08)' }}>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#1C1410' }}>{user?.fullName || firstName}</div>
                    <div style={{ fontSize: '11px', color: '#6B5C4E', marginTop: '2px' }}>{user?.emailAddresses?.[0]?.emailAddress}</div>
                  </div>
                  <button onClick={handleSignOut}
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', padding: '10px 14px', border: 'none', background: 'none', cursor: 'pointer', fontSize: '13px', color: '#dc2626', fontFamily: "'Ubuntu', sans-serif", textAlign: 'left' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* ─ Scrollable body ─ */}
        <main style={{ flex: 1, overflow: 'auto', padding: '40px 60px' }}>
          
          {!isCreating ? (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
                <div>
                  <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#1C1410', letterSpacing: '-0.5px', marginBottom: '8px' }}>Experiments</h1>
                  <p style={{ fontSize: '15px', color: '#6B5C4E' }}>Optimize your prompts with A/B testing and algorithmic tuning.</p>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                   <button style={{ background: '#FFFFFF', color: '#1C1410', border: '1px solid rgba(100,80,60,0.15)', borderRadius: '8px', padding: '10px 20px', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>
                    View Archive
                  </button>
                  <button 
                    onClick={() => setIsCreating(true)}
                    style={{ background: '#C8A882', color: '#FFFFFF', border: 'none', borderRadius: '8px', padding: '10px 20px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    Start A/B Test <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 15h2M8 15h0M16 15h0M7 9l5-5 5 5M12 4v12" /></svg>
                  </button>
                </div>
              </div>

              {/* Quick Stats Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '32px' }}>
                <div style={{ background: '#FFFFFF', borderRadius: '12px', padding: '24px', border: '1px solid rgba(100,80,60,0.08)' }}>
                  <div style={{ fontSize: '12px', color: '#6B5C4E', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Active Experiments</div>
                  <div style={{ fontSize: '32px', fontWeight: 800, color: '#1C1410', marginTop: '8px' }}>12</div>
                  <div style={{ fontSize: '13px', color: '#16a34a', marginTop: '4px' }}>↑ 2 from last week</div>
                </div>
                <div style={{ background: '#FFFFFF', borderRadius: '12px', padding: '24px', border: '1px solid rgba(100,80,60,0.08)' }}>
                  <div style={{ fontSize: '12px', color: '#6B5C4E', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Avg. Improvement</div>
                  <div style={{ fontSize: '32px', fontWeight: 800, color: '#1C1410', marginTop: '8px' }}>18.4%</div>
                  <div style={{ fontSize: '13px', color: '#6B5C4E', marginTop: '4px' }}>Across all A/B tests</div>
                </div>
                <div style={{ background: '#FFFFFF', borderRadius: '12px', padding: '24px', border: '1px solid rgba(100,80,60,0.08)' }}>
                  <div style={{ fontSize: '12px', color: '#6B5C4E', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Tokens Evaluated</div>
                  <div style={{ fontSize: '32px', fontWeight: 800, color: '#1C1410', marginTop: '8px' }}>1.2M</div>
                  <div style={{ fontSize: '13px', color: '#6B5C4E', marginTop: '4px' }}>This billing cycle</div>
                </div>
              </div>

              {/* Experiments List */}
              <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#1C1410', marginBottom: '16px' }}>Current Experiments</h2>
              <div style={{ display: 'grid', gap: '16px' }}>
                {EXPERIMENTS.map((exp) => (
                  <div key={exp.id} style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid rgba(100,80,60,0.08)', padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1C1410' }}>{exp.name}</h3>
                        <span style={{ fontSize: '10px', fontWeight: 800, background: '#F7F5F2', color: '#6B5C4E', padding: '2px 6px', borderRadius: '4px' }}>{exp.type}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', color: '#6B5C4E', fontSize: '13px' }}>
                        <span>ID: {exp.id}</span>
                        <span>Started: {exp.date}</span>
                      </div>
                      <div style={{ marginTop: '16px', maxWidth: '300px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#1C1410', fontWeight: 600, marginBottom: '6px' }}>
                          <span>Progress</span>
                          <span>{exp.progress}%</span>
                        </div>
                        <div style={{ height: '6px', background: '#F0EBE5', borderRadius: '10px', overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${exp.progress}%`, background: '#C8A882', borderRadius: '10px' }} />
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '40px', padding: '0 40px', borderLeft: '1px solid rgba(100,80,60,0.05)', borderRight: '1px solid rgba(100,80,60,0.05)' }}>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '11px', fontWeight: 700, color: '#A89E94', textTransform: 'uppercase', marginBottom: '4px' }}>Variant A</div>
                        <div style={{ fontSize: '14px', fontWeight: 600, color: '#1C1410' }}>{exp.variantA}</div>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '11px', fontWeight: 700, color: '#A89E94', textTransform: 'uppercase', marginBottom: '4px' }}>Variant B</div>
                        <div style={{ fontSize: '14px', fontWeight: 600, color: '#1C1410' }}>{exp.variantB}</div>
                      </div>
                    </div>
                    <div style={{ paddingLeft: '40px', minWidth: '150px' }}>
                      <div style={{ fontSize: '11px', fontWeight: 700, color: '#A89E94', textTransform: 'uppercase', marginBottom: '4px' }}>Status</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: exp.status === 'RUNNING' ? '#16a34a' : exp.status === 'COMPLETED' ? '#C8A882' : '#6B5C4E' }} />
                        <span style={{ fontSize: '14px', fontWeight: 700, color: '#1C1410' }}>{exp.status}</span>
                      </div>
                      {exp.winner && (
                        <div style={{ marginTop: '4px', fontSize: '12px', color: '#16a34a', fontWeight: 600 }}>Winner: {exp.winner}</div>
                      )}
                    </div>
                    <button style={{ marginLeft: '24px', background: 'none', border: '1px solid rgba(100,80,60,0.15)', borderRadius: '8px', padding: '8px 16px', fontSize: '13px', fontWeight: 600, color: '#1C1410', cursor: 'pointer' }}>
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                 <div>
                   <button onClick={() => setIsCreating(false)} style={{ background: 'none', border: 'none', color: '#6B5C4E', fontSize: '14px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '12px' }}>
                     ← Back to Experiments
                   </button>
                   <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#1C1410' }}>New A/B Test</h1>
                 </div>
                 <button style={{ background: '#1C1410', color: '#FFFFFF', border: 'none', borderRadius: '8px', padding: '12px 24px', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}>
                   Run Comparison
                 </button>
              </div>

              <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                {/* Variant A */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid rgba(100,80,60,0.1)', padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <span style={{ background: '#EDE8E3', color: '#1C1410', fontSize: '11px', fontWeight: 800, padding: '4px 10px', borderRadius: '6px' }}>VARIANT A</span>
                      <button style={{ color: '#C8A882', background: 'none', border: 'none', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Pick winner</button>
                    </div>
                    <label style={{ fontSize: '13px', fontWeight: 700, color: '#6B5C4E', marginBottom: '8px' }}>PROMPT</label>
                    <textarea 
                      value={promptA}
                      onChange={(e) => setPromptA(e.target.value)}
                      style={{ flex: 1, background: '#FAFAF9', border: '1px solid rgba(100,80,60,0.08)', borderRadius: '10px', padding: '16px', fontSize: '14px', color: '#1C1410', outline: 'none', fontFamily: 'monospace', lineHeight: 1.6, resize: 'none' }}
                     />
                  </div>
                  <div style={{ background: '#F2E8DB', borderRadius: '12px', padding: '20px', minHeight: '150px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#9A7355', marginBottom: '8px' }}>OUTPUT PREVIEW</div>
                    <p style={{ fontSize: '13px', color: '#1C1410', lineHeight: 1.5 }}>
                      "We deeply value your patience and sincerely apologize for the delay. Our team is working around the clock to ensure your order arrives as quickly as possible..."
                    </p>
                  </div>
                </div>

                {/* Variant B */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid rgba(100,80,60,0.1)', padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <span style={{ background: '#DBC3A8', color: '#1C1410', fontSize: '11px', fontWeight: 800, padding: '4px 10px', borderRadius: '6px' }}>VARIANT B</span>
                      <button style={{ color: '#C8A882', background: 'none', border: 'none', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Pick winner</button>
                    </div>
                    <label style={{ fontSize: '13px', fontWeight: 700, color: '#6B5C4E', marginBottom: '8px' }}>PROMPT</label>
                    <textarea 
                      value={promptB}
                      onChange={(e) => setPromptB(e.target.value)}
                      style={{ flex: 1, background: '#FAFAF9', border: '1px solid rgba(100,80,60,0.08)', borderRadius: '10px', padding: '16px', fontSize: '14px', color: '#1C1410', outline: 'none', fontFamily: 'monospace', lineHeight: 1.6, resize: 'none' }}
                     />
                  </div>
                  <div style={{ background: '#F2E8DB', borderRadius: '12px', padding: '20px', minHeight: '150px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#9A7355', marginBottom: '8px' }}>OUTPUT PREVIEW</div>
                    <p style={{ fontSize: '13px', color: '#1C1410', lineHeight: 1.5 }}>
                      "Oops! We're so sorry but your order is taking a bit longer than expected. To make it up to you, here's 10% off your next purchase! Use code LATE10 at checkout..."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {(showUserMenu || showNotifications) && <div style={{ position: 'fixed', inset: 0, zIndex: 40 }} onClick={() => { setShowUserMenu(false); setShowNotifications(false); }} />}
    </div>
  );
}

/* ── Notification Panel (Glassmorphism) ── */
const NOTIFICATIONS = [
  { id: 1, title: 'Experiment completed', desc: 'Conciseness Optimizer finished with 18% improvement.', time: '2 min ago', icon: '🧪', unread: true },
  { id: 2, title: 'New team member', desc: 'Riya Sharma accepted your invite.', time: '1 hour ago', icon: '👤', unread: true },
  { id: 3, title: 'Prompt deployed', desc: 'Customer Support v4 is now live in production.', time: '3 hours ago', icon: '🚀', unread: false },
  { id: 4, title: 'Usage alert', desc: "You've used 80% of your monthly token quota.", time: 'Yesterday', icon: '⚠️', unread: false },
];
function NotificationPanel({ onClose }) {
  return (
    <div style={{ position: 'absolute', right: 0, top: '42px', width: '360px', zIndex: 50, borderRadius: '16px', overflow: 'hidden', background: 'rgba(255,255,255,0.55)', backdropFilter: 'blur(24px) saturate(180%)', WebkitBackdropFilter: 'blur(24px) saturate(180%)', border: '1px solid rgba(255,255,255,0.35)', boxShadow: '0 16px 48px rgba(28,20,16,0.15), 0 0 0 1px rgba(200,168,130,0.08) inset' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 20px 14px', borderBottom: '1px solid rgba(200,168,130,0.12)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '15px', fontWeight: 700, color: '#1C1410' }}>Notifications</span>
          <span style={{ background: 'rgba(220,38,38,0.1)', color: '#dc2626', fontSize: '11px', fontWeight: 700, padding: '2px 7px', borderRadius: '10px' }}>2 new</span>
        </div>
        <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#A89E94', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}>Mark all read</button>
      </div>
      <div style={{ maxHeight: '340px', overflowY: 'auto' }}>
        {NOTIFICATIONS.map((n) => (
          <div key={n.id} style={{ display: 'flex', gap: '12px', padding: '14px 20px', borderBottom: '1px solid rgba(200,168,130,0.06)', cursor: 'pointer', background: n.unread ? 'rgba(200,168,130,0.06)' : 'transparent', transition: 'background 0.15s' }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(200,168,130,0.1)'}
            onMouseLeave={(e) => e.currentTarget.style.background = n.unread ? 'rgba(200,168,130,0.06)' : 'transparent'}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(200,168,130,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>{n.icon}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#1C1410' }}>{n.title}</span>
                {n.unread && <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#C8A882', flexShrink: 0 }} />}
              </div>
              <p style={{ fontSize: '12px', color: '#6B5C4E', lineHeight: 1.4, marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{n.desc}</p>
              <span style={{ fontSize: '11px', color: '#A89E94', marginTop: '4px', display: 'block' }}>{n.time}</span>
            </div>
          </div>
        ))}
      </div>
      <div style={{ padding: '12px 20px', borderTop: '1px solid rgba(200,168,130,0.12)', textAlign: 'center' }}>
        <button style={{ background: 'none', border: 'none', color: '#C8A882', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>View all notifications →</button>
      </div>
    </div>
  );
}

/* ── Icons ── */
function GridIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>; }
function PromptIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>; }
function ExperimentIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v11l-4 4h14l-4-4V3" /></svg>; }
function AnalyticsIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>; }
function TeamIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>; }
function SettingsIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>; }
