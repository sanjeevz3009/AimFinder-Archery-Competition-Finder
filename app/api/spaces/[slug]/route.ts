import { NextResponse } from 'next/server';
import { getCompetitionBySlug } from '@/lib/data';

/**
 * GET /api/spaces/[slug]
 *
 * Returns current spaces remaining for a competition.
 *
 * Rendering: force-dynamic + no-store — this must never be cached.
 *
 * On Vercel serverless, in-process state resets on every cold start so
 * a driftMap approach doesn't work. Instead we use a time-based
 * deterministic calculation: the number of spaces decrements based on
 * how many 30-second windows have elapsed since a fixed epoch, seeded
 * with the slug so each competition drifts independently.
 *
 * This produces a number that visibly decreases over a demo session
 * without needing a database or persistent state.
 */
export const dynamic = 'force-dynamic';

function simulateSpaces(slug: string, initial: number): number {
  const seed = slug.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const now = Date.now();
  const epochStart = Math.floor(now / 86_400_000) * 86_400_000;

  // Cap at 10 windows max so spaces never drift to zero across a full day
  const windows = Math.min(Math.floor((now - epochStart) / 30_000), 10);

  let spaces = initial;
  for (let i = 0; i < windows && spaces > 0; i++) {
    const rand = ((seed * 1103515245 + i * 12345) & 0x7fffffff) / 0x7fffffff;
    if (rand < 0.2) {
      spaces = Math.max(0, spaces - 1);
    }
  }

  return spaces;
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const competition = getCompetitionBySlug(slug);

  if (!competition) {
    return NextResponse.json(
      { error: 'Competition not found' },
      { status: 404 },
    );
  }

  const spacesRemaining = simulateSpaces(slug, competition.spacesRemaining);

  return NextResponse.json(
    {
      slug,
      spacesRemaining,
      totalSpaces: competition.totalSpaces,
      updatedAt: new Date().toISOString(),
    },
    {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    },
  );
}
