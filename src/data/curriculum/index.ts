import type { Curriculum, FlatLesson, Section } from '@/types/curriculum';
import type { Language } from '@/store/languageStore';
import { foundationsSection }    from './foundations';
import { dataAnalysisSection }   from './data-analysis';
import { machineLearningSection } from './machine-learning';
import { deepLearningSection }   from './deep-learning';
import { generativeAiSection }   from './generative-ai';
import { bigDataSection }        from './big-data';
import { mlopsSection }          from './mlops';
import { ethicsSection }         from './ethics';
import { ptBRCurriculum }        from './pt-BR/index';
import { localizeSection }       from '@/utils/localizer';

export const curriculum: Curriculum = {
  sections: [
    foundationsSection,
    dataAnalysisSection,
    machineLearningSection,
    deepLearningSection,
    generativeAiSection,
    bigDataSection,
    mlopsSection,
    ethicsSection,
  ],
};

// ─── Localization ─────────────────────────────────────────────────────────

export function getLocalizedSections(lang: Language): Section[] {
  if (lang === 'en') return curriculum.sections;
  return curriculum.sections.map(section => {
    const overlay = ptBRCurriculum[section.id];
    return overlay ? localizeSection(section, overlay) : section;
  });
}

export function getLocalizedCurriculum(lang: Language): Curriculum {
  return { sections: getLocalizedSections(lang) };
}

// ─── Helpers ──────────────────────────────────────────────────────────────

export function getSectionById(id: string, lang: Language = 'en') {
  return getLocalizedSections(lang).find((s) => s.id === id) ?? null;
}

export function getModuleById(sectionId: string, moduleId: string, lang: Language = 'en') {
  const section = getSectionById(sectionId, lang);
  return section?.modules.find((m) => m.id === moduleId) ?? null;
}

export function getLessonById(sectionId: string, moduleId: string, lessonId: string, lang: Language = 'en') {
  const mod = getModuleById(sectionId, moduleId, lang);
  return mod?.lessons.find((l) => l.id === lessonId) ?? null;
}

export function getAllLessons(lang: Language = 'en'): FlatLesson[] {
  return getLocalizedSections(lang).flatMap((section) =>
    section.modules.flatMap((module) =>
      module.lessons.map((lesson) => ({
        sectionId:    section.id,
        sectionTitle: section.title,
        moduleId:     module.id,
        moduleTitle:  module.title,
        lesson,
      }))
    )
  );
}

export function getLessonCount(sectionId?: string, lang: Language = 'en'): number {
  if (sectionId) {
    const section = getSectionById(sectionId, lang);
    return section?.modules.reduce((acc, m) => acc + m.lessons.length, 0) ?? 0;
  }
  return getAllLessons(lang).length;
}

export function getAdjacentLessons(
  sectionId: string,
  moduleId: string,
  lessonId: string,
  lang: Language = 'en',
): { prev: FlatLesson | null; next: FlatLesson | null } {
  const all = getAllLessons(lang);
  const idx = all.findIndex(
    (fl) =>
      fl.sectionId === sectionId &&
      fl.moduleId  === moduleId  &&
      fl.lesson.id === lessonId
  );
  return {
    prev: idx > 0               ? all[idx - 1] : null,
    next: idx < all.length - 1  ? all[idx + 1] : null,
  };
}
