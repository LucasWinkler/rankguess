import Container from '@/components/Container';
import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';
import { NextSeo } from 'next-seo';

export default function Submit() {
  return (
    <>
      <NextSeo
        title='Submit Your Clips'
        description='Submit your own gameplay clips to RankGuess. The daily game where you guess the rank of user submitted clips from Apex Legends, CSGO, League of Legends, and more!'
        openGraph={{
          url: 'https://www.rankguess.com/submit',
          title: 'Submit Your Clips | RankGuess',
          description:
            'Submit your own gameplay clips to RankGuess. The daily game where you guess the rank of user submitted clips from Apex Legends, CSGO, League of Legends, and more!',
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
