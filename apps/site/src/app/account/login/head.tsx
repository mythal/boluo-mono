import { getIntl, title } from '../../../helper/server';

export default async function Head() {
  const intl = await getIntl();
  return (
    <>
      <title>{title(intl, intl.formatMessage({ defaultMessage: 'Login' }))}</title>
    </>
  );
}
