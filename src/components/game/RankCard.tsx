import { FC } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { Rank } from '@prisma/client';

type RankCardProps = {
  rank: Rank;
  selectedRank: Rank | undefined;
  onClick: () => void;
};

export const RankCard: FC<RankCardProps> = ({
  rank,
  selectedRank,
  onClick,
}) => {
  return (
    <div
      className={clsx(
        'flex flex-col transition-all duration-200 ease-in-out',
        selectedRank?.id === rank.id && 'scale-[1.15]'
      )}>
      <button
        onClick={onClick}
        type='button'
        className={clsx('flex flex-col items-center justify-center')}>
        <div
          className={clsx(
            'relative h-16 w-16 overflow-hidden rounded-xl border border-blueish-grey-600/80 bg-blueish-grey-600/25 backdrop-blur-[1px] transition-all duration-100 ease-in-out',
            selectedRank?.id === rank.id && 'border-2'
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
