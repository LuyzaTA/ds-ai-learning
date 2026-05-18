import { Table } from 'lucide-react';
import { clsx } from 'clsx';
import type { TableCell as TableCellType } from '@/types/notebook';

interface Props {
  cell: TableCellType;
}

export function TableCell({ cell }: Props) {
  return (
    <div className="space-y-2">
      {cell.title && (
        <div className="flex items-center gap-2">
          <Table className="w-4 h-4 text-slate-500" />
          <h3 className="text-sm font-bold text-slate-800">{cell.title}</h3>
        </div>
      )}
      <div className="rounded-xl border border-slate-200 overflow-hidden shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-200">
                {cell.headers.map((h, i) => (
                  <th key={i} className="px-4 py-3 text-left text-xs font-bold text-slate-700 uppercase tracking-wide whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cell.rows.map((row, ri) => (
                <tr key={ri} className={clsx('border-b border-slate-100', ri % 2 === 0 ? 'bg-white' : 'bg-slate-50')}>
                  {row.map((cell_, ci) => (
                    <td key={ci} className="px-4 py-3 text-sm text-slate-700 whitespace-nowrap">
                      {String(cell_)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {cell.caption && (
          <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100">
            <p className="text-xs text-slate-500 italic">{cell.caption}</p>
          </div>
        )}
      </div>
    </div>
  );
}
