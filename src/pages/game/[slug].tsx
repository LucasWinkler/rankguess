import { FC, FormEvent, useState } from 'react';
import { Rank } from '@prisma/client';
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(selectedRank);
  };

  if (game.currentClip) {
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
  }

  return (
    <>
      <GameWrapper game={game}>
        <div className='mx-auto max-w-2xl text-center text-lg text-neutral-200'>
          <h3 className='pt-8 text-2xl text-neutral-100'>Work In Progress</h3>
          <p className='pt-8'>
            If youre seeing this page, it means the game is still in
            development! This page will be eventually let you know that the game
            currently does not have a clip today. It will also suggest you to
            submit your own clips to help.
          </p>
          <div className='mx-auto max-w-xl pt-14'>
            <h4 className='text-2xl text-neutral-100'>How you can help</h4>
            <p className='pt-4'>
              User submissions will be the last feature available on the
              website. If you want to help get the game up and running sooner
              please send your own clips to <span>bliitzzedits@gmail.com</span>
            </p>
            <ul className='pt-4'>
              <li>
                <span className='font-bold'>Clip length:</span> 0:20 - 2:00
              </li>
              <li>
                <span className='font-bold'>Clip quality:</span> 720p or higher
              </li>
              <li>
                <span className='font-bold'>Clip format:</span> Any for now
              </li>
              <li>
                <span className='font-bold'>Clip size:</span> Any for now
              </li>
              <li>No background music</li>
              <li>You must blur/cover any rank indicators</li>
            </ul>
            <p className='pt-4'>
              You don&apos;t need to follow the rules 100%. Once the game is up
              and running the rules will be a bit more strict.
            </p>
          </div>
        </div>
      </GameWrapper>
    </>
  );
};

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

export default Game;
