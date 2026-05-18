'use client';

import { useLanguageStore } from '@/store/languageStore';
import {
  getLocalizedSections,
  getSectionById,
  getModuleById,
  getLessonById,
  getAllLessons,
  getAdjacentLessons,
} from '@/data/curriculum/index';

export function useLocalizedCurriculum() {
  const { lang } = useLanguageStore();
  return {
    sections:        () => getLocalizedSections(lang),
    getSectionById:  (id: string) => getSectionById(id, lang),
    getModuleById:   (sId: string, mId: string) => getModuleById(sId, mId, lang),
    getLessonById:   (sId: string, mId: string, lId: string) => getLessonById(sId, mId, lId, lang),
    getAllLessons:    () => getAllLessons(lang),
    getAdjacentLessons: (sId: string, mId: string, lId: string) =>
      getAdjacentLessons(sId, mId, lId, lang),
  };
}
