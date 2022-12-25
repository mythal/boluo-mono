import type { ReactNode } from 'react';
import 'ui/tailwind.css';
import { ClientProviders } from '../components/global/Providers';
import { getLocale, getMe, getMessages, getScheme } from '../helper/server';

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const me = await getMe();
  const locale = await getLocale();
  const messages = await getMessages(locale);
  const scheme = await getScheme();

  return (
    <html lang={locale} className={scheme}>
      <body className="bg-bg text-text">
        <ClientProviders locale={locale} messages={messages} me={me}>
          {children}
          <div id="portal" />
        </ClientProviders>
      </body>
    </html>
  );
}
