'use client';

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

export const Providers: FC<Props> = ({ children, locale, messages }) => {
  return (
    <SWRConfig value={{}}>
      <IntlProvider locale={locale} messages={messages} defaultLocale={defaultLocale}>
        {children}
      </IntlProvider>
    </SWRConfig>
  );
};
