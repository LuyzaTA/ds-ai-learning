'use client';

import { useState } from 'react';
import { CheckCircle2, XCircle, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { clsx } from 'clsx';
import { useTranslation } from '@/hooks/useTranslation';
import type { QuizCell as QuizCellType } from '@/types/notebook';

interface Props {
  cell: QuizCellType;
}

export function QuizCell({ cell }: Props) {
  const t = useTranslation();
  const [selected, setSelected] = useState<(number | null)[]>(
    cell.questions.map(() => null)
  );
  const [submitted, setSubmitted] = useState<boolean[]>(
    cell.questions.map(() => false)
  );
  const [showExplanation, setShowExplanation] = useState<boolean[]>(
    cell.questions.map(() => false)
  );

  const handleSubmit = (qi: number) => {
    if (selected[qi] === null) return;
    const next = [...submitted];
    next[qi] = true;
    setSubmitted(next);
    const ex = [...showExplanation];
    ex[qi] = true;
    setShowExplanation(ex);
  };

  const handleReset = (qi: number) => {
    const s = [...selected]; s[qi] = null; setSelected(s);
    const su = [...submitted]; su[qi] = false; setSubmitted(su);
    const ex = [...showExplanation]; ex[qi] = false; setShowExplanation(ex);
  };

  const score = submitted.filter((s, i) => s && selected[i] === cell.questions[i].correct).length;
  const total  = cell.questions.length;

  return (
    <div className="rounded-xl border border-brand-200 bg-brand-50 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-brand-100 bg-brand-100/50">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-brand-600" />
          <span className="text-sm font-bold text-brand-800">{cell.title ?? t.cells.quiz.knowledgeCheck}</span>
          <span className="text-xs text-brand-500">({total} {t.cells.quiz.questions})</span>
        </div>
        {submitted.every(Boolean) && (
          <span className={clsx(
            'text-xs font-bold px-2.5 py-1 rounded-full',
            score === total ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
          )}>
            {score}/{total} {t.cells.quiz.correct}
          </span>
        )}
      </div>

      {/* Questions */}
      <div className="divide-y divide-brand-100">
        {cell.questions.map((q, qi) => {
          const isSubmitted = submitted[qi];
          const isCorrect   = selected[qi] === q.correct;

          return (
            <div key={qi} className="px-5 py-4">
              <p className="text-sm font-semibold text-slate-800 mb-3">
                {qi + 1}. {q.question}
              </p>

              <div className="space-y-2 mb-3">
                {q.options.map((opt, oi) => {
                  const isSelected = selected[qi] === oi;
                  const isRight    = oi === q.correct;

                  let optClass = 'border-slate-200 bg-white text-slate-700 hover:border-brand-300 hover:bg-brand-50/50';
                  if (isSubmitted) {
                    if (isRight)          optClass = 'border-emerald-300 bg-emerald-50 text-emerald-800';
                    else if (isSelected)  optClass = 'border-rose-300 bg-rose-50 text-rose-800';
                    else                  optClass = 'border-slate-200 bg-white text-slate-400';
                  } else if (isSelected) {
                    optClass = 'border-brand-400 bg-brand-50 text-brand-800';
                  }

                  return (
                    <button
                      key={oi}
                      onClick={() => {
                        if (isSubmitted) return;
                        const s = [...selected]; s[qi] = oi; setSelected(s);
                      }}
                      disabled={isSubmitted}
                      className={clsx(
                        'w-full flex items-center gap-3 px-4 py-2.5 rounded-lg border text-sm text-left transition-all',
                        optClass,
                        !isSubmitted && 'cursor-pointer'
                      )}
                    >
                      <span className={clsx(
                        'w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0',
                        isSelected && !isSubmitted ? 'border-brand-500 bg-brand-500' :
                        isSubmitted && isRight ? 'border-emerald-500' :
                        isSubmitted && isSelected ? 'border-rose-500' :
                        'border-slate-300'
                      )}>
                        {isSubmitted && isRight && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                        {isSubmitted && isSelected && !isRight && <XCircle className="w-4 h-4 text-rose-600" />}
                        {isSelected && !isSubmitted && <div className="w-2 h-2 rounded-full bg-white" />}
                      </span>
                      {opt}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-3">
                {!isSubmitted ? (
                  <button
                    onClick={() => handleSubmit(qi)}
                    disabled={selected[qi] === null}
                    className={clsx(
                      'px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors',
                      selected[qi] !== null
                        ? 'bg-brand-600 text-white hover:bg-brand-700'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    )}
                  >
                    {t.cells.quiz.checkAnswer}
                  </button>
                ) : (
                  <button
                    onClick={() => handleReset(qi)}
                    className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
                  >
                    {t.cells.quiz.tryAgain}
                  </button>
                )}

                {isSubmitted && (
                  <button
                    onClick={() => {
                      const ex = [...showExplanation]; ex[qi] = !ex[qi]; setShowExplanation(ex);
                    }}
                    className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-700"
                  >
                    {showExplanation[qi] ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    {t.cells.quiz.explanation}
                  </button>
                )}
              </div>

              {isSubmitted && showExplanation[qi] && (
                <div className={clsx(
                  'mt-3 p-3 rounded-lg text-xs leading-relaxed',
                  isCorrect ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-amber-50 text-amber-800 border border-amber-200'
                )}>
                  <strong>{isCorrect ? t.cells.quiz.correctFeedback : t.cells.quiz.incorrectFeedback}</strong>
                  {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
