'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface NotebookProgressState {
  completedNotebooks: string[];
  bookmarkedNotebooks: string[];
  lastVisitedNotebook: string | null;
  markComplete: (notebookId: string) => void;
  markIncomplete: (notebookId: string) => void;
  toggleBookmark: (notebookId: string) => void;
  isComplete: (notebookId: string) => boolean;
  isBookmarked: (notebookId: string) => boolean;
  setLastVisited: (notebookId: string) => void;
}

export const useNotebookStore = create<NotebookProgressState>()(
  persist(
    (set, get) => ({
      completedNotebooks: [],
      bookmarkedNotebooks: [],
      lastVisitedNotebook: null,

      markComplete: (id) =>
        set((s) => ({
          completedNotebooks: s.completedNotebooks.includes(id)
            ? s.completedNotebooks
            : [...s.completedNotebooks, id],
        })),

      markIncomplete: (id) =>
        set((s) => ({
          completedNotebooks: s.completedNotebooks.filter((n) => n !== id),
        })),

      toggleBookmark: (id) =>
        set((s) => ({
          bookmarkedNotebooks: s.bookmarkedNotebooks.includes(id)
            ? s.bookmarkedNotebooks.filter((n) => n !== id)
            : [...s.bookmarkedNotebooks, id],
        })),

      isComplete: (id) => get().completedNotebooks.includes(id),
      isBookmarked: (id) => get().bookmarkedNotebooks.includes(id),
      setLastVisited: (id) => set({ lastVisitedNotebook: id }),
    }),
    { name: 'notebook-progress' }
  )
);
