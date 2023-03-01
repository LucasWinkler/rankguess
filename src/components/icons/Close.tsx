import type { FC } from 'react';

interface CloseProps {
  className?: string;
}

const Close: FC<CloseProps> = ({ className }) => {
  return (
    <svg
      className={className}
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M14.6667 14.6668L1.33334 1.3335M14.6667 1.3335L1.33334 14.6668'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default Close;
