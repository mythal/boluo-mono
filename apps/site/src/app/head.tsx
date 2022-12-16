import logoDev from 'boluo-logo/png/logo-dev.png';
import logo from 'boluo-logo/png/logo.png';
import logoDevSvg from 'boluo-logo/svg/logo-dev.svg';
import logoSvg from 'boluo-logo/svg/logo.svg';
import { IS_DEVELOPMENT } from '../const';
import { getIntl } from '../helper/server';

export default async function Head() {
  const intl = await getIntl();
  return (
    <>
      <link rel="shortcut icon" href={IS_DEVELOPMENT ? logoDev.src : logo.src} key="icon" />
      <link
        rel="shortcut icon"
        href={IS_DEVELOPMENT ? logoDevSvg.src : logoSvg.src}
        type="image/svg+xml"
        key="icon-svg"
      />
      <link rel="manifest" href="/site.webmanifest" type="application/manifest+json" key="manifest" />
      <meta name="theme-color" content="#ffffff" key="theme-color" />
      <title>{intl.formatMessage({ defaultMessage: 'Boluo ' })}</title>
    </>
  );
}
