import { render, screen, act, renderHook, waitFor } from '@testing-library/react';
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

  it('should render time correctly', async () => {
    vi.useFakeTimers();
    act(() => {
      const startedAt = new Date();
      startedAt.setHours(startedAt.getHours() - 1);
      startedAt.setMinutes(startedAt.getMinutes() - 1);
      startedAt.setSeconds(startedAt.getSeconds() - 1);
      boardStore.setState({ startedAt: startedAt.getTime() });
    });

    const { rerender } = render(<Header />);

    expect(screen.getByText('1:1:01')).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(1000));
    rerender(<Header />);
    expect(screen.getByText('1:1:02')).toBeInTheDocument();
    vi.useRealTimers();
  });

  it('should render completed time correctly', () => {
    act(() => {
      const startedAt = new Date();
      startedAt.setHours(startedAt.getHours() - 1);
      startedAt.setMinutes(startedAt.getMinutes() - 1);
      startedAt.setSeconds(startedAt.getSeconds() - 1);
      boardStore.setState({ startedAt: startedAt.getTime(), completedAt: Date.now() });
    });

    render(<Header />);

    expect(screen.getByText('1:1:01')).toBeInTheDocument();
  });
});
