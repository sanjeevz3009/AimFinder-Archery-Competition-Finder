import { anthropic } from '@ai-sdk/anthropic';
import { streamText, convertToCoreMessages } from 'ai';
import { competitions, guides } from '@/lib/data';

/**
 * POST /api/chat
 *
 * Streaming AI assistant powered by Vercel AI SDK + Anthropic Claude.
 *
 * Rendering: force-dynamic - personalised, never cached.
 *
 * The system prompt injects:
 *  1. Full competitions dataset - so the AI can recommend specific events
 *     by name, date, level, location and spaces remaining
 *  2. Full guides content - so it can explain round formats and reference
 *     the correct guide when recommending an event
 *
 * In the next version I am going to:
 *  - Rate-limit by IP or user session
 *  - Strip PII before sending to the model
 *  - Log latency and error rates via Vercel observability
 */
export const dynamic = 'force-dynamic';
export const maxDuration = 30;

// Build context strings injected into the system prompt
function buildCompetitionsContext(): string {
  return competitions
    .map((c) => {
      const spaces =
        c.spacesRemaining === 0
          ? 'FULL'
          : `${c.spacesRemaining} of ${c.totalSpaces} spaces remaining`;

      return `- ${c.title}
  Level: ${c.level} | Round: ${c.round} | ${c.indoorOutdoor}
  Date: ${c.date} at ${c.time} | City: ${c.city}
  Venue: ${c.venue} (${c.postcode})
  Bowstyles: ${c.bowstyles.join(', ')}
  Entry fee: £${c.entryFee} | ${spaces}
  Beginner friendly: ${c.beginnerFriendly ? 'Yes' : 'No'}
  Description: ${c.description}
  URL: /competitions/${c.slug}`;
    })
    .join('\n\n');
}

function buildGuidesContext(): string {
  return guides
    .map((g) => {
      return `- ${g.title} (/guides/${g.slug})
  Distance: ${g.distance} | Target: ${g.targetFace} | Arrows: ${g.arrows}
  Suitable for: ${g.suitableFor.join(', ')}
  Summary: ${g.summary}`;
    })
    .join('\n\n');
}

const SYSTEM_PROMPT = `You are an expert archery coach and competition advisor for AimFinder, a UK platform that helps archers find suitable competitions.

Your job is to help archers - especially beginners and novices - find the right competitions for their level, understand round formats, and feel confident about entering.

AVAILABLE COMPETITIONS:
${buildCompetitionsContext()}

AVAILABLE GUIDES:
${buildGuidesContext()}

INSTRUCTIONS:
- Always recommend specific competitions from the list above by name when relevant
- When recommending a competition, include: the title, date, city, entry fee, and spaces remaining
- Always mention the relevant guide when recommending a round format (e.g. if recommending a WA18 event, mention the WA18 guide at /guides/wa18)
- Format competition names in **bold** and guide links as [Guide Name](/guides/slug)
- Be warm, encouraging and specific - beginners are often nervous about their first competition
- If someone asks about their level, ask follow-up questions: how long they've been shooting, their bowstyle, and their location
- For beginners (shooting < 6 months or first competition), always recommend Beginner or Novice level events, never County or Open
- If spaces are low (< 5 remaining), mention urgency
- Keep responses concise but helpful - 3-5 short paragraphs max
- Always end with a specific action: a competition to enter or a guide to read
- If asked something outside archery competitions (e.g. general chat), gently steer back to helping them find a competition
- Today's date context: competitions in 2026-2027 are upcoming`;

// Route handler
export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    console.log(
      '[chat route] received messages:',
      JSON.stringify(messages, null, 2),
    );

    const result = streamText({
      model: anthropic('claude-haiku-4-5-20251001'),
      system: SYSTEM_PROMPT,
      messages: convertToCoreMessages(messages),
      maxTokens: 600,
      temperature: 0.7,
      onError: (error) => {
        console.error('[chat route] streamText error:', error);
      },
    });

    return result.toDataStreamResponse();
  } catch (err) {
    console.error('[chat route] caught error:', err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
