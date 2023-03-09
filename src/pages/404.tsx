import Container from '@/components/Container';
import { NextSeo } from 'next-seo';
import type { FC } from 'react';

const Custom404: FC = ({}) => {
  return (
    <>
      <NextSeo
        title='Page Not Found'
        openGraph={{
          title: 'Page Not Found | Rank Guess',
        }}
      />
      <main
        id='main-content'
        className='flex h-[calc(100vh-var(--navigation-height)-1px)] items-center justify-center text-center text-xl'>
        <Container>
          <h1>404 - Page Not Found or Work In Progress</h1>
        </Container>
      </main>
    </>
  );
};
export default Custom404;
