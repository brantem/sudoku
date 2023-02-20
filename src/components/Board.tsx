import { cn } from 'lib/helpers';
import { useSudokuStore } from 'lib/stores';

const Board = () => {
  const { board, generate, isSolved, coord, setCoord } = useSudokuStore((state) => ({
    board: state.board,
    generate: state.generate,
    isSolved: state.filled === 81,
    coord: state.coord,
    setCoord: state.setCoord,
  }));
  const size = board.length || 9;

  return (
    <div className="relative">
      <div
        className={cn(
          'flex flex-col overflow-hidden rounded-xl border-[3px] border-neutral-400',
          'dark:border-neutral-500',
        )}
      >
        {[...new Array(size)].map((_, x) => (
          <div
            key={x}
            className={cn('flex', x > 0 && x % 3 === 0 && 'border-t-[3px] border-neutral-400 dark:border-neutral-500')}
          >
            {[...new Array(size)].map((_, y) => {
              const cell = board.length ? board[x][y] : [0, 0];
              const value = cell[1] < 0 ? cell[0] : cell[1] === 0 ? '' : cell[1];

              const isFilled = cell[1] + cell[0] === 0;
              const isActive = coord ? coord[0] === x && coord[1] === y : false;

              const activeCell = coord && board[coord[0]][coord[1]];
              const shouldActive = activeCell
                ? activeCell[1] !== 0 && activeCell[activeCell[1] > 0 ? 1 : 0] === value
                : false;

              return (
                <button
                  key={y}
                  className={cn(
                    'flex h-[42px] flex-1 items-center justify-center border-neutral-400 bg-white text-2xl font-semibold sm:h-14 sm:text-3xl',
                    'dark:border-neutral-500 dark:bg-neutral-800',
                    y > 0 && 'border-l',
                    x % 3 !== 0 && 'border-t',
                    y > 0 && y % 3 === 0 && 'border-l-[3px]',
                    (isFilled || value === cell[0]) && 'bg-neutral-200 dark:bg-neutral-900',
                    shouldActive || isActive
                      ? 'bg-blue-400 dark:bg-blue-700'
                      : 'hover:bg-blue-200 dark:hover:bg-blue-900',
                  )}
                  data-active={shouldActive || isActive}
                  onClick={() => setCoord([x, y])}
                >
                  {value}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {(!board.length || isSolved) && (
        <div
          className={cn(
            'absolute inset-0 flex h-full w-full items-center justify-center rounded-xl bg-white/75',
            'dark:bg-black/75',
          )}
        >
          <button
            className={cn(
              'rounded-full bg-neutral-700 px-6 py-1.5 text-lg text-white hover:bg-neutral-600',
              'dark:bg-white dark:text-neutral-700 dark:hover:bg-neutral-200',
            )}
            onClick={generate}
          >
            {isSolved ? 'New Board' : 'Start'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Board;
