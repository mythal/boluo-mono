import 'server-only';
import type { IntlShape } from '@formatjs/intl';
import { createIntl } from '@formatjs/intl';
import { cookies, headers } from 'next/headers';
import { cache } from 'react';
import type { Locale } from '../locale';
import { defaultLocale } from '../locale';
import { localeList } from '../locale';
import { loadMessages } from '../locale';
import { toLocale } from '../locale';

const getLocaleFromAcceptLanguage = (): Locale => {
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Language
  const acceptLanguage = headers().get('Accept-Language');
  if (acceptLanguage === null) {
    return defaultLocale;
  }
  const languages = acceptLanguage.split(',');
  for (const language of languages) {
    for (const locale of localeList) {
      if (language.trim().startsWith(locale)) {
        return locale;
      }
    }
  }
  return defaultLocale;
};

export const getLocaleFromHeaders = cache((): Locale => {
  const cookieLocale = cookies().get('LANG')?.value;
  if (!cookieLocale) {
    return getLocaleFromAcceptLanguage();
  }
  return toLocale(cookieLocale);
});

export const getMessages = cache(async (locale: Locale) => await loadMessages(locale));

export const getIntl = cache(async (): Promise<IntlShape<string>> => {
  const locale = getLocaleFromHeaders();
  const messages = await getMessages(locale);
  return createIntl({
    locale,
    messages,
  });
});

export const title = (intl: IntlShape<string>, prefix: string): string => {
  return prefix + ' - ' + intl.formatMessage({ defaultMessage: 'Boluo' });
};
