import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useIntl } from 'react-intl';
import type { Locale } from '../locale';
import { toLocale } from '../locale';

export const useLocale = (): [Locale, (locale: Locale) => void] => {
  const intl = useIntl();
  const locale = toLocale(intl.locale);
  const router = useRouter();
  const changeLocale = useCallback(
    (locale: Locale) => {
      document.cookie = `LANG=${locale}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
      router.refresh();
    },
    [router],
  );
  return [locale, changeLocale];
};
