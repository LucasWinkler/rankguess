import type { FC } from 'react';

const Custom404: FC = ({}) => {
  return (
    <div className='flex h-[calc(100vh-var(--navigation-height)-1px)] items-center justify-center'>
      <h1 className='text-xl'>404 - Page Not Found or Work In Progress</h1>
    </div>
  );
};
export default Custom404;
