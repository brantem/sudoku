import { render, screen, act, renderHook } from '@testing-library/react';
import '@testing-library/jest-dom';

import Keyboard from 'components/Keyboard';

import { useSudokuStore } from 'lib/stores';

describe('Keyboard', () => {
  it('should update cell', () => {
    const { result } = renderHook(() => useSudokuStore());
    const updateCell = vi.spyOn(result.current, 'updateCell').mockImplementation(() => {});

    render(<Keyboard />);

    act(() => screen.getByText('1').click());
    expect(updateCell).toHaveBeenCalledWith(1);

    act(() => screen.getByTestId('keyboard-delete').click());
    expect(updateCell).toHaveBeenCalledWith(0);
  });
});
