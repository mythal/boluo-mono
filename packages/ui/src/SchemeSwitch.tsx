import clsx from 'clsx';
import { FC, useEffect, useState } from 'react';
import { StyleProps } from './types';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { Sun, Moon } from 'boluo-icons';
import { useScheme } from './hooks/useScheme';

interface Props extends StyleProps {}

export const SchemeSwitch: FC<Props> = ({ className }) => {
  const scheme = useScheme();

  const buttonClass = clsx(
    'bg-gray-100 first-of-type:rounded-l last-of-type:rounded-r p-2 hover:bg-gray-50 [&[data-state="on"]]:bg-gray-200'
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
      <ToggleGroup.Item value="light" className={buttonClass}>
        <Sun />
      </ToggleGroup.Item>
      <ToggleGroup.Item value="system" className={buttonClass}>
        system
      </ToggleGroup.Item>
      <ToggleGroup.Item value="dark" className={buttonClass}>
        <Moon />
      </ToggleGroup.Item>
    </ToggleGroup.Root>
  );
};
