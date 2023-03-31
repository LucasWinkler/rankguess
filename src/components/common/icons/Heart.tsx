import { IconProps } from '@/types/icons';
import type { FC } from 'react';

const Heart: FC<IconProps> = ({ className }) => {
  return (
    <svg
      className={className}
      width='25'
      height='23'
      viewBox='0 0 25 23'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M13 4.9048C13.7619 1.09528 19.6179 0.856041 22.1429 3.38099C24.5856 5.82366 24.4286 9.98518 22.1429 12.5239L13 21.6667L3.85719 12.5239C2.6449 11.3114 1.96387 9.667 1.96387 7.95242C1.96387 6.23785 2.6449 4.59348 3.85719 3.38099C6.21909 1.01909 12.2381 1.09528 13 4.9048Z'
        fill='#CF2828'
        stroke='#CF2828'
        strokeOpacity='0.5'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default Heart;
