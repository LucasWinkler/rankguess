import type { FC } from 'react';
import BackgroundGrid from './BackgroundGrid';
import Container from './Container';
import HeadingCircle from './HeadingCircle';

const Loading: FC = () => {
  return (
    <main
      id='main-content'
      className='flex h-[calc(100vh-var(--navigation-height)-1px)] items-center justify-center text-center text-xl'>
      <Container>
        <HeadingCircle />
        <BackgroundGrid />
        <div className='relative flex flex-col items-center justify-center'>
          <div
            className='inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]'
            role='status'></div>
          <span className='mt-2 text-neutral-200'>Loading please wait...</span>
        </div>
      </Container>
    </main>
  );
};

export default Loading;
