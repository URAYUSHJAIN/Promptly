import { useUser, useClerk } from '@clerk/react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const NAV_ITEMS = [
  { id: 'overview', label: 'Overview', icon: <GridIcon /> },
  { id: 'prompts', label: 'Prompts', icon: <PromptIcon /> },
  { id: 'experiments', label: 'Experiments', icon: <ExperimentIcon /> },
  { id: 'analytics', label: 'Analytics', icon: <AnalyticsIcon /> },
];

const NAV_BOTTOM = [
  { id: 'team', label: 'Team', icon: <TeamIcon /> },
  { id: 'settings', label: 'Settings', icon: <SettingsIcon /> },
];

const PROMPTS = [
  { name: 'Customer Support v4', id: 'p_88203_xyz', version: 'v4.2.1', updated: '2 hours ago', status: 'ACTIVE' },
  { name: 'Marketing Copywriter', id: 'p_91244_abc', version: 'v1.0.0', updated: 'Yesterday', status: 'DRAFT' },
  { name: 'Python Code Debugger', id: 'p_77301_dev', version: 'v2.4.0', updated: '3 days ago', status: 'FAILED' },
  { name: 'Creative Storyteller', id: 'p_12239_cre', version: 'v3.1.2', updated: 'Oct 12, 2023', status: 'ARCHIVED' },
];

const STATUS_STYLE = {
  ACTIVE: { color: '#16a34a', bg: 'rgba(22,163,74,0.08)', dot: '#16a34a' },
  DRAFT: { color: '#d97706', bg: 'rgba(217,119,6,0.08)', dot: '#d97706' },
  FAILED: { color: '#dc2626', bg: 'rgba(220,38,38,0.08)', dot: '#dc2626' },
  ARCHIVED: { color: '#6B5C4E', bg: 'rgba(107,92,78,0.08)', dot: '#6B5C4E' },
};

const VERSION_COLORS = { ACTIVE: '#C8A882', DRAFT: '#C8A882', FAILED: '#C8A882', ARCHIVED: '#C8A882' };

function getHour() {
  const h = new Date().getHours();
  if (h < 12) return 'morning';
  if (h < 17) return 'afternoon';
  return 'evening';
}

export default function DashboardPage() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('overview');
  const [showUserMenu, setShowUserMenu] = useState(false);

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
        {/* Logo */}
        <div>
          <div style={{ padding: '0 20px 28px' }}>
            <div style={{ fontSize: '18px', fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.3px' }}>Promptly</div>
            <div style={{ fontSize: '10px', color: 'rgba(200,168,130,0.5)', letterSpacing: '0.5px', marginTop: '2px' }}>v1.0.4</div>
          </div>

          {/* Main nav */}
          <nav>
            {NAV_ITEMS.map((item) => (
              <button key={item.id} onClick={() => setActiveNav(item.id)}
                style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', padding: '10px 20px', border: 'none', cursor: 'pointer', fontFamily: "'Ubuntu', sans-serif", fontSize: '13px', fontWeight: activeNav === item.id ? 600 : 400, color: activeNav === item.id ? '#FFFFFF' : 'rgba(255,255,255,0.45)', background: activeNav === item.id ? 'rgba(200,168,130,0.12)' : 'transparent', borderLeft: activeNav === item.id ? '2px solid #C8A882' : '2px solid transparent', transition: 'all 0.15s ease' }}>
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div>
          {/* Bottom nav */}
          <nav style={{ marginBottom: '16px' }}>
            {NAV_BOTTOM.map((item) => (
              <button key={item.id} onClick={() => setActiveNav(item.id)}
                style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', padding: '10px 20px', border: 'none', cursor: 'pointer', fontFamily: "'Ubuntu', sans-serif", fontSize: '13px', fontWeight: activeNav === item.id ? 600 : 400, color: activeNav === item.id ? '#FFFFFF' : 'rgba(255,255,255,0.45)', background: activeNav === item.id ? 'rgba(200,168,130,0.12)' : 'transparent', borderLeft: activeNav === item.id ? '2px solid #C8A882' : '2px solid transparent', transition: 'all 0.15s ease' }}>
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>

          {/* New Experiment CTA */}
          <div style={{ padding: '0 16px' }}>
            <button
              style={{ width: '100%', padding: '10px', background: 'rgba(200,168,130,0.1)', border: '1px solid rgba(200,168,130,0.2)', borderRadius: '8px', color: 'rgba(200,168,130,0.9)', fontSize: '11px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer', fontFamily: "'Ubuntu', sans-serif", transition: 'all 0.15s ease' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(200,168,130,0.18)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(200,168,130,0.1)'; }}>
              New Experiment
            </button>
          </div>
        </div>
      </aside>

      {/* ═══ MAIN CONTENT ═══ */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* ─ Top bar ─ */}
        <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px', height: '56px', background: '#FAFAF9', borderBottom: '1px solid rgba(100,80,60,0.08)', flexShrink: 0 }}>
          {/* Left side spacer */}
          <div />

          {/* Right side */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            {/* Bell */}
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B5C4E', display: 'flex', padding: '4px' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
            </button>

            {/* User avatar */}
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
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', padding: '10px 14px', border: 'none', background: 'none', cursor: 'pointer', fontSize: '13px', color: '#dc2626', fontFamily: "'Ubuntu', sans-serif", textAlign: 'left' }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(220,38,38,0.04)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'none'}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* ─ Scrollable body ─ */}
        <main style={{ flex: 1, overflow: 'auto', padding: '32px' }}>

          {/* Greeting */}
          <div style={{ marginBottom: '28px' }}>
            <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#1C1410', letterSpacing: '-0.6px', marginBottom: '6px' }}>
              Good {getHour()}, {firstName}
            </h1>
            <p style={{ fontSize: '13px', color: '#6B5C4E' }}>
              Your prompt library grew by 12% this week. Two experiments are ready for review.
            </p>
          </div>

          {/* ─ Stat cards ─ */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
            <StatCard label="TOTAL PROMPTS" value="1,284" sub="+4%" subColor="#16a34a" icon={<DatabaseIcon />} />
            <StatCard label="ACTIVE EXPERIMENTS" value="12" sub="Stable" subColor="#6B5C4E" icon={<FlaskIcon />} />
            <StatCard label="AVG AI SCORE" value="0.94" sub="↑ 0.02" subColor="#16a34a" icon={<StarIcon />} />
            <StatCard label="ROLLBACKS" value="3" sub="Action needed" subColor="#dc2626" icon={<HistoryIcon />} />
          </div>

          {/* ─ Bottom grid ─ */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '20px' }}>

            {/* Recent Prompts */}
            <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid rgba(100,80,60,0.08)', overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px 16px' }}>
                <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#1C1410' }}>Recent Prompts</h2>
                <button style={{ background: 'none', border: 'none', fontSize: '13px', color: '#6B5C4E', cursor: 'pointer', fontFamily: "'Ubuntu', sans-serif" }}>
                  View all →
                </button>
              </div>

              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(100,80,60,0.08)' }}>
                    {['PROMPT NAME', 'VERSION', 'LAST UPDATED', 'STATUS'].map((h) => (
                      <th key={h} style={{ padding: '8px 24px', fontSize: '10px', fontWeight: 700, color: '#6B5C4E', letterSpacing: '0.8px', textAlign: 'left' }}>{h}</th>
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
                        <td style={{ padding: '14px 24px' }}>
                          <div style={{ fontSize: '13px', fontWeight: 600, color: '#1C1410' }}>{p.name}</div>
                          <div style={{ fontSize: '11px', color: '#6B5C4E', fontFamily: 'monospace' }}>Id: {p.id}</div>
                        </td>
                        <td style={{ padding: '14px 24px' }}>
                          <span style={{ background: 'rgba(200,168,130,0.15)', color: '#9A7355', fontSize: '11px', fontWeight: 600, padding: '3px 8px', borderRadius: '4px', fontFamily: 'monospace' }}>{p.version}</span>
                        </td>
                        <td style={{ padding: '14px 24px', fontSize: '13px', color: '#6B5C4E' }}>{p.updated}</td>
                        <td style={{ padding: '14px 24px' }}>
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

            {/* Quick Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid rgba(100,80,60,0.08)', padding: '20px 20px 8px' }}>
                <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#1C1410', marginBottom: '12px' }}>Quick Actions</h2>
                {[
                  { label: 'Create New Prompt', icon: <PlusIcon /> },
                  { label: 'Optimize Model', icon: <WandIcon /> },
                  { label: 'Invite Team', icon: <ShareIcon /> },
                ].map((a) => (
                  <button key={a.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '12px 14px', background: '#F7F5F2', border: '1px solid rgba(100,80,60,0.08)', borderRadius: '8px', marginBottom: '8px', cursor: 'pointer', fontFamily: "'Ubuntu', sans-serif", transition: 'all 0.15s ease' }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#EDE8E3'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#F7F5F2'}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', fontWeight: 500, color: '#1C1410' }}>
                      <span style={{ color: '#6B5C4E' }}>{a.icon}</span>
                      {a.label}
                    </div>
                    <span style={{ color: '#6B5C4E', fontSize: '14px' }}>›</span>
                  </button>
                ))}
              </div>

              {/* Pro Tip */}
              <div style={{ background: '#1C1410', borderRadius: '12px', padding: '20px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(200,168,130,0.06)' }} />
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#C8A882', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>Pro Tip</div>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.6, marginBottom: '16px' }}>
                  Using &quot;Chain of Thought&quot; reasoning in your prompts can increase accuracy for logic-heavy tasks by up to 24%.
                </p>
                <button style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '6px', padding: '7px 14px', fontSize: '12px', fontWeight: 600, color: '#FFFFFF', cursor: 'pointer', fontFamily: "'Ubuntu', sans-serif", transition: 'all 0.15s ease' }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.16)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}>
                  Read Guide
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Click outside to close user menu */}
      {showUserMenu && <div style={{ position: 'fixed', inset: 0, zIndex: 40 }} onClick={() => setShowUserMenu(false)} />}
    </div>
  );
}

/* ── Stat Card ── */
function StatCard({ label, value, sub, subColor, icon }) {
  return (
    <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid rgba(100,80,60,0.08)', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
        <span style={{ fontSize: '10px', fontWeight: 700, color: '#6B5C4E', letterSpacing: '0.8px', textTransform: 'uppercase' }}>{label}</span>
        <span style={{ color: 'rgba(200,168,130,0.7)' }}>{icon}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
        <span style={{ fontSize: '26px', fontWeight: 800, color: '#1C1410', letterSpacing: '-0.5px' }}>{value}</span>
        <span style={{ fontSize: '12px', fontWeight: 600, color: subColor }}>{sub}</span>
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
function DatabaseIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></svg>; }
function FlaskIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2v6l3 10H7L10 8V2" /><line x1="8.5" y1="2" x2="15.5" y2="2" /></svg>; }
function StarIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>; }
function HistoryIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 .49-4.95" /></svg>; }
function PlusIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>; }
function WandIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M15 4V2m0 14v-2M8 9h2m10 0h2M17.8 11.8 19 13M15 9h0M6.2 6.2 5 5m12.8 5.8L19 13M6.2 17.8 5 19M15 9a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" /></svg>; }
function ShareIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></svg>; }
