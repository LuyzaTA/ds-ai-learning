import type { Curriculum, FlatLesson } from '@/types/curriculum';
import { foundationsSection }    from './foundations';
import { dataAnalysisSection }   from './data-analysis';
import { machineLearningSection } from './machine-learning';
import { deepLearningSection }   from './deep-learning';
import { generativeAiSection }   from './generative-ai';
import { bigDataSection }        from './big-data';
import { mlopsSection }          from './mlops';
import { ethicsSection }         from './ethics';

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

// ─── Helpers ──────────────────────────────────────────────────────────────

export function getSectionById(id: string) {
  return curriculum.sections.find((s) => s.id === id) ?? null;
}

export function getModuleById(sectionId: string, moduleId: string) {
  const section = getSectionById(sectionId);
  return section?.modules.find((m) => m.id === moduleId) ?? null;
}

export function getLessonById(sectionId: string, moduleId: string, lessonId: string) {
  const module = getModuleById(sectionId, moduleId);
  return module?.lessons.find((l) => l.id === lessonId) ?? null;
}

export function getAllLessons(): FlatLesson[] {
  return curriculum.sections.flatMap((section) =>
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

export function getLessonCount(sectionId?: string): number {
  if (sectionId) {
    const section = getSectionById(sectionId);
    return section?.modules.reduce((acc, m) => acc + m.lessons.length, 0) ?? 0;
  }
  return getAllLessons().length;
}

export function getAdjacentLessons(
  sectionId: string,
  moduleId: string,
  lessonId: string
): { prev: FlatLesson | null; next: FlatLesson | null } {
  const all = getAllLessons();
  const idx = all.findIndex(
    (fl) =>
      fl.sectionId === sectionId &&
      fl.moduleId  === moduleId  &&
      fl.lesson.id === lessonId
  );
  return {
    prev: idx > 0         ? all[idx - 1] : null,
    next: idx < all.length - 1 ? all[idx + 1] : null,
  };
}
