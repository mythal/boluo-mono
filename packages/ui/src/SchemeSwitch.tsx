import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { Moon, Sun } from 'boluo-icons';
import clsx from 'clsx';
import { FC, useEffect, useState } from 'react';
import { useScheme } from './hooks/useScheme';
import { StyleProps } from './types';

interface Props extends StyleProps {}

export const SchemeSwitch: FC<Props> = ({ className }) => {
  const scheme = useScheme();

  const btnClasses = clsx(
    'bg-gray-300 first-of-type:rounded-l last-of-type:rounded-r p-2 hover:bg-gray-200',
    'state-on:bg-gray-500 state-on:text-gray-50 state-on:hover:bg-gray-400',
    'transition-colors duration-200',
  );
  const handleChange = (value: string | undefined) => {
    const html = window.document.documentElement;
    if (!value) {
      return;
    }
    html.classList.remove('dark', 'light', 'system');
    if (value === 'dark') {
      html.classList.add('dark');
    } else if (value === 'light') {
      html.classList.add('light');
    } else {
      html.classList.add('system');
    }
    html.classList.add('switching');
    window.setTimeout(() => html.classList.remove('switching'), 3000);
  };

  return (
    <ToggleGroup.Root className={clsx(className, 'flex')} type="single" value={scheme} onValueChange={handleChange}>
      <ToggleGroup.Item value="light" className={btnClasses}>
        <Sun />
      </ToggleGroup.Item>
      <ToggleGroup.Item value="system" className={btnClasses}>
        system
      </ToggleGroup.Item>
      <ToggleGroup.Item value="dark" className={btnClasses}>
        <Moon />
      </ToggleGroup.Item>
    </ToggleGroup.Root>
  );
};
