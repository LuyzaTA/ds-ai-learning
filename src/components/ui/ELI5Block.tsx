import { Lightbulb } from 'lucide-react';

interface ELI5BlockProps {
  content: string;
}

export function ELI5Block({ content }: ELI5BlockProps) {
  return (
    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 my-6">
      <div className="flex items-center gap-2 mb-3">
        <div className="flex items-center justify-center w-7 h-7 rounded-full bg-amber-200">
          <Lightbulb className="w-4 h-4 text-amber-700" />
        </div>
        <span className="text-sm font-semibold text-amber-800 tracking-wide uppercase">
          Explain Like I&apos;m 5
        </span>
      </div>
      <p className="text-amber-900 text-base leading-relaxed whitespace-pre-line">{content}</p>
    </div>
  );
}
