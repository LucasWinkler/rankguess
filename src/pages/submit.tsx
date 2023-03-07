import Container from '@/components/Container';
import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';
import Head from 'next/head';
import { authOptions } from './api/auth/[...nextauth]';

export default function Submit() {
  return (
    <>
      <Head>
        <title>Submit Your Clips | RankGuess</title>
        <meta
          name='description'
          content='Submit your own gameplay clips. The daily game where you guess the rank of user submitted clips from Apex Legends, CSGO, League of Legends, and more!'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Container>
        <h1>Submit your own clips</h1>
        <p>Eventually...</p>
      </Container>
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
