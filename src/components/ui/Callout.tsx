import { Info, Lightbulb, AlertTriangle, AlertCircle } from 'lucide-react';
import { clsx } from 'clsx';

type Variant = 'info' | 'tip' | 'warning' | 'important';

interface CalloutProps {
  variant: Variant;
  title: string;
  content: string;
}

const config: Record<Variant, { icon: React.ReactNode; styles: string; titleColor: string }> = {
  info: {
    icon:       <Info className="w-4 h-4 text-brand-600" />,
    styles:     'border-brand-200 bg-brand-50',
    titleColor: 'text-brand-800',
  },
  tip: {
    icon:       <Lightbulb className="w-4 h-4 text-emerald-600" />,
    styles:     'border-emerald-200 bg-emerald-50',
    titleColor: 'text-emerald-800',
  },
  warning: {
    icon:       <AlertTriangle className="w-4 h-4 text-amber-600" />,
    styles:     'border-amber-200 bg-amber-50',
    titleColor: 'text-amber-800',
  },
  important: {
    icon:       <AlertCircle className="w-4 h-4 text-rose-600" />,
    styles:     'border-rose-200 bg-rose-50',
    titleColor: 'text-rose-800',
  },
};

export function Callout({ variant, title, content }: CalloutProps) {
  const { icon, styles, titleColor } = config[variant];
  return (
    <div className={clsx('my-5 rounded-xl border p-4', styles)}>
      <div className="flex items-center gap-2 mb-1.5">
        {icon}
        <span className={clsx('text-sm font-semibold', titleColor)}>{title}</span>
      </div>
      <p className="text-sm text-slate-700 leading-relaxed">{content}</p>
    </div>
  );
}
