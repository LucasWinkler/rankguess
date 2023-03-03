import { IconProps } from '@/types';
import type { FC } from 'react';

const Hamburger: FC<IconProps> = ({ className }) => {
  return (
    <svg
      className={className}
      strokeWidth='2'
      width='21'
      height='15'
      viewBox='0 0 21 15'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M1.07143 1.21436H19.9286M1.06829 7.50007H19.9207M1.07143 13.7858H19.9207'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default Hamburger;
