'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

// Simple accessible tabs built on native HTML - no external dependency.
interface TabsContextValue {
  value: string;
  onChange: (value: string) => void;
}

const TabsContext = React.createContext<TabsContextValue>({
  value: '',
  onChange: () => {},
});

function Tabs({
  defaultValue,
  value: controlledValue,
  onValueChange,
  className,
  children,
  ...props
}: {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  children: React.ReactNode;
} & React.ComponentProps<'div'>) {
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? '');
  const value = controlledValue ?? internalValue;
  const onChange = (v: string) => {
    setInternalValue(v);
    onValueChange?.(v);
  };

  return (
    <TabsContext.Provider value={{ value, onChange }}>
      <div
        data-slot="tabs"
        className={cn('flex flex-col gap-2', className)}
        {...props}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
}

function TabsList({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="tabs-list"
      role="tablist"
      className={cn(
        'inline-flex items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground',
        className,
      )}
      {...props}
    />
  );
}

function TabsTrigger({
  value,
  className,
  children,
  ...props
}: { value: string } & React.ComponentProps<'button'>) {
  const { value: activeValue, onChange } = React.useContext(TabsContext);
  const isActive = activeValue === value;

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      data-slot="tabs-trigger"
      data-active={isActive || undefined}
      onClick={() => onChange(value)}
      className={cn(
        'inline-flex items-center justify-center gap-1.5 rounded-md px-3 py-1 text-sm font-medium whitespace-nowrap transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
        isActive
          ? 'bg-background text-foreground shadow-sm'
          : 'text-muted-foreground hover:text-foreground',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

function TabsContent({
  value,
  className,
  ...props
}: { value: string } & React.ComponentProps<'div'>) {
  const { value: activeValue } = React.useContext(TabsContext);
  if (activeValue !== value) return null;

  return (
    <div
      role="tabpanel"
      data-slot="tabs-content"
      className={cn('flex-1 text-sm outline-none', className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
