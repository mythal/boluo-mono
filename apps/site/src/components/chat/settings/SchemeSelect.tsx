'use client';
import type { FC } from 'react';
import { useMemo } from 'react';
import { useIntl } from 'react-intl';
import type { MutationFetcher } from 'swr/mutation';
import useSWRMutation from 'swr/mutation';
import type { Scheme } from 'ui';
import { Select, setScheme, useScheme } from 'ui';
import { patch } from '../../../api/browser';
import { identity } from '../../../helper/function';
import { useMe } from '../../../hooks/useMe';
import type { Settings } from '../../../settings';

interface Props {
  id?: string;
}

const updateScheme: MutationFetcher<Settings, Scheme, string> = async (url: string, { arg: scheme }) => {
  const settings: Settings = { scheme };
  const settingsResult = await patch('/users/update_settings', settings);
  return settingsResult.unwrapOr({});
};

export const SchemeSelect: FC<Props> = ({ id }) => {
  const me = useMe();
  const scheme = useScheme();
  const intl = useIntl();
  const { trigger } = useSWRMutation('/users/settings', updateScheme, {
    populateCache: identity,
    revalidate: false,
  });

  const handleChange = (value: string) => {
    const scheme = setScheme(value);
    if (me) {
      void trigger(scheme);
    } else {
      document.cookie = `SCHEME=${scheme}; path=/`;
    }
  };

  const items = useMemo(() => [
    { value: 'system', label: intl.formatMessage({ defaultMessage: 'Follow System' }) },
    { value: 'light', label: intl.formatMessage({ defaultMessage: 'Light' }) },
    { value: 'dark', label: intl.formatMessage({ defaultMessage: 'Dark' }) },
  ], [intl]);
  return <Select items={items} value={scheme} onChange={handleChange} id={id} />;
};
