import type { FC } from 'react';
import { useMemo, Suspense } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { SWRConfig } from 'swr';
import type { ChildrenProps } from '../../helper/props';

import { store } from '../../state/store';
import { ErrorBoundary } from '../ErrorBoundary';
import type { SwrFallbackProps } from '../../helper/SwrProps';
import { Loading } from '../Loading';
import { NextLocaleProvider } from './NextLocaleProvider';
import { SchemeProvider } from './SchemeProvider';
import { NotificationList } from './NotificationList';

interface Props extends ChildrenProps, SwrFallbackProps {}

export const Providers: FC<Props> = ({ children, swrFallback = {} }) => {
  const swrConfig = useMemo(
    () => ({
      fallback: swrFallback,
    }),
    [swrFallback]
  );
  return (
    <ReduxProvider store={store}>
      <SWRConfig value={swrConfig}>
        <SchemeProvider>
          <ErrorBoundary>
            <NextLocaleProvider>
              <Suspense fallback={<Loading />}>{children}</Suspense>
              <NotificationList />
            </NextLocaleProvider>
          </ErrorBoundary>
        </SchemeProvider>
      </SWRConfig>
    </ReduxProvider>
  );
};
