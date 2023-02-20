import Select, { Option } from 'components/Select';

import { Difficulty as _Difficulty } from 'types/sudoku';
import { useSudokuStore } from 'lib/stores';

const Difficulty = () => {
  const { difficulty, setDifficulty } = useSudokuStore((state) => ({
    difficulty: state.difficulty,
    setDifficulty: state.setDifficulty,
  }));

  return (
    <Select
      value={difficulty.toString()}
      onChange={(value) => setDifficulty(parseInt(value))}
      label="Difficulty"
      placeholder="Select a difficulty…"
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
