'use client';

import { useLanguageStore } from '@/store/languageStore';
import en from '@/i18n/en';
import ptBR from '@/i18n/pt-BR';

export function useTranslation() {
  const lang = useLanguageStore((state) => state.lang);
  return lang === 'pt-BR' ? ptBR : en;
}
