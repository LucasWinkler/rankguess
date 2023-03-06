import Head from 'next/head';
import Container from '@/components/Container';
import GameCard, { GameInfoProps } from '@/components/GameCard';
import { Modal, ModalBody, ModalFooter, ModalHeader } from '@/components/Modal';
import { useState } from 'react';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';

const env = process.env.NODE_ENV;
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
  const [isWorkInProgressModalOpen, setIsWorkInProgressModalOpen] =
    useState(true);

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

      {env === 'production' && (
        <Modal
          isOpen={isWorkInProgressModalOpen}
          setIsOpen={setIsWorkInProgressModalOpen}>
          <ModalHeader setIsOpen={setIsWorkInProgressModalOpen}>
            Work In Progress!
          </ModalHeader>
          <ModalBody>
            This project is a work in progress.
            <br />
            The UI is currently the main focus and will be updated frequently.
            <br />I will soon be working on the backend functionality, although
            authentication will not be available for the public until the
            project is complete.
          </ModalBody>
          <ModalFooter>
            <button
              className='rounded-full border border-blueish-grey-600/50 bg-blueish-grey-600/50 px-6 py-2 text-neutral-200 transition-colors duration-200 hover:text-neutral-100'
              onClick={() => setIsWorkInProgressModalOpen(false)}>
              Understood
            </button>
          </ModalFooter>
        </Modal>
      )}

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
