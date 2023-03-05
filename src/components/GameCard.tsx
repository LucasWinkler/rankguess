import type { FC, PropsWithChildren } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import resolveConfig from 'tailwindcss/resolveConfig';
import { content, theme } from 'tailwind.config.js';
import Link from 'next/link';

const fullConfig = resolveConfig({
  content,
  theme,
});

const screens = fullConfig.theme?.screens as { [key: string]: string };

export interface GameInfoProps {
  gameTitle: string;
  thumbnail: string;
}

export interface GameCardProps {
  gameProps?: GameInfoProps;
}

const GameCardChildren: FC<GameCardProps> = ({ gameProps }) => {
  const thumbnail = gameProps?.thumbnail || '';
  const gameTitle = gameProps?.gameTitle || 'Unable to retrieve game title';

  return (
    <>
      <span
        className={clsx(
          'z-[3] text-xl font-bold uppercase tracking-[0.25em] text-neutral-100',
          gameProps &&
            'transition-transform duration-[700ms] ease-in-out will-change-transform group-hover:scale-[1.25] group-focus:scale-[1.25]'
        )}>
        {gameProps ? gameTitle : 'Coming Soon'}
      </span>
      {gameProps && (
        <Image
          className='z-[1] object-cover blur-[1px] brightness-[50%] transition-[blur_scale] duration-[500ms] ease-in-out will-change-transform group-hover:scale-[1.10] group-hover:blur-0 group-hover:brightness-[60%] group-focus:scale-[1.10] group-focus:blur-0 group-focus:brightness-[60%]'
          src={thumbnail || ''}
          alt={gameTitle + ' thumbnail'}
          fill
          priority
          sizes={`
              (min-width: ${screens.xs}) 50vw,
              (min-width: ${screens.sm}) 50vw,
              (min-width: ${screens.md}) 33vw,
              (min-width: ${screens.lg}) 25vw,
              100vw
            `}
          quality={65}
        />
      )}
    </>
  );
};

const GameCard: FC<GameCardProps> = ({ gameProps }) => {
  const gameCardClasses =
    'group relative mx-auto flex min-h-[10rem] w-full max-w-[18rem] items-center justify-center overflow-hidden rounded-xl border border-blueish-grey-700/80 bg-blueish-grey-700 bg-opacity-[25%] p-8 text-center backdrop-blur-[1px] xs:max-w-[22rem] sm:min-h-[23.5rem] sm:max-w-[18rem]';

  if (gameProps) {
    return (
      <Link href='/' className={gameCardClasses}>
        <GameCardChildren gameProps={gameProps} />
      </Link>
    );
  }

  return (
    <div className={gameCardClasses}>
      <GameCardChildren gameProps={gameProps} />
    </div>
  );
};
export default GameCard;
