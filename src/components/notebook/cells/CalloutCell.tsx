import { AlertCircle, Info, Lightbulb, Star, FileText } from 'lucide-react';
import { clsx } from 'clsx';
import type { CalloutCell as CalloutCellType } from '@/types/notebook';

const VARIANTS = {
  info:      { wrapper: 'bg-brand-50 border-brand-200', icon: <Info className="w-4 h-4 text-brand-600" />,       title: 'text-brand-800',   body: 'text-brand-900' },
  warning:   { wrapper: 'bg-amber-50 border-amber-200', icon: <AlertCircle className="w-4 h-4 text-amber-600" />, title: 'text-amber-800',   body: 'text-amber-900' },
  tip:       { wrapper: 'bg-emerald-50 border-emerald-200', icon: <Lightbulb className="w-4 h-4 text-emerald-600" />, title: 'text-emerald-800', body: 'text-emerald-900' },
  important: { wrapper: 'bg-rose-50 border-rose-200',   icon: <Star className="w-4 h-4 text-rose-600" />,        title: 'text-rose-800',    body: 'text-rose-900' },
  note:      { wrapper: 'bg-slate-50 border-slate-200', icon: <FileText className="w-4 h-4 text-slate-600" />,   title: 'text-slate-800',   body: 'text-slate-700' },
};

interface Props {
  cell: CalloutCellType;
}

export function CalloutCell({ cell }: Props) {
  const v = VARIANTS[cell.variant];
  return (
    <div className={clsx('rounded-xl border p-4', v.wrapper)}>
      <div className="flex items-center gap-2 mb-2">
        {v.icon}
        {cell.title && <span className={clsx('text-sm font-bold', v.title)}>{cell.title}</span>}
      </div>
      <div className={clsx('text-sm leading-relaxed space-y-1', v.body)}>
        {cell.content.split('\n').map((line, i) => {
          const bold = line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
          return <p key={i} dangerouslySetInnerHTML={{ __html: bold }} />;
        })}
      </div>
    </div>
  );
}
