import { ButtonHTMLAttributes } from 'react';
import { BackspaceIcon } from '@heroicons/react/24/solid';

import { useSudokuStore } from 'lib/stores';
import { cn } from 'lib/helpers';

export type KeyboardButtonProps = React.DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  value: number;
  children: React.ReactNode;
};

const KeyboardButton = ({ value, children, ...props }: KeyboardButtonProps) => {
  const { isDisabled, updateCell } = useSudokuStore((state) => {
    return {
      isDisabled: state.filled === 81 || state.values[value] === 9,
      updateCell: () => state.updateCell(value),
    };
  });
  return (
    <button
      {...props}
      className={cn(
        'flex h-16 items-center justify-center bg-white text-4xl font-semibold tabular-nums hover:bg-neutral-100 disabled:bg-neutral-100 disabled:text-neutral-500',
        'dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:disabled:bg-black',
      )}
      disabled={isDisabled}
      onClick={updateCell}
    >
      {children}
    </button>
  );
};

const Keyboard = () => {
  return (
    <div
      className={cn(
        'grid-row-2 grid grid-cols-5 gap-px overflow-hidden rounded-xl border border-neutral-200 bg-neutral-200',
        'dark:border-neutral-800 dark:bg-neutral-800',
      )}
    >
      {[...new Array(9)].map((_, i) => (
        <KeyboardButton key={i} value={i + 1} data-testid="keyboard-button">
          {i + 1}
        </KeyboardButton>
      ))}
      <KeyboardButton value={0} data-testid="keyboard-delete">
        <BackspaceIcon className="h-9 w-9" />
      </KeyboardButton>
    </div>
  );
};

export default Keyboard;
