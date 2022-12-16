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
      <head>
        <meta name="description" content="RPG tool, next generation" />
        <meta name="color-scheme" content="dark light" />
        <meta name="theme-color" content="#ffffff" key="theme-color" />
        <link rel="manifest" href="/site.webmanifest" type="application/manifest+json" key="manifest" />
        <link rel="shortcut icon" href={logo.src} key="icon" />
      </head>
      <body className="h-full w-full bg-bg text-text">
        <ClientProviders locale={locale} messages={messages} me={me.unwrapOr(null)}>
          {children}
          <div id="portal" />
        </ClientProviders>
      </body>
    </html>
  );
}
