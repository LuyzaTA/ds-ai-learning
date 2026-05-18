import { Briefcase, Building2 } from 'lucide-react';
import type { BusinessUseCaseCell as BusinessUseCaseCellType } from '@/types/notebook';

interface Props {
  cell: BusinessUseCaseCellType;
}

export function BusinessUseCaseCell({ cell }: Props) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Briefcase className="w-4 h-4 text-emerald-600" />
        <h3 className="text-sm font-bold text-slate-800">
          {cell.title ?? 'Business Use Cases'}
        </h3>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {cell.cases.map((c, i) => (
          <div
            key={i}
            className="rounded-xl border border-slate-200 bg-white p-4 shadow-soft hover:shadow-card transition-shadow"
          >
            <div className="flex items-start gap-3 mb-3">
              <span className="text-2xl leading-none mt-0.5">{c.icon}</span>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    {c.industry}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-800">{c.useCase}</h4>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed mb-3">{c.description}</p>

            <div className="bg-slate-50 rounded-lg p-3 mb-3">
              <p className="text-xs text-slate-700 leading-relaxed italic">"{c.example}"</p>
            </div>

            {c.companies && c.companies.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {c.companies.map((company) => (
                  <span
                    key={company}
                    className="inline-flex items-center gap-1 text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-100"
                  >
                    <Building2 className="w-2.5 h-2.5" />
                    {company}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
