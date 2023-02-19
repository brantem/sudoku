import { useState, useEffect } from 'react';
import { useStore } from 'zustand';
import { createStore } from 'zustand/vanilla';
import { persist } from 'zustand/middleware';

import { Difficulty, Coord, Board } from 'types/sudoku';
import { shuffle } from 'lib/helpers';

type SudokuState = {
  startedAt: number | null;
  completedAt: number | null;
  difficulty: Difficulty;
  setDifficulty: (difficulty: number) => void;

  board: Board;
  values: Record<number, number>;
  generate: () => void;
  solve: () => void;
  filled: number;

  coord: Coord | null;
  setCoord: (coord: Coord | null) => void;
  updateCell: (value: number) => void;
};

const isCellValid = (board: Board, x: number, y: number, num: number) => {
  for (let i = 0; i < 9; i++) {
    if (board[x][i][0] === num) return false;
  }

  for (let i = 0; i < 9; i++) {
    if (board[i][y][0] === num) return false;
  }

  const sx = Math.floor(x / 3) * 3;
  const sy = Math.floor(y / 3) * 3;
  for (let x = sx; x < sx + 3; x++) {
    for (let y = sy; y < sy + 3; y++) {
      if (board[x][y][0] === num) return false;
    }
  }

  return true;
};

const fillCell = (board: Board, x: number, y: number) => {
  const nums = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  for (const num of nums) {
    if (!isCellValid(board, x, y, num)) continue;
    board[x][y] = [num, 0];

    if (x === 8 && y === 8) return;

    if (y === 8) {
      fillCell(board, x + 1, 0);
    } else {
      fillCell(board, x, y + 1);
    }

    if (board[8][8][0] !== 0) return;
    board[x][y] = [0, 0];
  }
};

export const sudokuStore = createStore<SudokuState>()(
  persist(
    (set, get) => ({
      startedAt: null,
      completedAt: null,
      difficulty: Difficulty.Easy,
      setDifficulty: (difficulty) => {
        set({ difficulty });
        get().generate();
      },

      board: [],
      values: {},
      generate: () => {
        const board: Board = [];
        let coords = [];
        for (let x = 0; x < 9; x++) {
          board[x] = [];
          for (let y = 0; y < 9; y++) {
            board[x][y] = [0, 0];
            coords.push([x, y]);
          }
        }
        coords = shuffle(coords);

        for (let i = 0; i < 9; i += 3) {
          fillCell(board, i, i);
        }

        const values: Record<number, number> = {};
        let filled = 0;
        for (let i = 0; i < get().difficulty; i++) {
          const [x, y] = coords[i];
          board[x][y][1] = board[x][y][0] * -1;
          values[board[x][y][0]] = (values[board[x][y][0]] || 0) + 1;
          filled++;
        }

        set({ startedAt: Date.now(), completedAt: null, board, values, coord: null, filled });
      },
      solve: () => {
        const { board } = get();
        for (let x = 0; x < 9; x++) {
          for (let y = 0; y < 9; y++) {
            if (board[x][y][1] < 0) continue;
            board[x][y][1] = board[x][y][0];
          }
        }
        set({
          completedAt: Date.now(),
          board,
          values: { 1: 9, 2: 9, 3: 9, 4: 9, 5: 9, 6: 9, 7: 9, 8: 9, 9: 9 },
          coord: null,
          filled: 81,
        });
      },
      filled: 0,

      coord: null,
      setCoord: (coord) => set({ coord }),
      updateCell: (value) => {
        const { board, values, generate, filled, coord } = get();
        if (!coord) return;

        const [x, y] = coord;
        if (board[x][y][1] < 0 || board[x][y][0] === board[x][y][1]) return;

        if (board[x][y][1] !== 0) values[board[x][y][1]]--;
        if (value !== 0) values[value] = (values[value] || 0) + 1;

        board[x][y][1] = value;
        const _filled = value === board[x][y][0] ? filled + 1 : filled;
        set({ board, values, filled: _filled, completedAt: _filled === 81 ? Date.now() : null });
        if (_filled === 81) setTimeout(generate, 1000);
      },
    }),
    { name: 'sudoku' },
  ),
);

/* c8 ignore start */
const dummy = {
  startedAt: null,
  completedAt: null,
  difficulty: Difficulty.Easy,
  setDifficulty: () => {},

  board: [],
  values: {},
  generate: () => {},
  solve: () => {},
  filled: 0,

  coord: null,
  setCoord: () => {},
  updateCell: () => {},

  isCellValid: () => true,
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
