import Head from 'next/head';
import Container from '@/components/Container';
import GameCard, { GameInfoProps } from '@/components/GameCard';
import { Modal, ModalBody, ModalFooter, ModalHeader } from '@/components/Modal';
import Link from 'next/link';

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
