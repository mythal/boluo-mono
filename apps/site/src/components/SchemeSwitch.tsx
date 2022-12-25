'use client';
import type { FC } from 'react';
import { useMemo } from 'react';
import { useIntl } from 'react-intl';
import { Select, useScheme } from 'ui';

interface Props {
  id?: string;
}

export const SchemeSwitch: FC<Props> = ({ id }) => {
  const scheme = useScheme();
  const intl = useIntl();

  const handleChange = (value: string) => {
    const html = window.document.documentElement;
    if (value === 'light') {
      html.classList.add('light');
      html.classList.remove('dark');
    } else if (value === 'dark') {
      html.classList.remove('light');
      html.classList.add('dark');
    } else {
      html.classList.remove('light');
      html.classList.remove('dark');
    }
  };

  const items = useMemo(() => [
    { value: 'system', label: intl.formatMessage({ defaultMessage: 'Follow System' }) },
    { value: 'light', label: intl.formatMessage({ defaultMessage: 'Light' }) },
    { value: 'dark', label: intl.formatMessage({ defaultMessage: 'Dark' }) },
  ], [intl]);
  return <Select items={items} value={scheme} onChange={handleChange} id={id} />;
};
