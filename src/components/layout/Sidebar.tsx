'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ChevronRight, CheckCircle2, BookOpen, X, FlaskConical } from 'lucide-react';
import { clsx } from 'clsx';
import { curriculum } from '@/data/curriculum';
import { useProgressStore } from '@/store/progressStore';
import { ProgressBar } from '@/components/ui/ProgressBar';
import type { SectionColor } from '@/types/curriculum';
import { COLOR_MAP } from '@/types/curriculum';

const SECTION_COLORS: Record<SectionColor, string> = {
  blue:    'text-brand-600',
  emerald: 'text-emerald-600',
  violet:  'text-violet-600',
  amber:   'text-amber-600',
  rose:    'text-rose-600',
  cyan:    'text-cyan-600',
  orange:  'text-orange-600',
  teal:    'text-teal-600',
};

export function Sidebar() {
  const pathname = usePathname();
  const { completedLessons, sidebarOpen, toggleSidebar } = useProgressStore();
  const [openSections, setOpenSections] = useState<Set<string>>(new Set(['foundations']));

  const toggleSection = (id: string) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  if (!sidebarOpen) return null;

  return (
    <>
      {/* Mobile overlay */}
      <div
        className="fixed inset-0 bg-black/30 z-20 lg:hidden"
        onClick={toggleSidebar}
      />

      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-72 bg-white border-r border-slate-200 z-30 flex flex-col shadow-card overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800 leading-tight">DS & AI</p>
              <p className="text-xs text-slate-500 leading-tight">MBA Platform</p>
            </div>
          </Link>
          <button
            onClick={toggleSidebar}
            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 lg:hidden"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Sections list */}
        <nav className="flex-1 overflow-y-auto py-3 px-2">
          {/* Hands-On link */}
          <Link
            href="/hands-on"
            className={clsx(
              'flex items-center gap-2.5 px-3 py-2.5 rounded-xl mb-1 transition-colors',
              pathname?.startsWith('/hands-on')
                ? 'bg-violet-50 text-violet-700'
                : 'hover:bg-slate-50 text-slate-700'
            )}
          >
            <FlaskConical className={clsx('w-5 h-5', pathname?.startsWith('/hands-on') ? 'text-violet-600' : 'text-slate-500')} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">Hands-On</p>
              <p className="text-xs text-slate-400">Interactive Notebooks</p>
            </div>
            <span className="text-xs bg-violet-100 text-violet-700 px-1.5 py-0.5 rounded-full font-semibold">NEW</span>
          </Link>

          <div className="mx-3 my-2 border-t border-slate-100" />
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">Curriculum</p>

          {curriculum.sections.map((section) => {
            const sectionLessons = section.modules.flatMap((m) => m.lessons);
            const completed = sectionLessons.filter((l) => completedLessons.includes(l.id)).length;
            const total     = sectionLessons.length;
            const pct       = total > 0 ? (completed / total) * 100 : 0;
            const isOpen    = openSections.has(section.id);
            const colorCls  = SECTION_COLORS[section.color];

            return (
              <div key={section.id} className="mb-1">
                {/* Section header */}
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
                >
                  <span className="text-lg leading-none">{section.icon}</span>
                  <div className="flex-1 text-left min-w-0">
                    <p className="text-sm font-semibold text-slate-700 truncate">{section.title}</p>
                    <p className="text-xs text-slate-400">{completed}/{total} lessons</p>
                  </div>
                  <ChevronRight
                    className={clsx(
                      'w-4 h-4 text-slate-400 transition-transform duration-150 shrink-0',
                      isOpen && 'rotate-90'
                    )}
                  />
                </button>

                {/* Progress bar */}
                {pct > 0 && (
                  <div className="px-3 pb-1">
                    <ProgressBar value={pct} size="sm" color="blue" />
                  </div>
                )}

                {/* Modules + Lessons */}
                {isOpen && (
                  <div className="ml-3 border-l border-slate-100 pl-2 mt-1 space-y-0.5">
                    {section.modules.map((module) => (
                      <div key={module.id}>
                        <Link
                          href={`/section/${section.id}/module/${module.id}`}
                          className="block px-2 py-1.5 text-xs font-semibold text-slate-500 hover:text-slate-700 uppercase tracking-wide truncate"
                        >
                          {module.title}
                        </Link>
                        {module.lessons.map((lesson) => {
                          const lessonPath = `/section/${section.id}/module/${module.id}/lesson/${lesson.id}`;
                          const isActive   = pathname === lessonPath;
                          const isDone     = completedLessons.includes(lesson.id);

                          return (
                            <Link
                              key={lesson.id}
                              href={lessonPath}
                              className={clsx(
                                'flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs transition-colors',
                                isActive
                                  ? 'bg-brand-50 text-brand-700 font-medium'
                                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
                              )}
                            >
                              {isDone ? (
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                              ) : (
                                <div className={clsx(
                                  'w-3.5 h-3.5 rounded-full border shrink-0',
                                  isActive ? 'border-brand-400 bg-brand-100' : 'border-slate-300'
                                )} />
                              )}
                              <span className="truncate">{lesson.title}</span>
                            </Link>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Overall progress */}
        <div className="border-t border-slate-100 px-5 py-4">
          <div className="flex justify-between text-xs text-slate-500 mb-1.5">
            <span>Overall Progress</span>
            <span>{completedLessons.length} completed</span>
          </div>
          <ProgressBar
            value={completedLessons.length}
            max={curriculum.sections.flatMap((s) => s.modules.flatMap((m) => m.lessons)).length}
            color="emerald"
          />
        </div>
      </aside>
    </>
  );
}
