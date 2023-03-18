import type { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';

type ContainerProps = {
  className?: string;
};

const Container: FC<PropsWithChildren<ContainerProps>> = ({
  children,
  className,
}) => {
  return (
    <div className={clsx('mx-auto max-w-7xl px-4 sm:px-6 lg:px-8', className)}>
      {children}
    </div>
  );
};
export default Container;
