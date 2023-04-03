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

  const healthTicks = Array.from({ length: MAX_GUESS_COUNT - 1 }, (_, i) => {
    const tickPosition = (100 / MAX_GUESS_COUNT) * (i + 1);

    // // Ensures we don't draw a tick at the end of the bar
    // if (health <= tickPosition) {
    //   return;
    // }

    return (
      <div
        key={i}
        className={clsx(
          'absolute top-[50%] bottom-[50%] h-[90%] w-[1px] bg-blueish-grey-700/50 transition-opacity duration-[600] ease-in-out [transform:translate(-50%,-50%)]',
          health <= tickPosition && 'opacity-0'
        )}
        style={{ left: `${tickPosition}%` }}></div>
    );
  });

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
        <div className='relative mx-2 h-[60%] w-full overflow-hidden'>
          {healthTicks}
          <div
            className='h-full w-full rounded-[5px] border border-green-400/50 bg-green-400/50 transition-all duration-500 ease-in-out'
            style={{ width: `${health}%` }}></div>
        </div>
      </div>
      <span className='text-sm text-neutral-200 xs:text-base'>
        {guessesLeft}/{MAX_GUESS_COUNT}
      </span>
    </div>
  );
};

export default HealthBar;
