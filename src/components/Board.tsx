import { cn } from 'lib/helpers';
import { useSudokuStore } from 'lib/stores';

const Board = () => {
  const { board, coord, setCoord } = useSudokuStore((state) => ({
    board: state.board,
    coord: state.coord,
    setCoord: state.setCoord,
  }));
  const size = board.length || 9;

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border-[3px] border-neutral-500">
      {[...new Array(size)].map((_, x) => (
        <div key={x} className={cn('flex', x > 0 && x % 3 === 0 && 'border-t-[3px] border-neutral-500')}>
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
                  'flex h-[42px] flex-1 items-center justify-center border-neutral-500 bg-white text-2xl font-semibold sm:h-14 sm:text-3xl',
                  'dark:bg-neutral-800',
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
  );
};

export default Board;
