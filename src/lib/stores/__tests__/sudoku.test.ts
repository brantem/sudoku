import { act } from '@testing-library/react';
import '@testing-library/jest-dom';

import { sudokuStore } from 'lib/stores';
import { Difficulty } from 'types/sudoku';

describe('sudokuStore', () => {
  afterEach(() => {
    act(() => sudokuStore.setState({ board: [], isSolved: false, coord: null }));
  });

  it('should set difficulty', async () => {
    expect(sudokuStore.getState().difficulty).toEqual(Difficulty.Easy);
    act(() => sudokuStore.getState().setDifficulty(Difficulty.Medium));
    expect(sudokuStore.getState().difficulty).toEqual(Difficulty.Medium);
  });

  it('should set coord', async () => {
    expect(sudokuStore.getState().coord).toBeNull();
    act(() => sudokuStore.getState().setCoord([0, 0]));
    expect(sudokuStore.getState().coord).toEqual([0, 0]);
  });

  it('should update cell', async () => {
    act(() => sudokuStore.setState({ board: [[[1, 0]]], coord: [0, 0] }));
    act(() => sudokuStore.getState().updateCell(1));
    expect(sudokuStore.getState().board[0][0]).toEqual([1, 1]);
  });

  it("shouldn't update cell if coord is null", async () => {
    act(() => sudokuStore.setState({ board: [[[0, 0]]] }));
    act(() => sudokuStore.getState().updateCell(1));
    expect(sudokuStore.getState().board[0][0]).toEqual([0, 0]);
  });

  it("shouldn't update cell if value < 0", async () => {
    act(() => sudokuStore.setState({ board: [[[1, -1]]] }));
    act(() => sudokuStore.getState().updateCell(1));
    expect(sudokuStore.getState().board[0][0]).toEqual([1, -1]);
  });
});
