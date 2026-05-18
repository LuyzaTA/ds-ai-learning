import { Sigma } from 'lucide-react';
import type { MathCell as MathCellType } from '@/types/notebook';

interface MathCellProps {
  cell: MathCellType;
}

export function MathCell({ cell }: MathCellProps) {
  return (
    <div className="rounded-xl border border-violet-200 bg-gradient-to-br from-violet-50 to-purple-50 overflow-hidden">
      {cell.title && (
        <div className="flex items-center gap-2 px-5 py-3 border-b border-violet-100">
          <Sigma className="w-4 h-4 text-violet-500" />
          <span className="text-sm font-semibold text-violet-800">{cell.title}</span>
        </div>
      )}
      <div className="px-5 py-6 text-center">
        <div className="inline-block bg-white rounded-lg px-8 py-4 shadow-soft border border-violet-100">
          <code className="text-xl font-mono text-slate-800 tracking-wide">{cell.formula}</code>
        </div>
      </div>
      {cell.explanation && (
        <div className="px-5 pb-4 text-sm text-slate-600 leading-relaxed border-t border-violet-100 pt-4 mx-5 -mt-2">
          {cell.explanation}
        </div>
      )}
    </div>
  );
}
