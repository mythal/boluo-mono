import 'server-only';
import type { IntlShape } from '@formatjs/intl';
import { createIntl } from '@formatjs/intl';
import type { GetMe } from 'boluo-api';
import { cookies, headers } from 'next/headers';
import { cache } from 'react';
import type { Scheme } from 'ui';
import { toScheme } from 'ui/scheme';
import { get } from '../api/server';
import type { Locale } from '../locale';
import { defaultLocale } from '../locale';
import { localeList } from '../locale';
import { loadMessages } from '../locale';
import { toLocale } from '../locale';
import { getSettings } from '../settings';

export const getMe = cache(async (): Promise<GetMe | null> => {
  return (await get('/users/get_me', null)).unwrapOr(null);
});

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

export const getLocale = cache(async (): Promise<Locale> => {
  const me = await getMe();
  if (me) {
    const settings = getSettings(me.settings);
    if (settings.locale) {
      return settings.locale;
    }
  }
  return getLocaleFromHeaders();
});

export const getSchemeFromHeaders = cache((): Scheme => {
  const cookieScheme = cookies().get('SCHEME')?.value;
  if (!cookieScheme) {
    return 'system';
  }
  return toScheme(cookieScheme);
});

export const getScheme = cache(async (): Promise<Scheme> => {
  const me = await getMe();
  if (me) {
    const settings = getSettings(me.settings);
    if (settings.scheme) {
      return settings.scheme;
    }
  }
  return getSchemeFromHeaders();
});

export const getMessages = cache(async (locale: Locale) => await loadMessages(locale));

export const getIntl = cache(async (): Promise<IntlShape<string>> => {
  const locale = await getLocale();
  const messages = await getMessages(locale);
  return createIntl({
    locale,
    messages,
  });
});

export const title = (intl: IntlShape<string>, prefix: string): string => {
  return prefix + ' - ' + intl.formatMessage({ defaultMessage: 'Boluo' });
};
