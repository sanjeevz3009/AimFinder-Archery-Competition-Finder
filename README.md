# AimFinder

A UK archery competition discovery platform. Archers find events that match their level, bowstyle, and location. Organisers list events and manage availability.

**Live demo:** [aimfinder.vercel.app](https://aimfinder.vercel.app)

---

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Components | shadcn/ui (Base UI primitives) |
| AI | Vercel AI SDK v4 + Anthropic Claude |
| Analytics | @vercel/analytics + @vercel/speed-insights |
| Package manager | pnpm |
| Deployment | Vercel |

---

## Rendering strategy

The most deliberate part of this project. Every route has a specific rendering strategy based on how often its data changes and who it's personalised for.

| Route | Strategy | Revalidate | Rationale |
|---|---|---|---|
| `/` | ISR | 1 hour | Homepage content rarely changes - edge-cached for performance |
| `/competitions` | SSR (`force-dynamic`) | - | Filter state lives in `searchParams` - must be server-rendered per request |
| `/competitions/[slug]` | ISR + `generateStaticParams` | 1 hour | 15 paths pre-rendered at build; revalidates hourly for stale content |
| `/guides` | ISR | 24 hours | Round format guides are essentially static reference content |
| `/guides/[slug]` | ISR + `generateStaticParams` | 24 hours | 4 paths pre-rendered; guides change rarely |
| `/organisers` | ISR | 24 hours | Static marketing page |
| `/assistant` | Dynamic (`force-dynamic`) | - | AI responses are personalised - never cached |
| `/api/chat` | Dynamic (`force-dynamic`) | - | Streaming endpoint - `no-store` by definition |
| `/api/spaces/[slug]` | Dynamic (`force-dynamic`) | - | Live availability data - `Cache-Control: no-store` |

**The core principle:** static where possible, dynamic only where necessary. This gives SEO-friendly, edge-served pages for the content that benefits from it, while keeping live and personalised features genuinely fresh.

---

## Architecture decisions

### Dynamic island pattern - live availability on a cached page

Competition detail pages are ISR-cached for speed and SEO. But availability changes in real time as spaces are booked.

The solution: the page renders from cache, but a `LiveSpaces` client component polls `/api/spaces/[slug]` every 30 seconds with `cache: 'no-store'`. The API route is `force-dynamic` with `Cache-Control: no-store` headers.

```
ISR page (edge cache, fast)
  └── <LiveSpaces /> client island
        └── GET /api/spaces/[slug]   ← force-dynamic, no-store
              └── returns { spacesRemaining, totalSpaces, updatedAt }
```

The parent page never becomes dynamic. Only the availability widget pays the dynamic cost.

In the next version, `/api/spaces/[slug]` would query a bookings database. For the demo it simulates gradual drift (25% chance of decrement per poll) to make the live update visible during a demo session.

### AI assistant - context injection over RAG

The AI coach uses Vercel AI SDK `streamText` with the full competitions and guides dataset injected directly into the system prompt.

For 15 competitions and 4 guides this is more practical than a vector database - the entire context fits comfortably within Claude's context window. The model can recommend specific events by name, date, city, entry fee and spaces remaining without a retrieval step.

In the next version with thousands of events, the architecture would shift to a RAG pipeline: embed competition records, store in a vector database (e.g. Vercel Postgres + pgvector), retrieve the top-k relevant events based on the user's query, and inject only those into the prompt.

```
POST /api/chat
  ├── convertToCoreMessages(messages)   ← normalises useChat message format
  ├── streamText({ model, system, messages })
  │     └── system prompt includes all competitions + guides as structured text
  └── result.toDataStreamResponse()     ← Vercel AI SDK streaming response format
```

The client uses `useChat` from `@ai-sdk/react` which handles streaming, message history, loading and error states. Input is managed with local React state and handed off to `handleSubmit` via `formRef.requestSubmit()` - this keeps `useChat` owning the full request lifecycle including message history serialisation.

### Competitions filtering - URL as state

All filter state lives in `searchParams` on the `/competitions` route. This means:

- Filtered views are shareable and bookmarkable by URL
- The browser back button works correctly
- No client-side state to hydrate or sync
- Server-rendered results are immediately crawlable

The tradeoff is the page must be `force-dynamic` (SSR on every request). For a competitions listing with complex filters this is the right call - the alternative would be a static shell with client-side filtering, which loses server rendering and complicates the data fetching story.

Desktop filters apply instantly on every change. Mobile uses an Apply button pattern - users select multiple filters before committing, avoiding a network request per tap on a small screen.

### Mocked backend flows

Register Interest and Organiser submission are demo flows with simulated loading states. In next version:

**Register Interest** would POST to an API route → validate with Zod → write to a bookings table → decrement `spacesRemaining` → call `revalidatePath('/competitions/[slug]')` to bust the ISR cache → send a confirmation email via Resend.

**Organiser submission** would save to a CMS review queue → notify an admin → trigger `revalidatePath` on approval to publish the new competition page.

---

## Project structure

```
app/
  page.tsx                    # Homepage - ISR
  competitions/
    page.tsx                  # Listing - SSR, searchParams filters
    [slug]/
      page.tsx                # Detail - ISR + generateStaticParams
      register-interest-button.tsx
  guides/
    page.tsx                  # Index - ISR
    [slug]/page.tsx           # Detail - ISR + generateStaticParams
  assistant/
    page.tsx                  # AI coach - force-dynamic
  organisers/
    page.tsx                  # Organisers - ISR
    submit-event-button.tsx   # Client component (smooth scroll)
  api/
    chat/route.ts             # Streaming AI - force-dynamic
    spaces/[slug]/route.ts    # Live availability - force-dynamic, no-store

components/
  hero-animation.tsx          # Typewriter + sequential fade-ins
  hero-search.tsx             # Animated placeholder typewriter
  competition-card.tsx        # Used on homepage + competitions listing
  competition-filters.tsx     # Desktop sidebar + mobile sheet filters
  guide-card.tsx              # Used on guides index + guide detail
  live-spaces.tsx             # Polls /api/spaces/[slug] every 30s
  ai-assistant-panel.tsx      # Full chat UI, useChat from @ai-sdk/react
  spaces-remaining.tsx        # Colour-coded availability bar
  animated-section.tsx        # IntersectionObserver scroll animations
  level-selector.tsx          # Archer level picker with recommendations
  navbar.tsx                  # Sticky nav, mobile dropdown
  organiser-submit-form.tsx   # Controlled form with success state

lib/
  data.ts                     # TypeScript types + 15 mock competitions + 4 guides
  utils.ts                    # cn(), formatDateShort(), formatDateLong()
```

---

## Running locally

```bash
# Install dependencies
pnpm install

# Add environment variables
echo "ANTHROPIC_API_KEY=your_key_here" > .env.local

# Start dev server
pnpm dev
```

The AI assistant requires an Anthropic API key. All other features work without it.

---

## Next version/ Production considerations

**Caching:** ISR pages are served from Vercel's edge network globally. `revalidate` times are set conservatively - competition detail pages revalidate hourly so stale content never persists beyond an hour without a manual `revalidatePath` call.

**AI cost control:** `maxTokens: 600` caps response length. In production, rate limiting per IP/session would prevent abuse. The system prompt is large (full dataset) - prompt caching via Anthropic's API would reduce latency and cost for repeated calls.

**Observability:** `@vercel/analytics` tracks page views and navigation. `@vercel/speed-insights` captures Core Web Vitals. Both are production-only. The AI route would benefit from logging latency and error rates via Vercel's log drains.

**Scaling the AI context:** The current approach (full dataset in system prompt) works for 15 competitions. Beyond ~200 events, a vector search pipeline over Vercel Postgres + pgvector would retrieve only the top relevant matches, keeping the prompt tight and latency low.
