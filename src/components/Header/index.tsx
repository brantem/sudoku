import { ArrowPathIcon, CheckIcon } from '@heroicons/react/20/solid';

import Difficulty from 'components/Header/Difficulty';
import Time from 'components/Header/Time';

import { useSudokuStore } from 'lib/stores';

const Header = () => {
  const { isSolved, solve, generate } = useSudokuStore((state) => ({
    isSolved: state.isSolved,
    solve: state.solve,
    generate: state.generate,
  }));

  return (
    <div className="grid w-full grid-cols-3 text-sm font-semibold">
      <div className="flex">
        <Difficulty />
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
