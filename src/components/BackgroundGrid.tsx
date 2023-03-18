import type { FC } from 'react';

const BackgroundGrid: FC = () => {
  return (
    <div className='background-grid pointer-events-none absolute inset-0 select-none opacity-[7.5%]'></div>
  );
};

export default BackgroundGrid;
