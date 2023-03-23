import { ReactElement } from 'react';
import FourCircles from '@/components/common/icons/FourCircles';
import Submit from '@/components/common/icons/Submit';
import Changelog from '@/components/common/icons/Changelog';

type NavigationItem = {
  name: string;
  href: string;
  icon?: ReactElement;
  className?: string;
};

const navigationItems: NavigationItem[] = [
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
    href: '/changelog',
    icon: <Changelog />,
  },
];

export default navigationItems;
