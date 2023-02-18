import { cn } from 'lib/helpers';

import { useBoardStore } from 'lib/stores';

const Board = () => {
  const { board } = useBoardStore();

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border-[3px] border-neutral-500">
      {[...new Array(9)].map((_, i) => (
        <div key={i} className={cn('flex', i > 0 && i % 3 === 0 && 'border-t-2 border-neutral-400')}>
          {[...new Array(9)].map((_, j) => {
            const col = board[i][j];
            const isDisabled = col[1] + col[0] === 0;

            return (
              <button
                key={j}
                className={cn(
                  'flex h-12 flex-1 items-center justify-center border-neutral-400 bg-white text-2xl font-semibold enabled:hover:bg-neutral-100 disabled:bg-neutral-200',
                  j > 0 && 'border-l',
                  i % 3 !== 0 && 'border-t',
                  j > 0 && j % 3 === 0 && 'border-l-2',
                )}
                disabled={isDisabled}
              >
                {col[0]}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Board;
