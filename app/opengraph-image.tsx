import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt =
  'AimFinder — Find archery competitions that match your level';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/**
 * Root OG image - shown when the homepage URL is shared on social media.
 * Generated at request time via next/og (Vercel's edge image generation).
 *
 * For competition/guide pages this could be made dynamic by using
 * opengraph-image.tsx files in each route folder that pull in the
 * competition title, date, and level.
 */
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        background: 'linear-gradient(135deg, #0d1117 0%, #0f1f2e 100%)',
        padding: '64px',
        fontFamily: 'sans-serif',
      }}
    >
      {/* Logo mark */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          marginBottom: '32px',
        }}
      >
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: '#4ade80',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
          }}
        >
          🎯
        </div>
        <span
          style={{
            fontSize: '28px',
            fontWeight: 700,
            color: '#f8f9fa',
            letterSpacing: '-0.5px',
          }}
        >
          AimFinder
        </span>
      </div>

      {/* Headline */}
      <div
        style={{
          fontSize: '56px',
          fontWeight: 800,
          color: '#f8f9fa',
          lineHeight: 1.1,
          letterSpacing: '-1px',
          maxWidth: '800px',
          marginBottom: '24px',
        }}
      >
        Find archery competitions that match your level
      </div>

      {/* Subtitle */}
      <div
        style={{
          fontSize: '24px',
          color: '#6c757d',
          maxWidth: '700px',
        }}
      >
        Search indoor, outdoor, novice, club and open competitions near you -
        with AI guidance.
      </div>

      {/* Bottom accent line */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '6px',
          background: '#4ade80',
        }}
      />
    </div>,
    { ...size },
  );
}
