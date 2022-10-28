'use client';

import type { FC } from 'react';
import { useIntl } from 'react-intl';
import { CreateSpaceForm } from '../../../components/CreateSpaceForm';
import { Title } from '../../../components/global/Title';

export const CreateSpacePage: FC = () => {
  const intl = useIntl();
  const title = intl.formatMessage({ defaultMessage: 'Create a Plane' });
  return (
    <>
      <Title>{title}</Title>
      <main className="p-4">
        <h1 className="text-xl mb-2">{title}</h1>
        <CreateSpaceForm />
      </main>
    </>
  );
};
