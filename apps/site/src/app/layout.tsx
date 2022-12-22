import logo from 'boluo-logo/png/logo.png';
import type { ReactNode } from 'react';
import 'ui/tailwind.css';
import { get } from '../api/server';
import { ClientProviders } from '../components/global/Providers';
import { getLocaleFromHeaders, getMessages } from '../helper/server';

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const me = await get('/users/get_me', null);
  const locale = getLocaleFromHeaders();
  const messages = await getMessages(locale);

  return (
    <html className="h-full w-full" lang={locale}>
      <body className="h-full w-full bg-bg text-text">
        <ClientProviders locale={locale} messages={messages} me={me.unwrapOr(null)}>
          {children}
          <div id="portal" />
        </ClientProviders>
      </body>
    </html>
  );
}
