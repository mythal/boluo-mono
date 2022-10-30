'use client';

import type { OnErrorFn } from '@formatjs/intl';
import type { FC } from 'react';
import { IntlProvider } from 'react-intl';
import { SWRConfig } from 'swr';
import type { ChildrenProps } from '../../helper/props';
import type { IntlMessages, Locale } from '../../locale';
import { defaultLocale } from '../../locale';

interface Props extends ChildrenProps {
  locale: Locale;
  messages: IntlMessages;
}

const onIntlError: OnErrorFn = (e) => {
  if (e.code === 'MISSING_TRANSLATION') {
    if (typeof window === 'undefined' /* SSR */) {
      // do noting
    } else {
      console.debug('Missing Translation: ', e.message);
    }
  } else {
    throw e;
  }
};

export const ClientProviders: FC<Props> = ({ children, locale, messages }) => {
  return (
    <SWRConfig value={{}}>
      <IntlProvider locale={locale} messages={messages} defaultLocale={defaultLocale} onError={onIntlError}>
        {children}
      </IntlProvider>
    </SWRConfig>
  );
};
