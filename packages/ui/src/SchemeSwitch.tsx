import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { Moon, Sun } from 'boluo-icons';
import clsx from 'clsx';
import { FC, useEffect, useMemo, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useScheme } from './hooks/useScheme';
import { StyleProps } from './types';

interface Props extends StyleProps {}

export const SchemeSwitch: FC<Props> = ({ className }) => {
  const scheme = useScheme();
  const intl = useIntl();

  const label = useMemo(
    () => ({
      light: intl.formatMessage({ defaultMessage: 'Switch to light mode' }),
      dark: intl.formatMessage({ defaultMessage: 'Switch to dark mode' }),
      system: intl.formatMessage({ defaultMessage: 'According to the system setting' }),
    }),
    [intl],
  );

  const btnClasses = clsx(
    'bg-surface-300 text-surface-600 first-of-type:rounded-l last-of-type:rounded-r p-2 hover:bg-surface-200 h-10',
    'state-on:bg-surface-400 state-on:text-pin-surface-50 state-on:hover:bg-surface-400 state-on:border-b-0 state-off:border-b-1 border-surface-200',
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
    <ToggleGroup.Root
      className={clsx(className, 'flex rounded-md border border-transprent dark:border-surface-400')}
      type="single"
      value={scheme}
      onValueChange={handleChange}
    >
      <ToggleGroup.Item value="light" aria-label={label.light} className={btnClasses}>
        <Sun aria-hidden />
      </ToggleGroup.Item>
      <ToggleGroup.Item value="system" aria-label={label.system} className={clsx(btnClasses, 'flex-grow')}>
        <FormattedMessage defaultMessage="system" description="Follow the system scheme" />
      </ToggleGroup.Item>
      <ToggleGroup.Item value="dark" aria-label={label.dark} className={btnClasses}>
        <Moon aria-hidden />
      </ToggleGroup.Item>
    </ToggleGroup.Root>
  );
};
