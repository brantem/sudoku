import { BackspaceIcon } from '@heroicons/react/24/solid';

import { useSudokuStore } from 'lib/stores';
import { ButtonHTMLAttributes, HTMLAttributes } from 'react';

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
      className="flex h-16 items-center justify-center bg-white text-4xl font-semibold tabular-nums hover:bg-neutral-100 disabled:bg-neutral-100"
      disabled={isDisabled}
      onClick={updateCell}
    >
      {children}
    </button>
  );
};

const Keyboard = () => {
  return (
    <div className="grid-row-2 grid grid-cols-5 gap-px overflow-hidden rounded-xl border border-neutral-200 bg-neutral-200">
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
