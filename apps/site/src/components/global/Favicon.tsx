import { Fragment } from 'react';
import logoDev from 'boluo-logo/png/logo-dev.png';
import logo from 'boluo-logo/png/logo.png';
import { IS_DEVELOPMENT } from '../../const';

export const Favicon = () => {
  const favicon = IS_DEVELOPMENT ? logoDev.src : logo.src;
  return (
    <Fragment>
      <link rel="shortcut icon" href={favicon} />
      <link rel="manifest" href="/site.webmanifest" type="application/manifest+json" />
      <meta name="theme-color" content="#ffffff" />
    </Fragment>
  );
};
