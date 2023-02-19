import { BackspaceIcon } from '@heroicons/react/24/solid';

import { useBoardStore } from 'lib/stores';

export type KeyboardButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
};

const KeyboardButton = (props: KeyboardButtonProps) => {
  return (
    <button
      className="flex h-16 items-center justify-center bg-white text-3xl font-semibold tabular-nums hover:bg-neutral-100"
      {...props}
    />
  );
};

const Keyboard = () => {
  const updateCell = useBoardStore((state) => state.updateCell);

  return (
    <div className="grid-row-2 grid grid-cols-5 gap-px overflow-hidden rounded-xl border border-neutral-200 bg-neutral-200">
      {[...new Array(9)].map((_, i) => (
        <KeyboardButton key={i} onClick={() => updateCell(i + 1)}>
          {i + 1}
        </KeyboardButton>
      ))}
      <KeyboardButton onClick={() => updateCell(0)} data-testid="keyboard-delete">
        <BackspaceIcon className="h-9 w-9" />
      </KeyboardButton>
    </div>
  );
};

export default Keyboard;
