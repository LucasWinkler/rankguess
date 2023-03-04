import { FC, PropsWithChildren } from 'react';

interface ConditionalWrapperProps {
  condition: boolean;
  wrapper: Function;
}

const ConditionalWrapper: FC<PropsWithChildren<ConditionalWrapperProps>> = ({
  condition,
  wrapper,
  children,
}) => (condition ? wrapper(children) : children);

export default ConditionalWrapper;
