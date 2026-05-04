// ─── Content Block Types ───────────────────────────────────────────────────

export interface TextBlock {
  type: 'text';
  content: string; // supports markdown
}

export interface MathBlock {
  type: 'math';
  latex: string;
  displayMode?: boolean; // true = centered block, false = inline
  caption?: string;
}

export interface CodeBlock {
  type: 'code';
  language: string;
  code: string;
  caption?: string;
}

export interface ELI5Block {
  type: 'eli5';
  content: string;
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface QuizBlock {
  type: 'quiz';
  title?: string;
  questions: Question[];
}

export interface CalloutBlock {
  type: 'callout';
  variant: 'info' | 'tip' | 'warning' | 'important';
  title: string;
  content: string;
}

export interface KeyTakeawaysBlock {
  type: 'keyTakeaways';
  items: string[];
}

export interface SummaryBlock {
  type: 'summary';
  content: string;
}

export interface DiagramBlock {
  type: 'diagram';
  title: string;
  lines: string[]; // ASCII-art style lines for simple diagrams
}

export interface CompareBlock {
  type: 'compare';
  title: string;
  left: { label: string; items: string[] };
  right: { label: string; items: string[] };
}

export type ContentBlock =
  | TextBlock
  | MathBlock
  | CodeBlock
  | ELI5Block
  | QuizBlock
  | CalloutBlock
  | KeyTakeawaysBlock
  | SummaryBlock
  | DiagramBlock
  | CompareBlock;

// ─── Curriculum Hierarchy ─────────────────────────────────────────────────

export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  prerequisites?: string[];
  blocks: ContentBlock[];
}

export interface Module {
  id: string;
  title: string;
  description: string;
  icon?: string;
  lessons: Lesson[];
}

export interface Section {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  icon: string;
  color: SectionColor;
  modules: Module[];
  tags: string[];
}

export interface Curriculum {
  sections: Section[];
}

// ─── UI Helpers ───────────────────────────────────────────────────────────

export type SectionColor =
  | 'blue'
  | 'emerald'
  | 'violet'
  | 'amber'
  | 'rose'
  | 'cyan'
  | 'orange'
  | 'teal';

export interface ColorConfig {
  bg: string;
  text: string;
  border: string;
  badge: string;
  icon: string;
  ring: string;
}

export const COLOR_MAP: Record<SectionColor, ColorConfig> = {
  blue: {
    bg:     'bg-brand-50',
    text:   'text-brand-700',
    border: 'border-brand-200',
    badge:  'bg-brand-100 text-brand-700',
    icon:   'text-brand-500',
    ring:   'ring-brand-300',
  },
  emerald: {
    bg:     'bg-emerald-50',
    text:   'text-emerald-700',
    border: 'border-emerald-200',
    badge:  'bg-emerald-100 text-emerald-700',
    icon:   'text-emerald-500',
    ring:   'ring-emerald-300',
  },
  violet: {
    bg:     'bg-violet-50',
    text:   'text-violet-700',
    border: 'border-violet-200',
    badge:  'bg-violet-100 text-violet-700',
    icon:   'text-violet-500',
    ring:   'ring-violet-300',
  },
  amber: {
    bg:     'bg-amber-50',
    text:   'text-amber-700',
    border: 'border-amber-200',
    badge:  'bg-amber-100 text-amber-700',
    icon:   'text-amber-500',
    ring:   'ring-amber-300',
  },
  rose: {
    bg:     'bg-rose-50',
    text:   'text-rose-700',
    border: 'border-rose-200',
    badge:  'bg-rose-100 text-rose-700',
    icon:   'text-rose-500',
    ring:   'ring-rose-300',
  },
  cyan: {
    bg:     'bg-cyan-50',
    text:   'text-cyan-700',
    border: 'border-cyan-200',
    badge:  'bg-cyan-100 text-cyan-700',
    icon:   'text-cyan-500',
    ring:   'ring-cyan-300',
  },
  orange: {
    bg:     'bg-orange-50',
    text:   'text-orange-700',
    border: 'border-orange-200',
    badge:  'bg-orange-100 text-orange-700',
    icon:   'text-orange-500',
    ring:   'ring-orange-300',
  },
  teal: {
    bg:     'bg-teal-50',
    text:   'text-teal-700',
    border: 'border-teal-200',
    badge:  'bg-teal-100 text-teal-700',
    icon:   'text-teal-500',
    ring:   'ring-teal-300',
  },
};

// ─── Progress ─────────────────────────────────────────────────────────────

export interface ProgressState {
  completedLessons: Set<string>;
  lastVisited: string | null;
}

export interface FlatLesson {
  sectionId: string;
  sectionTitle: string;
  moduleId: string;
  moduleTitle: string;
  lesson: Lesson;
}
