'use client';

import { useEffect, useRef } from 'react';

interface MathBlockProps {
  latex: string;
  displayMode?: boolean;
  caption?: string;
}

export function MathBlock({ latex, displayMode = false, caption }: MathBlockProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    import('katex').then((katex) => {
      if (!ref.current) return;
      katex.default.render(latex, ref.current, {
        displayMode,
        throwOnError: false,
        strict: false,
      });
    });
  }, [latex, displayMode]);

  if (displayMode) {
    return (
      <figure className="my-6 flex flex-col items-center">
        <div
          ref={ref}
          className="overflow-x-auto max-w-full py-2 px-4 bg-slate-50 rounded-xl border border-slate-200"
        />
        {caption && (
          <figcaption className="mt-2 text-sm text-slate-500 text-center max-w-lg">
            {caption}
          </figcaption>
        )}
      </figure>
    );
  }

  return <span ref={ref} className="inline-block" />;
}
