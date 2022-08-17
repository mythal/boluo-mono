import type { FC } from 'react';
import { Suspense } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { SWRConfig } from 'swr';
import { ErrorBoundary, Loading } from 'ui';
import type { ChildrenProps } from '../../helper/props';

import { store } from '../../state/store';
import { NextLocaleProvider } from './NextLocaleProvider';

interface Props extends ChildrenProps {}

export const Providers: FC<Props> = ({ children }) => {
  return (
    <ReduxProvider store={store}>
      <SWRConfig value={{}}>
        <ErrorBoundary>
          <NextLocaleProvider>
            <Suspense fallback={<Loading />}>{children}</Suspense>
          </NextLocaleProvider>
        </ErrorBoundary>
      </SWRConfig>
    </ReduxProvider>
  );
};
