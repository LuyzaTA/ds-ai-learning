'use client';

import Link from 'next/link';
import { ArrowRight, BookOpen, Clock, CheckCircle2, Zap, Star } from 'lucide-react';
import { clsx } from 'clsx';
import { Header } from '@/components/layout/Header';
import { notebookCategories, getTotalNotebookCount } from '@/data/notebooks';
import { useNotebookStore } from '@/store/notebookStore';
import { useTranslation } from '@/hooks/useTranslation';
import type { NotebookCategoryId } from '@/types/notebook';

const CAT_GRADIENTS: Record<NotebookCategoryId, string> = {
  'machine-learning': 'from-brand-50 to-brand-100 border-brand-200',
  'deep-learning':    'from-violet-50 to-violet-100 border-violet-200',
  'nlp':              'from-emerald-50 to-emerald-100 border-emerald-200',
  'generative-ai':    'from-amber-50 to-amber-100 border-amber-200',
  'computer-vision':  'from-rose-50 to-rose-100 border-rose-200',
  'time-series':      'from-cyan-50 to-cyan-100 border-cyan-200',
};

const CAT_ICON_BG: Record<NotebookCategoryId, string> = {
  'machine-learning': 'bg-brand-100 text-brand-600',
  'deep-learning':    'bg-violet-100 text-violet-600',
  'nlp':              'bg-emerald-100 text-emerald-600',
  'generative-ai':    'bg-amber-100 text-amber-600',
  'computer-vision':  'bg-rose-100 text-rose-600',
  'time-series':      'bg-cyan-100 text-cyan-600',
};

const CAT_TEXT: Record<NotebookCategoryId, string> = {
  'machine-learning': 'text-brand-700',
  'deep-learning':    'text-violet-700',
  'nlp':              'text-emerald-700',
  'generative-ai':    'text-amber-700',
  'computer-vision':  'text-rose-700',
  'time-series':      'text-cyan-700',
};

export default function HandsOnPage() {
  const { completedNotebooks } = useNotebookStore();
  const t = useTranslation();
  const total = getTotalNotebookCount();
  const done  = completedNotebooks.length;

  const featuredNotebooks = [
    { id: 'linear-regression',  category: 'machine-learning' as NotebookCategoryId, label: t.handsOn.landing.labels.bestStarter },
    { id: 'neural-networks',    category: 'deep-learning'    as NotebookCategoryId, label: t.handsOn.landing.labels.mostPopular },
    { id: 'llm-basics',         category: 'generative-ai'    as NotebookCategoryId, label: t.handsOn.landing.labels.hotTopic },
    { id: 'transformer',        category: 'deep-learning'    as NotebookCategoryId, label: t.handsOn.landing.labels.coreFoundation },
  ];

  return (
    <div className="min-h-screen">
      <Header breadcrumb={[{ label: 'Hands-On', href: '/hands-on' }]} />

      <div className="px-6 py-10 max-w-6xl mx-auto">
        {/* Hero */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
            <Zap className="w-3.5 h-3.5" />
            {t.handsOn.landing.badge}
          </div>
          <h1 className="text-4xl font-extrabold text-slate-800 mb-4 leading-tight">
            {t.handsOn.landing.title}<br />
            <span className="text-brand-600">{t.handsOn.landing.subtitle}</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
            {t.handsOn.landing.desc}
          </p>

          {/* Progress bar */}
          {done > 0 && (
            <div className="mt-6 bg-white rounded-2xl border border-slate-200 p-5 max-w-md shadow-soft">
              <div className="flex items-center justify-between text-xs text-slate-600 mb-2">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="font-semibold">{t.handsOn.landing.notebooksCompleted(done)}</span>
                </div>
                <span className="text-slate-400">{done}/{total}</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-400 rounded-full transition-all duration-500"
                  style={{ width: `${(done / total) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          {[
            { icon: <BookOpen className="w-5 h-5" />, value: String(total), label: t.handsOn.landing.stats.notebooks, color: 'text-brand-600' },
            { icon: <Star className="w-5 h-5" />,     value: '6',          label: t.handsOn.landing.stats.categories, color: 'text-violet-600' },
            { icon: <Clock className="w-5 h-5" />,    value: '30+',        label: t.handsOn.landing.stats.hours, color: 'text-amber-600' },
            { icon: <Zap className="w-5 h-5" />,      value: '100+',       label: t.handsOn.landing.stats.codeExamples, color: 'text-emerald-600' },
          ].map(stat => (
            <div key={stat.label} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-soft text-center">
              <div className={clsx('flex justify-center mb-2', stat.color)}>{stat.icon}</div>
              <div className="text-2xl font-bold text-slate-800">{stat.value}</div>
              <div className="text-xs text-slate-500 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Featured Notebooks */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-slate-800 mb-5">{t.handsOn.landing.featured}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featuredNotebooks.map(({ id, category, label }) => {
              const cat = notebookCategories.find(c => c.id === category);
              const nb  = cat?.notebooks.find(n => n.id === id);
              if (!nb || !cat) return null;
              const isDone = completedNotebooks.includes(nb.id);

              return (
                <Link
                  key={id}
                  href={`/hands-on/${category}/${id}`}
                  className={clsx(
                    'group bg-gradient-to-br border rounded-2xl p-5 transition-all duration-200 hover:shadow-hover hover:-translate-y-0.5',
                    CAT_GRADIENTS[category]
                  )}
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className={clsx('text-xs font-bold px-2 py-0.5 rounded-full bg-white/70', CAT_TEXT[category])}>
                      {label}
                    </span>
                    {isDone && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                  </div>
                  <div className={clsx('text-2xl mb-2', CAT_ICON_BG[category], 'w-10 h-10 rounded-lg flex items-center justify-center')}>
                    {cat.icon}
                  </div>
                  <h3 className={clsx('text-sm font-bold mb-1 group-hover:underline', CAT_TEXT[category])}>
                    {nb.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2">{nb.description}</p>
                  <div className="flex items-center gap-1.5 mt-3 text-xs text-slate-500">
                    <Clock className="w-3 h-3" />
                    {nb.estimatedMinutes} min
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Categories Grid */}
        <div>
          <h2 className="text-xl font-bold text-slate-800 mb-6">{t.handsOn.landing.allCategories}</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {notebookCategories.map(cat => {
              const completedInCat = cat.notebooks.filter(n => completedNotebooks.includes(n.id)).length;
              const totalInCat     = cat.notebooks.length;
              const totalMinutes   = cat.notebooks.reduce((sum, n) => sum + n.estimatedMinutes, 0);
              const pct            = totalInCat > 0 ? (completedInCat / totalInCat) * 100 : 0;

              return (
                <Link
                  key={cat.id}
                  href={`/hands-on/${cat.id}`}
                  className={clsx(
                    'group bg-gradient-to-br border rounded-2xl p-6 transition-all duration-200 hover:shadow-hover hover:-translate-y-0.5',
                    CAT_GRADIENTS[cat.id]
                  )}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={clsx('w-12 h-12 rounded-xl flex items-center justify-center text-2xl', CAT_ICON_BG[cat.id])}>
                      {cat.icon}
                    </div>
                    <span className={clsx('text-xs font-semibold', CAT_TEXT[cat.id])}>
                      {t.handsOn.landing.notebooksCount(totalInCat)}
                    </span>
                  </div>

                  <h3 className={clsx('text-lg font-bold mb-1.5 group-hover:underline', CAT_TEXT[cat.id])}>
                    {cat.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">{cat.description}</p>

                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {t.handsOn.landing.totalHours(Math.round(totalMinutes / 60))}
                    </div>
                    <span>{completedInCat}/{totalInCat} {t.common.done}</span>
                  </div>

                  {/* Progress */}
                  <div className="h-1.5 bg-white/70 rounded-full overflow-hidden mb-3">
                    <div
                      className="h-full bg-emerald-400 rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>

                  <div className={clsx('flex items-center gap-1 text-xs font-medium group-hover:gap-2 transition-all', CAT_TEXT[cat.id])}>
                    {t.handsOn.landing.exploreCategory} <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-2xl bg-gradient-to-r from-violet-600 to-brand-600 text-white p-8 text-center">
          <h2 className="text-2xl font-bold mb-2">{t.handsOn.landing.ctaTitle}</h2>
          <p className="text-violet-100 mb-6 max-w-lg mx-auto">
            {t.handsOn.landing.ctaDesc}
          </p>
          <Link
            href="/hands-on/machine-learning/linear-regression"
            className="inline-flex items-center gap-2 bg-white text-violet-700 font-semibold px-6 py-3 rounded-xl hover:bg-violet-50 transition-colors"
          >
            {t.handsOn.landing.ctaButton} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
