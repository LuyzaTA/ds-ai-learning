import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { clsx } from 'clsx';
import type { MetricsCell as MetricsCellType } from '@/types/notebook';

const STATUS_STYLES = {
  good:    { badge: 'bg-emerald-100 text-emerald-700 border-emerald-200', icon: <TrendingUp className="w-3 h-3" /> },
  warning: { badge: 'bg-amber-100 text-amber-700 border-amber-200',       icon: <TrendingDown className="w-3 h-3" /> },
  info:    { badge: 'bg-brand-100 text-brand-700 border-brand-200',        icon: <Minus className="w-3 h-3" /> },
};

interface Props {
  cell: MetricsCellType;
}

export function MetricsCell({ cell }: Props) {
  return (
    <div className="space-y-3">
      {cell.title && (
        <h3 className="text-sm font-bold text-slate-800">{cell.title}</h3>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {cell.metrics.map((m, i) => {
          const statusKey = m.status ?? 'info';
          const s = STATUS_STYLES[statusKey];

          return (
            <div
              key={i}
              className="rounded-xl border border-slate-200 bg-white p-4 shadow-soft text-center"
            >
              <div className={clsx(
                'inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border mb-2',
                s.badge
              )}>
                {s.icon}
                {statusKey.charAt(0).toUpperCase() + statusKey.slice(1)}
              </div>
              <div className="text-lg font-bold text-slate-800 mb-0.5 font-mono">{m.value}</div>
              <div className="text-xs font-semibold text-slate-600 mb-1">{m.name}</div>
              {m.description && (
                <p className="text-xs text-slate-400 leading-tight">{m.description}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
