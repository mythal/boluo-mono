import { useIntl } from 'react-intl';
import Head from 'next/head';

interface Props {
  name: string;
}

export const Title = ({ name }: Props) => {
  const intl = useIntl();
  const siteName = intl.formatMessage({ defaultMessage: 'Boluo' });
  const title = `${name} - ${siteName}`;
  // https://nextjs.org/docs/api-reference/next/head
  // To avoid duplicate tags in your head you can use the key property,
  // which will make sure the tag is only rendered once
  return (
    <Head>
      <title key="title">{title}</title>
    </Head>
  );
};
