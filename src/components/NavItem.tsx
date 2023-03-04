import Link from 'next/link';
import type { FC, PropsWithChildren, ReactElement, ReactNode } from 'react';

interface NavItemProps {
  icon?: ReactElement;
  href: string;
  onClick?: () => void;
  className?: string;
}

const NavItem: FC<PropsWithChildren<NavItemProps>> = ({
  icon,
  href,
  onClick,
  children,
  className,
}) => {
  return (
    <li className={className}>
      <Link
        className='inline-flex flex-nowrap items-center gap-2 whitespace-nowrap py-2 pr-2 transition-colors duration-200 hover:text-neutral-100 [&>svg]:h-5 [&>svg]:w-auto'
        href={href}
        onClick={onClick}>
        <>
          {icon}
          {children}
        </>
      </Link>
    </li>
  );
};
export default NavItem;
