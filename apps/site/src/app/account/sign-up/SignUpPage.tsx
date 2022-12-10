'use client';

import { useIntl } from 'react-intl';
import { Title } from '../../../components/global/Title';
import { SignUpForm } from '../../../components/SignUpForm';

export const SignUpPage = () => {
  const intl = useIntl();
  const pageName = intl.formatMessage({ defaultMessage: 'Sign Up' });
  return (
    <>
      <Title>{pageName}</Title>
      <div className="flex h-screen items-start justify-center pt-[20vh]">
        <div className="min-w-[20rem] max-w-[90vw] rounded border bg-lowest p-6 shadow-1 shadow-gray-300/75">
          <SignUpForm />
        </div>
      </div>
    </>
  );
};