import { BackspaceIcon } from '@heroicons/react/24/solid';

export type KeyboardButtonProps = {
  children: React.ReactNode;
};

const KeyboardButton = ({ children }: KeyboardButtonProps) => {
  return (
    <button className="flex h-16 items-center justify-center bg-white text-3xl font-semibold tabular-nums hover:bg-neutral-100">
      {children}
    </button>
  );
};

const Keyboard = () => {
  return (
    <div className="grid-row-2 grid grid-cols-5 gap-px overflow-hidden rounded-xl border border-neutral-200 bg-neutral-200">
      <KeyboardButton>1</KeyboardButton>
      <KeyboardButton>2</KeyboardButton>
      <KeyboardButton>3</KeyboardButton>
      <KeyboardButton>4</KeyboardButton>
      <KeyboardButton>5</KeyboardButton>
      <KeyboardButton>6</KeyboardButton>
      <KeyboardButton>7</KeyboardButton>
      <KeyboardButton>8</KeyboardButton>
      <KeyboardButton>9</KeyboardButton>
      <KeyboardButton>
        <BackspaceIcon className="h-9 w-9" />
      </KeyboardButton>
    </div>
  );
};

export default Keyboard;
