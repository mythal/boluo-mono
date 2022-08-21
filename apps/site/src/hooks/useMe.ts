import type { GetMe } from 'boluo-api';
import { get } from 'boluo-api';
import { unwrap } from 'boluo-utils';
import React, { useContext } from 'react';
import useSWR from 'swr';

export type GetMeState = GetMe | 'GUEST' | 'LOADING';

export function isLoggedIn(me: GetMeState): me is GetMe {
  return !(me === 'GUEST' || me === 'LOADING');
}

export const MeContext = React.createContext<GetMe | null>(null);

export const useMe = (): GetMe => {
  const context = useContext(MeContext);
  if (context === null) {
    throw new Error('Unexpected access `useMe` from outside of the provider');
  }
  return context;
};

export const useGetMe = (): GetMeState => {
  const { data, isLoading } = useSWR('/users/get_me', (path) => get(path).then(unwrap), {
    fallbackData: 'LOADING' as const,
    suspense: true,
  });
  if (isLoading) {
    return 'LOADING';
  } else if (!data) {
    return 'GUEST';
  } else {
    return data;
  }
};
