import type { RenderOptions } from '@testing-library/react';
import { render as jestRender } from '@testing-library/react';
import type { FC, ReactElement } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { store } from '../src/state/store';

// See https://testing-library.com/docs/react-testing-library/setup#custom-render
const AllTheProviders: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ReduxProvider store={store}>
      <IntlProvider locale="en">{children}</IntlProvider>
    </ReduxProvider>
  );
};
export const render = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  jestRender(ui, { wrapper: AllTheProviders, ...options });
