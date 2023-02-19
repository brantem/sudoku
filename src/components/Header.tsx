import { useEffect, useState } from 'react';
import { ArrowPathIcon, CheckIcon } from '@heroicons/react/20/solid';

import { useBoardStore } from 'lib/stores';
import { getTimeDiff } from 'lib/helpers';

const Time = () => {
  const { startedAt, completedAt } = useBoardStore((state) => ({
    startedAt: state.startedAt,
    completedAt: state.completedAt,
  }));

  const [data, setData] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (!startedAt) return;

    let i: ReturnType<typeof setInterval>;
    if (completedAt) {
      setData(getTimeDiff(startedAt, completedAt));
    } else {
      setData(getTimeDiff(startedAt, Date.now()));
      i = setInterval(() => {
        setData(getTimeDiff(startedAt, Date.now()));
      }, 1000);
    }

    return () => clearInterval(i);
  }, [startedAt, completedAt]);

  return (
    <div className="flex h-8 items-center rounded-full border bg-white px-3 tabular-nums">
      {data.hours > 0 ? data.hours + ':' : ''}
      {data.minutes}:{data.seconds.toString().padStart(2, 0)}
    </div>
  );
};

const Header = () => {
  const { isSolved, solve, generate } = useBoardStore((state) => ({
    isSolved: state.isSolved,
    solve: state.solve,
    generate: state.generate,
  }));

  return (
    <div className="grid w-full grid-cols-3 text-sm font-semibold">
      <div className="flex">
        <button className="flex h-8 items-center rounded-full border bg-white px-3 hover:bg-neutral-100">Easy</button>
      </div>
      <div className="flex justify-center">
        <Time />
      </div>
      <div className="flex justify-end space-x-2">
        {!isSolved && (
          <button
            className="flex h-8 w-8 items-center justify-center rounded-full border bg-white hover:bg-neutral-100"
            onClick={solve}
            data-testid="header-solve"
          >
            <CheckIcon className="h-5 w-5" />
          </button>
        )}
        <button
          className="flex h-8 w-8 items-center justify-center rounded-full border bg-white hover:bg-neutral-100"
          onClick={generate}
          data-testid="header-generate"
        >
          <ArrowPathIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default Header;
