import type { FC, PropsWithChildren } from 'react';
import { Game } from '@prisma/client';
import prisma from '@/lib/prismadb';
import { NextSeo } from 'next-seo';
import Container from '@/components/Container';
import { GetStaticProps } from 'next';

interface GameProps {
  game: Game;
  children?: React.ReactNode;
}

const GameWrapper: FC<GameProps> = ({ game, children }) => {
  return (
    <>
      <NextSeo
        title={game.name}
        description={`Play guess the rank for ${game.name}!`}
        openGraph={{
          url: `https://www.rankguess.com/game/${game.slug}`,
          title: `${game.name} | Rank Guess`,
          description: `Play Guess The Rank for ${game.name}!`,
        }}
      />

      <main id='main-content' className='relative py-12 lg:pt-16 lg:pb-32'>
        <Container>
          <div className='pointer-events-none absolute left-0 right-0 bottom-0 -top-[15.5rem] h-full w-full select-none bg-heading-circle bg-top bg-no-repeat'></div>
          <div className='background-grid pointer-events-none absolute inset-0 select-none opacity-[7.5%]'></div>
          <h1 className='page-heading-1 relative'>{game.name}</h1>
          <h2 className='page-heading-2 relative lg:mt-2'>RESETS IN: 00:00</h2>
          <div className='relative mt-12 text-center lg:mt-16'>{children}</div>
        </Container>
      </main>
    </>
  );
};

const Game: FC<GameProps> = ({ game }) => {
  const currentClip = game.currentClipId;

  if (!currentClip) {
    return (
      <>
        <GameWrapper game={game}>
          <h3 className='h-full pt-8 pb-2 text-center text-4xl'>
            Work In Progress
          </h3>
          <p className='pb-8 text-lg text-neutral-200'>
            The game is currently being developed
          </p>
        </GameWrapper>
      </>
    );
  }

  return (
    <>
      <GameWrapper game={game}>
        Video
        <br />
        Health bar
        <br />
        Ranks
        <br />
        <button className='rounded-full border border-blueish-grey-600/50 bg-blueish-grey-600/50 px-6 py-2 text-neutral-200 transition-colors duration-200 hover:text-neutral-100'>
          Submit Guess
        </button>
      </GameWrapper>
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

  if (!game) {
    return { notFound: true };
  }

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
