// Typescript with Layout
// https://nextjs.org/docs/basic-features/layouts#with-typescript
import type { NextPage } from 'next';
import type { ReactElement, ReactNode } from 'react';
import type { AppProps } from 'next/app';
import type { SwrFallbackProps } from './SwrProps';

export type Page = NextPage<SwrFallbackProps> & {
  getLayout?: (page: ReactElement, title?: string) => ReactNode;
  title?: string;
};
export type AppPropsWithLayout = AppProps & {
  Component: Page;
};
