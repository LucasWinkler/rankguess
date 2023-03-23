import Container from '@/components/common/Container';
import LoginIcon from '@/components/common/icons/Login';
import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';
import { signIn } from 'next-auth/react';
import { authOptions } from './api/auth/[...nextauth]';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import HeadingCircle from '@/components/common/HeadingCircle';
import BackgroundGrid from '@/components/common/BackgroundGrid';

const Login = () => {
  const router = useRouter();
  const description =
    'Sign up or log in to RankGuess to save your stats and submit your own gameplay clips. Join the community now!';

  return (
    <>
      <NextSeo
        title='Log in to Save Stats & Submit Your Clips'
        description={description}
        openGraph={{
          url: 'https://www.rankguess.com/login',
          title: 'Log in to Save Stats & Submit Your Clips | RankGuess',
          description: description,
        }}
      />

      <main id='main-content' className='relative py-12 lg:pt-16 lg:pb-32'>
        <Container>
          <HeadingCircle />
          <BackgroundGrid />
          <div className='relative'>
            <h1 className='page-heading-1'>Login</h1>
            <div className='mx-auto mt-12 max-w-md rounded-xl border border-blueish-grey-600/80 bg-blueish-grey-700 p-8 sm:p-12 lg:mt-16'>
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
          </div>
        </Container>
      </main>
    </>
  );
};

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

export default Login;
