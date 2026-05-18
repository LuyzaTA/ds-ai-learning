import type { StepsCell as StepsCellType } from '@/types/notebook';
import { clsx } from 'clsx';

interface Props {
  cell: StepsCellType;
}

export function StepsCell({ cell }: Props) {
  return (
    <div className="space-y-3">
      {cell.title && (
        <h3 className="text-sm font-bold text-slate-800">{cell.title}</h3>
      )}
      <div className="relative">
        {/* Vertical connector */}
        <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-slate-200" aria-hidden />

        <div className="space-y-3">
          {cell.steps.map((step, i) => (
            <div key={i} className="flex gap-4">
              {/* Step number circle */}
              <div className="relative z-10 w-12 h-12 rounded-full bg-brand-600 flex items-center justify-center shrink-0 shadow-soft">
                {step.icon ? (
                  <span className="text-lg leading-none">{step.icon}</span>
                ) : (
                  <span className="text-sm font-bold text-white">{step.step}</span>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 bg-white rounded-xl border border-slate-200 p-4 shadow-soft">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold text-brand-500 uppercase tracking-wide">Step {step.step}</span>
                </div>
                <h4 className="text-sm font-bold text-slate-800 mb-1.5">{step.title}</h4>
                <p className="text-sm text-slate-600 leading-relaxed">{step.description}</p>
                {step.code && (
                  <pre className="mt-3 bg-slate-950 text-emerald-300 text-xs p-3 rounded-lg overflow-x-auto font-mono">
                    {step.code}
                  </pre>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
