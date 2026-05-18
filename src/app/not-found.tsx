'use client';

import Link from 'next/link';
import { BookOpen, ArrowLeft } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

export default function NotFound() {
  const t = useTranslation();

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-brand-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <BookOpen className="w-10 h-10 text-brand-500" />
        </div>
        <h1 className="text-3xl font-bold text-slate-800 mb-2">{t.notFound.title}</h1>
        <p className="text-slate-500 mb-8">{t.notFound.desc}</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-brand-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-brand-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {t.notFound.button}
        </Link>
      </div>
    </div>
  );
}
