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

const SETTINGS_TABS = [
  { id: 'general', label: 'General' },
  { id: 'workspace', label: 'Workspace' },
  { id: 'apikeys', label: 'API Keys' },
  { id: 'billing', label: 'Billing' },
  { id: 'notifications', label: 'Notifications' },
  { id: 'danger', label: 'Danger zone', color: '#dc2626' },
];

export default function SettingsPage() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const activeNav = 'settings';

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

        {/* ─ Settings Layout ─ */}
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          
          {/* Sub Sidebar */}
          <aside style={{ width: '240px', padding: '40px 20px', borderRight: '1px solid rgba(100,80,60,0.05)', flexShrink: 0 }}>
            {SETTINGS_TABS.map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                style={{ width: '100%', textAlign: 'left', padding: '10px 16px', border: 'none', background: activeTab === tab.id ? '#F2E8DB' : 'transparent', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: activeTab === tab.id ? 600 : 500, color: tab.color || (activeTab === tab.id ? '#1C1410' : '#6B5C4E'), marginBottom: '4px', transition: 'all 0.15s' }}>
                {tab.label}
              </button>
            ))}
          </aside>

          {/* Settings Content */}
          <main style={{ flex: 1, overflow: 'auto', padding: '40px 60px' }}>
            
            {/* Workspace Details */}
            <section style={{ marginBottom: '48px' }}>
              <h2 style={{ fontSize: '12px', fontWeight: 700, color: '#6B5C4E', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '24px' }}>Workspace Details</h2>
              
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#1C1410', marginBottom: '8px' }}>Workspace name</label>
                <input type="text" defaultValue="Jain Labs" style={{ width: '100%', maxWidth: '500px', padding: '10px 14px', border: '1px solid rgba(100,80,60,0.15)', borderRadius: '8px', background: '#FFFAF3', fontSize: '14px', outline: 'none' }} />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#1C1410', marginBottom: '8px' }}>URL slug</label>
                <div style={{ display: 'flex', gap: '0', maxWidth: '500px' }}>
                  <div style={{ background: '#FFFAF3', border: '1px solid rgba(100,80,60,0.15)', borderRight: 'none', borderRadius: '8px 0 0 8px', padding: '10px 14px', fontSize: '14px', color: '#6B5C4E' }}>promptly.app/</div>
                  <input type="text" defaultValue="jain-labs" style={{ flex: 1, padding: '10px 14px', border: '1px solid rgba(100,80,60,0.15)', borderRadius: '0 8px 8px 0', background: '#FFFAF3', fontSize: '14px', outline: 'none' }} />
                </div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#1C1410', marginBottom: '8px' }}>Logo upload</label>
                <div style={{ width: '100%', maxWidth: '500px', height: '120px', border: '2px dashed rgba(100,80,60,0.1)', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: '#FFFFFF' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#A89E94" strokeWidth="1.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#1C1410', marginTop: '8px' }}>Upload logo (PNG, SVG)</div>
                  <div style={{ fontSize: '12px', color: '#A89E94', marginTop: '2px' }}>Recommended 512x512px</div>
                </div>
              </div>

              <button style={{ background: '#DBC3A8', color: '#1C1410', border: 'none', borderRadius: '8px', padding: '10px 24px', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}>Save changes</button>
            </section>

            {/* Preferences */}
            <section style={{ marginBottom: '48px', borderTop: '1px solid rgba(100,80,60,0.05)', paddingTop: '40px' }}>
              <h2 style={{ fontSize: '12px', fontWeight: 700, color: '#6B5C4E', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '24px' }}>Preferences</h2>
              
              <div style={{ display: 'flex', gap: '24px', marginBottom: '24px' }}>
                <div style={{ flex: 1, maxWidth: '238px' }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#1C1410', marginBottom: '8px' }}>Default AI model</label>
                  <div style={{ position: 'relative' }}>
                    <select style={{ width: '100%', padding: '10px 14px', border: '1px solid rgba(100,80,60,0.15)', borderRadius: '8px', background: '#FFFAF3', fontSize: '14px', appearance: 'none', outline: 'none' }}>
                      <option>Mistral 7B</option>
                      <option>GPT-4o</option>
                      <option>Claude 3.5 Sonnet</option>
                    </select>
                    <svg style={{ position: 'absolute', right: '12px', top: '14px', pointerEvents: 'none' }} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6B5C4E" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
                  </div>
                </div>

                <div style={{ flex: 1, maxWidth: '238px' }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#1C1410', marginBottom: '8px' }}>Date format</label>
                  <div style={{ position: 'relative' }}>
                    <select style={{ width: '100%', padding: '10px 14px', border: '1px solid rgba(100,80,60,0.15)', borderRadius: '8px', background: '#FFFAF3', fontSize: '14px', appearance: 'none', outline: 'none' }}>
                      <option>DD/MM/YYYY</option>
                      <option>MM/DD/YYYY</option>
                      <option>YYYY-MM-DD</option>
                    </select>
                    <svg style={{ position: 'absolute', right: '12px', top: '14px', pointerEvents: 'none' }} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6B5C4E" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#1C1410', marginBottom: '8px' }}>Theme toggle</label>
                <div style={{ display: 'inline-flex', background: '#EDE8E3', padding: '4px', borderRadius: '10px' }}>
                  <button style={{ padding: '6px 16px', border: 'none', background: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 500, color: '#6B5C4E', cursor: 'pointer' }}>Light</button>
                  <button style={{ padding: '6px 16px', border: 'none', background: '#DBC3A8', borderRadius: '8px', fontSize: '13px', fontWeight: 600, color: '#1C1410', cursor: 'pointer' }}>System</button>
                  <button style={{ padding: '6px 16px', border: 'none', background: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 500, color: '#6B5C4E', cursor: 'pointer' }}>Dark</button>
                </div>
              </div>

              <button style={{ background: '#DBC3A8', color: '#1C1410', border: 'none', borderRadius: '8px', padding: '10px 24px', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}>Save changes</button>
            </section>

            {/* API Keys */}
            <section style={{ marginBottom: '48px', borderTop: '1px solid rgba(100,80,60,0.05)', paddingTop: '40px' }}>
              <h2 style={{ fontSize: '12px', fontWeight: 700, color: '#6B5C4E', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '24px' }}>API Keys</h2>
              
              <div style={{ background: '#FFFFFF', border: '1px solid rgba(100,80,60,0.08)', borderRadius: '12px', padding: '20px', maxWidth: '500px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#F7F5F2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6B5C4E" strokeWidth="1.5"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3-3.5 3.5z" /></svg>
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: '#1C1410', fontFamily: 'monospace' }}>pk_live_*********2f9a</div>
                      <div style={{ fontSize: '11px', color: '#A89E94' }}>Last used: 2 hours ago</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button style={{ background: 'none', border: 'none', padding: '4px', cursor: 'pointer', color: '#A89E94' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
                    </button>
                    <button style={{ background: 'none', border: 'none', color: '#dc2626', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>Revoke</button>
                  </div>
                </div>
              </div>
              
              <button style={{ background: 'none', border: 'none', color: '#6B5C4E', fontSize: '14px', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                Manage all keys <span style={{ fontSize: '16px' }}>→</span>
              </button>
            </section>

            {/* Danger Zone */}
            <section style={{ borderTop: '1px solid rgba(100,80,60,0.05)', paddingTop: '40px' }}>
              <h2 style={{ fontSize: '12px', fontWeight: 700, color: '#dc2626', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '24px' }}>Danger Zone</h2>
              
              <div style={{ background: '#FFF1F1', border: '1px solid rgba(220,38,38,0.1)', borderRadius: '12px', padding: '24px', maxWidth: '500px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#dc2626', marginBottom: '8px' }}>Delete workspace</h3>
                <p style={{ fontSize: '14px', color: '#6B5C4E', lineHeight: 1.5, marginBottom: '20px' }}>
                  Permanently deletes all prompts, experiments, versions and team data. This action is final and cannot be undone.
                </p>
                <button style={{ background: 'none', border: '1px solid rgba(220,38,38,0.2)', color: '#dc2626', borderRadius: '8px', padding: '10px 20px', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>Delete workspace</button>
              </div>
            </section>

          </main>
        </div>

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
