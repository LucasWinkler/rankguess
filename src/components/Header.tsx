import { FC, ReactNode, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import Container from './Container';
import ConditionalWrapper from './ConditionalWrapper';
import Submit from './icons/Submit';
import Login from './icons/Login';
import Logout from './icons/Logout';
import Changelog from './icons/Changelog';
import Question from './icons/Question';
import FourCircles from './icons/FourCircles';
import Close from './icons/Close';
import Hamburger from './icons/Hamburger';
import Info from './icons/Info';

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

  // todo: close nav when clicking a link. close nav when pressing escape. prevent scrolling when nav is open

  return (
    <header className='z-10 border-b border-b-blueish-grey-700/25'>
      <Container className='flex h-navigation-height items-center'>
        <nav className='flex w-full items-center justify-between gap-2 text-neutral-300'>
          <div className='flex flex-grow basis-0 lg:hidden'>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className='text-neutral-1 text-[0.9375rem] transition-colors duration-200 hover:text-neutral-100'>
              {isMobileMenuOpen ? (
                <>
                  <span className='sr-only'>Close navigation menu</span>
                  <Close className='h-5 w-5' />
                </>
              ) : (
                <>
                  <span className='sr-only'>Open navigation menu</span>
                  <Hamburger className='h-5 w-5' />
                </>
              )}
            </button>
          </div>
          <div
            className={clsx(
              'flex-grow basis-0 lg:flex',
              isMobileMenuOpen
                ? 'absolute left-0 top-navigation-height right-0 block h-[calc(100%-var(--navigation-height))] border-t border-t-blueish-grey-700/25 bg-blueish-grey-800'
                : 'hidden'
            )}>
            <ConditionalWrapper
              condition={isMobileMenuOpen}
              wrapper={(children: ReactNode) => (
                <Container>{children}</Container>
              )}>
              <ul className='flex flex-grow basis-0 flex-col gap-6 py-5 text-base font-medium lg:flex-row lg:items-center lg:gap-7 lg:text-[0.9375rem] lg:font-normal'>
                <li>
                  <Link
                    className='inline-flex items-center gap-2 py-2 pr-2 transition-colors duration-200 hover:text-neutral-100'
                    href='/'>
                    <FourCircles className='h-5 w-auto' />
                    Choose Game
                  </Link>
                </li>
                <li className='lg:hidden'>
                  <Link
                    className='inline-flex items-center gap-2 py-2 pr-2 transition-colors duration-200 hover:text-neutral-100'
                    href='/submit'>
                    <Submit className='h-5 w-auto' />
                    Submit Clips
                  </Link>
                </li>
                <li>
                  <Link
                    className='inline-flex items-center gap-2 py-2 pr-2 transition-colors duration-200 hover:text-neutral-100'
                    href='/faq'>
                    <Question className='h-5 w-auto' />
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    className='inline-flex items-center gap-2 py-2 pr-2 transition-colors duration-200 hover:text-neutral-100'
                    href='/changelog'>
                    <Changelog className='h-5 w-auto' />
                    Changelog
                  </Link>
                </li>
              </ul>
              <ul className='flex flex-col gap-6 border-t border-t-blueish-grey-500/25 pt-5 text-base font-medium lg:hidden'>
                {isLoggedIn ? (
                  <li>
                    <Link
                      className='inline-flex items-center gap-2 py-2 pr-2 transition-colors duration-200 hover:text-neutral-100'
                      href='/'>
                      <Logout className='h-5 w-auto' />
                      Logout
                    </Link>
                  </li>
                ) : (
                  <li>
                    <Link
                      className='inline-flex items-center gap-2 py-2 pr-2 transition-colors duration-200 hover:text-neutral-100'
                      href='/login'>
                      <Login className='h-5 w-auto' />
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
          <div className='flex flex-grow basis-0 justify-end gap-4'>
            <ul className='hidden flex-grow basis-0 items-center justify-end gap-4 text-[0.9375rem] lg:flex'>
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
                  className='rounded-full border border-blueish-grey-700/50 bg-blueish-grey-700/50 px-6 py-2 text-neutral-200 transition-colors duration-200 hover:text-neutral-100'
                  href='/submit'>
                  Submit Clips
                </Link>
              </li>
            </ul>
            <div className='flex justify-end'>
              <button
                onClick={() => console.log('toggle info modal')}
                className='text-[0.9375rem] text-neutral-200 transition-colors duration-200 hover:text-neutral-100'>
                <>
                  <span className='sr-only'>Toggle information modal</span>
                  <Info className='h-6 w-6' />
                </>
              </button>
            </div>
          </div>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
