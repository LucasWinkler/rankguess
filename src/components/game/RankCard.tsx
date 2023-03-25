import { FC } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { Rank } from '@prisma/client';

type RankCardProps = {
  rank: Rank;
  selectedRank: Rank | undefined;
  onClick: () => void;
  isDisabled: boolean;
};

const RankCard: FC<RankCardProps> = ({
  rank,
  selectedRank,
  onClick,
  isDisabled,
}) => {
  return (
    <div
      className={clsx(
        'relative mx-[0.5rem] mb-4 flex flex-col transition-all duration-300 ease-in-out',
        selectedRank?.id === rank.id &&
          !isDisabled &&
          'mx-[1.0rem] scale-[1.20]'
      )}>
      <button
        onClick={onClick}
        type='button'
        className={clsx(
          'flex max-w-[3.5rem] flex-col items-center justify-center',
          isDisabled && 'cursor-not-allowed'
        )}>
        <div
          className={clsx(
            'relative h-16 w-16 overflow-hidden rounded-xl border border-blueish-grey-600/80 bg-blueish-grey-600/25 backdrop-blur-[1px] transition-all duration-300 ease-in-out',
            selectedRank?.id === rank.id && !isDisabled && 'border-2'
          )}>
          <Image
            className='flex h-full w-full object-contain p-2'
            src={rank.imagePath}
            alt={rank.name}
            fill
            priority
            quality={65}
          />
        </div>
        <span className='mt-2 text-sm text-neutral-200'>{rank.name}</span>
      </button>
    </div>
  );
};

export default RankCard;
