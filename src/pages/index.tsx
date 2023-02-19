import type { NextPage } from 'next';

import Header from 'components/Header';
import Board from 'components/Board';
import Keyboard from 'components/Keyboard';

const Home: NextPage = () => {
  return (
    <>
      <Header />
      <Board />
      <Keyboard />
    </>
  );
};

export default Home;
