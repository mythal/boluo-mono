import clsx from 'clsx';
import React from 'react';
import type { DataAttr } from './types';

export type ButtonProps =
  & React.ComponentPropsWithoutRef<'button'>
  & DataAttr<{
    small?: boolean;
    type?: 'primary' | 'default';
  }>;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ children, className, ...props }, ref) => {
  const isSmall = props['data-small'] ?? false;
  const type = props['data-type'] ?? 'default';
  return (
    <button
      className={clsx(
        'disabled:cursor-not-allowed enabled:cursor-pointer disabled:brightness-125 disabled:contrast-50 disabled:text-surface-600',
        'select-none appearance-none border-none',
        'inline-flex items-center justify-centr focus:ring ring-surface-200',
        'm-0 gap-1 rounded-sm px-4 py-2 text-baese',
        isSmall && 'min-h-[2rem] py-0.5 px-3 text-sm',
        type === 'default' && [
          'bg-surface-300 text-highest',
          'hover-enabled:bg-surface-200 active-enabled:bg-surface-400',
        ],
        type === 'primary' && [
          'bg-pin-brand-600 text-white',
          'hover-enabled:bg-pin-brand-500 active-enabled:bg-pin-brand-700',
        ],
        className,
      )}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});
Button.displayName = 'Button';
