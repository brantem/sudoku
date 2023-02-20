import { render, screen, act, renderHook } from '@testing-library/react';
import '@testing-library/jest-dom';

import Keyboard from 'components/Keyboard';

import { sudokuStore, useSudokuStore } from 'lib/stores';

describe('Keyboard', () => {
  beforeEach(() => {
    act(() => sudokuStore.setState({ values: {}, filled: 0 }));
  });

  it('should update cell', () => {
    const { result } = renderHook(() => useSudokuStore());
    const updateCell = vi.spyOn(result.current, 'updateCell').mockImplementation(() => {});

    render(<Keyboard />);

    act(() => screen.getByText('1').click());
    expect(updateCell).toHaveBeenCalledWith(1);

    act(() => screen.getByTestId('keyboard-delete').click());
    expect(updateCell).toHaveBeenCalledWith(0);
  });

  it('should disable button if the value has been used correctly 9 times', () => {
    render(<Keyboard />);

    expect(screen.getByText('1')).not.toBeDisabled();
    act(() => sudokuStore.setState({ values: { 1: 9 } }));
    expect(screen.getByText('1')).toBeDisabled();
  });

  it('should disable all buttons if all cells are filled', () => {
    render(<Keyboard />);

    screen.getAllByTestId('keyboard-button').forEach((el) => expect(el).not.toBeDisabled());
    expect(screen.getByTestId('keyboard-delete')).not.toBeDisabled();
    act(() => sudokuStore.setState({ filled: 81 }));
    screen.getAllByTestId('keyboard-button').forEach((el) => expect(el).toBeDisabled());
    expect(screen.getByTestId('keyboard-delete')).toBeDisabled();
  });
});
