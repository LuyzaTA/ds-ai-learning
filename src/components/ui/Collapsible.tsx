'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { clsx } from 'clsx';

interface CollapsibleProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export function Collapsible({ title, children, defaultOpen = false, className }: CollapsibleProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={clsx('border border-slate-200 rounded-xl overflow-hidden', className)}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 hover:bg-slate-100 transition-colors text-left"
        aria-expanded={open}
      >
        <span className="text-sm font-semibold text-slate-700">{title}</span>
        <ChevronDown
          className={clsx(
            'w-4 h-4 text-slate-500 transition-transform duration-200',
            open && 'rotate-180'
          )}
        />
      </button>
      {open && (
        <div className="px-4 py-4 bg-white border-t border-slate-100 animate-fade-in">
          {children}
        </div>
      )}
    </div>
  );
}
