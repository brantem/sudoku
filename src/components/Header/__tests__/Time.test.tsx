import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';

import Time from 'components/Header/Time';

import { sudokuStore } from 'lib/stores';

describe('Time', () => {
  it('should render time correctly', async () => {
    vi.useFakeTimers();
    act(() => {
      const startedAt = new Date();
      startedAt.setHours(startedAt.getHours() - 1);
      startedAt.setMinutes(startedAt.getMinutes() - 1);
      startedAt.setSeconds(startedAt.getSeconds() - 1);
      sudokuStore.setState({ startedAt: startedAt.getTime() });
    });

    const { rerender } = render(<Time />);

    expect(screen.getByText('1:1:01')).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(1000));
    rerender(<Time />);
    expect(screen.getByText('1:1:02')).toBeInTheDocument();
    vi.useRealTimers();
  });

  it('should render completed time correctly', () => {
    act(() => {
      const startedAt = new Date();
      startedAt.setHours(startedAt.getHours() - 1);
      startedAt.setMinutes(startedAt.getMinutes() - 1);
      startedAt.setSeconds(startedAt.getSeconds() - 1);
      sudokuStore.setState({ startedAt: startedAt.getTime(), completedAt: Date.now() });
    });

    render(<Time />);

    expect(screen.getByText('1:1:01')).toBeInTheDocument();
  });
});
