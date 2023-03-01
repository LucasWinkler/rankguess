import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Container from './Container';
import clsx from 'clsx';

const Header: FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // For testing purposes
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
  }, [setIsMobileMenuOpen]);

  return (
    <header className='border-b border-b-dark-blueish-grey/25 py-10'>
      <Container>
        <nav className='flex items-center justify-between text-neutral-300'>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className='flex flex-grow basis-0 md:hidden'>
            Menu
          </button>

          <div
            className={clsx(
              'flex-grow basis-0 md:flex',
              isMobileMenuOpen ? 'block' : 'hidden'
            )}>
            <ul className='flex flex-grow basis-0 items-center gap-7'>
              <li>
                <Link
                  className='transition-colors duration-200 hover:text-neutral-100'
                  href='/'>
                  Choose Game
                </Link>
              </li>
              <li className='md:hidden'>
                <Link
                  className='transition-colors duration-200 hover:text-neutral-100'
                  href='/submit'>
                  Submit Clips
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

            <ul className='md:hidden'>
              {isLoggedIn ? (
                <li>
                  <Link
                    className='transition-colors duration-200 hover:text-neutral-100'
                    href='/'>
                    Logout
                  </Link>
                </li>
              ) : (
                <li>
                  <Link
                    className='transition-colors duration-200 hover:text-neutral-100'
                    href='/login'>
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>

          <Link className='' href='/'>
            <Image src='/rankguess.svg' alt='Logo' width={130} height={25} />
          </Link>

          <ul className='hidden flex-grow basis-0 items-center justify-end gap-7 md:flex'>
            {isLoggedIn ? (
              <li>
                <Link
                  className='transition-colors duration-200 hover:text-neutral-100'
                  href='/'>
                  Logout
                </Link>
              </li>
            ) : (
              <li>
                <Link
                  className='transition-colors duration-200 hover:text-neutral-100'
                  href='/login'>
                  Login
                </Link>
              </li>
            )}
            <li>
              <Link
                className='rounded-full border border-dark-blueish-grey/50 bg-dark-blueish-grey/50 px-6 py-2 text-neutral-200'
                href='/submit'>
                Submit Clips
              </Link>
            </li>
          </ul>

          <button
            onClick={() => console.log('toggle info modal')}
            className='flex flex-grow basis-0 justify-end md:hidden'>
            Info
          </button>
        </nav>
      </Container>
    </header>
  );
};
export default Header;
