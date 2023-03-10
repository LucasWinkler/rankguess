import Container from '@/components/Container';
import GameCard, { GameInfoProps } from '@/components/GameCard';
import prisma from '@/lib/prismadb';
import { NextSeo } from 'next-seo';
import { Game } from '@prisma/client';

const renderTempGrid = (amount: number, gameProps?: GameInfoProps) => {
  const items = [];

  for (let i = 0; i < amount; i++) {
    // Temp key for now
    items.push(<GameCard key={i} gameProps={gameProps} />);
  }

  return items;
};

export default function Home({ games }: { games: Game[] }) {
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
            {games?.map(game => (
              <GameCard
                key={game.id}
                gameProps={{
                  name: game.shortName || game.name,
                  thumbnailPath: game.thumbnailPath,
                  slug: game.slug,
                }}
              />
            ))}
            {renderTempGrid(3)}
          </div>
        </Container>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const games = await prisma.game.findMany();

  return {
    props: {
      games,
    },
    revalidate: 30 * 60,
  };
}
