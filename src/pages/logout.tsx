import Container from '@/components/common/Container';
import LogoutIcon from '@/components/common/icons/Logout';
import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';
import { signOut } from 'next-auth/react';
import { authOptions } from './api/auth/[...nextauth]';
import { NextSeo } from 'next-seo';
import BackgroundGrid from '@/components/common/BackgroundGrid';
import HeadingCircle from '@/components/common/HeadingCircle';

export default function Logout() {
  const description =
    "Are you sure you want to log out of RankGuess? Don't worry, your stats and progress will be saved and waiting for you when you come back! Click 'Logout' to end your session.";

  return (
    <>
      <NextSeo
        title='Are you sure you want to log out?'
        description={description}
        openGraph={{
          url: 'https://www.rankguess.com/logout',
          title: 'Are you sure you want to log out? | RankGuess',
          description: description,
        }}
      />

      <main id='main-content' className='relative py-12 lg:pt-16 lg:pb-32'>
        <Container>
          <HeadingCircle />
          <BackgroundGrid />
          <div className='relative'>
            <h1 className='page-heading-1'>Logout</h1>
            <div className='mx-auto mt-12 max-w-md rounded-xl border border-blueish-grey-600/80 bg-blueish-grey-700 p-8 sm:p-12 lg:mt-16'>
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
