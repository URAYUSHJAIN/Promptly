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

const PROMPTS = [
  { name: 'Customer Support Bot', id: 'p_88203', version: 'v4.2.1', updated: '2 hours ago', status: 'ACTIVE', model: 'Mistral 7B', tokens: '1.2k' },
  { name: 'Marketing Copy Generator', id: 'p_91244', version: 'v1.0.0', updated: 'Yesterday', status: 'DRAFT', model: 'GPT-4o', tokens: '850' },
  { name: 'Python Debugger Pro', id: 'p_77301', version: 'v2.4.0', updated: '3 days ago', status: 'FAILED', model: 'Claude 3.5', tokens: '2.1k' },
  { name: 'Creative Storywriter', id: 'p_12239', version: 'v3.1.2', updated: 'Oct 12', status: 'ARCHIVED', model: 'Gemini 1.5', tokens: '500' },
  { name: 'Semantic Search Parser', id: 'p_55490', version: 'v2.2.1', updated: '1 week ago', status: 'ACTIVE', model: 'GPT-4o', tokens: '1.8k' },
];

const STATUS_STYLE = {
  ACTIVE: { color: '#16a34a', bg: 'rgba(22,163,74,0.08)', dot: '#16a34a' },
  DRAFT: { color: '#d97706', bg: 'rgba(217,119,6,0.08)', dot: '#d97706' },
  FAILED: { color: '#dc2626', bg: 'rgba(220,38,38,0.08)', dot: '#dc2626' },
  ARCHIVED: { color: '#6B5C4E', bg: 'rgba(107,92,78,0.08)', dot: '#6B5C4E' },
};

export default function PromptsPage() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const activeNav = 'prompts';

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
              <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#1C1410', letterSpacing: '-0.5px', marginBottom: '8px' }}>Prompts</h1>
              <p style={{ fontSize: '15px', color: '#6B5C4E' }}>Manage, version, and deploy your AI prompt library.</p>
            </div>
            <button style={{ background: '#1C1410', color: '#FFFFFF', border: 'none', borderRadius: '8px', padding: '10px 20px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
              Create New Prompt <span style={{ fontSize: '18px', fontWeight: 400 }}>+</span>
            </button>
          </div>

          {/* Search & Filter Bar */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <input type="text" placeholder="Search prompts..." style={{ width: '100%', padding: '10px 14px 10px 40px', border: '1px solid rgba(100,80,60,0.12)', borderRadius: '10px', background: '#FFFFFF', fontSize: '14px', outline: 'none' }} />
              <svg style={{ position: 'absolute', left: '14px', top: '11px', color: '#A89E94' }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
            </div>
            <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', background: '#FFFFFF', border: '1px solid rgba(100,80,60,0.12)', borderRadius: '10px', fontSize: '14px', color: '#1C1410', cursor: 'pointer' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="21" x2="4" y2="14" /><line x1="4" y1="10" x2="4" y2="3" /><line x1="12" y1="21" x2="12" y2="12" /><line x1="12" y1="8" x2="12" y2="3" /><line x1="20" y1="21" x2="20" y2="16" /><line x1="20" y1="12" x2="20" y2="3" /><line x1="1" y1="14" x2="7" y2="14" /><line x1="9" y1="8" x2="15" y2="8" /><line x1="17" y1="16" x2="23" y2="16" /></svg>
              Filters
            </button>
          </div>

          {/* Prompts Table */}
          <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid rgba(100,80,60,0.08)', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#FDFCFB', borderBottom: '1px solid rgba(100,80,60,0.08)' }}>
                  {['PROMPT NAME', 'VERSION', 'MODEL', 'TOKENS', 'LAST UPDATED', 'STATUS'].map((h) => (
                    <th key={h} style={{ padding: '12px 24px', fontSize: '11px', fontWeight: 700, color: '#6B5C4E', letterSpacing: '1px', textAlign: 'left' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PROMPTS.map((p, i) => {
                  const s = STATUS_STYLE[p.status];
                  return (
                    <tr key={i} style={{ borderBottom: '1px solid rgba(100,80,60,0.05)', cursor: 'pointer', transition: 'background 0.1s' }}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#FAFAF9'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                      <td style={{ padding: '16px 24px' }}>
                        <div style={{ fontSize: '14px', fontWeight: 600, color: '#1C1410' }}>{p.name}</div>
                        <div style={{ fontSize: '12px', color: '#6B5C4E', fontFamily: 'monospace' }}>Id: {p.id}</div>
                      </td>
                      <td style={{ padding: '16px 24px' }}>
                        <span style={{ background: 'rgba(200,168,130,0.12)', color: '#9A7355', fontSize: '11px', fontWeight: 600, padding: '3px 8px', borderRadius: '4px', fontFamily: 'monospace' }}>{p.version}</span>
                      </td>
                      <td style={{ padding: '16px 24px', fontSize: '14px', color: '#1C1410' }}>{p.model}</td>
                      <td style={{ padding: '16px 24px', fontSize: '14px', color: '#6B5C4E' }}>{p.tokens}</td>
                      <td style={{ padding: '16px 24px', fontSize: '14px', color: '#6B5C4E' }}>{p.updated}</td>
                      <td style={{ padding: '16px 24px' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: s.bg, color: s.color, fontSize: '11px', fontWeight: 700, letterSpacing: '0.5px', padding: '3px 8px', borderRadius: '4px' }}>
                          <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: s.dot, flexShrink: 0 }} />
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
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
