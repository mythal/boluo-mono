import type { FC } from 'react';
import { Suspense, useMemo } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { SWRConfig } from 'swr';
import { ErrorBoundary, Loading } from 'ui';
import type { ChildrenProps } from '../../helper/props';

import type { SwrFallbackProps } from '../../helper/SwrProps';
import { store } from '../../state/store';
import { NextLocaleProvider } from './NextLocaleProvider';

interface Props extends ChildrenProps, SwrFallbackProps {}

export const Providers: FC<Props> = ({ children, swrFallback = {} }) => {
  const swrConfig = useMemo(
    () => ({
      fallback: swrFallback,
    }),
    [swrFallback],
  );
  return (
    <ReduxProvider store={store}>
      <SWRConfig value={swrConfig}>
        <ErrorBoundary>
          <NextLocaleProvider>
            <Suspense fallback={<Loading />}>{children}</Suspense>
          </NextLocaleProvider>
        </ErrorBoundary>
      </SWRConfig>
    </ReduxProvider>
  );
};
