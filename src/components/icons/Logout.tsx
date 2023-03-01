import type { FC } from 'react';

interface LogoutProps {
  className?: string;
}

const Logout: FC<LogoutProps> = ({ className }) => {
  return (
    <svg
      className={className}
      width='14'
      height='15'
      viewBox='0 0 14 15'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M10.595 10.5L13.5 7.5M13.5 7.5L10.595 4.5M13.5 7.5H4.5M10.5 0.5L2.5 0.502C1.396 0.503 0.5 1.398 0.5 2.502V12.497C0.5 13.0274 0.710714 13.5361 1.08579 13.9112C1.46086 14.2863 1.96957 14.497 2.5 14.497H10.595'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default Logout;
