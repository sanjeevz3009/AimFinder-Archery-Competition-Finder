'use client';

import * as React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

// Using a styled native <select> rather than a headless UI library select.
// This avoids the @base-ui/react dependency while keeping full accessibility.
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  placeholder?: string;
}

function Select({ className, children, ...props }: SelectProps) {
  return (
    <div className="relative w-full">
      <select
        data-slot="select"
        className={cn(
          'h-8 w-full appearance-none rounded-lg border border-input bg-transparent py-1 pl-2.5 pr-8 text-sm transition-colors outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
    </div>
  );
}

function SelectItem({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) {
  return <option value={value}>{children}</option>;
}

export { Select, SelectItem };
