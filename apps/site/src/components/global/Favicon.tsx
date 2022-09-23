import logoDev from 'boluo-logo/png/logo-dev.png';
import logo from 'boluo-logo/png/logo.png';
import logoDevSvg from 'boluo-logo/svg/logo-dev.svg';
import logoSvg from 'boluo-logo/svg/logo.svg';
import Head from 'next/head';
import { IS_DEVELOPMENT } from '../../const';

// Useful posts:
// https://css-tricks.com/how-to-favicon-in-2021/

export const Favicon = () => {
  return (
    <Head>
      <link rel="shortcut icon" href={IS_DEVELOPMENT ? logoDev.src : logo.src} key="icon" />
      <link
        rel="shortcut icon"
        href={IS_DEVELOPMENT ? logoDevSvg.src : logoSvg.src}
        type="image/svg+xml"
        key="icon-svg"
      />
      <link rel="manifest" href="/site.webmanifest" type="application/manifest+json" key="manifest" />
      <meta name="theme-color" content="#ffffff" key="theme-color" />
    </Head>
  );
};
