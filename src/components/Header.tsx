import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Container from './Container';

const Header: FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(true);

  useEffect(() => {
    const handleViewportChange = () => {
      setIsMobileMenuOpen(false);
    };

    window.addEventListener('resize', handleViewportChange);
    screen.orientation.addEventListener('change', handleViewportChange);

    return () => {
      window.removeEventListener('resize', handleViewportChange);
      screen.orientation.removeEventListener('change', handleViewportChange);
    };
  }, []);

  return (
    <header className='border-b border-b-pale-blueish-grey/25 py-10'>
      <Container>
        <nav className='flex items-center justify-between text-neutral-300'>
          <ul className='hidden flex-grow basis-0 items-center gap-7 md:flex'>
            <li>
              <Link
                className='transition-colors duration-200 hover:text-neutral-100'
                href='/'>
                Choose Game
              </Link>
            </li>
            <li>
              <Link
                className='transition-colors duration-200 hover:text-neutral-100'
                href='/faq'>
                FAQ
              </Link>
            </li>
            <li>
              <Link
                className='transition-colors duration-200 hover:text-neutral-100'
                href='/changelog'>
                Changelog
              </Link>
            </li>
          </ul>
          <Link className='mx-auto' href='/'>
            <Image src='/rankguess.svg' alt='Logo' width={130} height={25} />
          </Link>
          <ul className='hidden flex-grow basis-0 items-center justify-end gap-7 md:flex'>
            <li>
              <Link
                className='transition-colors duration-200 hover:text-neutral-100'
                href='/login'>
                Login
              </Link>
            </li>
            <li>
              <Link
                className='rounded-full border border-pale-blueish-grey/50 bg-pale-blueish-grey/50 px-6 py-2 text-neutral-200'
                href='/submit'>
                Submit Clips
              </Link>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
};
export default Header;
