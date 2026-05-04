import { Check } from 'lucide-react';
import type { CompareBlock as CompareBlockType } from '@/types/curriculum';

export function CompareBlock({ title, left, right }: Omit<CompareBlockType, 'type'>) {
  return (
    <div className="my-6 rounded-2xl border border-slate-200 overflow-hidden">
      <div className="bg-slate-100 px-4 py-2.5 border-b border-slate-200">
        <span className="text-sm font-semibold text-slate-700">{title}</span>
      </div>
      <div className="grid grid-cols-2 divide-x divide-slate-200">
        <div className="p-4">
          <h4 className="text-xs font-bold uppercase tracking-wide text-brand-700 mb-3">{left.label}</h4>
          <ul className="space-y-2">
            {left.items.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                <Check className="w-3.5 h-3.5 text-brand-500 shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="p-4">
          <h4 className="text-xs font-bold uppercase tracking-wide text-violet-700 mb-3">{right.label}</h4>
          <ul className="space-y-2">
            {right.items.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                <Check className="w-3.5 h-3.5 text-violet-500 shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
