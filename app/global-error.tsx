'use client';

/**
 * Global error boundary - catches errors thrown inside the root layout.
 * Must include its own <html> and <body> tags because it replaces the
 * root layout when active.
 *
 * This is a last resort. Most errors are caught by app/error.tsx first.
 */
export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '1rem',
          fontFamily: 'sans-serif',
          backgroundColor: '#0d1117',
          color: '#f8f9fa',
          textAlign: 'center',
          padding: '1rem',
        }}
      >
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>
          Something went wrong
        </h2>
        <p style={{ color: '#6c757d', maxWidth: '24rem' }}>
          A critical error occurred. Please try refreshing the page.
        </p>
        {error.digest && (
          <p
            style={{
              fontFamily: 'monospace',
              fontSize: '0.75rem',
              color: '#6c757d',
            }}
          >
            Error ID: {error.digest}
          </p>
        )}
        <button
          onClick={() => unstable_retry()}
          style={{
            padding: '0.5rem 1.5rem',
            borderRadius: '0.5rem',
            border: '1px solid #30363d',
            background: 'transparent',
            color: '#f8f9fa',
            cursor: 'pointer',
            fontSize: '0.875rem',
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
