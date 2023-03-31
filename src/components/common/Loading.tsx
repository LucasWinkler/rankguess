import type { FC } from 'react';
import BackgroundGrid from './BackgroundGrid';
import Container from './Container';
import HeadingCircle from './HeadingCircle';
import LoadingSpinner from './LoadingSpinner';

const Loading: FC = () => {
  return (
    <main
      id='main-content'
      className='flex h-[calc(100vh-var(--navigation-height)-1px)] items-center justify-center text-center text-xl'>
      <Container>
        <HeadingCircle />
        <BackgroundGrid />
        <LoadingSpinner />
      </Container>
    </main>
  );
};

export default Loading;
