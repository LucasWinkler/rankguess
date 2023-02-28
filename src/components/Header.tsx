import type { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Container from './Container';

const Header: FC = () => {
  return (
    <header className='py-10'>
      <Container>
        <nav className='flex items-center justify-between text-neutral-300'>
          <ul className='flex flex-grow basis-0 items-center gap-3'>
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
          <Link className='' href='/'>
            <Image src='/rankguess.svg' alt='Logo' width={130} height={25} />
          </Link>
          <ul className='flex flex-grow basis-0 items-center justify-end gap-3'>
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
