import type { FC } from 'react';
import { Game } from '@prisma/client';
import prisma from '@/lib/prismadb';
import { NextSeo } from 'next-seo';
import Container from '@/components/Container';
import { GetStaticProps } from 'next';

interface GameProps {
  title: string;
  game: Game;
}

const Game: FC<GameProps> = ({ game }) => {
  // Get the remaining time until 12:00 AM
  const getRemainingTime = () => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    const remainingTime = tomorrow.getTime() - now.getTime();
    return remainingTime;
  };

  return (
    <>
      <NextSeo
        title='temp'
        openGraph={{
          url: 'https://www.rankguess.com/submit',
          title: 'temp | RankGuess',
          description:
            'Guess the rank of user submitted clips from Apex Legends, CSGO, League of Legends, and more!',
          images: [
            {
              url: 'https://www.rankguess.com/og.png',
              width: 1200,
              height: 600,
              alt: 'temp',
              type: 'image/png',
            },
          ],
        }}
      />

      <main id='main-content' className='relative py-12 lg:pt-16 lg:pb-32'>
        <Container>
          <div className='pointer-events-none absolute left-0 right-0 bottom-0 -top-[15.5rem] h-full w-full select-none bg-heading-circle bg-top bg-no-repeat'></div>
          <div className='background-grid pointer-events-none absolute inset-0 select-none opacity-[7.5%]'></div>
          <h1 className='page-heading-1 relative'>{game.name}</h1>
          <h2 className='page-heading-2 relative lg:mt-2'>RESETS IN: 00:00</h2>
          <div className='relative mt-12 text-center lg:mt-16'>
            Video
            <br />
            Health bar
            <br />
            Ranks {}
            <br />
            <button className='rounded-full border border-blueish-grey-600/50 bg-blueish-grey-600/50 px-6 py-2 text-neutral-200 transition-colors duration-200 hover:text-neutral-100'>
              Choose Rank
            </button>
          </div>
        </Container>
      </main>
    </>
  );
};

export default Game;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;

  if (!slug) {
    return { notFound: true };
  }

  const game = await prisma.game.findUnique({
    where: {
      slug: slug,
    },
  });

  return {
    props: {
      game,
    },
    revalidate: 45,
  };
};

export const getStaticPaths = async () => {
  const games = await prisma.game.findMany();

  const paths = games.map(game => ({
    params: {
      slug: game.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};
