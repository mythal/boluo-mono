import { Fragment } from 'react';
import { IS_DEVELOPMENT } from '../../const';

export const Favicon = () => {
  const favicon = IS_DEVELOPMENT ? '/logo-dev.png' : '/logo.png';
  return (
    <Fragment>
      <link rel="shortcut icon" href={favicon} />
      <link rel="manifest" href="/site.webmanifest" type="application/manifest+json" />
      <meta name="theme-color" content="#ffffff" />
    </Fragment>
  );
};
