import { logout } from 'boluo-api';
import { useCallback } from 'react';
import { useSWRConfig } from 'swr';

export function useLogout(): () => void {
  const { mutate } = useSWRConfig();
  return useCallback(async () => {
    await logout();
    await mutate('/users/get_me', null);
  }, [mutate]);
}
