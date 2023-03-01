import type { FC } from 'react';

interface InfoProps {
  className?: string;
}

const Info: FC<InfoProps> = ({ className }) => {
  return (
    <svg
      className={className}
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M12 22.6668C17.891 22.6668 22.6667 17.8912 22.6667 12.0002C22.6667 6.10913 17.891 1.3335 12 1.3335C6.10896 1.3335 1.33333 6.10913 1.33333 12.0002C1.33333 17.8912 6.10896 22.6668 12 22.6668Z'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M12 17.3333V12H10.6667M10.6667 17.3333H13.3333'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M12 9.33366C12.7364 9.33366 13.3333 8.73671 13.3333 8.00033C13.3333 7.26395 12.7364 6.66699 12 6.66699C11.2636 6.66699 10.6667 7.26395 10.6667 8.00033C10.6667 8.73671 11.2636 9.33366 12 9.33366Z'
        fill='currentColor'
      />
    </svg>
  );
};

export default Info;
