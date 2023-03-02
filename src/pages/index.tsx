import Head from 'next/head';
import Container from '@/components/Container';

export default function Home() {
  return (
    <>
      <Head>
        <title>Choose Game | rankguess</title>
        <meta
          name='description'
          content='Guess the rank of user submitted clips from Apex Legends, CSGO, League of Legends, and more!'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main id='main-content' className='relative py-12 lg:pt-16 lg:pb-32'>
        <Container>
          <div className='pointer-events-none absolute left-0 right-0 bottom-0 -top-[15.5rem] h-full w-full select-none bg-heading-circle bg-top bg-no-repeat'></div>
          <h1 className='relative text-center text-2xl font-medium uppercase tracking-[0.2em] text-neutral-200'>
            Choose a game
          </h1>
          <div className='grid-games relative mt-12 font-bold uppercase tracking-[0.2em] lg:mt-16'>
            <div className='mx-auto flex min-h-[10rem] w-full max-w-[18rem] items-center justify-center rounded-lg border border-blueish-grey-700/50 bg-blueish-grey-700/50 text-center xs:max-w-[22rem] sm:min-h-[23.5rem] sm:max-w-[18rem]'>
              Game Title
            </div>
            <div className='mx-auto flex min-h-[10rem] w-full max-w-[18rem] items-center justify-center rounded-lg border border-blueish-grey-700/50 bg-blueish-grey-700/50 text-center xs:max-w-[22rem] sm:min-h-[23.5rem] sm:max-w-[18rem]'>
              Game Title
            </div>
            <div className='mx-auto flex min-h-[10rem] w-full max-w-[18rem] items-center justify-center rounded-lg border border-blueish-grey-700/50 bg-blueish-grey-700/50 text-center xs:max-w-[22rem] sm:min-h-[23.5rem] sm:max-w-[18rem]'>
              Game Title
            </div>
            <div className='mx-auto flex min-h-[10rem] w-full max-w-[18rem] items-center justify-center rounded-lg border border-blueish-grey-700/50 bg-blueish-grey-700/50 text-center xs:max-w-[22rem] sm:min-h-[23.5rem] sm:max-w-[18rem]'>
              Game Title
            </div>
            <div className='mx-auto flex min-h-[10rem] w-full max-w-[18rem] items-center justify-center rounded-lg border border-blueish-grey-700/50 bg-blueish-grey-700/50 text-center xs:max-w-[22rem] sm:min-h-[23.5rem] sm:max-w-[18rem]'>
              Game Title
            </div>
            <div className='mx-auto flex min-h-[10rem] w-full max-w-[18rem] items-center justify-center rounded-lg border border-blueish-grey-700/50 bg-blueish-grey-700/50 text-center xs:max-w-[22rem] sm:min-h-[23.5rem] sm:max-w-[18rem]'>
              Game Title
            </div>
            <div className='mx-auto flex min-h-[10rem] w-full max-w-[18rem] items-center justify-center rounded-lg border border-blueish-grey-700/50 bg-blueish-grey-700/50 text-center xs:max-w-[22rem] sm:min-h-[23.5rem] sm:max-w-[18rem]'>
              Game Title
            </div>
            <div className='mx-auto flex min-h-[10rem] w-full max-w-[18rem] items-center justify-center rounded-lg border border-blueish-grey-700/50 bg-blueish-grey-700/50 text-center xs:max-w-[22rem] sm:min-h-[23.5rem] sm:max-w-[18rem]'>
              Game Title
            </div>
          </div>
        </Container>
      </main>
    </>
  );
}
