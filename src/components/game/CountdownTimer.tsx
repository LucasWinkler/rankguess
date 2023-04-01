import { FC, useEffect, useState } from 'react';
import { GameWithRanks } from '@/types/game';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import duration from 'dayjs/plugin/duration';

type CountdownTimer = {
  game: GameWithRanks;
  clipExpirationDate: string;
};

const CountdownTimer: FC<CountdownTimer> = ({ game, clipExpirationDate }) => {
  const [countdown, setCountdown] = useState('LOADING...');
  const router = useRouter();
  const secret = process.env.NEXT_PUBLIC_API_SECRET;

  dayjs.extend(timezone);
  dayjs.extend(utc);
  dayjs.extend(duration);
  dayjs.tz.setDefault('UTC');

  useEffect(() => {
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

    const setCountdownTime = () => {
      const expiration = dayjs.tz(clipExpirationDate).tz('America/Toronto');
      const duration = dayjs.duration(expiration.diff(dayjs()));

      if (duration.asMilliseconds() <= 0) {
        setCountdown('LOADING NEW CLIP...');
        handleRefreshData();
      } else {
        setCountdown(
          dayjs
            .utc(duration.asMilliseconds())
            .format('[RESETS IN:] H[h] m[m] s[s]')
        );
      }
    };

    setCountdownTime();

    const interval = setInterval(() => {
      setCountdownTime();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [clipExpirationDate, game, router, secret]);

  return <>{countdown}</>;
};

export default CountdownTimer;
