import type { MarkdownCell as MarkdownCellType } from '@/types/notebook';

interface Props {
  cell: MarkdownCellType;
}

function renderMarkdown(text: string): string {
  return text
    // H1
    .replace(/^# (.+)$/gm, '<h1 class="text-2xl font-extrabold text-slate-800 mb-4 leading-tight">$1</h1>')
    // H2
    .replace(/^## (.+)$/gm, '<h2 class="text-lg font-bold text-slate-800 mb-3 mt-6">$1</h2>')
    // H3
    .replace(/^### (.+)$/gm, '<h3 class="text-base font-bold text-slate-700 mb-2 mt-4">$1</h3>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-slate-900">$1</strong>')
    // Italic
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code class="bg-slate-100 text-rose-600 px-1.5 py-0.5 rounded text-xs font-mono">$1</code>')
    // Blockquote
    .replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-brand-300 pl-4 py-1 text-slate-600 italic my-3">$1</blockquote>')
    // Bullets
    .replace(/^[•\-\*] (.+)$/gm, '<li class="flex items-start gap-2 text-slate-700"><span class="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-400 shrink-0"></span><span>$1</span></li>')
    // Numbered list
    .replace(/^\d+\. (.+)$/gm, '<li class="text-slate-700 ml-4 list-decimal">$1</li>')
    // Wrap consecutive <li> items
    .replace(/(<li[^>]*>.*<\/li>\n?)+/g, (m) => `<ul class="space-y-1.5 my-3">${m}</ul>`)
    // Paragraphs
    .replace(/\n\n(?!<)/g, '</p><p class="text-slate-700 leading-relaxed my-3">')
    // Line breaks
    .replace(/\n(?!<)/g, '<br />');
}

export function MarkdownCell({ cell }: Props) {
  const html = renderMarkdown(cell.content);

  return (
    <div
      className="prose prose-slate max-w-none text-sm leading-relaxed"
      dangerouslySetInnerHTML={{ __html: `<p class="text-slate-700 leading-relaxed">${html}</p>` }}
    />
  );
}
