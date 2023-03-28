import { MAX_GUESS_COUNT } from '@/constants';
import clsx from 'clsx';
import { FC } from 'react';

type TempHealthBarProps = {
  guessesLeft: number;
  className?: string;
};

const TempHealthBar: FC<TempHealthBarProps> = ({ guessesLeft, className }) => {
  return (
    <div className={clsx(className)}>
      Temp health bar ({guessesLeft}/{MAX_GUESS_COUNT})
    </div>
  );
};

export default TempHealthBar;
