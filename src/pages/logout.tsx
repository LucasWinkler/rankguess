import Container from '@/components/Container';
import LogoutIcon from '@/components/icons/Logout';
import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';
import { signOut } from 'next-auth/react';
import { authOptions } from './api/auth/[...nextauth]';
import { NextSeo } from 'next-seo';

export default function Logout() {
  return (
    <>
      <NextSeo
        title='Logout'
        openGraph={{
          url: 'https://www.rankguess.com/logout',
          title: 'Logout | RankGuess',
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
          <h1 className='page-heading-1 relative'>Logout</h1>
          <div className='relative mx-auto max-w-md rounded-xl border border-blueish-grey-600/80 bg-blueish-grey-700 p-8 sm:p-12'>
            <h2 className='text-xl font-semibold'>Are you sure?</h2>
            <p className='mt-[0.15rem] text-neutral-200'>
              Your stats will stop being saved
            </p>
            <div className='mt-6'>
              <button
                onClick={() => signOut()}
                className='flex w-full items-center gap-3 rounded-xl border border-blueish-grey-600/80 bg-blueish-grey-700 py-3 px-5 text-left text-sm font-light text-neutral-100 transition-colors duration-200 hover:bg-blueish-grey-800/25'>
                <LogoutIcon className='h-5 w-auto' /> Logout
              </button>
            </div>
          </div>
        </Container>
      </main>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
