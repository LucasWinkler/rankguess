import type { FC } from 'react';
import Image from 'next/image';
import headingCircle from '../../public/images/heading-circle.png';

const HeadingCircle: FC = () => {
  return (
    <Image
      className='pointer-events-none absolute left-0 right-0 bottom-0 top-[-12.5rem] mx-auto select-none xs:top-[-15.5rem]'
      src={headingCircle}
      alt=''
      priority
    />
  );
};

export default HeadingCircle;
