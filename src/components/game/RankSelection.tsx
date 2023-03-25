import { Rank } from '@prisma/client';
import clsx from 'clsx';
import { FC } from 'react';
import RankCard from './RankCard';

type RankSelectionProps = {
  ranks: Rank[];
  selectedRank: Rank | undefined;
  isDisabled: boolean;
  onSelectRank: (rank: Rank) => void;
};

const RankSelection: FC<RankSelectionProps> = ({
  ranks,
  selectedRank,
  isDisabled: isGameOver,
  onSelectRank,
}) => {
  return (
    <div
      className={clsx(
        'mx-auto flex max-w-2xl flex-wrap items-start justify-center',
        isGameOver &&
          'animate-shake opacity-[65%] grayscale-[35%] motion-reduce:animate-reduced-shake'
      )}>
      {ranks.map(rank => (
        <RankCard
          isDisabled={isGameOver}
          selectedRank={selectedRank}
          onClick={() => onSelectRank(rank)}
          key={rank.id}
          rank={rank}
        />
      ))}
    </div>
  );
};

export default RankSelection;
