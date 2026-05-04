'use client';

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { useEffect } from 'react';
import { getSectionById, getLessonById, getAdjacentLessons } from '@/data/curriculum';
import { useProgressStore } from '@/store/progressStore';
import { Header } from '@/components/layout/Header';
import { LessonContent } from '@/components/content/LessonContent';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { TTSPlayer } from '@/components/ui/TTSPlayer';
import { CheckCircle2, ArrowLeft, ArrowRight, Clock } from 'lucide-react';
import { clsx } from 'clsx';

interface Props {
  params: { sectionId: string; moduleId: string; lessonId: string };
}

const DIFFICULTY_COLORS = { beginner: 'emerald', intermediate: 'amber', advanced: 'rose' } as const;

export default function LessonPage({ params }: Props) {
  const { sectionId, moduleId, lessonId } = params;
  const section = getSectionById(sectionId);
  const lesson  = getLessonById(sectionId, moduleId, lessonId);
  if (!section || !lesson) notFound();

  const { markComplete, markIncomplete, isComplete, setLastVisited, detailMode } = useProgressStore();
  const done = isComplete(lessonId);
  const { prev, next } = getAdjacentLessons(sectionId, moduleId, lessonId);

  useEffect(() => {
    setLastVisited(`/section/${sectionId}/module/${moduleId}/lesson/${lessonId}`);
  }, [lessonId]);

  const module = section.modules.find((m) => m.id === moduleId);

  return (
    <div>
      <Header
        breadcrumb={[
          { label: section.title, href: `/section/${sectionId}` },
          { label: module?.title ?? moduleId, href: `/section/${sectionId}/module/${moduleId}` },
          { label: lesson.title },
        ]}
      />

      <div className="px-6 py-8 max-w-4xl mx-auto">
        {/* Lesson header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <Badge variant={DIFFICULTY_COLORS[lesson.difficulty]} size="md">{lesson.difficulty}</Badge>
            <span className="text-sm text-slate-400 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {lesson.duration}
            </span>
            {lesson.prerequisites && lesson.prerequisites.length > 0 && (
              <span className="text-xs text-slate-400">
                Prereqs: {lesson.prerequisites.join(', ')}
              </span>
            )}
          </div>

          <h1 className="text-3xl font-extrabold text-slate-800 mb-2 leading-tight">
            {lesson.title}
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">{lesson.description}</p>

          {/* Detail mode notice */}
          {detailMode === 'simple' && (
            <div className="mt-4 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
              Simple mode is on — some advanced content may be condensed.
            </div>
          )}

          {/* Text-to-Speech player */}
          <div className="mt-5">
            <TTSPlayer blocks={lesson.blocks} lessonTitle={lesson.title} />
          </div>
        </div>

        {/* Lesson content */}
        <LessonContent blocks={lesson.blocks} simpleMode={detailMode === 'simple'} />

        {/* Mark complete / incomplete */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => done ? markIncomplete(lessonId) : markComplete(lessonId)}
            className={clsx(
              'flex items-center gap-2.5 px-6 py-3 rounded-xl font-semibold text-sm transition-all',
              done
                ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border border-emerald-300'
                : 'bg-brand-600 text-white hover:bg-brand-700 shadow-md hover:shadow-lg'
            )}
          >
            <CheckCircle2 className="w-5 h-5" />
            {done ? 'Mark as Incomplete' : 'Mark as Complete'}
          </button>
        </div>

        {/* Prev / Next navigation */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          {prev ? (
            <Link
              href={`/section/${prev.sectionId}/module/${prev.moduleId}/lesson/${prev.lesson.id}`}
              className="group flex items-center gap-3 bg-white border border-slate-200 rounded-2xl px-5 py-4 hover:border-brand-300 hover:shadow-soft transition-all col-start-1"
            >
              <ArrowLeft className="w-4 h-4 text-slate-400 group-hover:text-brand-500 transition-colors shrink-0" />
              <div className="min-w-0">
                <p className="text-xs text-slate-400 mb-0.5">Previous</p>
                <p className="text-sm font-semibold text-slate-700 group-hover:text-brand-700 truncate">
                  {prev.lesson.title}
                </p>
              </div>
            </Link>
          ) : <div />}

          {next ? (
            <Link
              href={`/section/${next.sectionId}/module/${next.moduleId}/lesson/${next.lesson.id}`}
              className="group flex items-center justify-end gap-3 bg-white border border-slate-200 rounded-2xl px-5 py-4 hover:border-brand-300 hover:shadow-soft transition-all text-right col-start-2"
            >
              <div className="min-w-0">
                <p className="text-xs text-slate-400 mb-0.5">Next</p>
                <p className="text-sm font-semibold text-slate-700 group-hover:text-brand-700 truncate">
                  {next.lesson.title}
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-brand-500 transition-colors shrink-0" />
            </Link>
          ) : <div />}
        </div>
      </div>
    </div>
  );
}
