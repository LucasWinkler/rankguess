import Container from '@/components/Container';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import type { FC } from 'react';

const Custom404: FC = ({}) => {
  const description =
    "Sorry, the page you were looking for isn't here. Please check the URL and try again. In the meantime, why not play a round of Guess the Rank for your favorite games with RankGuess? Join the fun now!";

  return (
    <>
      <NextSeo
        title='Oops! Page Not Found'
        description={description}
        openGraph={{
          title: 'Oops! Page Not Found | Rank Guess',
          description: description,
        }}
      />
      <main
        id='main-content'
        className='flex h-[calc(100vh-var(--navigation-height)-1px)] items-center justify-center text-center'>
        <Container>
          <span className='text-9xl font-bold'>404</span>
          <h1 className='text-xl'>Page Not Found</h1>
          <p className='mt-4 text-base text-neutral-200'>
            The page you are looking for does not seem to exist.
          </p>
          <Link
            href='/'
            className='mt-4 inline-block rounded-full border border-blueish-grey-600/50 bg-blueish-grey-600/50 px-6 py-2 text-neutral-200 transition-colors duration-200 hover:text-neutral-100'>
            Go to Home
          </Link>
        </Container>
      </main>
    </>
  );
};
export default Custom404;
