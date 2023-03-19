import { FC, useState } from 'react';
import { Prisma, Rank } from '@prisma/client';
import prisma from '@/lib/prismadb';
import { NextSeo } from 'next-seo';
import Container from '@/components/Container';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Loading from '@/components/Loading';
import HeadingCircle from '@/components/HeadingCircle';
import BackgroundGrid from '@/components/BackgroundGrid';
import clsx from 'clsx';

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

type GameProps = {
  game: GameWithRanks;
  children?: React.ReactNode;
};

const GameWrapper: FC<GameProps> = ({ game, children }) => {
  const description = `Guess the rank of user-submitted gameplay in ${game.name} daily with RankGuess. Test your knowledge and track your stats to see how you improve over time. Remember, the game resets at 12 am EST, so submit your guesses before then!`;

  return (
    <>
      <NextSeo
        title={`Guess the Rank in ${game.name}`}
        description={description}
        openGraph={{
          url: `https://www.rankguess.com/game/${game.slug}`,
          title: `Guess the Rank in ${game.name}`,
          description: description,
        }}
      />

      <main id='main-content' className='relative py-12 lg:pt-16 lg:pb-32'>
        <Container>
          <HeadingCircle />
          <BackgroundGrid />
          <div className='relative'>
            <h1 className='page-heading-1'>{game.name}</h1>
            <h2 className='page-heading-2 lg:mt-2'>Resets in: 0h 0m</h2>
            <div className='mt-12 text-center lg:mt-16'>{children}</div>
          </div>
        </Container>
      </main>
    </>
  );
};

type RankCardProps = {
  rank: Rank;
  selectedRank: Rank | undefined;
  onClick: () => void;
};

const RankCard: FC<RankCardProps> = ({ rank, selectedRank, onClick }) => {
  return (
    <div
      className={clsx(
        'flex flex-col transition-all duration-200 ease-in-out',
        selectedRank?.id === rank.id && 'scale-[1.15]'
      )}>
      <button
        onClick={onClick}
        type='button'
        className={clsx('flex flex-col items-center justify-center')}>
        <div
          className={clsx(
            'relative h-16 w-16 overflow-hidden rounded-xl border border-blueish-grey-600/80 bg-blueish-grey-600/25 backdrop-blur-[1px] transition-all duration-100 ease-in-out',
            selectedRank?.id === rank.id && 'border-2'
          )}>
          <Image
            className='flex h-full w-full object-contain p-2'
            src={rank.imagePath}
            alt={rank.name}
            fill
            priority
            quality={65}
            loader={({ src }) =>
              `${src}?cache=${Math.random()}&cacheDuration=86400`
            }
          />
        </div>
        <span className='mt-2 text-sm text-neutral-200'>{rank.name}</span>
      </button>
    </div>
  );
};

const Game: FC<GameProps> = ({ game }) => {
  const [selectedRank, setSelectedRank] = useState<Rank>();
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
        <div className='mx-auto flex max-w-2xl flex-wrap items-start justify-center gap-5'>
          {ranks.map(rank => (
            <RankCard
              selectedRank={selectedRank}
              onClick={() => setSelectedRank(rank)}
              key={rank.id}
              rank={rank}
            />
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
