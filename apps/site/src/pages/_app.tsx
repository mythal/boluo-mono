import logo from 'boluo-logo/png/logo.png';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Providers } from '../components/global/Providers';
import 'ui/src/tailwind.css';

function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register(new URL('workers/dist/serviceWorker.js', import.meta.url))
      .then(function(reg) {
        // registration worked
        console.log('Registration succeeded. Scope is ' + reg.scope);
      })
      .catch(function(error) {
        // registration failed
        console.log('Registration failed with ' + String(error));
      });
  }
}

if (typeof window !== 'undefined') {
  registerServiceWorker();
}

function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <Head>
        <link rel="shortcut icon" href={logo.src} key="icon" />
        <link rel="manifest" href="/site.webmanifest" type="application/manifest+json" key="manifest" />
        <meta name="theme-color" content="#ffffff" key="theme-color" />
      </Head>
      <Component {...pageProps} />
    </Providers>
  );
}
export default App;
