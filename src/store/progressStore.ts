'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ProgressStore {
  completedLessons: string[];
  lastVisited: string | null;
  detailMode: 'simple' | 'detailed';
  sidebarOpen: boolean;

  markComplete:   (lessonId: string) => void;
  markIncomplete: (lessonId: string) => void;
  setLastVisited: (path: string) => void;
  toggleDetail:   () => void;
  toggleSidebar:  () => void;
  isComplete:     (lessonId: string) => boolean;
  reset:          () => void;
}

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set, get) => ({
      completedLessons: [],
      lastVisited: null,
      detailMode: 'detailed',
      sidebarOpen: true,

      markComplete: (lessonId) =>
        set((s) => ({
          completedLessons: s.completedLessons.includes(lessonId)
            ? s.completedLessons
            : [...s.completedLessons, lessonId],
        })),

      markIncomplete: (lessonId) =>
        set((s) => ({
          completedLessons: s.completedLessons.filter((id) => id !== lessonId),
        })),

      setLastVisited: (path) => set({ lastVisited: path }),

      toggleDetail: () =>
        set((s) => ({
          detailMode: s.detailMode === 'simple' ? 'detailed' : 'simple',
        })),

      toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),

      isComplete: (lessonId) => get().completedLessons.includes(lessonId),

      reset: () => set({ completedLessons: [], lastVisited: null }),
    }),
    {
      name: 'ds-ai-platform-progress',
      // SSR safety: only persist on client
      skipHydration: false,
    }
  )
);
