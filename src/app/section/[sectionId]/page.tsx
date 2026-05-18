'use client';

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getSectionById } from '@/data/curriculum';
import { Header } from '@/components/layout/Header';
import { Badge } from '@/components/ui/Badge';
import { useTranslation } from '@/hooks/useTranslation';
import { ArrowRight, BookOpen, Clock } from 'lucide-react';
import { clsx } from 'clsx';
import type { SectionColor } from '@/types/curriculum';
import { COLOR_MAP } from '@/types/curriculum';

interface Props {
  params: { sectionId: string };
}

const DIFFICULTY_COLORS = {
  beginner:     'emerald',
  intermediate: 'amber',
  advanced:     'rose',
} as const;

export default function SectionPage({ params }: Props) {
  const section = getSectionById(params.sectionId);
  if (!section) notFound();

  const t = useTranslation();
  const allLessons = section.modules.flatMap((m) => m.lessons);
  const colors = COLOR_MAP[section.color];

  return (
    <div>
      <Header
        breadcrumb={[{ label: section.title }]}
      />

      <div className="px-6 py-10 max-w-5xl mx-auto">
        {/* Hero */}
        <div className={clsx('rounded-3xl border p-8 mb-10', colors.bg, colors.border)}>
          <div className="flex items-start gap-5">
            <div className="text-5xl leading-none">{section.icon}</div>
            <div className="flex-1">
              <h1 className="text-3xl font-extrabold text-slate-800 mb-2">{section.title}</h1>
              <p className="text-slate-600 text-base leading-relaxed mb-4">{section.longDescription}</p>
              <div className="flex flex-wrap gap-2">
                {section.tags.map((tag) => (
                  <Badge key={tag} variant={section.color as any} size="md">{tag}</Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-200/60">
            {[
              { icon: <BookOpen className="w-4 h-4" />, value: section.modules.length, label: t.section.modules },
              { icon: <BookOpen className="w-4 h-4" />, value: allLessons.length, label: t.section.lessons },
              { icon: <Clock className="w-4 h-4" />, value: `${allLessons.reduce((acc, l) => acc + parseInt(l.duration), 0)} min`, label: t.section.estTime },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className={clsx('flex justify-center mb-1', colors.text)}>{stat.icon}</div>
                <div className="text-xl font-bold text-slate-800">{stat.value}</div>
                <div className="text-xs text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Modules */}
        <div className="space-y-8">
          {section.modules.map((module, mi) => (
            <div key={module.id}>
              {/* Module header */}
              <div className="flex items-start gap-3 mb-4">
                <div className={clsx('w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0', colors.badge)}>
                  {mi + 1}
                </div>
                <div>
                  <Link
                    href={`/section/${section.id}/module/${module.id}`}
                    className="text-xl font-bold text-slate-800 hover:text-brand-600 transition-colors"
                  >
                    {module.title}
                  </Link>
                  <p className="text-sm text-slate-500 mt-0.5">{module.description}</p>
                </div>
              </div>

              {/* Lessons list */}
              <div className="space-y-2 ml-11">
                {module.lessons.map((lesson, li) => (
                  <Link
                    key={lesson.id}
                    href={`/section/${section.id}/module/${module.id}/lesson/${lesson.id}`}
                    className="group flex items-center gap-4 bg-white border border-slate-200 rounded-xl px-5 py-4 hover:border-brand-300 hover:shadow-soft transition-all"
                  >
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500 shrink-0 group-hover:bg-brand-100 group-hover:text-brand-600 transition-colors">
                      {mi + 1}.{li + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-slate-800 group-hover:text-brand-700 transition-colors">
                        {lesson.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5 truncate">{lesson.description}</p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <Badge variant={DIFFICULTY_COLORS[lesson.difficulty]} size="sm">
                        {t.difficulty[lesson.difficulty]}
                      </Badge>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {lesson.duration}
                      </span>
                      <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-brand-500 transition-colors" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
