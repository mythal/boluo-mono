import type { GetMe } from 'boluo-api';
import { getMe } from 'boluo-api';
import useSWR from 'swr';

export const useMe = (): GetMe | null | 'LOADING' => {
  const { data, isLoading } = useSWR(getMe, getMe, {
    fallbackData: null,
    suspense: true,
  });
  if (isLoading) {
    return 'LOADING';
  }
  return data ?? null;
};
