'use client';

import { useState } from 'react';
import { Copy, Check, Play, Square, ChevronDown, ChevronUp } from 'lucide-react';
import { clsx } from 'clsx';
import { useTranslation } from '@/hooks/useTranslation';
import type { CodeCell as CodeCellType } from '@/types/notebook';

const LANG_COLORS: Record<string, string> = {
  python:     'text-yellow-400',
  javascript: 'text-yellow-300',
  typescript: 'text-blue-400',
  sql:        'text-cyan-400',
  bash:       'text-green-400',
  json:       'text-orange-400',
};

// Minimal syntax highlight — wraps strings, keywords, and comments in spans
function highlight(code: string, lang: string): string {
  if (lang !== 'python' && lang !== 'javascript' && lang !== 'typescript') {
    return escapeHtml(code);
  }
  const pythonKeywords = /\b(import|from|def|class|return|if|else|elif|for|while|in|not|and|or|True|False|None|with|as|try|except|finally|raise|print|lambda|yield|pass|break|continue|global|nonlocal|assert|del)\b/g;
  const jsKeywords     = /\b(const|let|var|function|return|if|else|for|while|class|import|export|from|default|async|await|new|this|typeof|instanceof|true|false|null|undefined|try|catch|finally|throw)\b/g;
  let escaped = escapeHtml(code);
  // Strings
  escaped = escaped.replace(/(&#39;.*?&#39;|&quot;.*?&quot;|`.*?`)/g, '<span class="text-emerald-400">$1</span>');
  // Comments
  escaped = escaped.replace(/(#[^\n]*|\/\/[^\n]*)/g, '<span class="text-slate-500 italic">$1</span>');
  // Numbers
  escaped = escaped.replace(/\b(\d+\.?\d*)\b/g, '<span class="text-orange-300">$1</span>');
  // Keywords
  const kwRe = lang === 'python' ? pythonKeywords : jsKeywords;
  escaped = escaped.replace(kwRe, '<span class="text-violet-400 font-medium">$1</span>');
  // Function calls
  escaped = escaped.replace(/(\w+)(\()/g, '<span class="text-blue-300">$1</span>$2');
  return escaped;
}

function escapeHtml(s: string) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}

interface CodeCellProps {
  cell: CodeCellType;
  index: number;
}

export function CodeCell({ cell, index }: CodeCellProps) {
  const [copied, setCopied] = useState(false);
  const [running, setRunning] = useState(false);
  const [showOutput, setShowOutput] = useState(!!cell.output);
  const [hasRun, setHasRun] = useState(false);
  const t = useTranslation();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(cell.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRun = () => {
    if (running) return;
    setRunning(true);
    setShowOutput(false);
    setTimeout(() => {
      setRunning(false);
      setShowOutput(true);
      setHasRun(true);
    }, 1200 + Math.random() * 800);
  };

  const lang = cell.language?.toLowerCase() ?? 'python';
  const langColor = LANG_COLORS[lang] ?? 'text-slate-400';

  return (
    <div className="group rounded-xl overflow-hidden border border-slate-200 bg-white shadow-soft hover:shadow-card transition-shadow">
      {/* Cell Header */}
      <div className="flex items-center gap-3 px-4 py-2.5 bg-slate-900 border-b border-slate-700">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
        </div>

        <span className={clsx('text-xs font-mono font-semibold uppercase tracking-wider', langColor)}>
          {lang}
        </span>

        {cell.caption && (
          <span className="text-xs text-slate-400 flex-1 truncate ml-1">{cell.caption}</span>
        )}

        <div className="flex items-center gap-2 ml-auto">
          {/* Copy */}
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-md text-slate-400 hover:text-slate-200 hover:bg-slate-700 transition-colors"
            title={t.cells.code.copy}
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          {/* Run button */}
          {cell.runnable && (
            <button
              onClick={handleRun}
              disabled={running}
              className={clsx(
                'flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all',
                running
                  ? 'bg-orange-500/20 text-orange-300 cursor-not-allowed'
                  : 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 hover:text-emerald-200'
              )}
            >
              {running ? (
                <><Square className="w-3 h-3 animate-pulse" /> {t.cells.code.running}</>
              ) : (
                <><Play className="w-3 h-3" /> {t.cells.code.run}</>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Code Area */}
      <div className="bg-slate-950 overflow-x-auto">
        <div className="flex">
          {/* Line numbers */}
          <div className="select-none px-4 py-4 text-right text-slate-600 font-mono text-xs leading-6 border-r border-slate-800 min-w-[3rem]">
            {cell.code.split('\n').map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>
          {/* Code */}
          <pre className="flex-1 px-4 py-4 font-mono text-xs leading-6 text-slate-100 overflow-x-auto">
            <code
              dangerouslySetInnerHTML={{
                __html: highlight(cell.code, lang),
              }}
            />
          </pre>
        </div>
      </div>

      {/* Running animation */}
      {running && (
        <div className="bg-slate-900 border-t border-slate-700 px-4 py-3">
          <div className="flex items-center gap-2 text-orange-300 text-xs font-mono">
            <div className="flex gap-1">
              {[0,1,2].map(i => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-bounce"
                  style={{ animationDelay: `${i * 150}ms` }}
                />
              ))}
            </div>
            {t.cells.code.executing}
          </div>
        </div>
      )}

      {/* Output */}
      {cell.output && (showOutput || !cell.runnable) && (
        <div className="border-t border-slate-700">
          <button
            onClick={() => setShowOutput(!showOutput)}
            className="w-full flex items-center justify-between px-4 py-2 bg-slate-900 text-xs text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          >
            <span className="font-mono">
              {hasRun ? `✓ ${t.cells.code.output}` : t.cells.code.output}
            </span>
            {showOutput ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
          {showOutput && (
            <div className="bg-slate-950 border-t border-slate-800">
              <pre className="px-4 py-4 font-mono text-xs text-emerald-300 leading-6 whitespace-pre-wrap">
                {cell.output}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
