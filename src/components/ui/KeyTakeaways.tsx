import { CheckCircle2 } from 'lucide-react';

interface KeyTakeawaysProps {
  items: string[];
}

export function KeyTakeaways({ items }: KeyTakeawaysProps) {
  return (
    <div className="my-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
      <h3 className="text-sm font-semibold text-emerald-800 uppercase tracking-wide mb-3 flex items-center gap-2">
        <CheckCircle2 className="w-4 h-4" />
        Key Takeaways
      </h3>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm text-emerald-900">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') }} />
          </li>
        ))}
      </ul>
    </div>
  );
}
