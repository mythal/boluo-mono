import clsx from 'clsx';
import type { FC } from 'react';

interface Props {
  on: boolean;
  className?: string;
}

export const Indicator: FC<Props> = ({ on, className }) => (
  <span
    className={clsx(
      'w-[6px] h-[6px] border-[2px] rounded-full border-surface-400 box-content',
      on
        ? 'bg-brand-400'
        : 'bg-surface-200',
      className,
    )}
    aria-hidden
  />
);
