'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Clock, CheckCircle2, BookmarkCheck, Bookmark,
  ChevronLeft, ChevronRight, Tags, ArrowLeft
} from 'lucide-react';
import { clsx } from 'clsx';
import { Header } from '@/components/layout/Header';
import { NotebookSidebar } from '@/components/notebook/NotebookSidebar';
import { NotebookCell } from '@/components/notebook/NotebookCell';
import { getNotebookById } from '@/data/notebooks';
import { useNotebookStore } from '@/store/notebookStore';
import { useTranslation } from '@/hooks/useTranslation';
import type { NotebookCategoryId, Difficulty } from '@/types/notebook';

const DIFFICULTY_STYLES: Record<Difficulty, string> = {
  beginner:     'bg-emerald-100 text-emerald-700 border border-emerald-200',
  intermediate: 'bg-amber-100 text-amber-700 border border-amber-200',
  advanced:     'bg-rose-100 text-rose-700 border border-rose-200',
};

const CAT_TEXT: Record<NotebookCategoryId, string> = {
  'machine-learning': 'text-brand-700',
  'deep-learning':    'text-violet-700',
  'nlp':              'text-emerald-700',
  'generative-ai':    'text-amber-700',
  'computer-vision':  'text-rose-700',
  'time-series':      'text-cyan-700',
};

interface PageProps {
  params: { category: string; notebookId: string };
}

export default function NotebookPage({ params }: PageProps) {
  const result = getNotebookById(params.notebookId);
  if (!result) notFound();

  const { notebook, category } = result;
  const { completedNotebooks, bookmarkedNotebooks, markComplete, markIncomplete, toggleBookmark, setLastVisited } = useNotebookStore();
  const t = useTranslation();

  const isDone       = completedNotebooks.includes(notebook.id);
  const isBookmarked = bookmarkedNotebooks.includes(notebook.id);

  useEffect(() => {
    setLastVisited(notebook.id);
  }, [notebook.id, setLastVisited]);

  // Find prev/next in category
  const catNotebooks  = category.notebooks;
  const currentIndex  = catNotebooks.findIndex(n => n.id === notebook.id);
  const prevNotebook  = currentIndex > 0 ? catNotebooks[currentIndex - 1] : null;
  const nextNotebook  = currentIndex < catNotebooks.length - 1 ? catNotebooks[currentIndex + 1] : null;

  const [showProgress, setShowProgress] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        breadcrumb={[
          { label: 'Hands-On', href: '/hands-on' },
          { label: category.title, href: `/hands-on/${category.id}` },
          { label: notebook.title },
        ]}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Notebook sidebar */}
        <div className="hidden lg:flex h-[calc(100vh-3.5rem)] sticky top-14 overflow-y-auto">
          <NotebookSidebar
            activeCategoryId={category.id as NotebookCategoryId}
            activeNotebookId={notebook.id}
          />
        </div>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-6 py-8">
            {/* Notebook Header */}
            <div className="mb-8">
              <Link
                href={`/hands-on/${category.id}`}
                className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-700 mb-4 transition-colors"
              >
                <ArrowLeft className="w-3 h-3" />
                {t.handsOn.notebook.backTo(category.title)}
              </Link>

              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{category.icon}</span>
                    <span className={clsx('text-xs font-semibold', CAT_TEXT[category.id as NotebookCategoryId])}>
                      {category.title}
                    </span>
                  </div>
                  <h1 className="text-3xl font-extrabold text-slate-800 leading-tight">
                    {notebook.title}
                  </h1>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => toggleBookmark(notebook.id)}
                    className={clsx(
                      'p-2.5 rounded-xl border transition-colors',
                      isBookmarked
                        ? 'bg-amber-50 border-amber-200 text-amber-600'
                        : 'bg-white border-slate-200 text-slate-400 hover:text-amber-500 hover:border-amber-200'
                    )}
                    title={isBookmarked ? (t.common.completed) : t.common.open}
                  >
                    {isBookmarked
                      ? <BookmarkCheck className="w-4 h-4" />
                      : <Bookmark className="w-4 h-4" />
                    }
                  </button>

                  <button
                    onClick={() => isDone ? markIncomplete(notebook.id) : markComplete(notebook.id)}
                    className={clsx(
                      'flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all',
                      isDone
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-700 hover:bg-emerald-100'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700'
                    )}
                  >
                    <CheckCircle2 className={clsx('w-4 h-4', isDone ? 'text-emerald-500' : 'text-slate-400')} />
                    {isDone ? t.handsOn.notebook.completed : t.handsOn.notebook.markComplete}
                  </button>
                </div>
              </div>

              {/* Meta badges */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className={clsx('text-xs font-semibold px-2.5 py-1 rounded-full', DIFFICULTY_STYLES[notebook.difficulty])}>
                  {notebook.difficulty}
                </span>
                <span className="flex items-center gap-1 text-xs text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                  <Clock className="w-3 h-3" />
                  {notebook.estimatedMinutes} min
                </span>
              </div>

              {/* Description */}
              <p className="text-slate-600 leading-relaxed">{notebook.description}</p>

              {/* Tags */}
              {notebook.tags.length > 0 && (
                <div className="flex items-center gap-2 mt-3 flex-wrap">
                  <Tags className="w-3.5 h-3.5 text-slate-400" />
                  {notebook.tags.map(tag => (
                    <span key={tag} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Prerequisites */}
              {notebook.prerequisites && notebook.prerequisites.length > 0 && (
                <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-xl">
                  <p className="text-xs text-amber-800">
                    <strong>{t.handsOn.notebook.prerequisites}</strong>{' '}
                    {notebook.prerequisites.map((p, i) => (
                      <span key={p}>
                        {i > 0 && ', '}
                        <Link href={`/hands-on/${category.id}/${p}`} className="underline hover:text-amber-900">
                          {p.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                        </Link>
                      </span>
                    ))}
                  </p>
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="border-b border-slate-200 mb-8" />

            {/* Notebook Cells */}
            <div className="space-y-6">
              {notebook.cells.map((cell, index) => (
                <NotebookCell key={cell.id} cell={cell} index={index} />
              ))}
            </div>

            {/* Complete CTA */}
            <div className="mt-12 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl text-center">
              {isDone ? (
                <>
                  <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                  <h3 className="text-lg font-bold text-emerald-800 mb-1">{t.handsOn.notebook.notebookComplete}</h3>
                  <p className="text-sm text-emerald-700">{t.handsOn.notebook.notebookCompletedDesc}</p>
                </>
              ) : (
                <>
                  <h3 className="text-lg font-bold text-slate-800 mb-2">{t.handsOn.notebook.doneQuestion}</h3>
                  <button
                    onClick={() => markComplete(notebook.id)}
                    className="inline-flex items-center gap-2 bg-emerald-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-emerald-700 transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4" /> {t.handsOn.notebook.markAsComplete}
                  </button>
                </>
              )}
            </div>

            {/* Prev / Next navigation */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              {prevNotebook ? (
                <Link
                  href={`/hands-on/${category.id}/${prevNotebook.id}`}
                  className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl p-4 hover:bg-slate-50 hover:shadow-soft transition-all group"
                >
                  <ChevronLeft className="w-5 h-5 text-slate-400 shrink-0" />
                  <div className="text-left min-w-0">
                    <div className="text-xs text-slate-400 mb-0.5">{t.handsOn.notebook.previous}</div>
                    <div className="text-sm font-semibold text-slate-700 truncate group-hover:text-brand-600">
                      {prevNotebook.title}
                    </div>
                  </div>
                </Link>
              ) : <div />}

              {nextNotebook ? (
                <Link
                  href={`/hands-on/${category.id}/${nextNotebook.id}`}
                  className="flex items-center justify-end gap-3 bg-white border border-slate-200 rounded-xl p-4 hover:bg-slate-50 hover:shadow-soft transition-all group"
                >
                  <div className="text-right min-w-0">
                    <div className="text-xs text-slate-400 mb-0.5">{t.handsOn.notebook.next}</div>
                    <div className="text-sm font-semibold text-slate-700 truncate group-hover:text-brand-600">
                      {nextNotebook.title}
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400 shrink-0" />
                </Link>
              ) : <div />}
            </div>

            {/* Related notebooks */}
            {notebook.relatedNotebooks && notebook.relatedNotebooks.length > 0 && (
              <div className="mt-8">
                <h3 className="text-sm font-bold text-slate-700 mb-3">{t.handsOn.notebook.relatedNotebooks}</h3>
                <div className="flex flex-wrap gap-2">
                  {notebook.relatedNotebooks.map(rid => {
                    const rel = getNotebookById(rid);
                    if (!rel) return null;
                    return (
                      <Link
                        key={rid}
                        href={`/hands-on/${rel.category.id}/${rid}`}
                        className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-brand-700 transition-colors"
                      >
                        <span>{rel.category.icon}</span>
                        {rel.notebook.title}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
