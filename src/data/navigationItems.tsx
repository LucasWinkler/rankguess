import { ReactElement } from 'react';
import FourCircles from '@/components/icons/FourCircles';
import Submit from '@/components/icons/Submit';
import Changelog from '@/components/icons/Changelog';

interface NavigationItemProps {
  name: string;
  href: string;
  icon?: ReactElement;
  className?: string;
}

const navigationItems: NavigationItemProps[] = [
  {
    name: 'Choose Game',
    href: '/',
    icon: <FourCircles />,
  },
  {
    name: 'Submit Clips',
    href: '/submit',
    icon: <Submit />,
    className: 'md:hidden',
  },
  {
    name: 'Changelog',
    href: '/',
    icon: <Changelog />,
  },
];

export default navigationItems;
