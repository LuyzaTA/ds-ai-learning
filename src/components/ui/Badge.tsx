import { clsx } from 'clsx';

type Variant = 'default' | 'blue' | 'emerald' | 'violet' | 'amber' | 'rose' | 'cyan' | 'orange' | 'teal';
type Size    = 'sm' | 'md';

interface BadgeProps {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
}

const variants: Record<Variant, string> = {
  default:  'bg-slate-100 text-slate-700',
  blue:     'bg-brand-100 text-brand-700',
  emerald:  'bg-emerald-100 text-emerald-700',
  violet:   'bg-violet-100 text-violet-700',
  amber:    'bg-amber-100  text-amber-700',
  rose:     'bg-rose-100   text-rose-700',
  cyan:     'bg-cyan-100   text-cyan-700',
  orange:   'bg-orange-100 text-orange-700',
  teal:     'bg-teal-100   text-teal-700',
};

const sizes: Record<Size, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
};

export function Badge({ children, variant = 'default', size = 'sm', className }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1 rounded-full font-medium',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
}
