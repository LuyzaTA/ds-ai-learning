'use client';

import { useLanguageStore } from '@/store/languageStore';

export function LanguageSwitcher() {
  const { lang, toggleLang } = useLanguageStore();

  return (
    <button
      onClick={toggleLang}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
      title={lang === 'en' ? 'Mudar para Português' : 'Switch to English'}
    >
      {lang === 'en' ? '🇧🇷 PT' : '🇺🇸 EN'}
    </button>
  );
}
