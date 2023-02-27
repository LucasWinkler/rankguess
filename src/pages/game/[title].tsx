import type { FC } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

interface GameProps {
  title: string;
}

const Game: FC<GameProps> = ({}) => {
  const router = useRouter();
  const { title } = router.query;

  return (
    <>
      <Head>
        <title>RankGuess | {title}</title>
        <meta
          name='description'
          content='Guess the rank of user submitted clips from Apex Legends, CSGO, League of Legends, and more!'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      Game Page
      <h1>Game: {title}</h1>
    </>
  );
};

export default Game;
