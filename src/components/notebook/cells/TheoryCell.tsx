import { Lightbulb, Info, Star, Calculator } from 'lucide-react';
import { clsx } from 'clsx';
import type { TheoryCell as TheoryCellType } from '@/types/notebook';

const VARIANTS = {
  default: {
    wrapper: 'bg-brand-50 border-brand-200',
    icon: <Info className="w-4 h-4 text-brand-600" />,
    title: 'text-brand-800',
    body: 'text-brand-900',
    border: 'border-l-4 border-brand-400',
  },
  math: {
    wrapper: 'bg-violet-50 border-violet-200',
    icon: <Calculator className="w-4 h-4 text-violet-600" />,
    title: 'text-violet-800',
    body: 'text-violet-900',
    border: 'border-l-4 border-violet-400',
  },
  important: {
    wrapper: 'bg-amber-50 border-amber-200',
    icon: <Star className="w-4 h-4 text-amber-600" />,
    title: 'text-amber-800',
    body: 'text-amber-900',
    border: 'border-l-4 border-amber-400',
  },
  tip: {
    wrapper: 'bg-emerald-50 border-emerald-200',
    icon: <Lightbulb className="w-4 h-4 text-emerald-600" />,
    title: 'text-emerald-800',
    body: 'text-emerald-900',
    border: 'border-l-4 border-emerald-400',
  },
};

interface TheoryCellProps {
  cell: TheoryCellType;
}

export function TheoryCell({ cell }: TheoryCellProps) {
  const v = VARIANTS[cell.variant ?? 'default'];

  return (
    <div className={clsx('rounded-xl border p-5', v.wrapper, v.border)}>
      <div className="flex items-center gap-2 mb-3">
        {v.icon}
        <h3 className={clsx('text-sm font-bold', v.title)}>{cell.title}</h3>
      </div>
      <div className={clsx('text-sm leading-relaxed space-y-2', v.body)}>
        {cell.content.split('\n\n').map((para, i) => (
          <p key={i} className="leading-relaxed">
            {para.split('\n').map((line, j) => {
              const boldLine = line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
              return (
                <span key={j}>
                  <span dangerouslySetInnerHTML={{ __html: boldLine }} />
                  {j < para.split('\n').length - 1 && <br />}
                </span>
              );
            })}
          </p>
        ))}
      </div>
    </div>
  );
}
