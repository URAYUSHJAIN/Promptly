import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ClerkProvider } from '@clerk/react'

const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!clerkPublishableKey) {
  console.error(
    'VITE_CLERK_PUBLISHABLE_KEY is missing. Define it in a .env.local file in the client folder.'
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {clerkPublishableKey ? (
      <ClerkProvider
        publishableKey={clerkPublishableKey}
        signInUrl="/login"
        signUpUrl="/signup"
        signInFallbackRedirectUrl="/dashboard"
        signUpFallbackRedirectUrl="/dashboard"
        afterSignOutUrl="/"
      >
        <App />
      </ClerkProvider>
    ) : (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          color: '#b91c1c',
          padding: '16px',
          textAlign: 'center',
        }}
      >
        Missing Clerk configuration. Set <code>VITE_CLERK_PUBLISHABLE_KEY</code> in a <code>.env.local</code> file in
        the <code>client</code> folder, then restart <code>npm run dev</code>.
      </div>
    )}
  </StrictMode>,
)
