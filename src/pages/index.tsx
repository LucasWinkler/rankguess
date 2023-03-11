import Container from '@/components/Container';
import GameCard, { GameWithThumbnailBlur } from '@/components/GameCard';
import prisma from '@/lib/prismadb';
import { Game } from '@prisma/client';
import { log } from 'console';
import { NextSeo } from 'next-seo';
import { getPlaiceholder } from 'plaiceholder';

const renderTempGrid = (amount: number) => {
  const items = [];

  for (let i = 0; i < amount; i++) {
    items.push(<GameCard key={i} />);
  }

  return items;
};

export default function Home({
  gamesWithThumbnailBlur,
}: {
  gamesWithThumbnailBlur: GameWithThumbnailBlur[];
}) {
  return (
    <>
      <NextSeo
        title='Choose Game'
        openGraph={{
          url: 'https://www.rankguess.com/submit',
          title: 'Choose Game | RankGuess',
        }}
      />

      <main id='main-content' className='relative py-12 lg:pt-16 lg:pb-32'>
        <Container>
          <div className='pointer-events-none absolute left-0 right-0 bottom-0 -top-[15.5rem] h-full w-full select-none bg-heading-circle bg-top bg-no-repeat'></div>
          <div className='background-grid pointer-events-none absolute inset-0 select-none opacity-[7.5%]'></div>
          <h1 className='page-heading-1 relative'>Choose a game</h1>
          <div className='grid-games relative mt-12 lg:mt-16'>
            {gamesWithThumbnailBlur?.map(game => (
              <GameCard key={game.id} game={game} />
            ))}
            {renderTempGrid(3)}
          </div>
        </Container>
      </main>
    </>
  );
}

export async function getStaticProps() {
  console.log('here in getStaticProps of index');

  const { NEXTAUTH_URL } = process.env;

  const games = await prisma.game.findMany({
    where: {
      isEnabled: true,
    },
  });

  const gamesWithThumbnailBlur: GameWithThumbnailBlur[] = await Promise.all(
    games.map(async (game: Game) => {
      const { base64, img } = await getPlaiceholder(
        `${NEXTAUTH_URL}${game.thumbnailPath}`
      );
      return { ...game, imageProps: { ...img, blurDataURL: base64 } };
    })
  );

  console.log('returning props');

  return {
    props: {
      gamesWithThumbnailBlur,
    },
  };
}
