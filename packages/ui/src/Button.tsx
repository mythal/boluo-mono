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
        'disabled:cursor-not-allowed enabled:cursor-pointer',
        'select-none appearance-none border-none',
        'inline-flex items-center justify-center focus:ring disabled:brightness-75 disabled:contrast-75',
        'm-0 gap-1 rounded-sm px-4 py-2 text-base',
        isSmall && 'min-h-[2rem] py-0.5 px-3',
        type === 'default' && [
          'bg-button-default-bg text-button-default-text',
          'hover-enabled:bg-button-default-hover active-enabled:bg-button-default-active',
        ],
        type === 'primary' && [
          'bg-button-primary-bg text-button-primary-text',
          'hover-enabled:bg-button-primary-hover active-enabled:bg-button-primary-active',
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
