import { NextResponse } from 'next/server';
import { getCompetitionBySlug } from '@/lib/data';

/**
 * GET /api/spaces/[slug]
 *
 * Returns current spaces remaining for a competition.
 *
 * Rendering: force-dynamic + no-store - this must never be cached.
 * Even on an ISR-cached competition page, this endpoint always
 * returns fresh data. That's the architectural point: static page,
 * dynamic island.
 *
 * In the next version this would query a real booking/ticketing database.
 * For the demo we simulate live drift by randomly decrementing the
 * mock value slightly on each call, so the number visibly changes
 * during a demo session.
 */
export const dynamic = 'force-dynamic';

// Track drift per slug in-process (resets on cold start - fine for demo)
const driftMap = new Map<string, number>();

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

  // Simulate slow drift: each call has a small chance of decrementing
  const current = driftMap.get(slug) ?? competition.spacesRemaining;
  let next = current;

  // ~25% chance of losing a space each poll (realistic for a busy event)
  if (current > 0 && Math.random() < 0.25) {
    next = Math.max(0, current - 1);
  }

  driftMap.set(slug, next);

  return NextResponse.json(
    {
      slug,
      spacesRemaining: next,
      totalSpaces: competition.totalSpaces,
      // Timestamp so the client can show "last updated"
      updatedAt: new Date().toISOString(),
    },
    {
      headers: {
        // Explicitly no-store - never cache this response anywhere
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    },
  );
}
