import Select, { Option } from 'components/Select';

import { Difficulty as _Difficulty } from 'types/sudoku';
import { useSudokuStore } from 'lib/stores';
import { cn } from 'lib/helpers';

const Difficulty = () => {
  const { difficulty, setDifficulty } = useSudokuStore((state) => ({
    difficulty: state.difficulty,
    setDifficulty: state.setDifficulty,
  }));

  return (
    <Select
      value={difficulty.toString()}
      renderValue={() => (
        <div className="flex space-x-0.5">
          {[...new Array(difficulty)].map((_, i) => (
            <div key={i} className={cn('h-4 w-1 rounded-full bg-neutral-700', 'dark:bg-white')} />
          ))}
        </div>
      )}
      onChange={(value) => setDifficulty(parseInt(value))}
      label="Difficulty"
      placeholder="Select a difficulty…"
      className={difficulty === _Difficulty.Easy ? 'w-8' : ''}
    >
      <Option value={_Difficulty.Easy.toString()}>Easy</Option>
      <Option value={_Difficulty.Medium.toString()}>Medium</Option>
      <Option value={_Difficulty.Hard.toString()}>Hard</Option>
      <Option value={_Difficulty.VeryHard.toString()}>Very hard</Option>
      <Option value={_Difficulty.Insane.toString()}>Insane</Option>
    </Select>
  );
};

export default Difficulty;
