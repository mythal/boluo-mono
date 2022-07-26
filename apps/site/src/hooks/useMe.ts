import useSWR from 'swr';
import { get } from 'boluo-api';
import type { GetMe } from 'boluo-api';

export const useMe = (): GetMe | null | 'LOADING' => {
  const { data, isLoading } = useSWR('/users/get_me', (path) => get(path), { fallbackData: null, suspense: true });
  if (isLoading) {
    return 'LOADING';
  }
  return data ?? null;
};
