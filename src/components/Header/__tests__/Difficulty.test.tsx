import { render, screen, renderHook } from '@testing-library/react';
import '@testing-library/jest-dom';

import Difficulty from 'components/Header/Difficulty';

import { Difficulty as _Difficulty } from 'types/sudoku';
import { useSudokuStore } from 'lib/stores';

describe('Difficulty', () => {
  it('should change difficulty', async () => {
    const { result } = renderHook(() => useSudokuStore());
    const setDifficulty = vi.spyOn(result.current, 'setDifficulty');

    render(<Difficulty />);

    expect(screen.getByText('Easy')).toBeInTheDocument();
    // TODO: https://github.com/radix-ui/primitives/issues/1822
    // expect(setDifficulty).toHaveBeenCalledWith(_Difficulty.Medium);
    // expect(screen.getByText('Medium')).toBeInTheDocument();
  });
});
