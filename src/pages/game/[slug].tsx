import type { FC, PropsWithChildren } from 'react';
import { Prisma, Rank } from '@prisma/client';
import prisma from '@/lib/prismadb';
import { NextSeo } from 'next-seo';
import Container from '@/components/Container';
import { GetStaticProps } from 'next';
import YouTube from 'react-youtube';
import Image from 'next/image';

const gameInclude = Prisma.validator<Prisma.GameInclude>()({
  ranks: true,
});

type GameWithRanks = Prisma.GameGetPayload<{
  include: typeof gameInclude;
}>;

interface GameProps {
  game: GameWithRanks;
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

const RankCard: FC<{ rank: Rank }> = ({ rank }) => {
  return (
    <>
      <div className='relative h-10 w-24'>
        <Image
          className='h-full w-full object-contain'
          src={rank.imagePath}
          alt={rank.name}
          fill
          priority
          quality={65}
        />
      </div>
    </>
  );
};

const Game: FC<GameProps> = ({ game }) => {
  const currentClip = game.currentClipId;
  const env = process.env.NODE_ENV;
  const ranks = game.ranks;

  // Temp until further development. Will check if theres a current clip and if so then render a screen telling the user that there isn't a game today.
  if (env === 'production') {
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
        <div className='flex items-center justify-center'>
          <YouTube videoId='Bc8ROqIh4uA' />
        </div>
        <br />
        <div className='my-4'>Health bar</div>
        <br />
        <div className='mx-auto flex max-w-2xl flex-wrap items-center justify-center gap-4'>
          {ranks.map(rank => (
            <RankCard key={rank.id} rank={rank} />
          ))}
        </div>
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

  const game = await prisma.game.findUnique({
    where: {
      slug: slug,
    },
    select: {
      id: true,
      name: true,
      slug: true,
      isEnabled: true,
      currentClipId: true,
      ranks: {
        select: {
          id: true,
          name: true,
          imagePath: true,
        },
      },
    },
  });

  if (!game) {
    return { notFound: true };
  }

  return {
    props: {
      game,
    },
  };
};

export const getStaticPaths = async () => {
  const games = await prisma.game.findMany({
    where: {
      isEnabled: true,
    },
  });

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
