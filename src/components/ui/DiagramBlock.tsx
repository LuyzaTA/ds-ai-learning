interface DiagramBlockProps {
  title: string;
  lines: string[];
}

export function DiagramBlock({ title, lines }: DiagramBlockProps) {
  return (
    <div className="my-6 rounded-2xl border border-slate-200 overflow-hidden">
      <div className="bg-slate-100 px-4 py-2 border-b border-slate-200">
        <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">{title}</span>
      </div>
      <pre className="p-5 bg-white text-sm font-mono text-slate-700 overflow-x-auto leading-relaxed">
        {lines.join('\n')}
      </pre>
    </div>
  );
}
