import type { GetMe } from 'boluo-api';
import { get } from 'boluo-api';
import { unwrap } from 'boluo-utils';
import useSWR from 'swr';

export const useMe = (): GetMe | null | 'LOADING' => {
  const { data, isLoading } = useSWR('/users/get_me', (path) => get(path).then(unwrap), {
    fallbackData: null,
    suspense: true,
  });
  if (isLoading) {
    return 'LOADING';
  }
  return data ?? null;
};
