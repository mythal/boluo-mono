import ja from 'lang/compiled/ja_JP.json';
import zhCn from 'lang/compiled/zh_CN.json';
import { headers } from 'next/headers';
import type { ReactNode } from 'react';
import type { IntlMessages, Locale } from '../../locale';
import { ClientProviders } from './Providers';

function getLocale(): Locale {
  const defaultLocale: Locale = 'en';
  const accepted = (headers().get('Accept-Language') || '*').trim();
  if (!accepted || accepted === '*') {
    return defaultLocale;
  }
  if (accepted.includes('zh')) {
    return 'zh-CN';
  } else if (accepted.includes('ja')) {
    return 'ja';
  }
  return defaultLocale;
}

const loadMessages = (locale: Locale): IntlMessages | undefined => {
  switch (locale) {
    case 'en':
      return undefined;
    case 'ja':
      return ja;
    case 'zh-CN':
      return zhCn;
  }
};

export default function ServerProviders({ children }: { children: ReactNode }) {
  const locale = getLocale();
  const messages = loadMessages(locale);
  return <ClientProviders locale={locale} messages={messages}>{children}</ClientProviders>;
}
