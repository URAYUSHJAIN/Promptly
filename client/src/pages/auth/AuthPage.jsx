import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSignIn, useSignUp } from '@clerk/react/legacy';
import AuthLayout from '../../components/layout/AuthLayout';

/* ── OAuth provider config ── */
const OAUTH_PROVIDERS = [
  {
    id: 'oauth_google',
    name: 'Google',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
      </svg>
    ),
  },
  {
    id: 'oauth_github',
    name: 'GitHub',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="#1C1410">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
];

export default function AuthPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const isSignUp = location.pathname === '/signup';

  const [activeTab, setActiveTab] = useState(isSignUp ? 'signup' : 'signin');
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState('');
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', username: '', email: '', password: '' });

  /* ── Email verification state (inline, no separate page) ── */
  const [verifying, setVerifying] = useState(false);
  const [verifyCode, setVerifyCode] = useState('');
  const [resending, setResending] = useState(false);
  const [resent, setResent] = useState(false);

  const { signIn, setActive: setSignInActive, isLoaded: signInLoaded } = useSignIn();
  const { signUp, setActive: setSignUpActive, isLoaded: signUpLoaded } = useSignUp();

  /* Keep URL in sync when toggling tabs */
  const switchTab = (tab) => {
    setActiveTab(tab);
    setError('');
    setVerifying(false);
    setVerifyCode('');
    navigate(tab === 'signup' ? '/signup' : '/login', { replace: true });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  /* ── OAuth ── */
  const handleOAuth = async (providerId) => {
    const oauthClient = signInLoaded ? signIn : signUpLoaded ? signUp : null;
    if (!oauthClient) {
      setError('Still loading authentication. Please try again in a moment.');
      return;
    }
    setOauthLoading(providerId);
    setError('');
    try {
      await oauthClient.authenticateWithRedirect({
        strategy: providerId,
        redirectUrl: '/sso-callback',
        redirectUrlComplete: '/dashboard',
      });
    } catch (err) {
      setError(err.errors?.[0]?.longMessage || 'OAuth sign-in failed.');
      setOauthLoading('');
    }
  };

  /* ── Email / Password ── */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (activeTab === 'signin' && !signInLoaded) {
      setError('Still loading authentication. Please try again in a moment.');
      return;
    }
    if (activeTab === 'signup' && !signUpLoaded) {
      setError('Still loading authentication. Please try again in a moment.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      if (activeTab === 'signin') {
        const result = await signIn.create({
          identifier: form.email,
          password: form.password,
        });
        if (result.status === 'complete') {
          await setSignInActive({ session: result.createdSessionId });
          navigate('/dashboard');
        }
      } else {
        const nameParts = form.name.trim().split(' ');
        const result = await signUp.create({
          emailAddress: form.email,
          password: form.password,
          username: form.username,
          firstName: nameParts[0] || '',
          lastName: nameParts.slice(1).join(' ') || '',
        });
        if (result.status === 'complete') {
          await setSignUpActive({ session: result.createdSessionId });
          navigate('/dashboard');
        } else {
          // Send verification email and show inline code entry
          await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
          setVerifying(true);
        }
      }
    } catch (err) {
      setError(err.errors?.[0]?.longMessage || err.errors?.[0]?.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  /* ── Verify OTP code (inline) ── */
  const handleVerify = async (e) => {
    e.preventDefault();
    if (!signUpLoaded || !signUp) return;
    setLoading(true);
    setError('');
    try {
      const result = await signUp.attemptEmailAddressVerification({ code: verifyCode });
      if (result.status === 'complete') {
        await setSignUpActive({ session: result.createdSessionId });
        navigate('/dashboard');
      } else {
        setError('Verification incomplete. Please try again.');
      }
    } catch (err) {
      setError(err.errors?.[0]?.longMessage || err.errors?.[0]?.message || 'Invalid verification code.');
    } finally {
      setLoading(false);
    }
  };

  /* ── Resend code ── */
  const handleResend = async () => {
    if (!signUpLoaded || !signUp || resending) return;
    setResending(true);
    setError('');
    setResent(false);
    try {
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setResent(true);
      setTimeout(() => setResent(false), 4000);
    } catch (err) {
      setError(err.errors?.[0]?.longMessage || 'Could not resend code.');
    } finally {
      setResending(false);
    }
  };

  const inputStyle = (field) => ({
    width: '100%',
    padding: '10px 14px',
    border: `1px solid ${focusedField === field ? '#1C1410' : 'rgba(100,80,60,0.2)'}`,
    borderRadius: '8px',
    fontSize: '14px',
    color: '#1C1410',
    background: '#FFFFFF',
    fontFamily: "'Ubuntu', sans-serif",
    outline: 'none',
    transition: 'border 0.15s ease, box-shadow 0.15s ease',
    boxShadow: focusedField === field ? '0 0 0 3px rgba(28,20,16,0.06)' : 'none',
    boxSizing: 'border-box',
  });

  const labelStyle = {
    fontSize: '11px',
    fontWeight: 600,
    color: '#1C1410',
    letterSpacing: '0.6px',
    textTransform: 'uppercase',
    marginBottom: '6px',
    display: 'block',
  };

  /* ═══════════════════════════════════════════════
     VERIFY EMAIL VIEW (inline, same page)
     ═══════════════════════════════════════════════ */
  if (verifying) {
    return (
      <AuthLayout>
        {/* Back button */}
        <button
          type="button"
          onClick={() => { setVerifying(false); setVerifyCode(''); setError(''); }}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: '13px', color: '#6B5C4E', display: 'flex',
            alignItems: 'center', gap: '6px', marginBottom: '20px',
            fontFamily: "'Ubuntu', sans-serif",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5" /><polyline points="12 19 5 12 12 5" />
          </svg>
          Back
        </button>

        {/* Mail icon */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{
            width: '48px', height: '48px', borderRadius: '12px',
            background: 'rgba(100,80,60,0.06)', border: '1px solid rgba(100,80,60,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px',
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6B5C4E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M22 7l-10 7L2 7" />
            </svg>
          </div>
          <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#1C1410', letterSpacing: '-0.4px', marginBottom: '6px' }}>
            Check your email
          </h1>
          <p style={{ fontSize: '13px', color: '#6B5C4E', lineHeight: 1.6 }}>
            We sent a verification code to<br />
            <strong style={{ color: '#1C1410' }}>{form.email}</strong>
          </p>
        </div>

        {/* Error */}
        {error && (
          <div style={{ background: 'rgba(220,38,38,0.06)', border: '1px solid rgba(220,38,38,0.2)', borderRadius: '8px', padding: '10px 14px', marginBottom: '16px', fontSize: '13px', color: '#b91c1c' }}>
            {error}
          </div>
        )}

        {/* Resent success */}
        {resent && (
          <div style={{ background: 'rgba(22,163,74,0.06)', border: '1px solid rgba(22,163,74,0.2)', borderRadius: '8px', padding: '10px 14px', marginBottom: '16px', fontSize: '13px', color: '#16a34a' }}>
            Code resent!
          </div>
        )}

        {/* Code form */}
        <form onSubmit={handleVerify}>
          <div style={{ marginBottom: '20px' }}>
            <label style={labelStyle}>Verification Code</label>
            <input
              type="text"
              value={verifyCode}
              onChange={(e) => { setVerifyCode(e.target.value.replace(/\D/g, '').slice(0, 6)); setError(''); }}
              placeholder="000000"
              style={{ ...inputStyle('code'), textAlign: 'center', letterSpacing: '6px', fontSize: '18px', fontWeight: 600 }}
              autoFocus
              required
              maxLength={6}
              inputMode="numeric"
              onFocus={() => setFocusedField('code')}
              onBlur={() => setFocusedField(null)}
            />
          </div>

          <button type="submit" disabled={loading || verifyCode.length < 6}
            style={{
              width: '100%', padding: '12px 24px',
              background: (loading || verifyCode.length < 6) ? 'rgba(28,20,16,0.35)' : '#1C1410',
              color: '#FFFFFF', fontWeight: 600, fontSize: '14px', borderRadius: '8px',
              border: 'none', cursor: (loading || verifyCode.length < 6) ? 'not-allowed' : 'pointer',
              fontFamily: "'Ubuntu', sans-serif", transition: 'all 0.15s ease',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            }}
          >
            {loading && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 0.8s linear infinite' }}><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>}
            {loading ? 'Verifying…' : 'Verify Email'}
          </button>
        </form>

        <p style={{ textAlign: 'center', fontSize: '13px', color: '#6B5C4E', marginTop: '20px' }}>
          Didn&apos;t receive the code?{' '}
          <button type="button" onClick={handleResend} disabled={resending}
            style={{ background: 'none', border: 'none', fontSize: '13px', color: '#1C1410', cursor: resending ? 'wait' : 'pointer', fontFamily: "'Ubuntu', sans-serif", fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: '2px' }}>
            {resending ? 'Sending…' : 'Resend'}
          </button>
        </p>

        <style>{`
          @keyframes spin { to { transform: rotate(360deg); } }
        `}</style>
      </AuthLayout>
    );
  }

  /* ═══════════════════════════════════════════════
     MAIN SIGN IN / SIGN UP VIEW
     ═══════════════════════════════════════════════ */
  return (
    <AuthLayout>
      {/* ─── Header ─── */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#1C1410', letterSpacing: '-0.4px', marginBottom: '6px' }}>
          {activeTab === 'signin' ? 'Welcome back' : 'Create your account'}
        </h1>
        <p style={{ fontSize: '13px', color: '#6B5C4E' }}>
          {activeTab === 'signin' ? 'Sign in to continue to Promptly' : 'Start building better prompts in minutes'}
        </p>
      </div>

      {/* ─── Tab switcher ─── */}
      <div style={{ display: 'flex', background: 'rgba(100,80,60,0.06)', borderRadius: '8px', padding: '3px', marginBottom: '22px' }}>
        {['signin', 'signup'].map((tab) => (
          <button
            key={tab}
            onClick={() => switchTab(tab)}
            style={{
              flex: 1, padding: '7px 0', border: 'none', borderRadius: '6px',
              fontSize: '13px', fontWeight: 500, cursor: 'pointer',
              fontFamily: "'Ubuntu', sans-serif", transition: 'all 0.15s ease',
              background: activeTab === tab ? '#FFFFFF' : 'transparent',
              color: activeTab === tab ? '#1C1410' : '#6B5C4E',
              boxShadow: activeTab === tab ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
            }}
          >
            {tab === 'signin' ? 'Sign In' : 'Sign Up'}
          </button>
        ))}
      </div>

      {/* ─── OAuth buttons ─── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
        {OAUTH_PROVIDERS.map((p) => (
          <button
            key={p.id}
            onClick={() => handleOAuth(p.id)}
            disabled={!!oauthLoading}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
              width: '100%', padding: '10px 16px',
              border: '1px solid rgba(100,80,60,0.2)',
              background: oauthLoading === p.id ? '#F5F0EB' : '#FFFFFF',
              borderRadius: '8px', fontSize: '13px', fontWeight: 500,
              color: '#1C1410', cursor: oauthLoading ? 'wait' : 'pointer',
              fontFamily: "'Ubuntu', sans-serif", transition: 'all 0.15s ease',
              opacity: oauthLoading && oauthLoading !== p.id ? 0.5 : 1,
            }}
            onMouseEnter={(e) => { if (!oauthLoading) { e.currentTarget.style.background = '#F5F0EB'; e.currentTarget.style.borderColor = 'rgba(100,80,60,0.35)'; }}}
            onMouseLeave={(e) => { e.currentTarget.style.background = oauthLoading === p.id ? '#F5F0EB' : '#FFFFFF'; e.currentTarget.style.borderColor = 'rgba(100,80,60,0.2)'; }}
          >
            {oauthLoading === p.id
              ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B5C4E" strokeWidth="2" style={{ animation: 'spin 0.8s linear infinite' }}><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>
              : p.icon}
            Continue with {p.name}
          </button>
        ))}
      </div>

      {/* ─── Divider ─── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
        <div style={{ flex: 1, height: '1px', background: 'rgba(100,80,60,0.12)' }} />
        <span style={{ fontSize: '11px', color: '#6B5C4E', letterSpacing: '0.5px' }}>OR</span>
        <div style={{ flex: 1, height: '1px', background: 'rgba(100,80,60,0.12)' }} />
      </div>

      {/* ─── Error banner ─── */}
      {error && (
        <div style={{ background: 'rgba(220,38,38,0.06)', border: '1px solid rgba(220,38,38,0.2)', borderRadius: '8px', padding: '10px 14px', marginBottom: '16px', fontSize: '13px', color: '#b91c1c' }}>
          {error}
        </div>
      )}

      {/* ─── Form ─── */}
      <form onSubmit={handleSubmit}>
        {activeTab === 'signup' && (
          <>
            <div style={{ marginBottom: '16px', animation: 'fadeUp 0.25s ease both' }}>
              <label style={labelStyle}>Full Name</label>
              <input type="text" name="name" value={form.name} onChange={handleChange}
                onFocus={() => setFocusedField('name')} onBlur={() => setFocusedField(null)}
                placeholder="Your full name" style={inputStyle('name')} required />
            </div>
            <div style={{ marginBottom: '16px', animation: 'fadeUp 0.3s ease both' }}>
              <label style={labelStyle}>Username</label>
              <input type="text" name="username" value={form.username} onChange={handleChange}
                onFocus={() => setFocusedField('username')} onBlur={() => setFocusedField(null)}
                placeholder="Choose a username" style={inputStyle('username')} required
                autoComplete="username" />
            </div>
          </>
        )}

        <div style={{ marginBottom: '16px' }}>
          <label style={labelStyle}>Email Address</label>
          <input type="email" name="email" value={form.email} onChange={handleChange}
            onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField(null)}
            placeholder="you@company.com" style={inputStyle('email')} required />
        </div>

        <div style={{ marginBottom: activeTab === 'signin' ? '8px' : '20px' }}>
          <label style={labelStyle}>Password</label>
          <div style={{ position: 'relative' }}>
            <input type={showPassword ? 'text' : 'password'} name="password" value={form.password}
              onChange={handleChange}
              onFocus={() => setFocusedField('password')} onBlur={() => setFocusedField(null)}
              placeholder={activeTab === 'signup' ? 'Create a strong password' : 'Your password'}
              style={{ ...inputStyle('password'), paddingRight: '42px' }} required />
            <button type="button" onClick={() => setShowPassword(!showPassword)}
              style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: '2px', color: '#6B5C4E', display: 'flex' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                {showPassword ? (<><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" /><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" /><line x1="1" y1="1" x2="23" y2="23" /></>) : (<><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></>)}
              </svg>
            </button>
          </div>
        </div>

        {activeTab === 'signin' && (
          <div style={{ textAlign: 'right', marginBottom: '20px' }}>
            <button type="button" style={{ background: 'none', border: 'none', fontSize: '12px', color: '#6B5C4E', cursor: 'pointer', fontFamily: "'Ubuntu', sans-serif", textDecoration: 'underline', textUnderlineOffset: '2px' }}>
              Forgot password?
            </button>
          </div>
        )}

        <button type="submit" disabled={loading}
          style={{ width: '100%', padding: '12px 24px', background: loading ? 'rgba(28,20,16,0.55)' : '#1C1410', color: '#FFFFFF', fontWeight: 600, fontSize: '14px', borderRadius: '8px', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', fontFamily: "'Ubuntu', sans-serif", transition: 'all 0.15s ease', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
          onMouseEnter={(e) => { if (!loading) { e.currentTarget.style.background = '#2A1F18'; e.currentTarget.style.transform = 'translateY(-1px)'; }}}
          onMouseLeave={(e) => { e.currentTarget.style.background = loading ? 'rgba(28,20,16,0.55)' : '#1C1410'; e.currentTarget.style.transform = 'translateY(0)'; }}>
          {loading && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 0.8s linear infinite' }}><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>}
          {loading ? (activeTab === 'signin' ? 'Signing in…' : 'Creating account…') : (activeTab === 'signin' ? 'Sign In' : 'Create Account')}
        </button>
      </form>

      {/* ─── Terms ─── */}
      <p style={{ textAlign: 'center', fontSize: '10px', color: 'rgba(107,92,78,0.6)', marginTop: '20px', lineHeight: 1.5 }}>
        By continuing, you agree to Promptly&apos;s{' '}
        <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Terms of Service</span>{' '}
        and{' '}
        <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Privacy Policy</span>.
      </p>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </AuthLayout>
  );
}
