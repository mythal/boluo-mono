/* eslint-disable @next/next/no-page-custom-font */
import logo from 'boluo-logo/png/logo.png';
import type { ReactNode } from 'react';
import 'ui/src/tailwind.css';
import ServerProviders from '../components/providers/ServerProviders';

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html className=" h-full w-full">
      <head>
        <meta name="description" content="RPG tool, next generation" />
        <meta name="color-scheme" content="dark light" />
        <meta name="theme-color" content="#ffffff" key="theme-color" />
        <link rel="manifest" href="/site.webmanifest" type="application/manifest+json" key="manifest" />
        <link rel="shortcut icon" href={logo.src} key="icon" />
      </head>
      <body className="h-full w-full bg-bg text-text">
        <ServerProviders>
          {children}
          <div id="portal" />
        </ServerProviders>
      </body>
    </html>
  );
}
