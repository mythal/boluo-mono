import type { FC } from 'react';
import { useIntl } from 'react-intl';
import { ErrorBoundary } from 'ui';
import { CreateSpaceForm } from '../../components/CreateSpaceForm';
import { Title } from '../../components/global/Title';

const CreatePlane: FC = () => {
  const intl = useIntl();
  const title = intl.formatMessage({ defaultMessage: 'Create a Plane' });
  return (
    <>
      <Title>{title}</Title>
      <main className="p-4">
        <h1 className="text-xl mb-2">{title}</h1>
        <ErrorBoundary>
          <CreateSpaceForm />
        </ErrorBoundary>
      </main>
    </>
  );
};

export default CreatePlane;
