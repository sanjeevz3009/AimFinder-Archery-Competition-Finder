import { NextResponse } from 'next/server';
import { getCompetitionBySlug } from '@/lib/data';

/**
 * GET /api/spaces/[slug]
 *
 * Returns current spaces remaining for a competition.
 *
 * Rendering: force-dynamic + no-store - this must never be cached.
 *
 * On Vercel serverless, in-process state resets on every cold start so
 * a driftMap approach doesn't work. Instead we use a time-based
 * deterministic calculation: the number of spaces decrements based on
 * how many 30-second windows have elapsed since a fixed epoch, seeded
 * with the slug so each competition drifts independently.
 *
 * The per-window decrement odds are budgeted so roughly 40% of spaces
 * fill up over a full day, spreading the drift evenly across the whole
 * day rather than only the first few minutes after UTC midnight.
 */
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const WINDOW_MS = 30_000;
const DAY_MS = 86_400_000;
const WINDOWS_PER_DAY = DAY_MS / WINDOW_MS;
const DAY_DECREMENT_FRACTION = 0.4;

function simulateSpaces(slug: string, initial: number): number {
  const seed = slug.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const now = Date.now();
  const epochStart = Math.floor(now / DAY_MS) * DAY_MS;
  const windows = Math.floor((now - epochStart) / WINDOW_MS);

  const decrementBudget = Math.max(1, Math.round(initial * DAY_DECREMENT_FRACTION));
  const decrementProbability = decrementBudget / WINDOWS_PER_DAY;

  let spaces = initial;
  for (let i = 0; i < windows && spaces > 0; i++) {
    const rand = ((seed * 1103515245 + i * 12345) & 0x7fffffff) / 0x7fffffff;
    if (rand < decrementProbability) {
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
