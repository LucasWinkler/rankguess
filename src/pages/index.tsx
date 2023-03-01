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
      <main className='mt-16'>
        <Container>
          <h1 className='text-center text-2xl font-medium uppercase tracking-[0.2em] text-neutral-200'>
            Choose a game
          </h1>
          <div className='grid-games mt-16 font-bold uppercase tracking-[0.2em]'>
            <div className='mx-auto flex min-h-[10rem] w-full max-w-[18rem] items-center justify-center rounded-lg border border-pale-blueish-grey/50 bg-pale-blueish-grey/50 text-center xs:max-w-[22rem] sm:min-h-[23.5rem] sm:max-w-[18rem]'>
              Game Title
            </div>
            <div className='mx-auto flex min-h-[10rem] w-full max-w-[18rem] items-center justify-center rounded-lg border border-pale-blueish-grey/50 bg-pale-blueish-grey/50 text-center xs:max-w-[22rem] sm:min-h-[23.5rem] sm:max-w-[18rem]'>
              Game Title
            </div>
            <div className='mx-auto flex min-h-[10rem] w-full max-w-[18rem] items-center justify-center rounded-lg border border-pale-blueish-grey/50 bg-pale-blueish-grey/50 text-center xs:max-w-[22rem] sm:min-h-[23.5rem] sm:max-w-[18rem]'>
              Game Title
            </div>
            <div className='mx-auto flex min-h-[10rem] w-full max-w-[18rem] items-center justify-center rounded-lg border border-pale-blueish-grey/50 bg-pale-blueish-grey/50 text-center xs:max-w-[22rem] sm:min-h-[23.5rem] sm:max-w-[18rem]'>
              Game Title
            </div>
            <div className='mx-auto flex min-h-[10rem] w-full max-w-[18rem] items-center justify-center rounded-lg border border-pale-blueish-grey/50 bg-pale-blueish-grey/50 text-center xs:max-w-[22rem] sm:min-h-[23.5rem] sm:max-w-[18rem]'>
              Game Title
            </div>
            <div className='mx-auto flex min-h-[10rem] w-full max-w-[18rem] items-center justify-center rounded-lg border border-pale-blueish-grey/50 bg-pale-blueish-grey/50 text-center xs:max-w-[22rem] sm:min-h-[23.5rem] sm:max-w-[18rem]'>
              Game Title
            </div>
            <div className='mx-auto flex min-h-[10rem] w-full max-w-[18rem] items-center justify-center rounded-lg border border-pale-blueish-grey/50 bg-pale-blueish-grey/50 text-center xs:max-w-[22rem] sm:min-h-[23.5rem] sm:max-w-[18rem]'>
              Game Title
            </div>
            <div className='mx-auto flex min-h-[10rem] w-full max-w-[18rem] items-center justify-center rounded-lg border border-pale-blueish-grey/50 bg-pale-blueish-grey/50 text-center xs:max-w-[22rem] sm:min-h-[23.5rem] sm:max-w-[18rem]'>
              Game Title
            </div>
          </div>
        </Container>
      </main>
    </>
  );
}
