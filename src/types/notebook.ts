export type NotebookCategoryId =
  | 'machine-learning'
  | 'deep-learning'
  | 'nlp'
  | 'generative-ai'
  | 'computer-vision'
  | 'time-series';

export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

// ─── Cell Types ───────────────────────────────────────────────────────────────

export interface MarkdownCell {
  id: string;
  type: 'markdown';
  content: string;
}

export interface CodeCell {
  id: string;
  type: 'code';
  language: string;
  code: string;
  output?: string;
  runnable?: boolean;
  caption?: string;
}

export interface TheoryCell {
  id: string;
  type: 'theory';
  title: string;
  content: string;
  variant?: 'default' | 'math' | 'important' | 'tip';
}

export interface MathCell {
  id: string;
  type: 'math';
  title?: string;
  formula: string;
  explanation?: string;
}

export interface BusinessUseCase {
  industry: string;
  useCase: string;
  description: string;
  example: string;
  companies?: string[];
  icon: string;
}

export interface BusinessUseCaseCell {
  id: string;
  type: 'business';
  title?: string;
  cases: BusinessUseCase[];
}

export interface Metric {
  name: string;
  value: string | number;
  description?: string;
  status?: 'good' | 'warning' | 'info';
  format?: 'percent' | 'decimal' | 'integer' | 'text';
}

export interface MetricsCell {
  id: string;
  type: 'metrics';
  title?: string;
  metrics: Metric[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface QuizCell {
  id: string;
  type: 'quiz';
  title?: string;
  questions: QuizQuestion[];
}

export interface DiagramCell {
  id: string;
  type: 'diagram';
  title?: string;
  content: string;
  diagramType?: 'ascii' | 'flowchart' | 'architecture';
}

export type ChartType = 'line' | 'bar' | 'scatter' | 'confusion' | 'roc' | 'histogram';

export interface ChartCell {
  id: string;
  type: 'chart';
  chartType: ChartType;
  title: string;
  description?: string;
  data: Record<string, unknown>[];
  xLabel?: string;
  yLabel?: string;
}

export interface TableCell {
  id: string;
  type: 'table';
  title?: string;
  headers: string[];
  rows: (string | number)[][];
  caption?: string;
}

export interface CalloutCell {
  id: string;
  type: 'callout';
  variant: 'info' | 'warning' | 'tip' | 'important' | 'note';
  title?: string;
  content: string;
}

export interface Step {
  step: number;
  title: string;
  description: string;
  code?: string;
  icon?: string;
}

export interface StepsCell {
  id: string;
  type: 'steps';
  title?: string;
  steps: Step[];
}

export interface InterviewQuestion {
  question: string;
  answer: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface InterviewCell {
  id: string;
  type: 'interview';
  title?: string;
  questions: InterviewQuestion[];
}

export interface ComparisonItem {
  label: string;
  pros: string[];
  cons: string[];
  whenToUse?: string;
}

export interface ComparisonCell {
  id: string;
  type: 'comparison';
  title?: string;
  items: ComparisonItem[];
}

export type NotebookCell =
  | MarkdownCell
  | CodeCell
  | TheoryCell
  | MathCell
  | BusinessUseCaseCell
  | MetricsCell
  | QuizCell
  | DiagramCell
  | ChartCell
  | TableCell
  | CalloutCell
  | StepsCell
  | InterviewCell
  | ComparisonCell;

// ─── Notebook ─────────────────────────────────────────────────────────────────

export interface Notebook {
  id: string;
  title: string;
  slug: string;
  category: NotebookCategoryId;
  difficulty: Difficulty;
  estimatedMinutes: number;
  tags: string[];
  description: string;
  prerequisites?: string[];
  relatedNotebooks?: string[];
  cells: NotebookCell[];
}

export interface NotebookCategory {
  id: NotebookCategoryId;
  title: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
  notebooks: Notebook[];
}
