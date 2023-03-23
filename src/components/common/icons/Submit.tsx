import { IconProps } from '@/types/icons';
import type { FC } from 'react';

const Submit: FC<IconProps> = ({ className }) => {
  return (
    <svg
      className={className}
      width='13'
      height='16'
      viewBox='0 0 13 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M8.5 14.5H10.5C11.0304 14.5 11.5391 14.2893 11.9142 13.9142C12.2893 13.5391 12.5 13.0304 12.5 12.5V4.5L8.5 0.5H2.5C1.96957 0.5 1.46086 0.710714 1.08579 1.08579C0.710714 1.46086 0.5 1.96957 0.5 2.5V12.5C0.5 13.0304 0.710714 13.5391 1.08579 13.9142C1.46086 14.2893 1.96957 14.5 2.5 14.5H4.5'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M3.5 7.5L6.5 4.5M6.5 4.5L9.5 7.5M6.5 4.5V15.5'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default Submit;
