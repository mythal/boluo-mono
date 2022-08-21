import type { FC } from 'react';
import { Suspense } from 'react';
import { SWRConfig } from 'swr';
import { ErrorBoundary, Loading } from 'ui';
import type { ChildrenProps } from '../../helper/props';

import { NextLocaleProvider } from './NextLocaleProvider';

interface Props extends ChildrenProps {}

export const Providers: FC<Props> = ({ children }) => {
  return (
    <SWRConfig value={{}}>
      <NextLocaleProvider>
        <ErrorBoundary>
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </ErrorBoundary>
      </NextLocaleProvider>
    </SWRConfig>
  );
};
