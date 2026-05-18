import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Language = 'en' | 'pt-BR';

interface LanguageStore {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
}

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set, get) => ({
      lang: 'en',
      setLang: (lang) => set({ lang }),
      toggleLang: () => set({ lang: get().lang === 'en' ? 'pt-BR' : 'en' }),
    }),
    { name: 'ds-ai-language' }
  )
);
