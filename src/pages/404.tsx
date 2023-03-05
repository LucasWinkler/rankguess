import Container from '@/components/Container';
import type { FC } from 'react';

const Custom404: FC = ({}) => {
  return (
    <main
      id='main-content'
      className='flex h-[calc(100vh-var(--navigation-height)-1px)] items-center justify-center text-center text-xl'>
      <Container>
        <h1>404 - Page Not Found or Work In Progress</h1>
      </Container>
    </main>
  );
};
export default Custom404;
