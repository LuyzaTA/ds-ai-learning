'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { clsx } from 'clsx';
import { ChevronRight, CheckCircle2, Clock, Bookmark, BookmarkCheck } from 'lucide-react';
import { notebookCategories } from '@/data/notebooks';
import { useNotebookStore } from '@/store/notebookStore';
import type { NotebookCategoryId } from '@/types/notebook';

const DIFFICULTY_BADGE = {
  beginner:     'bg-emerald-100 text-emerald-700',
  intermediate: 'bg-amber-100 text-amber-700',
  advanced:     'bg-rose-100 text-rose-700',
};

const CATEGORY_ICONS: Record<NotebookCategoryId, string> = {
  'machine-learning': '🧠',
  'deep-learning':    '🔥',
  'nlp':              '💬',
  'generative-ai':    '✨',
  'computer-vision':  '👁️',
  'time-series':      '📈',
};

interface Props {
  activeCategoryId?: NotebookCategoryId;
  activeNotebookId?: string;
}

export function NotebookSidebar({ activeCategoryId, activeNotebookId }: Props) {
  const pathname = usePathname();
  const { completedNotebooks, bookmarkedNotebooks, toggleBookmark } = useNotebookStore();
  const [openCategories, setOpenCategories] = useState<Set<string>>(
    new Set(activeCategoryId ? [activeCategoryId] : ['machine-learning'])
  );

  const toggleCat = (id: string) => {
    setOpenCategories(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <aside className="w-64 shrink-0 border-r border-slate-200 bg-white overflow-y-auto h-full">
      <div className="p-3">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2 mb-3">Notebooks</p>

        {notebookCategories.map(cat => {
          const isOpen      = openCategories.has(cat.id);
          const completedIn = cat.notebooks.filter(n => completedNotebooks.includes(n.id)).length;

          return (
            <div key={cat.id} className="mb-1">
              {/* Category header */}
              <button
                onClick={() => toggleCat(cat.id)}
                className={clsx(
                  'w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl hover:bg-slate-50 transition-colors',
                  activeCategoryId === cat.id && 'bg-slate-50'
                )}
              >
                <span className="text-base leading-none">{CATEGORY_ICONS[cat.id]}</span>
                <div className="flex-1 text-left min-w-0">
                  <p className="text-xs font-semibold text-slate-700 truncate">{cat.title}</p>
                  <p className="text-xs text-slate-400">{completedIn}/{cat.notebooks.length}</p>
                </div>
                <ChevronRight className={clsx(
                  'w-3.5 h-3.5 text-slate-400 transition-transform shrink-0',
                  isOpen && 'rotate-90'
                )} />
              </button>

              {/* Notebook list */}
              {isOpen && (
                <div className="ml-3 mt-1 border-l border-slate-100 pl-2 space-y-0.5">
                  {cat.notebooks.map(nb => {
                    const isActive    = nb.id === activeNotebookId;
                    const isDone      = completedNotebooks.includes(nb.id);
                    const isBookmarked = bookmarkedNotebooks.includes(nb.id);

                    return (
                      <div key={nb.id} className="flex items-center gap-1">
                        <Link
                          href={`/hands-on/${cat.id}/${nb.id}`}
                          className={clsx(
                            'flex-1 flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs transition-colors min-w-0',
                            isActive
                              ? 'bg-brand-50 text-brand-700 font-medium'
                              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
                          )}
                        >
                          {isDone ? (
                            <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                          ) : (
                            <div className={clsx(
                              'w-3 h-3 rounded-full border shrink-0',
                              isActive ? 'border-brand-400 bg-brand-100' : 'border-slate-300'
                            )} />
                          )}
                          <span className="truncate">{nb.title}</span>
                          <div className="flex items-center gap-1 shrink-0">
                            <Clock className="w-2.5 h-2.5 text-slate-400" />
                            <span className="text-slate-400">{nb.estimatedMinutes}m</span>
                          </div>
                        </Link>

                        <button
                          onClick={(e) => { e.preventDefault(); toggleBookmark(nb.id); }}
                          className="p-1 text-slate-300 hover:text-amber-500 transition-colors shrink-0"
                          title={isBookmarked ? 'Remove bookmark' : 'Bookmark'}
                        >
                          {isBookmarked
                            ? <BookmarkCheck className="w-3 h-3 text-amber-500" />
                            : <Bookmark className="w-3 h-3" />
                          }
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
