import Container from '@/components/Container';
import LoginIcon from '@/components/icons/Login';
import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';
import { signIn } from 'next-auth/react';
import { authOptions } from './api/auth/[...nextauth]';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

export default function Login() {
  const router = useRouter();

  return (
    <>
      <NextSeo
        title='Login'
        description='Login to RankGuess to save your stats and submit your own clips!'
        openGraph={{
          url: 'https://www.rankguess.com/login',
          title: 'Login | RankGuess',
          description:
            'Login to RankGuess to save your stats and submit your own clips!',
        }}
      />

      <main id='main-content' className='relative py-12 lg:pt-16 lg:pb-32'>
        <Container>
          <div className='pointer-events-none absolute left-0 right-0 bottom-0 -top-[15.5rem] h-full w-full select-none bg-heading-circle bg-top bg-no-repeat'></div>
          <div className='background-grid pointer-events-none absolute inset-0 select-none opacity-[7.5%]'></div>
          <h1 className='page-heading-1 relative'>Login</h1>
          <div className='relative mx-auto mt-12 max-w-md rounded-xl border border-blueish-grey-600/80 bg-blueish-grey-700 p-8 sm:p-12 lg:mt-16'>
            <h2 className='text-xl font-semibold'>Sign in</h2>
            <p className='mt-[0.15rem] text-neutral-200'>
              to save your stats and submit your clips
            </p>
            <div className='mt-6'>
              <button
                onClick={() =>
                  signIn('google', {
                    redirect: true,
                    callbackUrl: router.query.callbackUrl as string,
                  })
                }
                className='flex w-full items-center gap-3 rounded-xl border border-blueish-grey-600/80 bg-blueish-grey-700 py-3 px-5 text-left text-sm font-light text-neutral-100 transition-colors duration-200 hover:bg-blueish-grey-800/25'>
                <LoginIcon className='h-5 w-auto' /> Login with Google
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

  if (session) {
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
