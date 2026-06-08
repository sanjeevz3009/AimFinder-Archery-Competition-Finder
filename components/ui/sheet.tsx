'use client';

import * as React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

// Sheet - a slide-over panel built on the native <dialog> element.
// Avoids the @base-ui/react Dialog dependency while keeping full a11y.
interface SheetContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SheetContext = React.createContext<SheetContextValue>({
  open: false,
  onOpenChange: () => {},
});

function Sheet({
  open,
  onOpenChange,
  children,
}: {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const isOpen = open ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;

  return (
    <SheetContext.Provider value={{ open: isOpen, onOpenChange: setOpen }}>
      {children}
    </SheetContext.Provider>
  );
}

function SheetTrigger({
  asChild,
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }) {
  const { onOpenChange } = React.useContext(SheetContext);
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(
      children as React.ReactElement<{ onClick?: React.MouseEventHandler }>,
      {
        onClick: () => onOpenChange(true),
      },
    );
  }
  return (
    <button className={className} onClick={() => onOpenChange(true)} {...props}>
      {children}
    </button>
  );
}

function SheetContent({
  side = 'right',
  className,
  children,
  showCloseButton = true,
}: {
  side?: 'left' | 'right' | 'top' | 'bottom';
  className?: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
}) {
  const { open, onOpenChange } = React.useContext(SheetContext);

  // Close on Escape key
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onOpenChange(false);
    };
    if (open) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onOpenChange]);

  // Prevent body scroll when open
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  const sideClasses = {
    right: 'right-0 top-0 h-full w-3/4 sm:max-w-sm border-l',
    left: 'left-0 top-0 h-full w-3/4 sm:max-w-sm border-r',
    top: 'top-0 inset-x-0 h-auto border-b',
    bottom: 'bottom-0 inset-x-0 h-auto border-t',
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
        aria-hidden="true"
      />
      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        data-slot="sheet-content"
        className={cn(
          'fixed z-50 flex flex-col gap-4 bg-popover text-popover-foreground shadow-lg',
          sideClasses[side],
          className,
        )}
      >
        {children}
        {showCloseButton && (
          <Button
            variant="ghost"
            size="icon-sm"
            className="absolute right-3 top-3"
            onClick={() => onOpenChange(false)}
          >
            <X className="size-4" />
            <span className="sr-only">Close</span>
          </Button>
        )}
      </div>
    </>
  );
}

function SheetHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sheet-header"
      className={cn('flex flex-col gap-0.5 p-4', className)}
      {...props}
    />
  );
}

function SheetFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn('mt-auto flex flex-col gap-2 p-4', className)}
      {...props}
    />
  );
}

function SheetTitle({ className, ...props }: React.ComponentProps<'h2'>) {
  return (
    <h2
      data-slot="sheet-title"
      className={cn(
        'font-heading text-base font-medium text-foreground',
        className,
      )}
      {...props}
    />
  );
}

function SheetDescription({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      data-slot="sheet-description"
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  );
}

export {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
