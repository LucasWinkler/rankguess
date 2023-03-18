import { FC } from 'react';
import { Prisma, Rank } from '@prisma/client';
import prisma from '@/lib/prismadb';
import { NextSeo } from 'next-seo';
import Container from '@/components/Container';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Loading from '@/components/Loading';

const gameInclude = Prisma.validator<Prisma.GameInclude>()({
  ranks: true,
  currentClip: {
    include: {
      clip: {
        select: {
          youtubeUrl: true,
          rank: true,
        },
      },
    },
  },
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
          <h2 className='page-heading-2 relative lg:mt-2'>Resets in: 0h 0m</h2>
          <div className='relative mt-12 text-center lg:mt-16'>{children}</div>
        </Container>
      </main>
    </>
  );
};

const RankCard: FC<{ rank: Rank }> = ({ rank }) => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <button
        type='button'
        className='relative h-16 w-16 overflow-hidden rounded-xl border border-blueish-grey-600/80 bg-blueish-grey-600/25 backdrop-blur-[1px]'>
        <Image
          className='flex h-full w-full object-contain p-2'
          src={rank.imagePath}
          alt={rank.name}
          fill
          priority
          quality={65}
        />
      </button>
      <span className='mt-2 text-sm text-neutral-200'>{rank.name}</span>
    </div>
  );
};

const Game: FC<GameProps> = ({ game }) => {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <>
        <div>
          <Loading />
        </div>
      </>
    );
  }

  const ranks = game.ranks;

  if (!game.currentClip) {
    return (
      <>
        <GameWrapper game={game}>
          <h3 className='pt-8 pb-2 text-center text-4xl'>Work In Progress</h3>
          <p className='pb-8 text-lg text-neutral-200'>
            If youre seeing this page, it means the game is still in development
            or there isn&apos;t a clip for today!
          </p>
        </GameWrapper>
      </>
    );
  }

  return (
    <>
      <GameWrapper game={game}>
        <div className='relative mx-auto aspect-video lg:max-w-4xl'>
          <iframe
            className='absolute inset-0 h-full w-full'
            src={`https://www.youtube.com/embed/${game.currentClip?.clip.youtubeUrl}`}
            title={`${game.shortName} video`}
            allowFullScreen
          />
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
      slug,
    },
    include: {
      ranks: {
        orderBy: {
          order: 'asc',
        },
      },
      currentClip: {
        include: {
          clip: {
            select: {
              youtubeUrl: true,
              rank: true,
            },
          },
        },
      },
    },
  });

  if (!game || !game.isEnabled) {
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
    fallback: true,
  };
};
