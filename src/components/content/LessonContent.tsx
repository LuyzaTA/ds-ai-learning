'use client';

import type { ContentBlock } from '@/types/curriculum';
import { MathBlock }     from '@/components/ui/MathBlock';
import { CodeBlock }     from '@/components/ui/CodeBlock';
import { ELI5Block }     from '@/components/ui/ELI5Block';
import { Quiz }          from '@/components/ui/Quiz';
import { Callout }       from '@/components/ui/Callout';
import { KeyTakeaways }  from '@/components/ui/KeyTakeaways';
import { DiagramBlock }  from '@/components/ui/DiagramBlock';
import { CompareBlock }  from '@/components/ui/CompareBlock';

interface LessonContentProps {
  blocks: ContentBlock[];
  simpleMode?: boolean;
}

function renderMarkdown(text: string): string {
  return text
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>[\s\S]*<\/li>)/, '<ul>$1</ul>');
}

export function LessonContent({ blocks, simpleMode = false }: LessonContentProps) {
  return (
    <div className="max-w-3xl mx-auto">
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'text':
            return (
              <div
                key={i}
                className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-800 prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-3 prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-2 prose-p:text-slate-700 prose-p:leading-relaxed prose-strong:text-slate-800 prose-code:bg-slate-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-li:text-slate-700"
                dangerouslySetInnerHTML={{ __html: renderMarkdown(block.content) }}
              />
            );

          case 'math':
            return (
              <MathBlock
                key={i}
                latex={block.latex}
                displayMode={block.displayMode}
                caption={block.caption}
              />
            );

          case 'code':
            return (
              <CodeBlock
                key={i}
                code={block.code}
                language={block.language}
                caption={block.caption}
              />
            );

          case 'eli5':
            return <ELI5Block key={i} content={block.content} />;

          case 'quiz':
            return (
              <Quiz
                key={i}
                title={block.title}
                questions={block.questions}
              />
            );

          case 'callout':
            return (
              <Callout
                key={i}
                variant={block.variant}
                title={block.title}
                content={block.content}
              />
            );

          case 'keyTakeaways':
            return <KeyTakeaways key={i} items={block.items} />;

          case 'summary':
            return (
              <div key={i} className="my-6 rounded-xl bg-slate-50 border border-slate-200 p-5">
                <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-2">Summary</h3>
                <p className="text-slate-700 text-sm leading-relaxed">{block.content}</p>
              </div>
            );

          case 'diagram':
            return (
              <DiagramBlock key={i} title={block.title} lines={block.lines} />
            );

          case 'compare':
            return (
              <CompareBlock
                key={i}
                title={block.title}
                left={block.left}
                right={block.right}
              />
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
