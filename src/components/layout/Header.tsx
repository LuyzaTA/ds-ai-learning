'use client';

import Link from 'next/link';
import { Menu, Search, Eye, EyeOff, BookOpen } from 'lucide-react';
import { useProgressStore } from '@/store/progressStore';
import { useTranslation } from '@/hooks/useTranslation';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { clsx } from 'clsx';

interface HeaderProps {
  breadcrumb?: { label: string; href?: string }[];
}

export function Header({ breadcrumb }: HeaderProps) {
  const { toggleSidebar, detailMode, toggleDetail } = useProgressStore();
  const t = useTranslation();

  return (
    <header className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm border-b border-slate-200 px-4 h-14 flex items-center gap-3">
      {/* Sidebar toggle */}
      <button
        onClick={toggleSidebar}
        className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition-colors"
        aria-label={t.header.toggleSidebar}
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Breadcrumb */}
      {breadcrumb && breadcrumb.length > 0 ? (
        <nav className="flex items-center gap-1.5 text-sm flex-1 min-w-0">
          <Link href="/" className="text-slate-400 hover:text-brand-600 transition-colors shrink-0">
            <BookOpen className="w-4 h-4" />
          </Link>
          {breadcrumb.map((crumb, i) => (
            <span key={i} className="flex items-center gap-1.5 min-w-0">
              <span className="text-slate-300">/</span>
              {crumb.href ? (
                <Link
                  href={crumb.href}
                  className="text-slate-500 hover:text-brand-600 transition-colors truncate"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-slate-800 font-medium truncate">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>
      ) : (
        <div className="flex-1" />
      )}

      {/* Right actions */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Detail mode toggle */}
        <button
          onClick={toggleDetail}
          className={clsx(
            'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors',
            detailMode === 'simple'
              ? 'bg-amber-100 text-amber-700 hover:bg-amber-200'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          )}
          title={detailMode === 'simple' ? t.header.switchToDetailed : t.header.switchToSimple}
        >
          {detailMode === 'simple' ? (
            <><EyeOff className="w-3.5 h-3.5" /> {t.header.simpleMode}</>
          ) : (
            <><Eye className="w-3.5 h-3.5" /> {t.header.detailedMode}</>
          )}
        </button>

        {/* Search button */}
        <LanguageSwitcher />

        <Link
          href="/search"
          className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition-colors"
          aria-label={t.header.search}
        >
          <Search className="w-4 h-4" />
        </Link>
      </div>
    </header>
  );
}
