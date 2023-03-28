import { FC, FormEvent, SetStateAction, useEffect, useState } from 'react';
import { Rank, UserGameSave } from '@prisma/client';
import prisma from '@/lib/prismadb';
import { GetServerSideProps, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Loading from '@/components/common/Loading';
import { GameWithRanks } from '@/types/game';
import { useSession } from 'next-auth/react';
import clsx from 'clsx';
import { LOCAL_STORAGE_GAME_SAVES_KEY, MAX_GUESS_COUNT } from '@/constants';
import TempHealthBar from '@/components/game/TempHealthBar';
import RankSelection from '@/components/game/RankSelection';
import ClipPlayer from '@/components/game/ClipPlayer';
import NoClipToday from '@/components/game/NoClipToday';
import GamePageWrapper from '@/components/game/GamePageWrapper';
import clamp from '@/util/clamp';

type LocalGameSave = {
  gameId: string;
  clipId: string;
  guessCount: number;
};

type GameProps = {
  game: GameWithRanks;
  children?: React.ReactNode;
};

const Game: FC<GameProps> = ({ game }) => {
  const [selectedRank, setSelectedRank] = useState<Rank>();
  const [localGameSaves, setLocalGameSaves] = useState<LocalGameSave[]>([]);
  const [userGameSaves, setUserGameSaves] = useState<UserGameSave[]>([]);
  const [guessCount, setGuessCount] = useState<number>(0);
  const { data: session, status } = useSession();

  const router = useRouter();
  const ranks = game.ranks;
  const isGameOver = guessCount >= MAX_GUESS_COUNT;
  const guessesLeft = MAX_GUESS_COUNT - guessCount;
  const shakeClasses =
    'animate-shake opacity-[65%] grayscale-[35%] motion-reduce:animate-reduced-shake';
  const disabledFormClasses = 'opacity-[65%] grayscale-[35%]';

  useEffect(() => {
    if (localGameSaves.length === 0 || !game.currentClip || session?.user) {
      return;
    }

    localStorage.setItem(
      LOCAL_STORAGE_GAME_SAVES_KEY,
      JSON.stringify(localGameSaves)
    );
  }, [localGameSaves, game.currentClip, session?.user]);

  useEffect(() => {
    if (status === 'loading' || !game.currentClip) {
      return;
    }

    if (status === 'authenticated' && session.user) {
      fetch('/api/user-game-save')
        .then(res => res.json())
        .then(({ userGameSaves }: { userGameSaves: UserGameSave[] }) => {
          if (!userGameSaves) {
            return;
          }

          const userGameSave = userGameSaves.find(
            (gameSave: UserGameSave) => gameSave.gameId === game.id
          );

          if (userGameSave) {
            setUserGameSaves(userGameSaves);
            setGuessCount(userGameSave.guessCount);
          }
        })
        .catch(error => {
          console.error('Error while fetching user game saves:', error);
        });
    } else {
      const localGameSaves = localStorage.getItem(LOCAL_STORAGE_GAME_SAVES_KEY);
      if (localGameSaves) {
        const parsedGameSaves: LocalGameSave[] = JSON.parse(localGameSaves);

        parsedGameSaves.map(gameSave => {
          if (gameSave.gameId === game.id) {
            setLocalGameSaves(parsedGameSaves);
            setGuessCount(gameSave.guessCount);
            return;
          }
        });
      }
    }
  }, [status, game, session?.user]);

  if (router.isFallback) {
    return (
      <>
        <div>
          <Loading />
        </div>
      </>
    );
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (isGameOver || !game.currentClip) {
      return;
    }

    const newGuessCount = clamp(guessCount + 1, 0, MAX_GUESS_COUNT);
    setGuessCount(newGuessCount);

    if (session?.user) {
      fetch('/api/user-game-save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: session.user.id,
          gameId: game.id,
          clipId: game.currentClip.clipId,
          guessCount: newGuessCount,
        }),
      })
        .then(res => res.json())
        .then(data => {
          setUserGameSaves(data);
        });
    } else {
      setLocalGameSaves(prevLocalGameSave => {
        const currentGameIndex = prevLocalGameSave.findIndex(
          gameSave => gameSave.gameId === game.id
        );

        if (currentGameIndex === -1 && game.currentClip) {
          return [
            ...prevLocalGameSave,
            {
              gameId: game.id,
              clipId: game.currentClip.clipId,
              guessCount: newGuessCount,
            },
          ];
        } else {
          const newGameSave = [...prevLocalGameSave];

          newGameSave[currentGameIndex] = {
            ...newGameSave[currentGameIndex],
            guessCount: newGuessCount,
          };
          return newGameSave;
        }
      });
    }

    setSelectedRank(undefined);
  };

  const handleSelectRank = (rank: Rank) => {
    if (isGameOver) {
      setSelectedRank(undefined);
      return;
    }

    setSelectedRank(rank);
  };
  if (game.currentClip) {
    return (
      <>
        <GamePageWrapper game={game}>
          <ClipPlayer
            gameName={game.name}
            youtubeVideoId={game.currentClip.clip.youtubeUrl}
          />
          <TempHealthBar
            guessesLeft={guessesLeft}
            className={clsx('my-10', isGameOver && disabledFormClasses)}
          />
          <form onSubmit={handleSubmit}>
            <fieldset
              disabled={isGameOver}
              className={clsx(
                'transition-all duration-150 ease-in-out',
                isGameOver && disabledFormClasses
              )}>
              <RankSelection
                ranks={ranks}
                selectedRank={selectedRank}
                isDisabled={isGameOver}
                onSelectRank={handleSelectRank}
              />
              <button
                className={clsx(
                  'mt-6 rounded-full border border-blueish-grey-600/50 bg-blueish-grey-600/50 px-6 py-2 text-neutral-200',
                  isGameOver
                    ? 'cursor-not-allowed'
                    : 'transition-colors duration-200 hover:text-neutral-100'
                )}>
                Submit Guess
              </button>
            </fieldset>
          </form>
        </GamePageWrapper>
      </>
    );
  }

  return (
    <>
      <GamePageWrapper game={game}>
        <NoClipToday />
      </GamePageWrapper>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;

  if (!slug) {
    return { notFound: true };
  }

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
    revalidate: 60,
  };
};

export const getStaticPaths = async () => {
  const games = await prisma.game.findMany({
    where: {
      isEnabled: true,
    },
    select: {
      slug: true,
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
