import { Rank } from '@prisma/client';
import clsx from 'clsx';
import { FC } from 'react';
import RankCard from './RankCard';

type RankSelectionProps = {
  ranks: Rank[];
  selectedRank: Rank | undefined;
  isDisabled: boolean;
  onSelectRank: (rank: Rank) => void;
  className?: string;
};

const RankSelection: FC<RankSelectionProps> = ({
  ranks,
  selectedRank,
  isDisabled,
  onSelectRank,
  className,
}) => {
  return (
    <div
      className={clsx(
        'mx-auto flex max-w-2xl flex-wrap items-start justify-center',
        className
      )}>
      {ranks.map(rank => (
        <RankCard
          isDisabled={isDisabled}
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
