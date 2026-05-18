// Overlay types for curriculum translations

export interface BlockTranslation {
  content?: string;        // text, eli5, summary
  title?: string;          // callout, diagram
  items?: string[];        // keyTakeaways
  caption?: string;        // math, code
  quizTitle?: string;      // quiz.title
  questions?: Array<{
    question?: string;
    options?: string[];
    explanation?: string;
  }>;
  lines?: string[];        // diagram
  left?: { label?: string; items?: string[] };
  right?: { label?: string; items?: string[] };
  compareTitle?: string;
}

export interface LessonTranslation {
  title?: string;
  description?: string;
  blocks?: Record<number, BlockTranslation>;
}

export interface ModuleTranslation {
  title?: string;
  description?: string;
  lessons?: Record<string, LessonTranslation>;
}

export interface SectionTranslation {
  title?: string;
  description?: string;
  longDescription?: string;
  tags?: string[];
  modules?: Record<string, ModuleTranslation>;
}
