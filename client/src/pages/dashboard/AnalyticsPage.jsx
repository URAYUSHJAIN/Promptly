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

export default function AnalyticsPage() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const activeNav = 'analytics';

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
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
            <div>
              <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#1C1410', letterSpacing: '-0.5px', marginBottom: '8px' }}>Analytics</h1>
              <p style={{ fontSize: '15px', color: '#6B5C4E' }}>Monitor prompt performance, costs, and adoption metrics.</p>
            </div>
            <select style={{ background: '#FFFFFF', border: '1px solid rgba(100,80,60,0.15)', borderRadius: '8px', padding: '10px 16px', fontSize: '14px', color: '#1C1410', outline: 'none' }}>
              <option>Last 30 days</option>
              <option>Last 7 days</option>
              <option>Current billing cycle</option>
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', marginBottom: '24px' }}>
            {/* Main Usage Chart */}
            <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid rgba(100,80,60,0.08)', padding: '24px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#1C1410', marginBottom: '24px' }}>Prompt Usage (Requests)</h2>
              <div style={{ height: '300px', width: '100%', position: 'relative' }}>
                <svg width="100%" height="100%" viewBox="0 0 600 200" preserveAspectRatio="none">
                  <path d="M0,180 Q100,160 200,100 T400,40 T600,60" fill="none" stroke="#C8A882" strokeWidth="3" />
                  <path d="M0,180 Q100,160 200,100 T400,40 T600,60 L600,200 L0,200 Z" fill="rgba(200,168,130,0.1)" />
                </svg>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', fontSize: '12px', color: '#A89E94' }}>
                  <span>Mar 01</span>
                  <span>Mar 10</span>
                  <span>Mar 20</span>
                  <span>Today</span>
                </div>
              </div>
            </div>

            {/* Performance Stats */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
               <div style={{ background: '#1C1410', borderRadius: '12px', padding: '24px', color: '#FFFFFF' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.6 }}>Total Tokens</div>
                <div style={{ fontSize: '28px', fontWeight: 800, marginTop: '8px' }}>8.44M</div>
                <div style={{ fontSize: '13px', color: '#16a34a', marginTop: '4px' }}>↑ 12% vs last month</div>
              </div>
              <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid rgba(100,80,60,0.08)', padding: '24px' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: '#6B5C4E' }}>Average Latency</div>
                <div style={{ fontSize: '28px', fontWeight: 800, marginTop: '8px', color: '#1C1410' }}>420ms</div>
                <div style={{ fontSize: '13px', color: '#16a34a', marginTop: '4px' }}>↓ 15.2ms improvement</div>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px' }}>
            {/* Top Prompts */}
            <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid rgba(100,80,60,0.08)', padding: '20px' }}>
              <h2 style={{ fontSize: '15px', fontWeight: 700, color: '#1C1410', marginBottom: '16px' }}>Top Prompts</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { name: 'Customer Support', count: '12.4k' },
                  { name: 'Code Debugger', count: '8.2k' },
                  { name: 'Marketing Copy', count: '4.1k' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '14px', color: '#1C1410' }}>{item.name}</span>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#C8A882' }}>{item.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Error Rates */}
            <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid rgba(100,80,60,0.08)', padding: '20px' }}>
              <h2 style={{ fontSize: '15px', fontWeight: 700, color: '#1C1410', marginBottom: '16px' }}>Model Distribution</h2>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                 <div style={{ display: 'flex', height: '24px', borderRadius: '4px', overflow: 'hidden' }}>
                   <div style={{ flex: 6, background: '#1C1410' }} />
                   <div style={{ flex: 3, background: '#C8A882' }} />
                   <div style={{ flex: 1, background: '#A89E94' }} />
                 </div>
                 <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginTop: '8px' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                     <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: '#1C1410' }} /> GPT-4o
                   </div>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                     <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: '#C8A882' }} /> Mistral
                   </div>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                     <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: '#A89E94' }} /> Others
                   </div>
                 </div>
               </div>
            </div>

             {/* Cost Summary */}
             <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid rgba(100,80,60,0.08)', padding: '20px' }}>
              <h2 style={{ fontSize: '15px', fontWeight: 700, color: '#1C1410', marginBottom: '16px' }}>Projected Cost</h2>
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#1C1410' }}>$1,244.50</div>
              <p style={{ fontSize: '12px', color: '#6B5C4E', marginTop: '4px' }}>For current month (estimated)</p>
              <button style={{ width: '100%', marginTop: '16px', padding: '8px', border: '1px solid rgba(100,80,60,0.15)', borderRadius: '6px', fontSize: '13px', color: '#1C1410', background: 'none', cursor: 'pointer' }}>
                View Billing →
              </button>
            </div>
          </div>

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
