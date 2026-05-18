'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, MessageSquare } from 'lucide-react';
import { clsx } from 'clsx';
import type { InterviewCell as InterviewCellType } from '@/types/notebook';

const DIFFICULTY = {
  easy:   'bg-emerald-100 text-emerald-700 border-emerald-200',
  medium: 'bg-amber-100 text-amber-700 border-amber-200',
  hard:   'bg-rose-100 text-rose-700 border-rose-200',
};

interface Props {
  cell: InterviewCellType;
}

export function InterviewCell({ cell }: Props) {
  const [open, setOpen] = useState<Set<number>>(new Set());

  const toggle = (i: number) => {
    setOpen(prev => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <MessageSquare className="w-4 h-4 text-violet-600" />
        <h3 className="text-sm font-bold text-slate-800">{cell.title ?? 'Interview Questions'}</h3>
      </div>

      <div className="space-y-2">
        {cell.questions.map((q, i) => (
          <div key={i} className="rounded-xl border border-slate-200 bg-white overflow-hidden">
            <button
              onClick={() => toggle(i)}
              className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-slate-50 transition-colors"
            >
              <span className={clsx(
                'shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full border',
                DIFFICULTY[q.difficulty]
              )}>
                {q.difficulty}
              </span>
              <span className="flex-1 text-sm font-medium text-slate-800">{q.question}</span>
              {open.has(i) ? (
                <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
              )}
            </button>

            {open.has(i) && (
              <div className="px-4 pb-4 border-t border-slate-100">
                <div className="pt-3 text-sm text-slate-700 leading-relaxed bg-slate-50 rounded-lg p-4 mt-1">
                  {q.answer}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
