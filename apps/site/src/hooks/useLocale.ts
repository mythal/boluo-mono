import { useRouter } from 'next/router';
import { useCallback } from 'react';
import type { Locale } from '../helper/locale';
import { toLocale } from '../helper/locale';

export const useLocale = (): [Locale, (locale: Locale) => void] => {
  const router = useRouter();
  const changeLocale = useCallback(
    async (locale: Locale) => {
      const url = router.pathname;
      const as = undefined;
      await router.push(url, as, { locale });
    },
    [router]
  );
  return [toLocale(router.locale), changeLocale];
};
