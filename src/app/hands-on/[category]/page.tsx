'use client';

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Clock, CheckCircle2, Star } from 'lucide-react';
import { clsx } from 'clsx';
import { Header } from '@/components/layout/Header';
import { getCategoryById, notebookCategories } from '@/data/notebooks';
import { useNotebookStore } from '@/store/notebookStore';
import { useTranslation } from '@/hooks/useTranslation';
import type { NotebookCategoryId, Difficulty } from '@/types/notebook';

const DIFFICULTY_STYLES: Record<Difficulty, string> = {
  beginner:     'bg-emerald-100 text-emerald-700 border-emerald-200',
  intermediate: 'bg-amber-100 text-amber-700 border-amber-200',
  advanced:     'bg-rose-100 text-rose-700 border-rose-200',
};

const CAT_GRADIENTS: Record<NotebookCategoryId, string> = {
  'machine-learning': 'from-brand-50 to-brand-100 border-brand-200',
  'deep-learning':    'from-violet-50 to-violet-100 border-violet-200',
  'nlp':              'from-emerald-50 to-emerald-100 border-emerald-200',
  'generative-ai':    'from-amber-50 to-amber-100 border-amber-200',
  'computer-vision':  'from-rose-50 to-rose-100 border-rose-200',
  'time-series':      'from-cyan-50 to-cyan-100 border-cyan-200',
};

const CAT_TEXT: Record<NotebookCategoryId, string> = {
  'machine-learning': 'text-brand-700',
  'deep-learning':    'text-violet-700',
  'nlp':              'text-emerald-700',
  'generative-ai':    'text-amber-700',
  'computer-vision':  'text-rose-700',
  'time-series':      'text-cyan-700',
};

const CAT_ICON_BG: Record<NotebookCategoryId, string> = {
  'machine-learning': 'bg-brand-100',
  'deep-learning':    'bg-violet-100',
  'nlp':              'bg-emerald-100',
  'generative-ai':    'bg-amber-100',
  'computer-vision':  'bg-rose-100',
  'time-series':      'bg-cyan-100',
};

interface PageProps {
  params: { category: string };
}

export default function CategoryPage({ params }: PageProps) {
  const category = getCategoryById(params.category as NotebookCategoryId);
  if (!category) notFound();

  const { completedNotebooks, bookmarkedNotebooks } = useNotebookStore();
  const t = useTranslation();
  const completedCount = category.notebooks.filter(n => completedNotebooks.includes(n.id)).length;

  return (
    <div className="min-h-screen">
      <Header
        breadcrumb={[
          { label: 'Hands-On', href: '/hands-on' },
          { label: category.title },
        ]}
      />

      <div className="px-6 py-10 max-w-6xl mx-auto">
        {/* Category Header */}
        <div className={clsx('rounded-2xl border bg-gradient-to-br p-8 mb-10', CAT_GRADIENTS[category.id])}>
          <div className="flex items-start gap-5">
            <div className={clsx('w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shrink-0', CAT_ICON_BG[category.id])}>
              {category.icon}
            </div>
            <div className="flex-1">
              <h1 className={clsx('text-3xl font-extrabold mb-2', CAT_TEXT[category.id])}>
                {category.title}
              </h1>
              <p className="text-slate-700 text-base leading-relaxed max-w-2xl">{category.description}</p>
              <div className="flex items-center gap-4 mt-4 text-sm text-slate-600">
                <span>{category.notebooks.length} {t.handsOn.category.notebooks}</span>
                <span>•</span>
                <span>{completedCount} {t.handsOn.category.completed}</span>
                <span>•</span>
                <span>{category.notebooks.reduce((s,n) => s + n.estimatedMinutes, 0)} {t.handsOn.category.minTotal}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Notebooks Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {category.notebooks.map(nb => {
            const isDone       = completedNotebooks.includes(nb.id);
            const isBookmarked = bookmarkedNotebooks.includes(nb.id);

            return (
              <Link
                key={nb.id}
                href={`/hands-on/${category.id}/${nb.id}`}
                className="group bg-white rounded-2xl border border-slate-200 p-5 shadow-soft hover:shadow-hover hover:-translate-y-0.5 transition-all duration-200 flex flex-col"
              >
                {/* Top row */}
                <div className="flex items-start justify-between mb-3">
                  <span className={clsx('text-xs font-semibold px-2.5 py-1 rounded-full border', DIFFICULTY_STYLES[nb.difficulty])}>
                    {nb.difficulty}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {isBookmarked && <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />}
                    {isDone && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                  </div>
                </div>

                {/* Title + description */}
                <h3 className={clsx('text-sm font-bold text-slate-800 mb-1.5 group-hover:underline', isDone && 'text-emerald-700')}>
                  {nb.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-4 flex-1">{nb.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {nb.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-100 pt-3">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {nb.estimatedMinutes} min
                  </div>
                  <div className={clsx('flex items-center gap-1 font-medium group-hover:gap-1.5 transition-all', CAT_TEXT[category.id])}>
                    {t.handsOn.category.open} <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Other categories quick nav */}
        <div className="mt-12">
          <h2 className="text-lg font-bold text-slate-800 mb-4">{t.handsOn.category.otherCategories}</h2>
          <div className="flex flex-wrap gap-3">
            {notebookCategories.filter(c => c.id !== category.id).map(c => (
              <Link
                key={c.id}
                href={`/hands-on/${c.id}`}
                className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-soft"
              >
                <span>{c.icon}</span>
                <span className="font-medium">{c.title}</span>
                <span className="text-xs text-slate-400">({c.notebooks.length})</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
