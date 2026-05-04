import type { ContentBlock } from '@/types/curriculum';

/**
 * Converts lesson ContentBlocks into a clean, readable string for TTS.
 * Math formulas are replaced by captions; code blocks are summarised.
 */
export function extractLessonText(blocks: ContentBlock[]): string {
  const parts: string[] = [];

  for (const block of blocks) {
    switch (block.type) {
      case 'text': {
        const clean = block.content
          .replace(/^#{1,3}\s+(.+)$/gm, '$1.')   // headings → plain sentence
          .replace(/\*\*(.+?)\*\*/g, '$1')         // bold
          .replace(/\*(.+?)\*/g, '$1')              // italic
          .replace(/`(.+?)`/g, '$1')               // inline code
          .replace(/^[-*]\s+/gm, '')               // bullet markers
          .replace(/\n{3,}/g, '\n\n')
          .trim();
        if (clean) parts.push(clean);
        break;
      }

      case 'eli5':
        parts.push(`Explain Like I'm Five. ${block.content}`);
        break;

      case 'callout':
        parts.push(`Note: ${block.title}. ${block.content}`);
        break;

      case 'keyTakeaways':
        parts.push(
          `Key takeaways. ${block.items
            .map((item) => item.replace(/\*\*(.+?)\*\*/g, '$1'))
            .join('. ')}.`
        );
        break;

      case 'math':
        if (block.caption) parts.push(`Formula: ${block.caption}`);
        else parts.push('Mathematical formula.');
        break;

      case 'code':
        parts.push(block.caption ? `Code example: ${block.caption}.` : 'Code example.');
        break;

      case 'diagram':
        parts.push(`Diagram: ${block.title}.`);
        break;

      case 'compare':
        parts.push(
          `Comparison — ${block.title}. ` +
          `${block.left.label}: ${block.left.items.join(', ')}. ` +
          `${block.right.label}: ${block.right.items.join(', ')}.`
        );
        break;

      case 'summary':
        parts.push(block.content);
        break;

      case 'quiz':
        // Skip quiz — reading questions aloud would be confusing without interaction
        break;
    }
  }

  return parts.join('\n\n');
}

/** Split a long text into sentence-level chunks (≤ 200 chars) for Chrome's TTS quirks. */
export function chunkText(text: string): string[] {
  const sentences = text.match(/[^.!?]+[.!?]+["']?|[^.!?]+$/g) ?? [text];
  const chunks: string[] = [];
  let current = '';

  for (const sentence of sentences) {
    if ((current + sentence).length > 200) {
      if (current.trim()) chunks.push(current.trim());
      current = sentence;
    } else {
      current += sentence;
    }
  }
  if (current.trim()) chunks.push(current.trim());
  return chunks;
}
