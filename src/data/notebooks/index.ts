import type { NotebookCategory, NotebookCategoryId, Notebook } from '@/types/notebook';
import { machineLearningNotebooks } from './machine-learning';
import { deepLearningNotebooks } from './deep-learning';
import { nlpNotebooks } from './nlp';
import { generativeAINotebooks } from './generative-ai';
import { computerVisionNotebooks } from './computer-vision';
import { timeSeriesNotebooks } from './time-series';

export const notebookCategories: NotebookCategory[] = [
  {
    id: 'machine-learning',
    title: 'Machine Learning',
    description: 'Classical ML algorithms from linear models to ensemble methods. The backbone of production AI.',
    icon: '🧠',
    color: 'blue',
    bgColor: 'bg-brand-50',
    borderColor: 'border-brand-200',
    textColor: 'text-brand-700',
    notebooks: machineLearningNotebooks,
  },
  {
    id: 'deep-learning',
    title: 'Deep Learning',
    description: 'Neural networks, CNNs, RNNs, Transformers, and the architectures driving modern AI.',
    icon: '🔥',
    color: 'violet',
    bgColor: 'bg-violet-50',
    borderColor: 'border-violet-200',
    textColor: 'text-violet-700',
    notebooks: deepLearningNotebooks,
  },
  {
    id: 'nlp',
    title: 'NLP',
    description: 'Natural Language Processing — from TF-IDF to BERT. Make machines understand text.',
    icon: '💬',
    color: 'emerald',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    textColor: 'text-emerald-700',
    notebooks: nlpNotebooks,
  },
  {
    id: 'generative-ai',
    title: 'Generative AI',
    description: 'LLMs, RAG, prompt engineering, AI agents, and the tools reshaping software.',
    icon: '✨',
    color: 'amber',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    textColor: 'text-amber-700',
    notebooks: generativeAINotebooks,
  },
  {
    id: 'computer-vision',
    title: 'Computer Vision',
    description: 'Image classification, object detection, OCR, and making machines see.',
    icon: '👁️',
    color: 'rose',
    bgColor: 'bg-rose-50',
    borderColor: 'border-rose-200',
    textColor: 'text-rose-700',
    notebooks: computerVisionNotebooks,
  },
  {
    id: 'time-series',
    title: 'Time Series',
    description: 'ARIMA, LSTM forecasting, and temporal patterns in financial and operational data.',
    icon: '📈',
    color: 'cyan',
    bgColor: 'bg-cyan-50',
    borderColor: 'border-cyan-200',
    textColor: 'text-cyan-700',
    notebooks: timeSeriesNotebooks,
  },
];

export function getCategoryById(id: NotebookCategoryId): NotebookCategory | undefined {
  return notebookCategories.find((c) => c.id === id);
}

export function getNotebookById(notebookId: string): { notebook: Notebook; category: NotebookCategory } | undefined {
  for (const category of notebookCategories) {
    const notebook = category.notebooks.find((n) => n.id === notebookId);
    if (notebook) return { notebook, category };
  }
  return undefined;
}

export function getAllNotebooks(): Notebook[] {
  return notebookCategories.flatMap((c) => c.notebooks);
}

export function getTotalNotebookCount(): number {
  return notebookCategories.reduce((sum, c) => sum + c.notebooks.length, 0);
}
