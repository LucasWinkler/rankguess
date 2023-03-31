import { MAX_GUESS_COUNT } from '@/constants';
import clsx from 'clsx';
import { FC } from 'react';
import Heart from '../common/icons/Heart';

type HealthBarProps = {
  guessesLeft: number;
  className?: string;
};

const HealthBar: FC<HealthBarProps> = ({ guessesLeft, className }) => {
  const health = (100 / MAX_GUESS_COUNT) * guessesLeft;
  return (
    <div
      className={clsx(
        'lg-max-w-xl my-10 mx-auto flex max-w-full items-center justify-center gap-2 sm:max-w-xl md:gap-3 lg:max-w-2xl',
        className
      )}>
      <div className='flex h-[2.5rem] w-[2.5rem] flex-shrink-0 items-center justify-center rounded-[10px] border border-blueish-grey-600/50 bg-blueish-grey-600/50'>
        <Heart />
      </div>
      <div className='flex h-[2.5rem] w-full items-center justify-start rounded-[10px] border border-blueish-grey-600/50 bg-blueish-grey-600/50'>
        <div
          className='mx-2 h-[60%] w-full rounded-[5px] border border-green-400/50 bg-green-400/50'
          style={{ width: `${health}%` }}></div>
      </div>
    </div>
  );
};

export default HealthBar;
