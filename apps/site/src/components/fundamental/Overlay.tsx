import type { FC } from 'react';
import React, { useRef } from 'react';
import clsx from 'clsx';
import { useOutside } from '../../hooks/useOutside';
import { useOnEsc } from '../../hooks/useOnEsc';
import { Portal } from './Portal';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  dismiss?: () => void;
};

export const Overlay: FC<Props> = ({ children, dismiss, className, ...props }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  useOutside(dismiss, containerRef);
  useOnEsc(dismiss);
  return (
    <Portal>
      <div ref={containerRef} className={clsx('absolute z-50', className)} {...props}>
        {children}
      </div>
    </Portal>
  );
};
