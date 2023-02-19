import { cn } from 'lib/helpers';
import { useBoardStore } from 'lib/stores';

const Board = () => {
  const { board, coord, setCoord } = useBoardStore((state) => ({
    board: state.board,
    coord: state.coord,
    setCoord: state.setCoord,
  }));
  const size = board.length || 9;

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border-[3px] border-neutral-500">
      {[...new Array(size)].map((_, i) => (
        <div key={i} className={cn('flex', i > 0 && i % 3 === 0 && 'border-t-2 border-neutral-400')}>
          {[...new Array(size)].map((_, j) => {
            const cell = board.length ? board[i][j] : [0, 0];
            const value = cell[1] < 0 ? cell[0] : cell[1] === 0 ? '' : cell[1];

            const isFilled = cell[1] + cell[0] === 0;
            const isActive = coord ? coord[0] === i && coord[1] === j : false;

            const activeCell = coord && board[coord[0]][coord[1]];
            const shouldActive = activeCell
              ? activeCell[1] !== 0 && activeCell[activeCell[1] > 0 ? 1 : 0] === value
              : false;

            return (
              <button
                key={j}
                className={cn(
                  'flex h-12 flex-1 items-center justify-center border-neutral-400 bg-white text-2xl font-semibold',
                  j > 0 && 'border-l',
                  i % 3 !== 0 && 'border-t',
                  j > 0 && j % 3 === 0 && 'border-l-2',
                  isFilled && 'bg-neutral-200',
                  shouldActive || isActive
                    ? 'bg-blue-200/75'
                    : isFilled
                    ? 'hover:bg-neutral-200/50'
                    : 'hover:bg-blue-50',
                )}
                data-active={shouldActive || isActive}
                onClick={() => setCoord([i, j])}
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
