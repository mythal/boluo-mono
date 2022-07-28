import { FC, ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';

interface Props {
  children: ReactNode;
}

export const Providers: FC<Props> = ({ children }) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};
