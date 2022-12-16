import type { GetMe } from 'boluo-api';
import { unwrap } from 'boluo-utils';
import type { FC, ReactNode } from 'react';
import React, { useContext, useState } from 'react';
import useSWR from 'swr';
import { get } from '../api/browser';

const MeContext = React.createContext<GetMe | null>(null);

export const useMe = (): GetMe | null => useContext(MeContext);

export const MeProvider: FC<{ initialMe: GetMe | null; children: ReactNode }> = ({ initialMe, children }) => {
  const { data } = useSWR('/users/get_me', (path) => get(path, null).then(unwrap), {
    fallbackData: initialMe,
    suspense: true,
  });
  return <MeContext.Provider value={data ?? null}>{children}</MeContext.Provider>;
};
