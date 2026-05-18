'use client';

import Link from 'next/link';
import { useProgressStore } from '@/store/progressStore';
import { curriculum, getLessonCount } from '@/data/curriculum';
import { Header } from '@/components/layout/Header';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Badge } from '@/components/ui/Badge';
import { ArrowRight, BookOpen, CheckCircle2, Clock, Layers, Trophy, FlaskConical, Zap } from 'lucide-react';
import { clsx } from 'clsx';
import type { SectionColor } from '@/types/curriculum';

const BG_COLORS: Record<SectionColor, string> = {
  blue:    'from-brand-50 to-brand-100  border-brand-200',
  emerald: 'from-emerald-50 to-emerald-100 border-emerald-200',
  violet:  'from-violet-50 to-violet-100 border-violet-200',
  amber:   'from-amber-50 to-amber-100 border-amber-200',
  rose:    'from-rose-50 to-rose-100 border-rose-200',
  cyan:    'from-cyan-50 to-cyan-100 border-cyan-200',
  orange:  'from-orange-50 to-orange-100 border-orange-200',
  teal:    'from-teal-50 to-teal-100 border-teal-200',
};

const ICON_COLORS: Record<SectionColor, string> = {
  blue:    'bg-brand-100 text-brand-600',
  emerald: 'bg-emerald-100 text-emerald-600',
  violet:  'bg-violet-100 text-violet-600',
  amber:   'bg-amber-100 text-amber-600',
  rose:    'bg-rose-100 text-rose-600',
  cyan:    'bg-cyan-100 text-cyan-600',
  orange:  'bg-orange-100 text-orange-600',
  teal:    'bg-teal-100 text-teal-600',
};

export default function HomePage() {
  const { completedLessons } = useProgressStore();
  const totalLessons = getLessonCount();
  const overallPct   = totalLessons > 0 ? (completedLessons.length / totalLessons) * 100 : 0;

  return (
    <div>
      <Header />

      <div className="px-6 py-10 max-w-6xl mx-auto">
        {/* Hero */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="blue">MBA Data Science & AI</Badge>
            <Badge variant="emerald">8 Sections · {totalLessons} Lessons</Badge>
          </div>
          <h1 className="text-4xl font-extrabold text-slate-800 mb-4 leading-tight">
            Master Data Science &<br />Artificial Intelligence
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
            A complete, structured learning platform built from your MBA curriculum.
            From mathematical foundations to production AI systems — translated, expanded, and made visual.
          </p>

          {/* Overall Progress */}
          {completedLessons.length > 0 && (
            <div className="mt-6 bg-white rounded-2xl border border-slate-200 p-5 max-w-md shadow-soft">
              <div className="flex items-center gap-2 mb-3">
                <Trophy className="w-4 h-4 text-amber-500" />
                <span className="text-sm font-semibold text-slate-700">Your Progress</span>
              </div>
              <ProgressBar
                value={completedLessons.length}
                max={totalLessons}
                label={`${completedLessons.length} of ${totalLessons} lessons complete`}
                showPercent
                color="emerald"
              />
            </div>
          )}
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          {[
            { icon: <Layers className="w-5 h-5" />, value: '8', label: 'Sections', color: 'text-brand-600' },
            { icon: <BookOpen className="w-5 h-5" />, value: String(totalLessons), label: 'Lessons', color: 'text-violet-600' },
            { icon: <CheckCircle2 className="w-5 h-5" />, value: String(completedLessons.length), label: 'Completed', color: 'text-emerald-600' },
            { icon: <Clock className="w-5 h-5" />, value: '40+', label: 'Hours', color: 'text-amber-600' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-soft text-center">
              <div className={clsx('flex justify-center mb-2', stat.color)}>{stat.icon}</div>
              <div className="text-2xl font-bold text-slate-800">{stat.value}</div>
              <div className="text-xs text-slate-500 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Sections Grid */}
        <div>
          <h2 className="text-xl font-bold text-slate-800 mb-6">Curriculum</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
            {curriculum.sections.map((section, idx) => {
              const sectionLessons = section.modules.flatMap((m) => m.lessons);
              const done  = sectionLessons.filter((l) => completedLessons.includes(l.id)).length;
              const total = sectionLessons.length;
              const pct   = total > 0 ? (done / total) * 100 : 0;

              return (
                <Link
                  key={section.id}
                  href={`/section/${section.id}`}
                  className={clsx(
                    'group bg-gradient-to-br border rounded-2xl p-6 transition-all duration-200',
                    'hover:shadow-hover hover:-translate-y-0.5',
                    BG_COLORS[section.color]
                  )}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={clsx('w-11 h-11 rounded-xl flex items-center justify-center text-2xl', ICON_COLORS[section.color])}>
                      {section.icon}
                    </div>
                    <span className="text-xs text-slate-400 font-medium">#{String(idx + 1).padStart(2, '0')}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-800 mb-1.5 group-hover:text-brand-700 transition-colors">
                    {section.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">{section.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {section.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-xs bg-white/70 text-slate-600 px-2 py-0.5 rounded-full border border-white">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Progress + stats */}
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <span>{section.modules.length} modules · {total} lessons</span>
                    <span>{done}/{total} done</span>
                  </div>
                  <ProgressBar value={pct} size="sm" color="blue" />

                  <div className="flex items-center gap-1 mt-3 text-xs font-medium text-slate-600 group-hover:text-brand-600 transition-colors">
                    View section <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Hands-On Banner */}
        <div className="mt-10 rounded-2xl bg-gradient-to-r from-violet-600 to-brand-600 text-white p-8">
          <div className="flex items-start justify-between gap-6">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
                <Zap className="w-3 h-3" /> New Feature
              </div>
              <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
                <FlaskConical className="w-5 h-5" /> Hands-On Notebooks
              </h2>
              <p className="text-violet-100 text-sm leading-relaxed max-w-xl">
                Learn every algorithm through interactive, Colab-style notebooks. Code, math, charts, business cases, and quizzes — all in one place.
              </p>
            </div>
            <Link
              href="/hands-on"
              className="shrink-0 inline-flex items-center gap-2 bg-white text-violet-700 font-semibold px-5 py-2.5 rounded-xl hover:bg-violet-50 transition-colors text-sm"
            >
              Explore Notebooks <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Quick start */}
        <div className="mt-6 rounded-2xl bg-brand-600 text-white p-8 text-center">
          <h2 className="text-2xl font-bold mb-2">Ready to start learning?</h2>
          <p className="text-brand-100 mb-6">Begin with the Foundations — or jump straight into any topic that interests you.</p>
          <Link
            href="/section/foundations"
            className="inline-flex items-center gap-2 bg-white text-brand-700 font-semibold px-6 py-3 rounded-xl hover:bg-brand-50 transition-colors"
          >
            Start with Foundations <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
