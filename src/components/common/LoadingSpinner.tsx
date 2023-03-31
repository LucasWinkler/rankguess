import type { FC } from 'react';

const Loading: FC = () => {
  return (
    <div className='relative flex flex-col items-center justify-center'>
      <div
        className='inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]'
        role='status'></div>
      <span className='mt-2 text-neutral-200'>Loading please wait...</span>
    </div>
  );
};

export default Loading;
