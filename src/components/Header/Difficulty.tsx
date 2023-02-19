import * as Select from '@radix-ui/react-select';
import { CheckIcon } from '@heroicons/react/20/solid';

import { Difficulty as _Difficulty } from 'types/sudoku';
import { useSudokuStore } from 'lib/stores';

type DifficultyOptionProps = {
  value: string;
  children: React.ReactNode;
};

const DifficultyOption = ({ value, children }: DifficultyOptionProps) => {
  return (
    <Select.Item
      className="relative flex h-8 select-none items-center pl-6 pr-3 text-sm leading-none data-[highlighted]:bg-neutral-100 data-[highlighted]:outline-none"
      value={value}
    >
      <Select.ItemText>{children}</Select.ItemText>
      <Select.ItemIndicator className="absolute left-0 inline-flex w-6 items-center justify-center">
        <CheckIcon className="h-4 w-4" />
      </Select.ItemIndicator>
    </Select.Item>
  );
};

const Difficulty = () => {
  const { difficulty, setDifficulty } = useSudokuStore((state) => ({
    difficulty: state.difficulty,
    setDifficulty: state.setDifficulty,
  }));

  return (
    <Select.Root
      defaultValue={_Difficulty.Easy.toString()}
      value={difficulty.toString()}
      onValueChange={(value) => setDifficulty(parseInt(value))}
    >
      <Select.Trigger
        className="flex h-8 items-center rounded-full border bg-white px-3 hover:bg-neutral-100"
        aria-label="Difficulty"
      >
        <Select.Value placeholder="Select a difficulty…" />
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="rounded-md border bg-white">
          <Select.Viewport>
            <DifficultyOption value={_Difficulty.Easy.toString()}>Easy</DifficultyOption>
            <DifficultyOption value={_Difficulty.Medium.toString()}>Medium</DifficultyOption>
            <DifficultyOption value={_Difficulty.Hard.toString()}>Hard</DifficultyOption>
            <DifficultyOption value={_Difficulty.VeryHard.toString()}>Very hard</DifficultyOption>
            <DifficultyOption value={_Difficulty.Insane.toString()}>Insane</DifficultyOption>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

export default Difficulty;
