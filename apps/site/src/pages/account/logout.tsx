import Link from 'next/link';
import { useEffect } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Title } from '../../components/global/Title';
import { useLogout } from '../../hooks/useLogout';

const Logout = () => {
  const logout = useLogout();

  const intl = useIntl();
  const pageName = intl.formatMessage({ defaultMessage: 'Login' });
  useEffect(() => logout);
  return (
    <>
      <Title>{pageName}</Title>
      <div className="flex h-screen items-start justify-center pt-[20vh]">
        <div className="min-w-[20rem] max-w-[90vw] rounded border bg-neutral-50 p-6 shadow-1 shadow-gray-300/75">
          <div className="w-full text-2xl">
            <FormattedMessage defaultMessage="You are logged out" />
          </div>
          <div className="mt-4 w-full">
            <Link href="/" className="link">
              <FormattedMessage defaultMessage="Back to home" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Logout;
