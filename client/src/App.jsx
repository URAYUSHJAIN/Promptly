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

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
