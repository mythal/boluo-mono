import type { FC } from 'react';
import type { ChildrenProps } from '../../helper/props';

interface Props extends ChildrenProps {
}

export const PaneBox: FC<Props> = ({ children }) => {
  return (
    <>
      <div className="border-b" />
      <div className="flex items-center justify-center text-surface-400">{children}</div>
    </>
  );
};
