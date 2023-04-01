import { FC, useEffect, useState } from 'react';
import { NextSeo } from 'next-seo';
import Container from '@/components/common/Container';
import HeadingCircle from '@/components/common/HeadingCircle';
import BackgroundGrid from '@/components/common/BackgroundGrid';
import { GameWithRanks } from '@/types/game';
import { useRouter } from 'next/router';
import { getTodaysDateAndTomorrowsDate } from '@/util/date';
import { log } from 'console';

type GamePageWrapperProps = {
  game: GameWithRanks;
  children?: React.ReactNode;
};

const GamePageWrapper: FC<GamePageWrapperProps> = ({ game, children }) => {
  const [countdown, setCountdown] = useState('LOADING...');

  const router = useRouter();
  const secret = process.env.NEXT_PUBLIC_API_SECRET;
  const description = `Guess the rank of user-submitted gameplay from ${game.name} daily with RankGuess. Test your knowledge and track your stats to see how you improve over time. Remember, the game resets at 12 am EST, so submit your guesses before then!`;

  const convertUtcToEst = (dateString: string) => {
    const utcDate = new Date(dateString);

    return utcDate.toLocaleString('en-US', {
      timeZone: 'America/New_York',
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const { tomorrowsDateTimeString } = getTodaysDateAndTomorrowsDate();
      const estTime = convertUtcToEst(tomorrowsDateTimeString);
      const estDate = new Date(estTime);
      const currentTime = new Date();
      const diffInMs = estDate.getTime() - currentTime.getTime();

      if (diffInMs <= 0) {
        setCountdown('LOADING NEW CLIP...');
      } else {
        const hours = Math.floor(diffInMs / (1000 * 60 * 60));
        const minutes = Math.floor((diffInMs / (1000 * 60)) % 60);
        setCountdown(`RESETS IN: ${hours}h ${minutes}m`);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [game]);

  const handleRefreshData = async () => {
    await fetch(`/api/game/${game.id}?secret=${secret}`)
      .then(res => res.json())
      .then(({ game: newGame }: { game: GameWithRanks }) => {
        if (newGame.currentClip) {
          if (
            !game.currentClip ||
            game.currentClip.clipId !== newGame.currentClip.clipId
          ) {
            router.replace(router.asPath);
            return;
          }
        } else if (!newGame.currentClip && game.currentClip) {
          router.replace(router.asPath);
          return;
        }
        setTimeout(() => {
          handleRefreshData();
        }, 5000);
      });
  };

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
            <h2 className='page-heading-2 lg:mt-2'>{countdown}</h2>
            {process.env.NODE_ENV === 'development' && (
              <button
                onClick={handleRefreshData}
                className='mx-auto mt-6 block rounded-full border border-blueish-grey-600/50 bg-blueish-grey-600/50 px-6 py-2 text-neutral-200'>
                TEST REFRESH DATA
              </button>
            )}
            <div className='mt-12 text-center lg:mt-16'>{children}</div>
          </div>
        </Container>
      </main>
    </>
  );
};

export default GamePageWrapper;
