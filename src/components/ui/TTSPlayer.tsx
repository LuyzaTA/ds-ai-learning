'use client';

import { useTTS } from '@/hooks/useTTS';
import { extractLessonText } from '@/lib/extractText';
import { Play, Pause, Square, Volume2, VolumeX, ChevronDown } from 'lucide-react';
import { clsx } from 'clsx';
import { useState } from 'react';
import type { ContentBlock } from '@/types/curriculum';

interface TTSPlayerProps {
  blocks: ContentBlock[];
  lessonTitle: string;
}

const RATES = [
  { label: '0.75×', value: 0.75 },
  { label: '1×',    value: 1.0  },
  { label: '1.25×', value: 1.25 },
  { label: '1.5×',  value: 1.5  },
  { label: '2×',    value: 2.0  },
];

export function TTSPlayer({ blocks, lessonTitle }: TTSPlayerProps) {
  const text = extractLessonText(blocks);
  const {
    state,
    play,
    pause,
    stop,
    rate,
    setRate,
    voices,
    selectedVoice,
    setSelectedVoice,
    progress,
    isSupported,
  } = useTTS({ text });

  const [showVoices, setShowVoices] = useState(false);

  if (!isSupported) return null;

  const isPlaying = state === 'playing';
  const isPaused  = state === 'paused';
  const isActive  = isPlaying || isPaused;

  return (
    <div
      className={clsx(
        'rounded-2xl border transition-all duration-300',
        isActive
          ? 'border-brand-300 bg-brand-50 shadow-soft'
          : 'border-slate-200 bg-white'
      )}
    >
      {/* Progress bar (only when active) */}
      {isActive && (
        <div className="h-1 bg-brand-100 rounded-t-2xl overflow-hidden">
          <div
            className="h-full bg-brand-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      <div className="flex items-center gap-3 px-4 py-3 flex-wrap">
        {/* Icon */}
        <div
          className={clsx(
            'w-8 h-8 rounded-lg flex items-center justify-center shrink-0',
            isActive ? 'bg-brand-200' : 'bg-slate-100'
          )}
        >
          {isActive
            ? <Volume2 className="w-4 h-4 text-brand-600" />
            : <VolumeX className="w-4 h-4 text-slate-400" />
          }
        </div>

        {/* Label */}
        <div className="flex-1 min-w-0">
          <p className={clsx('text-xs font-semibold', isActive ? 'text-brand-700' : 'text-slate-500')}>
            {isPlaying ? 'Reading aloud…' : isPaused ? 'Paused' : 'Listen to this lesson'}
          </p>
          {!isActive && (
            <p className="text-xs text-slate-400 truncate">{lessonTitle}</p>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Play / Pause */}
          <button
            onClick={isPlaying ? pause : play}
            className={clsx(
              'flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold transition-colors',
              isPlaying
                ? 'bg-brand-100 text-brand-700 hover:bg-brand-200'
                : 'bg-brand-600 text-white hover:bg-brand-700'
            )}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying
              ? <><Pause className="w-4 h-4" /> Pause</>
              : <><Play  className="w-4 h-4" /> {isPaused ? 'Resume' : 'Play'}</>
            }
          </button>

          {/* Stop (only when active) */}
          {isActive && (
            <button
              onClick={stop}
              className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors"
              aria-label="Stop"
            >
              <Square className="w-4 h-4" />
            </button>
          )}

          {/* Speed selector */}
          <div className="flex items-center bg-slate-100 rounded-xl overflow-hidden">
            {RATES.map(({ label, value }) => (
              <button
                key={value}
                onClick={() => setRate(value)}
                className={clsx(
                  'px-2.5 py-1.5 text-xs font-medium transition-colors',
                  rate === value
                    ? 'bg-brand-600 text-white'
                    : 'text-slate-600 hover:bg-slate-200'
                )}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Voice selector (shown when voices are available) */}
          {voices.length > 1 && (
            <div className="relative">
              <button
                onClick={() => setShowVoices((v) => !v)}
                className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs text-slate-600 hover:bg-slate-100 transition-colors border border-slate-200"
              >
                <span className="max-w-[80px] truncate">
                  {selectedVoice?.name.split(' ')[0] ?? 'Voice'}
                </span>
                <ChevronDown className="w-3 h-3 shrink-0" />
              </button>

              {showVoices && (
                <div className="absolute right-0 top-full mt-1 bg-white border border-slate-200 rounded-xl shadow-hover z-50 w-56 max-h-48 overflow-y-auto">
                  {voices.map((voice) => (
                    <button
                      key={voice.name}
                      onClick={() => { setSelectedVoice(voice); setShowVoices(false); }}
                      className={clsx(
                        'w-full text-left px-3 py-2 text-xs transition-colors hover:bg-slate-50',
                        voice.name === selectedVoice?.name
                          ? 'text-brand-700 font-semibold bg-brand-50'
                          : 'text-slate-700'
                      )}
                    >
                      <span className="block truncate">{voice.name}</span>
                      <span className="text-slate-400">{voice.lang}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
