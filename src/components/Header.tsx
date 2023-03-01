import { FC, ReactNode, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Container from './Container';
import clsx from 'clsx';
import ConditionalWrapper from './ConditionalWrapper';

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
    <header className='z-10 border-b border-b-blueish-grey-700/25'>
      <Container className='flex h-navigation-height items-center'>
        <nav className='flex w-full items-center justify-between text-neutral-300'>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className='flex flex-grow basis-0 text-[0.9375rem] md:hidden'>
            {isMobileMenuOpen ? 'Close' : 'Open'}
          </button>
          <div
            className={clsx(
              'flex-grow basis-0 md:flex',
              isMobileMenuOpen
                ? 'absolute left-0 top-navigation-height right-0 block h-[calc(100%-var(--navigation-height))] bg-blueish-grey-800'
                : 'hidden'
            )}>
            <ConditionalWrapper
              condition={isMobileMenuOpen}
              wrapper={(children: ReactNode) => (
                <Container>{children}</Container>
              )}>
              <ul className='flex flex-grow basis-0 flex-col gap-6 py-5 text-base font-medium md:flex-row md:items-center md:gap-7 md:text-[0.9375rem] md:font-normal'>
                <li>
                  <Link
                    className='py-2 transition-colors duration-200 hover:text-neutral-100'
                    href='/'>
                    Choose Game
                  </Link>
                </li>
                <li className='md:hidden'>
                  <Link
                    className='py-2 transition-colors duration-200 hover:text-neutral-100'
                    href='/submit'>
                    Submit Clips
                  </Link>
                </li>
                <li>
                  <Link
                    className='py-2 transition-colors duration-200 hover:text-neutral-100'
                    href='/faq'>
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    className='py-2 transition-colors duration-200 hover:text-neutral-100'
                    href='/changelog'>
                    Changelog
                  </Link>
                </li>
              </ul>
              <ul className='flex flex-col gap-6 border-t border-t-blueish-grey-500/25 pt-5 text-base font-medium md:hidden'>
                {isLoggedIn ? (
                  <li>
                    <Link
                      className='py-2 transition-colors duration-200 hover:text-neutral-100'
                      href='/'>
                      Logout
                    </Link>
                  </li>
                ) : (
                  <li>
                    <Link
                      className='py-2 transition-colors duration-200 hover:text-neutral-100'
                      href='/login'>
                      Login
                    </Link>
                  </li>
                )}
              </ul>
            </ConditionalWrapper>
          </div>
          <Link className='' href='/'>
            <Image src='/rankguess.svg' alt='Logo' width={130} height={25} />
          </Link>
          <ul className='hidden flex-grow basis-0 items-center justify-end gap-7 text-[0.9375rem] md:flex'>
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
                className='rounded-full border border-blueish-grey-700/50 bg-blueish-grey-700/50 px-6 py-2 text-neutral-200'
                href='/submit'>
                Submit Clips
              </Link>
            </li>
          </ul>
          <button
            onClick={() => console.log('toggle info modal')}
            className='flex flex-grow basis-0 justify-end text-[0.9375rem] md:hidden'>
            Info
          </button>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
