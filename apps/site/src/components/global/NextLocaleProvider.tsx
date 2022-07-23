import React, { useEffect, useState } from 'react';
import { IntlProvider } from 'react-intl';
import type { OnErrorFn } from '@formatjs/intl';
import { IntlErrorCode } from '@formatjs/intl';
import { useRouter } from 'next/router';
import type { ChildrenProps } from '../../helper/props';
import type { IntlMessages, Locale } from '../../helper/locale';
import { loadMessages } from '../../helper/locale';
import { useNotify } from '../../state/user-interface';

const onError: OnErrorFn = (err) => {
  if (err.code === IntlErrorCode.MISSING_TRANSLATION) {
    console.debug(err.message);
    return;
  }
  console.error(err);
};

const useLoadMessages = (locale: Locale): IntlMessages => {
  const [messages, setMessages] = useState<IntlMessages>(undefined);
  const notify = useNotify();
  useEffect(() => {
    loadMessages(locale)
      .then(setMessages)
      .catch((e) => {
        console.error(e);
        notify('An error occurred while loading the language data.', 'error');
      });
  }, [locale, notify]);
  return messages;
};

export const toLocale = (data: unknown): Locale => {
  if (typeof data !== 'string') {
    return 'en';
  } else if (data.startsWith('zh')) {
    return 'zh-CN';
  } else if (data.startsWith('ja')) {
    return 'ja';
  } else {
    return 'en';
  }
};

export const NextLocaleProvider: React.FC<ChildrenProps> = ({ children }) => {
  const router = useRouter();
  const locale = toLocale(router.locale);
  const messages = useLoadMessages(locale);
  return (
    <IntlProvider locale={locale} messages={messages} defaultLocale="en" onError={onError}>
      {children}
    </IntlProvider>
  );
};
