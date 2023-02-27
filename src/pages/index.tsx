import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>RankGuess | Choose a Game</title>
        <meta
          name='description'
          content='Guess the rank of user submitted clips from Apex Legends, CSGO, League of Legends, and more!'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='pt-8 text-center'>Hello World</main>
    </>
  );
}
