'use client';

import { useIntl } from 'react-intl';
import { Title } from '../../../components/global/Title';
import { LoginForm } from '../../../components/LoginForm';

export const LoginPage = () => {
  const intl = useIntl();
  const pageName = intl.formatMessage({ defaultMessage: 'Login' });
  return (
    <>
      <Title>{pageName}</Title>
      <div className="flex h-screen items-start justify-center pt-[20vh]">
        <div className="min-w-[20rem] max-w-[90vw] rounded border bg-lowest p-6 shadow-1 shadow-gray-300/75">
          <LoginForm />
        </div>
      </div>
    </>
  );
};
