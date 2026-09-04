import React, { createContext, useCallback, useContext, useState } from 'react';

export type WorldId = 'letters' | 'nikud' | 'syllables' | 'words';

export interface LessonProgress {
  completed: boolean;
  stars: number; // 0-3
}

export interface WorldProgress {
  unlocked: boolean;
  lessons: Record<string, LessonProgress>;
  totalStars: number;
}

export interface ProgressState {
  worlds: Record<WorldId, WorldProgress>;
  totalStars: number;
}

const DEFAULT_PROGRESS: ProgressState = {
  worlds: {
    letters: { unlocked: true, lessons: {}, totalStars: 0 },
    nikud: { unlocked: true, lessons: {}, totalStars: 0 },
    syllables: { unlocked: true, lessons: {}, totalStars: 0 },
    words: { unlocked: true, lessons: {}, totalStars: 0 },
  },
  totalStars: 0,
};

const STORAGE_KEY = 'hebrew-learn-progress';

function loadProgress(): ProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw) as ProgressState;
    }
  } catch {
    // ignore
  }
  return DEFAULT_PROGRESS;
}

function saveProgress(p: ProgressState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
  } catch {
    // ignore
  }
}

interface ProgressContextValue {
  progress: ProgressState;
  completeLesson: (worldId: WorldId, lessonId: string, stars: number) => void;
  resetProgress: () => void;
  isWorldUnlocked: (worldId: WorldId) => boolean;
  getLessonStars: (worldId: WorldId, lessonId: string) => number;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<ProgressState>(loadProgress);

  const completeLesson = useCallback(
    (worldId: WorldId, lessonId: string, stars: number) => {
      setProgress(prev => {
        const oldStars = prev.worlds[worldId].lessons[lessonId]?.stars ?? 0;
        const newStars = Math.max(oldStars, stars);
        const starDelta = newStars - oldStars;

        const updatedWorld: WorldProgress = {
          ...prev.worlds[worldId],
          lessons: {
            ...prev.worlds[worldId].lessons,
            [lessonId]: { completed: true, stars: newStars },
          },
          totalStars: prev.worlds[worldId].totalStars + starDelta,
        };

        const updatedWorlds = { ...prev.worlds, [worldId]: updatedWorld };

        const newState: ProgressState = {
          worlds: updatedWorlds,
          totalStars: prev.totalStars + starDelta,
        };
        saveProgress(newState);
        return newState;
      });
    },
    []
  );

  const resetProgress = useCallback(() => {
    saveProgress(DEFAULT_PROGRESS);
    setProgress(DEFAULT_PROGRESS);
  }, []);

  const isWorldUnlocked = useCallback((_worldId: WorldId) => true, []);

  const getLessonStars = useCallback(
    (worldId: WorldId, lessonId: string) =>
      progress.worlds[worldId]?.lessons[lessonId]?.stars ?? 0,
    [progress]
  );

  return (
    <ProgressContext.Provider
      value={{ progress, completeLesson, resetProgress, isWorldUnlocked, getLessonStars }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be used inside ProgressProvider');
  return ctx;
}
