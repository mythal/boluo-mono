import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { put } from '../api/browser';
import type { Locale } from '../locale';
import { toLocale } from '../locale';
import { getSettings } from '../settings';
import { useMe } from './useMe';

export const useLocale = (): [Locale, (locale: Locale) => void] => {
  const intl = useIntl();
  const me = useMe();
  const locale = toLocale(intl.locale);
  const router = useRouter();
  const changeLocale = useCallback(
    (locale: Locale) => {
      if (me) {
        const settings = getSettings(me.settings);
        void put('/users/update_settings', { ...settings, locale });
      } else {
        document.cookie = `LANG=${locale}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
      }
      router.refresh();
    },
    [router, me],
  );
  return [locale, changeLocale];
};
