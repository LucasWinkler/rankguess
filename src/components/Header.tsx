import Image from 'next/image';
import Link from 'next/link';
import type { FC } from 'react';
import Container from './Container';

interface HeaderProps {}

const Header: FC<HeaderProps> = ({}) => {
  return (
    <header className='py-10'>
      <Container>
        <nav className='flex justify-between items-center'>
          <ul className='flex-grow basis-0 flex items-center gap-3'>
            <li>
              <Link href='/'>Choose Game</Link>
            </li>
            <li>
              <Link href='/faq'>FAQ</Link>
            </li>
            <li>
              <Link href='/changelog'>Changelog</Link>
            </li>
          </ul>
          <Link className='' href='/'>
            <Image src='/rankguess.svg' alt='Logo' width={130} height={25} />
          </Link>
          <ul className='flex-grow basis-0 flex justify-end items-center gap-3'>
            <li>
              <Link href='/login'>Login</Link>
            </li>
            <li>
              <Link href='/submit'>Submit Clips</Link>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
};
export default Header;
