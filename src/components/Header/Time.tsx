import { useEffect, useState } from 'react';

import { useSudokuStore } from 'lib/stores';
import { getTimeDiff, padStart } from 'lib/helpers';

const Time = () => {
  const { startedAt, completedAt } = useSudokuStore((state) => ({
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
      {data.hours ? `${data.hours}:${padStart(data.minutes, 2, '0')}` : data.minutes}:{padStart(data.seconds, 2, '0')}
    </div>
  );
};

export default Time;
