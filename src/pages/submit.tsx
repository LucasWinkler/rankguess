import Container from '@/components/Container';
import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';
import { NextSeo } from 'next-seo';

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
          <h1>Submit your own clips</h1>
          <p>Eventually...</p>
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
