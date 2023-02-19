import { useState, useEffect } from 'react';
import { useStore } from 'zustand';
import { createStore } from 'zustand/vanilla';
import { persist } from 'zustand/middleware';

import { Cell, Difficulty } from 'types/sudoku';

type SudokuState = {
  startedAt: number | null;
  completedAt: number | null;
  difficulty: Difficulty;
  setDifficulty: (difficulty: number) => void;

  board: Cell[][];
  generate: () => void;
  solve: () => void;
  isSolved: boolean;

  coord: [number, number] | null;
  setCoord: (coord: [number, number] | null) => void;
  updateCell: (value: number) => void;
};

export const sudokuStore = createStore<SudokuState>()(
  persist(
    (set, get) => ({
      startedAt: null,
      completedAt: null,
      difficulty: Difficulty.Easy,
      setDifficulty: (difficulty) => set({ difficulty }),

      board: [],
      generate: () => {
        set({
          startedAt: Date.now(),
          completedAt: null,
          board: [
            [
              [4, -4],
              [1, 0],
              [2, 0],
              [3, -3],
              [6, -6],
              [5, -5],
              [7, 0],
              [8, 0],
              [9, 0],
            ],
            [
              [7, -7],
              [5, -5],
              [6, 0],
              [9, 0],
              [2, -2],
              [8, -8],
              [3, -3],
              [4, -4],
              [1, 0],
            ],
            [
              [3, 0],
              [9, 0],
              [8, -8],
              [4, 0],
              [1, -1],
              [7, -7],
              [5, 0],
              [2, -2],
              [6, 0],
            ],
            [
              [9, -9],
              [8, -8],
              [5, -5],
              [6, -6],
              [7, -7],
              [1, 0],
              [2, 0],
              [3, -3],
              [4, -4],
            ],
            [
              [6, -6],
              [2, -2],
              [7, 0],
              [5, -5],
              [3, -3],
              [4, 0],
              [9, 0],
              [1, -1],
              [8, 0],
            ],
            [
              [1, -1],
              [3, 0],
              [4, 0],
              [8, -8],
              [9, -9],
              [2, -2],
              [6, -6],
              [5, 0],
              [7, 0],
            ],
            [
              [5, 0],
              [7, 0],
              [1, -1],
              [2, -2],
              [4, -4],
              [6, 0],
              [8, 0],
              [9, -9],
              [3, 0],
            ],
            [
              [8, -8],
              [4, -4],
              [9, -9],
              [7, -7],
              [5, 0],
              [3, -3],
              [1, -1],
              [6, -6],
              [2, -2],
            ],
            [
              [2, 0],
              [6, 0],
              [3, -3],
              [1, -1],
              [8, 0],
              [9, -9],
              [4, 0],
              [7, -7],
              [5, -5],
            ],
          ],
          isSolved: false,
        });
      },
      solve: () => {
        set({
          completedAt: Date.now(),
          board: [
            [
              [4, -4],
              [1, 1],
              [2, 2],
              [3, -3],
              [6, -6],
              [5, -5],
              [7, 7],
              [8, 8],
              [9, 9],
            ],
            [
              [7, -7],
              [5, -5],
              [6, 6],
              [9, 9],
              [2, -2],
              [8, -8],
              [3, -3],
              [4, -4],
              [1, 1],
            ],
            [
              [3, 3],
              [9, 9],
              [8, -8],
              [4, 4],
              [1, -1],
              [7, -7],
              [5, 5],
              [2, -2],
              [6, 6],
            ],
            [
              [9, -9],
              [8, -8],
              [5, -5],
              [6, -6],
              [7, -7],
              [1, 1],
              [2, 2],
              [3, -3],
              [4, -4],
            ],
            [
              [6, -6],
              [2, -2],
              [7, 7],
              [5, -5],
              [3, -3],
              [4, 4],
              [9, 9],
              [1, -1],
              [8, 8],
            ],
            [
              [1, -1],
              [3, 3],
              [4, 4],
              [8, -8],
              [9, -9],
              [2, -2],
              [6, -6],
              [5, 5],
              [7, 7],
            ],
            [
              [5, 5],
              [7, 7],
              [1, -1],
              [2, -2],
              [4, -4],
              [6, 6],
              [8, 8],
              [9, -9],
              [3, 3],
            ],
            [
              [8, -8],
              [4, -4],
              [9, -9],
              [7, -7],
              [5, 5],
              [3, -3],
              [1, -1],
              [6, -6],
              [2, -2],
            ],
            [
              [2, 2],
              [6, 6],
              [3, -3],
              [1, -1],
              [8, 8],
              [9, -9],
              [4, 4],
              [7, -7],
              [5, -5],
            ],
          ],
          isSolved: true,
        });
      },
      isSolved: false,

      coord: null,
      setCoord: (coord) => set({ coord }),
      updateCell: (value) => {
        const { board, coord } = get();
        if (!coord || board[coord[0]][coord[1]][1] < 0) return;
        board[coord[0]][coord[1]][1] = value;
        set({ board });
      },
    }),
    { name: 'board' },
  ),
);

/* c8 ignore start */
const dummy = {
  startedAt: null,
  completedAt: null,
  difficulty: Difficulty.Easy,
  setDifficulty: () => {},

  board: [],
  generate: () => {},
  solve: () => {},
  isSolved: false,

  coord: null,
  setCoord: () => {},
  updateCell: () => {},
};

// https://github.com/pmndrs/zustand/issues/1145
export function useSudokuStore(): SudokuState;
export function useSudokuStore<T>(selector: (state: SudokuState) => T, equals?: (a: T, b: T) => boolean): T;
export function useSudokuStore(selector?: any, equals?: any) {
  const store = useStore(sudokuStore, selector, equals);
  const [isHydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return isHydrated ? store : selector ? selector(dummy) : dummy;
}
/* c8 ignore stop */
