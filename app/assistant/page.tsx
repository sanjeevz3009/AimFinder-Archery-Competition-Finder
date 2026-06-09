import type { Metadata } from 'next';
import { AiAssistantPanel } from '@/components/ai-assistant-panel';

// Dynamic — AI responses are personalised and never cached
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'AI Coach',
  description:
    'Get personalised archery competition recommendations from our AI coach based on your experience, bowstyle, and location.',
};

export default function AssistantPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <AiAssistantPanel />
    </div>
  );
}
