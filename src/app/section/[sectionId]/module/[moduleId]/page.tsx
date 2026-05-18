'use client';

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Badge } from '@/components/ui/Badge';
import { ArrowRight, Clock } from 'lucide-react';
import { useLocalizedCurriculum } from '@/hooks/useLocalizedCurriculum';

interface Props {
  params: { sectionId: string; moduleId: string };
}

const DIFFICULTY_COLORS = {
  beginner:     'emerald',
  intermediate: 'amber',
  advanced:     'rose',
} as const;

export default function ModulePage({ params }: Props) {
  const { getSectionById, getModuleById } = useLocalizedCurriculum();
  const section = getSectionById(params.sectionId);
  const module  = getModuleById(params.sectionId, params.moduleId);
  if (!section || !module) notFound();

  return (
    <div>
      <Header
        breadcrumb={[
          { label: section.title, href: `/section/${section.id}` },
          { label: module.title },
        ]}
      />

      <div className="px-6 py-10 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-800 mb-2">{module.title}</h1>
          <p className="text-slate-600">{module.description}</p>
        </div>

        <div className="space-y-3">
          {module.lessons.map((lesson, i) => (
            <Link
              key={lesson.id}
              href={`/section/${section.id}/module/${module.id}/lesson/${lesson.id}`}
              className="group flex items-center gap-4 bg-white border border-slate-200 rounded-2xl px-6 py-5 hover:border-brand-300 hover:shadow-soft transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-sm font-bold text-slate-500 shrink-0 group-hover:bg-brand-100 group-hover:text-brand-600 transition-colors">
                {i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-base font-semibold text-slate-800 group-hover:text-brand-700 transition-colors mb-0.5">
                  {lesson.title}
                </h2>
                <p className="text-sm text-slate-500 truncate">{lesson.description}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <Badge variant={DIFFICULTY_COLORS[lesson.difficulty]} size="sm">{lesson.difficulty}</Badge>
                <span className="text-sm text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {lesson.duration}
                </span>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-brand-500 transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
