import Container from '@/components/Container';
import type { FC } from 'react';

const Custom404: FC = ({}) => {
  return (
    <div className='flex h-[calc(100vh-var(--navigation-height)-1px)] items-center justify-center'>
      <Container>
        <h1 className='text-xl'>404 - Page Not Found or Work In Progress</h1>
      </Container>
    </div>
  );
};
export default Custom404;
