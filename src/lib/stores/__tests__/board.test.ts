import { act } from '@testing-library/react';
import '@testing-library/jest-dom';

import { boardStore } from 'lib/stores';

describe('useBoardStore', () => {
  afterEach(() => {
    act(() => boardStore.setState({ board: [], isSolved: false, coord: null }));
  });

  it('should set coord', async () => {
    expect(boardStore.getState().coord).toBeNull();
    act(() => boardStore.getState().setCoord([0, 0]));
    expect(boardStore.getState().coord).toEqual([0, 0]);
  });

  it('should update cell', async () => {
    act(() => boardStore.setState({ board: [[[1, 0]]], coord: [0, 0] }));
    act(() => boardStore.getState().updateCell(1));
    expect(boardStore.getState().board[0][0]).toEqual([1, 1]);
  });

  it("shouldn't update cell if coord is null", async () => {
    act(() => boardStore.setState({ board: [[[0, 0]]] }));
    act(() => boardStore.getState().updateCell(1));
    expect(boardStore.getState().board[0][0]).toEqual([0, 0]);
  });

  it("shouldn't update cell if value < 0", async () => {
    act(() => boardStore.setState({ board: [[[1, -1]]] }));
    act(() => boardStore.getState().updateCell(1));
    expect(boardStore.getState().board[0][0]).toEqual([1, -1]);
  });
});
