import type { FC } from 'react';
import Link from 'next/link';

const SkipNavigation: FC = () => {
  return (
    <Link
      href='#main-content'
      className='bg-neutral-800 text-white sr-only block text-center focus:not-sr-only'>
      Skip to content
    </Link>
  );
};
export default SkipNavigation;
