import Container from '@/components/Container';
import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';
import { NextSeo } from 'next-seo';
import BackgroundGrid from '@/components/BackgroundGrid';
import HeadingCircle from '@/components/HeadingCircle';

export default function Submit() {
  const description =
    'Share your best gameplay moments with the RankGuess community! Submit your own clips from your favorite games, including CS:GO, Overwatch, League of Legends, and more. See if you can challenge others to guess the rank of your gameplay. Join the fun and submit your clips now!';

  return (
    <>
      <NextSeo
        title='Submit Your Own Gameplay Clips'
        description={description}
        openGraph={{
          url: 'https://www.rankguess.com/submit',
          title: 'Submit Your Own Gameplay Clips | RankGuess',
          description: description,
        }}
      />

      <main id='main-content' className='relative py-12 lg:pt-16 lg:pb-32'>
        <Container>
          <HeadingCircle />
          <BackgroundGrid />
          <div className='relative'>
            <h1 className='page-heading-1'>Submit A Clip</h1>
            <p className='mt-4 text-center'>WORK IN PROGRESS</p>
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
        destination: '/login?callbackUrl=/submit',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
