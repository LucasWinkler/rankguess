import type { FC } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import resolveConfig from 'tailwindcss/resolveConfig';
import { content, theme } from 'tailwind.config.js';
import Link from 'next/link';
import { Game } from '@prisma/client';

export type GameWithThumbnailBlur = Game & {
  imageProps: {
    blurDataURL: string;
    src: string;
    width: number;
    height: number;
    type?: string | undefined;
  };
};

type GameCardProps = {
  game?: GameWithThumbnailBlur;
};

const GameCard: FC<GameCardProps> = ({ game }) => {
  const fullConfig = resolveConfig({
    content,
    theme,
  });
  const screens = fullConfig.theme?.screens as { [key: string]: string };

  const cardClasses =
    'group relative mx-auto flex min-h-[10rem] w-full max-w-[18rem] items-center justify-center overflow-hidden rounded-xl border border-blueish-grey-600/80 p-8 text-center xs:max-w-[22rem] sm:min-h-[23.5rem] sm:max-w-[18rem]';

  const cardTextClasses =
    'z-[3] text-xl font-bold uppercase tracking-[0.25em] text-neutral-100';

  if (!game) {
    return (
      <div
        className={clsx(
          cardClasses,
          'bg-blueish-grey-600 bg-opacity-[25%] backdrop-blur-[1px]'
        )}>
        <span className={clsx(cardTextClasses)}>Coming Soon</span>
      </div>
    );
  }

  return (
    <Link draggable={false} className={cardClasses} href={`/game/${game.slug}`}>
      <span
        className={clsx(
          cardTextClasses,
          'transition-transform duration-[715ms] ease-in-out will-change-transform group-hover:scale-[1.10] group-focus:scale-[1.10] sm:group-hover:scale-[1.20] sm:group-focus:scale-[1.20]'
        )}>
        {game.shortName || game.name}
      </span>
      <Image
        draggable={false}
        className='absolute z-[1] h-full w-full object-cover object-center blur-[1px] brightness-[50%] transition-[blur_scale] duration-[500ms] ease-in-out will-change-transform group-hover:scale-[1.10] group-hover:blur-0 group-hover:brightness-[60%] group-focus:scale-[1.10] group-focus:blur-0 group-focus:brightness-[60%]'
        {...game.imageProps}
        alt={(game.shortName || game.name) + ' thumbnail'}
        priority
        sizes={`
          (min-width: ${screens.xs}) 40vw,
          (min-width: ${screens.sm}) 40vw,
          (min-width: ${screens.md}) 33vw,
          (min-width: ${screens.lg}) 25vw,
          90vw
        `}
        quality={60}
        placeholder='blur'
      />
    </Link>
  );
};

export default GameCard;
