import Head from 'next/head';
import Container from '@/components/Container';
import Image from 'next/image';
import clsx from 'clsx';
import resolveConfig from 'tailwindcss/resolveConfig';
import { content, theme } from 'tailwind.config.js';

const fullConfig = resolveConfig({
  content,
  theme,
});
const screens = fullConfig.theme?.screens as { [key: string]: string };
const tempThumb = '/images/valorant-thumb.webp';

const renderTempGrid = (amount: number, img?: any) => {
  const items = [];

  for (let i = 0; i < amount; i++) {
    items.push(
      <div
        key={i}
        className={clsx(
          'group relative mx-auto flex min-h-[10rem] w-full max-w-[18rem] items-center justify-center overflow-hidden rounded-xl border border-blueish-grey-700/80 bg-blueish-grey-700 bg-opacity-[25%] p-6 text-center backdrop-blur-[1px] xs:max-w-[22rem] sm:min-h-[23.5rem] sm:max-w-[18rem]',
          img && 'cursor-pointer'
        )}>
        <span
          className={clsx(
            'z-[3] text-xl font-bold uppercase tracking-[0.25em] text-neutral-100',
            img &&
              'transition-transform duration-[700ms] ease-in-out group-hover:scale-[1.25]'
          )}>
          {img ? 'Valorant' : 'Coming Soon'}
        </span>
        {img && (
          <Image
            className='z-[1] object-cover blur-[1px] brightness-[50%] transition-[blur_scale] duration-[500ms] ease-in-out group-hover:scale-[1.10] group-hover:blur-0 group-hover:brightness-[60%]'
            src={img}
            alt='temp thumbnail'
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
      </div>
    );
  }

  return items;
};

export default function Home() {
  return (
    <>
      <Head>
        <title>Choose Game | rankguess</title>
        <meta
          name='description'
          content='Guess the rank of user submitted clips from Apex Legends, CSGO, League of Legends, and more!'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main id='main-content' className='relative py-12 lg:pt-16 lg:pb-32'>
        <Container>
          <div className='pointer-events-none absolute left-0 right-0 bottom-0 -top-[15.5rem] h-full w-full select-none bg-heading-circle bg-top bg-no-repeat'></div>
          <div className='background-grid pointer-events-none absolute inset-0 select-none bg-bottom opacity-[7.5%]'></div>
          <h1 className='relative text-center text-2xl font-medium uppercase tracking-[0.2em] text-neutral-200'>
            Choose a game
          </h1>
          <div className='grid-games relative mt-12 lg:mt-16'>
            {renderTempGrid(4, tempThumb)}
            {renderTempGrid(4)}
          </div>
        </Container>
      </main>
    </>
  );
}
