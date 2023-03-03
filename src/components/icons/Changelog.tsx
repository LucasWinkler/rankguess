import { IconProps } from '@/types';
import type { FC } from 'react';

const Changelog: FC<IconProps> = ({ className }) => {
  return (
    <svg
      className={className}
      width='13'
      height='15'
      viewBox='0 0 13 15'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M3.5 1.5H1.5C1.23478 1.5 0.98043 1.60536 0.792893 1.79289C0.605357 1.98043 0.5 2.23478 0.5 2.5V13.5C0.5 13.7652 0.605357 14.0196 0.792893 14.2071C0.98043 14.3946 1.23478 14.5 1.5 14.5H11.5C11.7652 14.5 12.0196 14.3946 12.2071 14.2071C12.3946 14.0196 12.5 13.7652 12.5 13.5V2.5C12.5 2.23478 12.3946 1.98043 12.2071 1.79289C12.0196 1.60536 11.7652 1.5 11.5 1.5H9.5'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M5.5 5.5H10.5M5.5 8.5H10.5M5.5 11.5H10.5M2.5 5.5H3.5M2.5 8.5H3.5M2.5 11.5H3.5M4.5 0.5H8.5C8.76522 0.5 9.01957 0.605357 9.20711 0.792893C9.39464 0.98043 9.5 1.23478 9.5 1.5C9.5 1.76522 9.39464 2.01957 9.20711 2.20711C9.01957 2.39464 8.76522 2.5 8.5 2.5H4.5C4.23478 2.5 3.98043 2.39464 3.79289 2.20711C3.60536 2.01957 3.5 1.76522 3.5 1.5C3.5 1.23478 3.60536 0.98043 3.79289 0.792893C3.98043 0.605357 4.23478 0.5 4.5 0.5Z'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default Changelog;
