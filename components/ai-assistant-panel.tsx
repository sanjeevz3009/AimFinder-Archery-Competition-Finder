'use client';

import { useChat } from '@ai-sdk/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Send,
  Sparkles,
  Bot,
  User,
  AlertTriangle,
  RefreshCw,
  Square,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const SUGGESTED_PROMPTS = [
  "I've been shooting for 2 months, what competitions should I enter?",
  'What is a WA18 round and is it suitable for beginners?',
  'I shoot recurve in London - what events are coming up?',
  "What's the difference between a Portsmouth and WA18?",
  "I've never competed before, where do I start?",
  'Are there any beginner-friendly competitions near Manchester?',
];

export function AiAssistantPanel() {
  const { messages, sendMessage, status, error, regenerate, stop } =
    useChat();

  const [input, setInput] = useState('');
  const isLoading = status === 'streaming' || status === 'submitted';

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback((force = false) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const distanceFromBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight;
    if (force || distanceFromBottom < 120) {
      container.scrollTop = container.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleSuggestedPrompt = (prompt: string) => {
    setInput(prompt);
    inputRef.current?.focus();
  };

  const handleSend = () => {
    const text = input.trim();
    if (!text || isLoading) return;
    sendMessage({ text });
    setInput('');
    setTimeout(() => scrollToBottom(true), 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const rows = Math.min(Math.max(input.split('\n').length, 2), 4);
  const isEmpty = messages.length === 0;

  return (
    <div
      className="flex flex-col overflow-hidden rounded-xl border border-border bg-card"
      style={{ height: 'calc(100vh - 12rem)' }}
    >
      {/* Header */}
      <div className="flex shrink-0 items-center gap-3 border-b border-border px-6 py-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/20">
          <Sparkles className="h-5 w-5 text-accent" />
        </div>
        <div>
          <h1 className="text-base font-semibold text-foreground">AI Coach</h1>
          <p className="text-xs text-muted-foreground">
            Powered by Claude · Knows all upcoming competitions
          </p>
        </div>
        <div className="ml-auto h-2 w-2 rounded-full bg-accent" />
      </div>

      {/* Messages */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto px-6 py-4"
        aria-live="polite"
        aria-relevant="additions"
      >
        {isEmpty ? (
          <EmptyState onPromptSelect={handleSuggestedPrompt} />
        ) : (
          <div className="space-y-6">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}

            {isLoading && (
              <div className="flex items-start gap-3">
                <Avatar role="assistant" />
                <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm bg-secondary px-4 py-3">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:0ms]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:150ms]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:300ms]" />
                </div>
              </div>
            )}

            {error && (
              <div className="flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/10 p-4">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                <div className="flex-1">
                  <p className="text-sm text-destructive">
                    Something went wrong. Please try again.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => regenerate()}
                  >
                    <RefreshCw className="mr-2 h-3 w-3" />
                    Retry
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Input */}
      <div className="shrink-0 border-t border-border px-4 py-4">
        <div className="flex items-end gap-3">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={rows}
            placeholder="Ask about competitions, rounds, or your level…"
            aria-label="Message the AI coach"
            disabled={isLoading}
            className="flex-1 resize-none rounded-xl border border-input bg-secondary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/50 disabled:opacity-50"
          />
          {isLoading ? (
            <Button
              type="button"
              size="icon"
              onClick={() => stop()}
              className="h-10 w-10 shrink-0 rounded-xl"
            >
              <Square className="h-4 w-4" />
              <span className="sr-only">Stop generating</span>
            </Button>
          ) : (
            <Button
              type="button"
              size="icon"
              disabled={!input.trim()}
              onClick={handleSend}
              className="h-10 w-10 shrink-0 rounded-xl"
            >
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          )}
        </div>
        <p className="mt-2 text-center text-xs text-muted-foreground">
          Press Enter to send · Shift+Enter for new line
        </p>
      </div>
    </div>
  );
}

function EmptyState({
  onPromptSelect,
}: {
  onPromptSelect: (p: string) => void;
}) {
  return (
    <div className="flex flex-col items-center py-8">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/20">
        <Sparkles className="h-8 w-8 text-accent" />
      </div>
      <h2 className="mt-4 text-lg font-semibold text-foreground">
        Ask me anything about archery competitions
      </h2>
      <p className="mt-2 max-w-sm text-center text-sm text-muted-foreground">
        I know every upcoming competition, all round formats, and can recommend
        the right event for your level and location.
      </p>
      <div className="mt-8 w-full max-w-lg space-y-2">
        {SUGGESTED_PROMPTS.map((prompt) => (
          <button
            key={prompt}
            type="button"
            onClick={() => onPromptSelect(prompt)}
            className="w-full cursor-pointer rounded-xl border border-border bg-secondary px-4 py-3 text-left text-sm text-muted-foreground transition-colors hover:border-accent/50 hover:text-foreground"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
}

function Avatar({ role }: { role: 'user' | 'assistant' }) {
  return (
    <div
      className={cn(
        'flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
        role === 'assistant' ? 'bg-accent/20' : 'bg-secondary',
      )}
    >
      {role === 'assistant' ? (
        <Bot className="h-4 w-4 text-accent" />
      ) : (
        <User className="h-4 w-4 text-muted-foreground" />
      )}
    </div>
  );
}

function MessageBubble({
  message,
}: {
  message: {
    id: string;
    role: string;
    parts: Array<{ type: string; text?: string }>;
  };
}) {
  const isUser = message.role === 'user';
  const textContent = message.parts
    .filter((p) => p.type === 'text')
    .map((p) => p.text ?? '')
    .join('');

  return (
    <div className={cn('flex items-start gap-3', isUser && 'flex-row-reverse')}>
      <Avatar role={isUser ? 'user' : 'assistant'} />
      <div
        className={cn(
          'max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed',
          isUser
            ? 'rounded-tr-sm bg-accent text-accent-foreground'
            : 'rounded-tl-sm bg-secondary text-foreground',
        )}
      >
        <MarkdownContent content={textContent} />
      </div>
    </div>
  );
}

function MarkdownContent({ content }: { content: string }) {
  return (
    <div className="space-y-2">
      {content.split(/\n\n+/).map((para, i) => (
        <p key={i}>
          {para.split('\n').map((line, j, arr) => (
            <span key={j}>
              {renderInline(line)}
              {j < arr.length - 1 && <br />}
            </span>
          ))}
        </p>
      ))}
    </div>
  );
}

function renderInline(text: string): React.ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      return (
        <a
          key={i}
          href={link[2]}
          className="text-accent underline underline-offset-2 hover:no-underline"
        >
          {link[1]}
        </a>
      );
    }
    return part;
  });
}
