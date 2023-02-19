import { render, screen, act, renderHook } from '@testing-library/react';
import '@testing-library/jest-dom';

import Board from 'components/Board';

import { sudokuStore, useSudokuStore } from 'lib/stores';

describe('Board', () => {
  afterEach(() => {
    act(() =>
      sudokuStore.setState({
        board: [
          [
            [1, -1],
            [2, 2],
            [3, -3],
          ],
          [
            [4, 0],
            [5, -5],
            [6, 0],
          ],
          [
            [7, -7],
            [8, 0],
            [9, -9],
          ],
        ],
        coord: null,
      }),
    );
  });

  it('render successfully', () => {
    const { container } = render(<Board />);

    expect(container).toMatchSnapshot();
  });

  it('should set coord', () => {
    const { result } = renderHook(() => useSudokuStore());
    const setCoord = vi.spyOn(result.current, 'setCoord').mockImplementationOnce(() => {});

    render(<Board />);

    act(() => screen.getByText('1').click());
    expect(setCoord).toHaveBeenCalledWith([0, 0]);
  });

  it('should activate other cells with the same value', () => {
    act(() =>
      sudokuStore.setState({
        board: [
          [
            [1, -1],
            [2, 1],
          ],
          [
            [3, -3],
            [4, -4],
          ],
        ],
      }),
    );
    const { result } = renderHook(() => useSudokuStore());

    render(<Board />);

    screen.getAllByText('1').forEach((el) => expect(el).toHaveAttribute('data-active', 'false'));
    act(() => result.current.setCoord([0, 0]));
    screen.getAllByText('1').forEach((el) => expect(el).toHaveAttribute('data-active', 'true'));
    act(() => result.current.setCoord([0, 1]));
    screen.getAllByText('1').forEach((el) => expect(el).toHaveAttribute('data-active', 'true'));
  });
});
