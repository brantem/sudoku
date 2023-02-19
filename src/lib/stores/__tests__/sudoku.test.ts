import { act } from '@testing-library/react';
import '@testing-library/jest-dom';

import { sudokuStore } from 'lib/stores';
import { Cell, Difficulty } from 'types/sudoku';

describe('sudokuStore', () => {
  afterEach(() => {
    act(() => sudokuStore.setState({ board: [], values: {}, filled: 0, coord: null }));
  });

  it('should set difficulty', async () => {
    vi.spyOn(sudokuStore.getState(), 'generate').mockImplementationOnce(() => {});
    expect(sudokuStore.getState().difficulty).toEqual(Difficulty.Easy);
    act(() => sudokuStore.getState().setDifficulty(Difficulty.Medium));
    expect(sudokuStore.getState().difficulty).toEqual(Difficulty.Medium);
  });

  it('should generate the board', async () => {
    act(() => {
      sudokuStore.setState({ difficulty: Difficulty.Easy });
      sudokuStore.getState().generate();
    });
    const board = sudokuStore.getState().board;
    expect(board.reduce((totalCells, row) => totalCells + row.length, 0)).toEqual(81);
    const filledCells = board.reduce((cells, row) => [...cells, ...row.filter((cell) => cell[1] < 0)], []);
    expect(filledCells.length - sudokuStore.getState().filled).toEqual(0);
  });

  it('should solve the board', async () => {
    const isRowValid = (cell: Cell) => cell[1] + cell[0] === 0 || cell[1] === cell[0];
    const completedValues = { 1: 9, 2: 9, 3: 9, 4: 9, 5: 9, 6: 9, 7: 9, 8: 9, 9: 9 };

    act(() => {
      sudokuStore.getState().generate();
      sudokuStore.getState().setCoord([0, 0]);
    });
    expect(sudokuStore.getState().completedAt).toBeNull();
    expect(sudokuStore.getState().board.every((row) => row.every(isRowValid))).not.toBeTruthy();
    expect(sudokuStore.getState().values).not.toEqual(completedValues);
    expect(sudokuStore.getState().filled).not.toEqual(81);
    expect(sudokuStore.getState().coord).not.toBeNull();
    act(() => sudokuStore.getState().solve());
    expect(sudokuStore.getState().completedAt).not.toBeNull();
    expect(sudokuStore.getState().board.every((row) => row.every(isRowValid))).toBeTruthy();
    expect(sudokuStore.getState().values).toEqual(completedValues);
    expect(sudokuStore.getState().filled).toEqual(81);
    expect(sudokuStore.getState().coord).toBeNull();
  });

  it('should set coord', async () => {
    expect(sudokuStore.getState().coord).toBeNull();
    act(() => sudokuStore.getState().setCoord([0, 0]));
    expect(sudokuStore.getState().coord).toEqual([0, 0]);
  });

  it('should update correctly', async () => {
    act(() => sudokuStore.setState({ board: [[[1, 0]]], coord: [0, 0] }));
    expect(sudokuStore.getState().values).toEqual({});
    act(() => sudokuStore.getState().updateCell(2));
    expect(sudokuStore.getState().board[0][0]).toEqual([1, 2]);
    expect(sudokuStore.getState().values).toEqual({ 2: 1 });
    act(() => sudokuStore.getState().updateCell(1));
    expect(sudokuStore.getState().board[0][0]).toEqual([1, 1]);
    expect(sudokuStore.getState().values).toEqual({ 1: 1, 2: 0 });
  });

  it("shouldn't update cell if coord is null", async () => {
    act(() => sudokuStore.setState({ board: [[[0, 0]]] }));
    act(() => sudokuStore.getState().updateCell(1));
    expect(sudokuStore.getState().board[0][0]).toEqual([0, 0]);
  });

  it("shouldn't update cell if value < 0", async () => {
    act(() => sudokuStore.setState({ board: [[[1, -1]]], coord: [0, 0] }));
    act(() => sudokuStore.getState().updateCell(1));
    expect(sudokuStore.getState().board[0][0]).toEqual([1, -1]);
  });

  it("shouldn't update cell if value is correct", async () => {
    act(() => sudokuStore.setState({ board: [[[1, 1]]], coord: [0, 0] }));
    act(() => sudokuStore.getState().updateCell(2));
    expect(sudokuStore.getState().board[0][0]).toEqual([1, 1]);
  });

  it("shouldn't update regenerate if filled equals 81", async () => {
    vi.useFakeTimers();
    const generate = vi.spyOn(sudokuStore.getState(), 'generate').mockImplementationOnce(() => {});
    act(() => sudokuStore.setState({ board: [[[1, 0]]], filled: 80, coord: [0, 0] }));
    act(() => sudokuStore.getState().updateCell(1));
    expect(sudokuStore.getState().filled).toEqual(81);
    expect(sudokuStore.getState().completedAt).not.toBeNull();
    act(() => vi.advanceTimersByTime(1000));
    expect(generate).toHaveBeenCalled();
    vi.useRealTimers();
  });
});
