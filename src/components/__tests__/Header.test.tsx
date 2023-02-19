import { render, screen, act, renderHook } from '@testing-library/react';
import '@testing-library/jest-dom';

import Header from 'components/Header';

import { boardStore, useBoardStore } from 'lib/stores';

describe('Header', () => {
  afterEach(() => {
    act(() => boardStore.setState({ isSolved: false }));
  });

  it('should generate board', () => {
    const { result } = renderHook(() => useBoardStore());
    const generate = vi.spyOn(result.current, 'generate').mockImplementationOnce(() => {});

    render(<Header />);

    act(() => screen.getByTestId('header-generate').click());
    expect(generate).toHaveBeenCalled();
  });

  it('should not show solve button if board is solved', () => {
    act(() => boardStore.setState({ isSolved: true }));

    render(<Header />);

    expect(screen.queryByTestId('header-solve')).not.toBeInTheDocument();
  });

  it('should solve board', () => {
    const { result } = renderHook(() => useBoardStore());
    const solve = vi.spyOn(result.current, 'solve').mockImplementationOnce(() => {});

    render(<Header />);

    act(() => screen.getByTestId('header-solve').click());
    expect(solve).toHaveBeenCalled();
  });
});
