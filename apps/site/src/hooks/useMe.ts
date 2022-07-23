import useSWR from 'swr';
import { get } from '../api';
import type { GetMe } from '../api/types/users';

export const useMe = (): GetMe | null | 'LOADING' => {
  const { data, isLoading } = useSWR('/users/get_me', (path) => get(path), { fallbackData: null, suspense: true });
  if (isLoading) {
    return 'LOADING';
  }
  return data ?? null;
};
