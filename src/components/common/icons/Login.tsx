import { IconProps } from '@/types/icons';
import type { FC } from 'react';

const Login: FC<IconProps> = ({ className }) => {
  return (
    <svg
      className={className}
      width='15'
      height='15'
      viewBox='0 0 15 15'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M7.5 10.535L4.5 7.5M4.5 7.5L7.5 4.5M4.5 7.5H14.5'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M12.5 5.49983V2.53983C12.5 2.01078 12.2904 1.50328 11.917 1.12844C11.5437 0.753592 11.037 0.541945 10.508 0.539829L2.508 0.507829C2.24536 0.506776 1.98508 0.557466 1.74202 0.657004C1.49897 0.756542 1.2779 0.902979 1.09144 1.08795C0.904978 1.27293 0.756778 1.49282 0.655298 1.73507C0.553819 1.97732 0.501048 2.23718 0.5 2.49983V12.4998C0.5 13.0303 0.710714 13.539 1.08579 13.914C1.46086 14.2891 1.96957 14.4998 2.5 14.4998H10.5C11.0304 14.4998 11.5391 14.2891 11.9142 13.914C12.2893 13.539 12.5 13.0303 12.5 12.4998V9.49983'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default Login;
