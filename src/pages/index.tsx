import type { NextPage } from 'next';

import Header from 'components/Header';
import Board from 'components/Board';
import Keyboard from 'components/Keyboard';

const Home: NextPage = () => {
  return (
    <div className="flex h-full flex-col justify-between space-y-4 sm:space-y-8">
      <Header />
      <Board />
      <Keyboard />
    </div>
  );
};

export default Home;
