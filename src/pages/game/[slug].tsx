import { FC, FormEvent, useState } from 'react';
import { Prisma, Rank } from '@prisma/client';
import prisma from '@/lib/prismadb';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Loading from '@/components/common/Loading';
import { GameWrapper } from '../../components/game/GameWrapper';
import { RankCard } from '../../components/game/RankCard';
import { GameWithRanks } from '@/types/game';

type GameProps = {
  game: GameWithRanks;
  children?: React.ReactNode;
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(selectedRank);
  };

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
        <form onSubmit={handleSubmit}>
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
        </form>
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
