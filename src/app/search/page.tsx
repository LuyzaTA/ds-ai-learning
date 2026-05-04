'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, BookOpen } from 'lucide-react';
import { getAllLessons } from '@/data/curriculum';
import { Header } from '@/components/layout/Header';
import { Badge } from '@/components/ui/Badge';
import type { FlatLesson } from '@/types/curriculum';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const allLessons = getAllLessons();

  const results = useMemo<FlatLesson[]>(() => {
    if (query.trim().length < 2) return [];
    const q = query.toLowerCase();
    return allLessons.filter((fl) => {
      const haystack = [
        fl.lesson.title,
        fl.lesson.description,
        fl.moduleTitle,
        fl.sectionTitle,
        ...fl.lesson.blocks
          .filter((b) => b.type === 'text')
          .map((b) => (b as any).content),
      ].join(' ').toLowerCase();
      return haystack.includes(q);
    });
  }, [query, allLessons]);

  return (
    <div>
      <Header breadcrumb={[{ label: 'Search' }]} />

      <div className="px-6 py-10 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">Search Lessons</h1>

        {/* Search input */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search lessons, topics, algorithms..."
            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-brand-400 shadow-soft text-base"
          />
        </div>

        {/* Results */}
        {query.length >= 2 && (
          <div>
            <p className="text-sm text-slate-500 mb-4">
              {results.length === 0 ? 'No results found.' : `${results.length} result${results.length !== 1 ? 's' : ''} found`}
            </p>
            <div className="space-y-3">
              {results.map((fl) => (
                <Link
                  key={`${fl.sectionId}-${fl.moduleId}-${fl.lesson.id}`}
                  href={`/section/${fl.sectionId}/module/${fl.moduleId}/lesson/${fl.lesson.id}`}
                  className="block bg-white border border-slate-200 rounded-xl px-5 py-4 hover:border-brand-300 hover:shadow-soft transition-all group"
                >
                  <div className="flex items-start gap-3">
                    <BookOpen className="w-5 h-5 text-brand-400 shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-slate-800 group-hover:text-brand-700 transition-colors mb-1">
                        {fl.lesson.title}
                      </h3>
                      <p className="text-sm text-slate-500 mb-2 truncate">{fl.lesson.description}</p>
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <Badge variant="default" size="sm">{fl.sectionTitle}</Badge>
                        <span>›</span>
                        <span>{fl.moduleTitle}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {query.length < 2 && (
          <div className="text-center py-12 text-slate-400">
            <Search className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>Type at least 2 characters to search</p>
          </div>
        )}
      </div>
    </div>
  );
}
