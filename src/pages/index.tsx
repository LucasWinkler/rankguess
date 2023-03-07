import Head from 'next/head';
import Container from '@/components/Container';
import GameCard, { GameInfoProps } from '@/components/GameCard';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';
import { NextSeo } from 'next-seo';

const valorantThumb = '/images/valorant-thumb.webp';
const apexThumb = '/images/apex-thumb-test.webp';
const overwatchThumb = '/images/overwatch-thumb.webp';
const csgoThumb = '/images/csgo-thumb.webp';

const renderTempGrid = (amount: number, gameProps?: GameInfoProps) => {
  const items = [];

  for (let i = 0; i < amount; i++) {
    // Temp key for now
    items.push(<GameCard key={i} gameProps={gameProps} />);
  }

  return items;
};

export default function Home() {
  return (
    <>
      <NextSeo
        title='Choose Game'
        openGraph={{
          url: 'https://www.rankguess.com/submit',
          title: 'Choose Game | RankGuess',
          description:
            'Guess the rank of user submitted clips from Apex Legends, CSGO, League of Legends, and more!',
          images: [
            {
              url: 'https://www.rankguess.com/og.png',
              width: 1200,
              height: 600,
              alt: 'Choose game desktop view',
              type: 'image/png',
            },
          ],
        }}
      />

      <main id='main-content' className='relative py-12 lg:pt-16 lg:pb-32'>
        <Container>
          <div className='pointer-events-none absolute left-0 right-0 bottom-0 -top-[15.5rem] h-full w-full select-none bg-heading-circle bg-top bg-no-repeat'></div>
          <div className='background-grid pointer-events-none absolute inset-0 select-none opacity-[7.5%]'></div>
          <h1 className='page-heading-1 relative'>Choose a game</h1>
          <div className='grid-games relative'>
            <GameCard
              gameProps={{ gameTitle: 'Valorant', thumbnail: valorantThumb }}
            />
            <GameCard
              gameProps={{ gameTitle: 'Apex Legends', thumbnail: apexThumb }}
            />
            <GameCard
              gameProps={{
                gameTitle: 'CSGO',
                thumbnail: csgoThumb,
              }}
            />
            <GameCard
              gameProps={{
                gameTitle: 'Overwatch',
                thumbnail: overwatchThumb,
              }}
            />
            {renderTempGrid(4)}
          </div>
        </Container>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async context => {
  const session = await getServerSession(context.req, context.res, authOptions);

  return {
    props: {
      session,
    },
  };
};
