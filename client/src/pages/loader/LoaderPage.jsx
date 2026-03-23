import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoaderPage() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Ease-out: start fast, slow down
        const remaining = 100 - prev;
        const step = Math.max(0.5, remaining * 0.06);
        return Math.min(100, prev + step);
      });
    }, 50);

    // Navigate after 3.5 seconds
    const timeout = setTimeout(() => {
      navigate('/dashboard');
    }, 3500);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [navigate]);

  return (
    <div
      style={{
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--lp-bg)',
        position: 'relative',
        fontFamily: "'Ubuntu', sans-serif",
      }}
    >
      {/* Subtle top-right glow */}
      <div
        style={{
          position: 'absolute',
          top: '-120px',
          right: '-120px',
          width: '450px',
          height: '450px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(200,168,130,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Center content */}
      <div
        style={{
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        {/* Logo */}
        <h1
          style={{
            fontSize: '36px',
            fontWeight: 700,
            color: 'var(--lp-text)',
            letterSpacing: '-0.5px',
          }}
        >
          Promptly
          <span style={{ color: 'var(--lp-acc)' }}>.</span>
        </h1>

        {/* Tagline */}
        <p
          style={{
            fontSize: '10px',
            fontWeight: 500,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: 'var(--lp-muted)',
          }}
        >
          GIT FOR YOUR PROMPTS
        </p>

        {/* Animated dots */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            marginTop: '12px',
          }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: 'var(--lp-dark)',
                opacity: 0.4,
                animation: `loaderDot 1.2s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          ))}
        </div>

        {/* Progress bar */}
        <div
          style={{
            width: '200px',
            height: '2px',
            background: 'rgba(100,80,60,0.1)',
            borderRadius: '2px',
            overflow: 'hidden',
            marginTop: '4px',
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: '100%',
              background: 'var(--lp-acc)',
              borderRadius: '2px',
              transition: 'width 0.1s ease-out',
            }}
          />
        </div>
      </div>

      {/* Bottom credit */}
      <p
        style={{
          position: 'absolute',
          bottom: '32px',
          fontSize: '9px',
          fontWeight: 500,
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
          color: 'rgba(107,92,78,0.4)',
        }}
      >
        CURATED INTELLIGENCE © 2026
      </p>

      {/* Keyframes */}
      <style>{`
        @keyframes loaderDot {
          0%, 80%, 100% {
            opacity: 0.3;
            transform: scale(0.8);
          }
          40% {
            opacity: 1;
            transform: scale(1.15);
          }
        }
      `}</style>
    </div>
  );
}
