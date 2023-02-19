import { useEffect } from 'react';
import type { NextPage } from 'next';

import Header from 'components/Header';
import Board from 'components/Board';
import Keyboard from 'components/Keyboard';
import { useBoardStore } from 'lib/stores';

const Home: NextPage = () => {
  const generate = useBoardStore((state) => state.generate);

  useEffect(() => {
    generate();
  }, []);

  return (
    <>
      <Header />
      <Board />
      <Keyboard />
    </>
  );
};

export default Home;
