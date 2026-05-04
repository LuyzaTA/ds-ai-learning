'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { chunkText } from '@/lib/extractText';

export type TTSState = 'idle' | 'playing' | 'paused';

interface UseTTSOptions {
  text: string;
}

export function useTTS({ text }: UseTTSOptions) {
  const [state,         setState]         = useState<TTSState>('idle');
  const [rate,          setRate]          = useState(1.0);
  const [voices,        setVoices]        = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [chunkIndex,    setChunkIndex]    = useState(0);
  const [isSupported,   setIsSupported]   = useState(false);

  const chunksRef    = useRef<string[]>([]);
  const stateRef     = useRef<TTSState>('idle');
  const rateRef      = useRef(1.0);
  const voiceRef     = useRef<SpeechSynthesisVoice | null>(null);
  const currentUtter = useRef<SpeechSynthesisUtterance | null>(null);

  // Keep refs in sync with state so callbacks always have fresh values
  stateRef.current = state;
  rateRef.current  = rate;
  voiceRef.current = selectedVoice;

  // Load voices on mount
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    setIsSupported(true);

    const load = () => {
      const all     = window.speechSynthesis.getVoices();
      const english = all.filter((v) => v.lang.startsWith('en'));
      const list    = english.length > 0 ? english : all;
      setVoices(list);

      setSelectedVoice((prev) => {
        if (prev) return prev;
        return (
          list.find((v) => v.lang === 'en-US' && /natural|premium|enhanced/i.test(v.name)) ??
          list.find((v) => v.lang === 'en-US') ??
          list[0] ??
          null
        );
      });
    };

    load();
    window.speechSynthesis.addEventListener('voiceschanged', load);
    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', load);
      window.speechSynthesis.cancel();
    };
  }, []);

  /** Speak a single chunk by index, then chain to the next. */
  const speakChunk = useCallback((index: number) => {
    if (typeof window === 'undefined') return;
    const chunks = chunksRef.current;
    if (index >= chunks.length) {
      setState('idle');
      setChunkIndex(0);
      return;
    }

    const utter      = new SpeechSynthesisUtterance(chunks[index]);
    utter.rate       = rateRef.current;
    utter.pitch      = 1.0;
    utter.volume     = 1.0;
    if (voiceRef.current) utter.voice = voiceRef.current;

    utter.onstart = () => {
      setState('playing');
      setChunkIndex(index);
    };

    utter.onend = () => {
      if (stateRef.current !== 'idle') {
        speakChunk(index + 1);
      }
    };

    utter.onerror = (e) => {
      if (e.error !== 'interrupted' && e.error !== 'canceled') {
        setState('idle');
        setChunkIndex(0);
      }
    };

    currentUtter.current = utter;
    window.speechSynthesis.speak(utter);
  }, []);

  const play = useCallback(() => {
    if (!isSupported) return;

    if (stateRef.current === 'paused') {
      window.speechSynthesis.resume();
      setState('playing');
      return;
    }

    // Fresh start
    window.speechSynthesis.cancel();
    chunksRef.current = chunkText(text);
    setChunkIndex(0);
    setState('playing');
    speakChunk(0);
  }, [isSupported, text, speakChunk]);

  const pause = useCallback(() => {
    if (!isSupported) return;
    window.speechSynthesis.pause();
    setState('paused');
  }, [isSupported]);

  const stop = useCallback(() => {
    if (!isSupported) return;
    window.speechSynthesis.cancel();
    setState('idle');
    setChunkIndex(0);
  }, [isSupported]);

  const updateRate = useCallback((newRate: number) => {
    setRate(newRate);
    rateRef.current = newRate;
    // If currently playing, restart from current chunk with new rate
    if (stateRef.current === 'playing') {
      window.speechSynthesis.cancel();
      setState('playing');
      speakChunk(chunkIndex);
    }
  }, [chunkIndex, speakChunk]);

  const updateVoice = useCallback((voice: SpeechSynthesisVoice) => {
    setSelectedVoice(voice);
    voiceRef.current = voice;
    if (stateRef.current === 'playing') {
      window.speechSynthesis.cancel();
      setState('playing');
      speakChunk(chunkIndex);
    }
  }, [chunkIndex, speakChunk]);

  const totalChunks = chunksRef.current.length || chunkText(text).length;
  const progress    = totalChunks > 0 ? (chunkIndex / totalChunks) * 100 : 0;

  return {
    state,
    play,
    pause,
    stop,
    rate,
    setRate: updateRate,
    voices,
    selectedVoice,
    setSelectedVoice: updateVoice,
    progress,
    chunkIndex,
    totalChunks,
    isSupported,
  };
}
