import { IconProps } from '@/types';
import type { FC } from 'react';

const FourCircles: FC<IconProps> = ({ className }) => {
  return (
    <svg
      className={className}
      width='15'
      height='15'
      viewBox='0 0 15 15'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M3.35715 6.11902C4.88251 6.11902 6.11906 4.88248 6.11906 3.35712C6.11906 1.83176 4.88251 0.595215 3.35715 0.595215C1.83179 0.595215 0.595245 1.83176 0.595245 3.35712C0.595245 4.88248 1.83179 6.11902 3.35715 6.11902Z'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M11.6429 6.11902C13.1682 6.11902 14.4048 4.88248 14.4048 3.35712C14.4048 1.83176 13.1682 0.595215 11.6429 0.595215C10.1175 0.595215 8.88095 1.83176 8.88095 3.35712C8.88095 4.88248 10.1175 6.11902 11.6429 6.11902Z'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M3.35715 14.4047C4.88251 14.4047 6.11906 13.1681 6.11906 11.6428C6.11906 10.1174 4.88251 8.88086 3.35715 8.88086C1.83179 8.88086 0.595245 10.1174 0.595245 11.6428C0.595245 13.1681 1.83179 14.4047 3.35715 14.4047Z'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M11.6429 14.4047C13.1682 14.4047 14.4048 13.1681 14.4048 11.6428C14.4048 10.1174 13.1682 8.88086 11.6429 8.88086C10.1175 8.88086 8.88095 10.1174 8.88095 11.6428C8.88095 13.1681 10.1175 14.4047 11.6429 14.4047Z'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default FourCircles;
