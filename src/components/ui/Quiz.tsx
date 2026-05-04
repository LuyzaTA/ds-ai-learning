'use client';

import { useState } from 'react';
import { CheckCircle2, XCircle, HelpCircle } from 'lucide-react';
import { clsx } from 'clsx';
import type { Question } from '@/types/curriculum';

interface QuizProps {
  title?: string;
  questions: Question[];
}

interface QuestionState {
  selected: number | null;
  submitted: boolean;
}

export function Quiz({ title = 'Knowledge Check', questions }: QuizProps) {
  const [states, setStates] = useState<QuestionState[]>(
    questions.map(() => ({ selected: null, submitted: false }))
  );
  const [allSubmitted, setAllSubmitted] = useState(false);

  const select = (qi: number, oi: number) => {
    if (states[qi].submitted) return;
    setStates((prev) =>
      prev.map((s, i) => (i === qi ? { ...s, selected: oi } : s))
    );
  };

  const submit = (qi: number) => {
    if (states[qi].selected === null) return;
    const next = states.map((s, i) => (i === qi ? { ...s, submitted: true } : s));
    setStates(next);
    setAllSubmitted(next.every((s) => s.submitted));
  };

  const score = states.reduce((acc, s, i) => {
    return s.submitted && s.selected === questions[i].correctIndex ? acc + 1 : acc;
  }, 0);

  const reset = () => {
    setStates(questions.map(() => ({ selected: null, submitted: false })));
    setAllSubmitted(false);
  };

  return (
    <div className="my-8 rounded-2xl border border-brand-200 bg-brand-50 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 px-5 py-4 bg-brand-100 border-b border-brand-200">
        <HelpCircle className="w-5 h-5 text-brand-600" />
        <h3 className="text-base font-semibold text-brand-800">{title}</h3>
        {allSubmitted && (
          <span className="ml-auto text-sm font-bold text-brand-700">
            Score: {score}/{questions.length}
          </span>
        )}
      </div>

      {/* Questions */}
      <div className="p-5 space-y-7">
        {questions.map((q, qi) => {
          const state   = states[qi];
          const correct = state.selected === q.correctIndex;

          return (
            <div key={q.id}>
              <p className="font-medium text-slate-800 mb-3 text-base leading-snug">
                {qi + 1}. {q.question}
              </p>

              <div className="space-y-2">
                {q.options.map((opt, oi) => {
                  const isSelected  = state.selected === oi;
                  const isCorrect   = oi === q.correctIndex;
                  const isWrong     = state.submitted && isSelected && !isCorrect;
                  const showCorrect = state.submitted && isCorrect;

                  return (
                    <button
                      key={oi}
                      onClick={() => select(qi, oi)}
                      className={clsx(
                        'w-full text-left px-4 py-3 rounded-xl border text-sm transition-all',
                        !state.submitted && !isSelected && 'border-slate-200 bg-white hover:border-brand-300 hover:bg-brand-50',
                        !state.submitted && isSelected && 'border-brand-400 bg-brand-100 font-medium',
                        showCorrect  && 'border-emerald-400 bg-emerald-50 text-emerald-800 font-medium',
                        isWrong      && 'border-rose-400 bg-rose-50 text-rose-800',
                        state.submitted && !isSelected && !isCorrect && 'border-slate-200 bg-white opacity-60',
                      )}
                      disabled={state.submitted}
                    >
                      <span className="flex items-center gap-2">
                        {showCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />}
                        {isWrong     && <XCircle     className="w-4 h-4 text-rose-500 shrink-0" />}
                        {!state.submitted && (
                          <span className={clsx(
                            'inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold mr-1',
                            isSelected ? 'bg-brand-500 text-white' : 'bg-slate-200 text-slate-600'
                          )}>
                            {String.fromCharCode(65 + oi)}
                          </span>
                        )}
                        {opt}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Submit / Explanation */}
              {!state.submitted ? (
                <button
                  onClick={() => submit(qi)}
                  disabled={state.selected === null}
                  className="mt-3 px-4 py-2 text-sm font-medium rounded-lg bg-brand-600 text-white hover:bg-brand-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Check Answer
                </button>
              ) : (
                <div className={clsx(
                  'mt-3 rounded-xl px-4 py-3 text-sm',
                  correct ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                )}>
                  <strong>{correct ? '✓ Correct! ' : '✗ Not quite. '}</strong>
                  {q.explanation}
                </div>
              )}
            </div>
          );
        })}

        {/* Reset button */}
        {allSubmitted && (
          <div className="flex justify-between items-center pt-4 border-t border-brand-200">
            <div className="text-sm text-brand-700 font-medium">
              {score === questions.length
                ? '🎉 Perfect score!'
                : score >= questions.length / 2
                ? '👍 Good effort!'
                : '📖 Review the material and try again.'}
            </div>
            <button
              onClick={reset}
              className="px-4 py-2 text-sm font-medium rounded-lg border border-brand-300 text-brand-700 hover:bg-brand-100 transition-colors"
            >
              Retry Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
