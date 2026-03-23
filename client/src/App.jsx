import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useAuth, HandleSSOCallback } from '@clerk/react';
import './App.css';
import LandingPage from './pages/landing/LandingPage';
import AuthPage from './pages/auth/AuthPage';
import PricingPage from './pages/pricing/PricingPage';
import DocsPage from './pages/docs/DocsPage';
import LoaderPage from './pages/loader/LoaderPage';
import FeaturesPage from './pages/features/FeaturesPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import TeamPage from './pages/dashboard/TeamPage';
import SettingsPage from './pages/dashboard/SettingsPage';
import PromptsPage from './pages/dashboard/PromptsPage';
import ExperimentsPage from './pages/dashboard/ExperimentsPage';
import AnalyticsPage from './pages/dashboard/AnalyticsPage';

/* Protect routes — redirect to /login if not signed in */
function ProtectedRoute({ children }) {
  const { isSignedIn, isLoaded } = useAuth();
  if (!isLoaded) return null;
  return isSignedIn ? children : <Navigate to="/login" replace />;
}

/* Redirect already-authed users away from auth pages */
function GuestRoute({ children }) {
  const { isSignedIn, isLoaded } = useAuth();
  if (!isLoaded) return null;
  return isSignedIn ? <Navigate to="/dashboard" replace /> : children;
}

/* SSO callback handler — properly navigates after OAuth */
function SSOCallback() {
  const navigate = useNavigate();
  const { isSignedIn, isLoaded } = useAuth();

  // If already signed in, redirect to dashboard
  if (isLoaded && isSignedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  // If not loaded yet, show loading state
  if (!isLoaded) {
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '18px',
          fontFamily: 'system-ui',
        }}
      >
        Completing sign-in...
      </div>
    );
  }

  return (
    <HandleSSOCallback
      navigateToApp={({ decorateUrl }) => {
        const dest = decorateUrl('/dashboard');
        if (dest.startsWith('http')) {
          window.location.href = dest;
          return;
        }
        navigate(dest);
      }}
      navigateToSignIn={() => navigate('/login')}
      navigateToSignUp={() => navigate('/signup')}
    />
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/docs" element={<DocsPage />} />
        <Route path="/features" element={<FeaturesPage />} />

        {/* Auth (redirect to dashboard if already logged in) */}
        <Route path="/login" element={<GuestRoute><AuthPage /></GuestRoute>} />
        <Route path="/signup" element={<GuestRoute><AuthPage /></GuestRoute>} />

        {/* Loader → dashboard (protected) */}
        <Route path="/loader" element={<ProtectedRoute><LoaderPage /></ProtectedRoute>} />

        {/* SSO OAuth callback — uses Clerk's HandleSSOCallback with proper navigation */}
        <Route path="/sso-callback" element={<SSOCallback />} />

        {/* Protected */}
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="/dashboard/team" element={<ProtectedRoute><TeamPage /></ProtectedRoute>} />
        <Route path="/dashboard/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
        <Route path="/dashboard/prompts" element={<ProtectedRoute><PromptsPage /></ProtectedRoute>} />
        <Route path="/dashboard/experiments" element={<ProtectedRoute><ExperimentsPage /></ProtectedRoute>} />
        <Route path="/dashboard/analytics" element={<ProtectedRoute><AnalyticsPage /></ProtectedRoute>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
