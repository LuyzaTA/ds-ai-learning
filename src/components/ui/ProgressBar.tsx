'use client';

import { clsx } from 'clsx';

interface ProgressBarProps {
  value: number;          // 0–100
  max?: number;
  label?: string;
  showPercent?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: 'blue' | 'emerald' | 'violet' | 'amber';
  className?: string;
}

const colors = {
  blue:    'bg-brand-500',
  emerald: 'bg-emerald-500',
  violet:  'bg-violet-500',
  amber:   'bg-amber-400',
};

const heights = {
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-4',
};

export function ProgressBar({
  value,
  max = 100,
  label,
  showPercent = false,
  size = 'md',
  color = 'blue',
  className,
}: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={clsx('w-full', className)}>
      {(label || showPercent) && (
        <div className="flex justify-between items-center mb-1.5">
          {label     && <span className="text-xs font-medium text-slate-600">{label}</span>}
          {showPercent && <span className="text-xs text-slate-500">{Math.round(pct)}%</span>}
        </div>
      )}
      <div className={clsx('w-full bg-slate-200 rounded-full overflow-hidden', heights[size])}>
        <div
          className={clsx('h-full rounded-full transition-all duration-500', colors[color])}
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
    </div>
  );
}
