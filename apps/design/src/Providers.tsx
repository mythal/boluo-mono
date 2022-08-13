import { FC, ReactNode } from 'react';
import { FormattedMessage, FormattedNumber, IntlProvider } from 'react-intl';
import { BrowserRouter } from 'react-router-dom';

interface Props {
  children: ReactNode;
}

export const Providers: FC<Props> = ({ children }) => {
  return (
    <IntlProvider locale="en" defaultLocale="en">
      <BrowserRouter>{children}</BrowserRouter>
    </IntlProvider>
  );
};
