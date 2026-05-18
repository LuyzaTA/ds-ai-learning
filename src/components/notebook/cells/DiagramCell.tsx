import { GitBranch } from 'lucide-react';
import type { DiagramCell as DiagramCellType } from '@/types/notebook';

interface Props {
  cell: DiagramCellType;
}

export function DiagramCell({ cell }: Props) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-soft">
      {cell.title && (
        <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-100 bg-slate-50">
          <GitBranch className="w-4 h-4 text-slate-500" />
          <span className="text-sm font-semibold text-slate-700">{cell.title}</span>
        </div>
      )}
      <div className="bg-slate-950 overflow-x-auto">
        <pre className="px-6 py-5 font-mono text-xs text-cyan-300 leading-relaxed whitespace-pre">
          {cell.content}
        </pre>
      </div>
    </div>
  );
}
