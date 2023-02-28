import Container from '@/components/Container';
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
      <main className='pt-8'>
        <Container>
          <h1 className='text-center text-2xl font-medium uppercase tracking-[0.2em]'>
            Choose a <br className='xs:hidden' /> game
          </h1>
          <div className='grid grid-cols-1 gap-3 sm:grid-cols-4'>
            <div className='mx-auto flex min-h-[20rem] w-full max-w-[12rem] items-center justify-center rounded-lg border border-pale-blueish-grey/50 bg-pale-blueish-grey/50 text-center'>
              Game Title
            </div>
            <div className='mx-auto flex min-h-[20rem] w-full max-w-[12rem] items-center justify-center rounded-lg border border-pale-blueish-grey/50 bg-pale-blueish-grey/50 text-center'>
              Game Title
            </div>
            <div className='mx-auto flex min-h-[20rem] w-full max-w-[12rem] items-center justify-center rounded-lg border border-pale-blueish-grey/50 bg-pale-blueish-grey/50 text-center'>
              Game Title
            </div>
            <div className='mx-auto flex min-h-[20rem] w-full max-w-[12rem] items-center justify-center rounded-lg border border-pale-blueish-grey/50 bg-pale-blueish-grey/50 text-center'>
              Game Title
            </div>
            <div className='mx-auto flex min-h-[20rem] w-full max-w-[12rem] items-center justify-center rounded-lg border border-pale-blueish-grey/50 bg-pale-blueish-grey/50 text-center'>
              Game Title
            </div>
            <div className='mx-auto flex min-h-[20rem] w-full max-w-[12rem] items-center justify-center rounded-lg border border-pale-blueish-grey/50 bg-pale-blueish-grey/50 text-center'>
              Game Title
            </div>
            <div className='mx-auto flex min-h-[20rem] w-full max-w-[12rem] items-center justify-center rounded-lg border border-pale-blueish-grey/50 bg-pale-blueish-grey/50 text-center'>
              Game Title
            </div>
            <div className='mx-auto flex min-h-[20rem] w-full max-w-[12rem] items-center justify-center rounded-lg border border-pale-blueish-grey/50 bg-pale-blueish-grey/50 text-center'>
              Game Title
            </div>
          </div>
        </Container>
      </main>
    </>
  );
}
