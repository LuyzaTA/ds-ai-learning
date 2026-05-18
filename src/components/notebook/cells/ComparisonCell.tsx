import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import type { ComparisonCell as ComparisonCellType } from '@/types/notebook';

interface Props {
  cell: ComparisonCellType;
}

export function ComparisonCell({ cell }: Props) {
  return (
    <div className="space-y-3">
      {cell.title && (
        <h3 className="text-sm font-bold text-slate-800">{cell.title}</h3>
      )}
      <div className={`grid gap-4 ${cell.items.length === 2 ? 'sm:grid-cols-2' : cell.items.length === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'}`}>
        {cell.items.map((item, i) => (
          <div key={i} className="rounded-xl border border-slate-200 bg-white p-4 shadow-soft">
            <h4 className="text-sm font-bold text-slate-800 mb-3 pb-2 border-b border-slate-100">
              {item.label}
            </h4>

            {item.pros.length > 0 && (
              <div className="mb-3">
                <div className="text-xs font-semibold text-emerald-600 mb-1.5 uppercase tracking-wide">Pros</div>
                <ul className="space-y-1">
                  {item.pros.map((p, pi) => (
                    <li key={pi} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {item.cons.length > 0 && (
              <div className="mb-3">
                <div className="text-xs font-semibold text-rose-600 mb-1.5 uppercase tracking-wide">Cons</div>
                <ul className="space-y-1">
                  {item.cons.map((c, ci) => (
                    <li key={ci} className="flex items-start gap-2 text-xs text-slate-700">
                      <XCircle className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {item.whenToUse && (
              <div className="bg-brand-50 rounded-lg p-2.5 border border-brand-100">
                <div className="flex items-start gap-1.5">
                  <ArrowRight className="w-3 h-3 text-brand-500 shrink-0 mt-0.5" />
                  <p className="text-xs text-brand-800">{item.whenToUse}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
