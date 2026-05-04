'use client';

import { useState } from 'react';
import { Check, Copy, Terminal } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language: string;
  caption?: string;
}

const LANGUAGE_LABELS: Record<string, string> = {
  python: 'Python',
  javascript: 'JavaScript',
  typescript: 'TypeScript',
  sql: 'SQL',
  bash: 'Bash',
  dockerfile: 'Dockerfile',
  text: 'Text',
  yaml: 'YAML',
  json: 'JSON',
};

export function CodeBlock({ code, language, caption }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lang = LANGUAGE_LABELS[language] ?? language;

  return (
    <div className="my-6 rounded-2xl overflow-hidden border border-slate-200 shadow-soft">
      {/* Header */}
      <div className="flex items-center justify-between bg-slate-800 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-medium text-slate-300">{lang}</span>
          {caption && (
            <>
              <span className="text-slate-600">·</span>
              <span className="text-xs text-slate-400">{caption}</span>
            </>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors px-2 py-1 rounded-md hover:bg-slate-700"
          aria-label="Copy code"
        >
          {copied ? (
            <><Check className="w-3.5 h-3.5 text-emerald-400" /><span className="text-emerald-400">Copied!</span></>
          ) : (
            <><Copy className="w-3.5 h-3.5" /><span>Copy</span></>
          )}
        </button>
      </div>

      {/* Code */}
      <pre className="overflow-x-auto p-5 bg-slate-900 text-sm leading-relaxed">
        <code className="text-slate-100 font-mono">
          {code}
        </code>
      </pre>
    </div>
  );
}
