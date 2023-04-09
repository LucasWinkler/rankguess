import { FC, FormEvent, useEffect, useRef, useState } from 'react';
import { Guess, Rank, UserGameSave } from '@prisma/client';
import prisma from '@/lib/prismadb';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Loading from '@/components/common/Loading';
import { GameWithRanks, UserGameSaveWithGuesses } from '@/types/game';
import { useSession } from 'next-auth/react';
import clsx from 'clsx';
import { LOCAL_STORAGE_GAME_SAVES_KEY, MAX_GUESS_COUNT } from '@/constants';
import RankSelection from '@/components/game/RankSelection';
import ClipPlayer from '@/components/game/ClipPlayer';
import NoClipToday from '@/components/game/NoClipToday';
import Wrapper from '@/components/game/Wrapper';
import clamp from '@/util/clamp';
import HealthBar from '@/components/game/HealthBar';
import { getTodaysDateAndTomorrowsDate } from '@/util/date';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@/components/common/Modal';
import Link from 'next/link';
import Image from 'next/image';
import CountdownTimer from '@/components/game/CountdownTimer';

type LocalGameSave = {
  gameId: string;
  clipId: string;
  guessCount: number;
  didWin: boolean;
  guesses?: {
    rankId: string;
    rankName: string;
  }[];
};

type GameProps = {
  game: GameWithRanks;
  clipExpirationDate: string;
  children?: React.ReactNode;
};

const Game: FC<GameProps> = ({ game, clipExpirationDate }) => {
  const [selectedRank, setSelectedRank] = useState<Rank>();
  const [didWin, setDidWin] = useState<boolean>(false);
  const [localGameSaves, setLocalGameSaves] = useState<LocalGameSave[]>([]);
  const [userGameSaves, setUserGameSaves] = useState<UserGameSave[]>([]);
  const [guessCount, setGuessCount] = useState<number>(0);
  const [isGameOverModalOpen, setIsGameOverModalOpen] = useState(false);
  const [ranksGuessed, setRanksGuessed] = useState<Guess[]>([]);
  const { data: session, status } = useSession();

  const router = useRouter();
  const ranks = game.ranks;
  const isGameOver = didWin || guessCount >= MAX_GUESS_COUNT;
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
        .then(
          ({ userGameSaves }: { userGameSaves: UserGameSaveWithGuesses[] }) => {
            if (!userGameSaves) {
              return;
            }

            const userGameSave = userGameSaves.find(
              (gameSave: UserGameSaveWithGuesses) => gameSave.gameId === game.id
            );

            if (
              userGameSave &&
              userGameSave.clipId !== game.currentClip?.clipId
            ) {
              const newGameSaves = userGameSaves.map(gameSave => {
                if (gameSave.gameId === game.id && game.currentClip) {
                  return {
                    ...gameSave,
                    clipId: game.currentClip.clipId,
                    guessCount: 0,
                    didWin: false,
                  };
                }
                return gameSave;
              });

              setGuessCount(0);
              setUserGameSaves(newGameSaves);
              setDidWin(false);
            } else if (userGameSave) {
              setGuessCount(userGameSave.guessCount);
              setUserGameSaves(userGameSaves);
              setDidWin(userGameSave.didWin);
              setRanksGuessed(userGameSave.guesses);
            } else {
              setGuessCount(0);
              setUserGameSaves(userGameSaves);
              setDidWin(false);
            }
          }
        )
        .catch(error => {
          console.error('Error while fetching user game saves:', error);
        });
    } else {
      const localGameSaves = localStorage.getItem(LOCAL_STORAGE_GAME_SAVES_KEY);

      if (localGameSaves) {
        const parsedGameSaves: LocalGameSave[] = JSON.parse(localGameSaves);
        const localGameSave = parsedGameSaves.find(
          gameSave => gameSave.gameId === game.id
        );

        if (localGameSave && localGameSave.clipId !== game.currentClip.clipId) {
          const newGameSaves = parsedGameSaves.map(gameSave => {
            if (gameSave.gameId === game.id && game.currentClip) {
              return {
                ...gameSave,
                clipId: game.currentClip.clipId,
                guessCount: 0,
                didWin: false,
              };
            }
            return gameSave;
          });

          setGuessCount(0);
          setLocalGameSaves(newGameSaves);
          setDidWin(false);
        } else if (localGameSave) {
          setGuessCount(localGameSave.guessCount);
          setLocalGameSaves(parsedGameSaves);
          setDidWin(localGameSave.didWin);
        } else {
          setGuessCount(0);
          setLocalGameSaves(parsedGameSaves);
          setDidWin(false);
        }
      }
    }

    setSelectedRank(undefined);
  }, [status, game, session?.user]);

  useEffect(() => {
    setIsGameOverModalOpen(isGameOver);
  }, [isGameOver]);

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

    if (isGameOver || !game.currentClip || !selectedRank) {
      return;
    }

    const newDidWin = selectedRank.id === game.currentClip.clip.rank.id;
    setDidWin(newDidWin);

    const newGuessCount = clamp(guessCount + 1, 0, MAX_GUESS_COUNT);
    setGuessCount(newGuessCount);

    console.log('newGuessCount', newGuessCount);

    const newGuess = {
      rankId: selectedRank.id,
      rankName: selectedRank.name,
    };

    if (session?.user) {
      fetch('/api/user-game-save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: session.user.id,
          gameId: game.id,
          clipId: game.currentClip.clipId,
          guessCount: newGuessCount,
          didWin: newDidWin,
          guess: newGuess,
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
              didWin: newDidWin,
              guesses: [newGuess],
            },
          ];
        } else {
          const newGameSave = [...prevLocalGameSave];

          newGameSave[currentGameIndex] = {
            ...newGameSave[currentGameIndex],
            guessCount: newGuessCount,
            didWin: newDidWin,
            guesses: [
              ...(newGameSave[currentGameIndex].guesses || []),
              newGuess,
            ],
          };
          return newGameSave;
        }
      });
    }

    if (selectedRank?.id === game.currentClip.clip.rank.id) {
      setDidWin(true);
    }

    // setRanksGuessed([...ranksGuessed, selectedRank]);
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
        {process.env.NODE_ENV === 'development' && (
          <div>
            <span className='font-bold underline underline-offset-2'>
              Temp Game Status
            </span>
            <div>Game Over: {isGameOver ? 'true' : 'false'}</div>
            <div>Correct Rank: {game.currentClip.clip.rank.name}</div>
            <div>Won: {didWin ? 'true' : 'false'}</div>
            <div>
              Guesses: {guessCount}/{MAX_GUESS_COUNT} ({guessesLeft} left)
            </div>
            <div>
              {ranksGuessed.map((rank, index) => (
                <div key={index}>
                  Guess {index + 1}: {rank.rankName}
                </div>
              ))}
            </div>
          </div>
        )}
        <Wrapper game={game} clipExpirationDate={clipExpirationDate}>
          <ClipPlayer
            gameName={game.name}
            youtubeVideoId={game.currentClip.clip.youtubeUrl}
          />
          <HealthBar
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
          <Modal
            isOpen={isGameOverModalOpen}
            setIsOpen={setIsGameOverModalOpen}>
            <ModalHeader className='' setIsOpen={setIsGameOverModalOpen}>
              <span className=''>Today&apos;s Results</span>
            </ModalHeader>
            <ModalBody className=''>
              <div className='flex flex-col items-center gap-1'>
                <span className=''>Actual Rank</span>
                <div className='relative h-20 w-20 overflow-hidden rounded-xl border border-blueish-grey-600/80 bg-blueish-grey-600/50'>
                  <Image
                    className='flex h-full w-full object-contain p-2'
                    src={game.currentClip.clip.rank.imagePath}
                    alt={game.currentClip.clip.rank.name}
                    fill
                    priority
                    quality={65}
                  />
                </div>
              </div>
            </ModalBody>
            <ModalFooter className=''>
              <div>
                {status === 'authenticated' ? (
                  <>
                    Your stats are linked and you&apos;re able to submit your
                    own clips{' '}
                    <Link
                      className='text-blue-300 underline underline-offset-2 transition-colors duration-150 hover:no-underline'
                      href='/submit'>
                      here!
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      className='text-blue-300 underline underline-offset-2 transition-colors duration-150 hover:no-underline'
                      onClick={() => {
                        setIsGameOverModalOpen(false);
                      }}
                      href='/login'>
                      Login
                    </Link>{' '}
                    to link your stats and submit your own clips!
                  </>
                )}
              </div>
              <div className='mt-2 text-base'>
                Come back in:{' '}
                <CountdownTimer
                  game={game}
                  clipExpirationDate={clipExpirationDate}
                />
                !
              </div>
            </ModalFooter>
          </Modal>
        </Wrapper>
      </>
    );
  }

  return (
    <>
      <Wrapper game={game} clipExpirationDate={clipExpirationDate}>
        <NoClipToday />
      </Wrapper>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const slug = params?.slug as string;

  if (!slug) {
    return { notFound: true };
  }

  let game = await prisma.game.findUnique({
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

  game = JSON.parse(JSON.stringify(game));

  const { tomorrowsDateTimeString: clipExpirationDate } =
    getTodaysDateAndTomorrowsDate();

  if (!game) {
    return { notFound: true };
  }

  return {
    props: {
      game,
      clipExpirationDate: clipExpirationDate,
    },
  };
};

export default Game;
