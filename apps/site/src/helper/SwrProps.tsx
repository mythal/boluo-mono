import type { IntlMessages, Locale } from './locale';
import { loadMessages, toLocale } from './locale';

export type IntlMessagesFallback = Record<Locale, IntlMessages | undefined>;

export type SwrFallback = Partial<IntlMessagesFallback>;

export interface SwrFallbackProps {
  swrFallback?: SwrFallback | undefined;
}

export const loadSwrProps = async (localeString: string | undefined | null): Promise<SwrFallbackProps> => {
  const locale = toLocale(localeString);
  return {
    swrFallback: {
      [locale]: await loadMessages(locale),
    },
  };
};
