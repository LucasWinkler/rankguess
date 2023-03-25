import { MAX_GUESS_COUNT } from '@/constants';
import clsx from 'clsx';
import { FC } from 'react';

type TempHealthBarProps = {
  guessesLeft: number;
  isGameOver: boolean;
};

const TempHealthBar: FC<TempHealthBarProps> = ({ guessesLeft, isGameOver }) => {
  return (
    <div
      className={clsx(
        'my-10',
        isGameOver &&
          'animate-shake opacity-[65%] grayscale-[35%] motion-reduce:animate-reduced-shake'
      )}>
      Temp health bar ({guessesLeft}/{MAX_GUESS_COUNT})
    </div>
  );
};

export default TempHealthBar;
