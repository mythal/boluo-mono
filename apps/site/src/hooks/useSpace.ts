import type { Space } from 'boluo-api';
import { unwrap } from 'boluo-utils';
import useSWR from 'swr';
import { get } from '../api/browser';

export const useSpace = (spaceId: string): Space => {
  const query = useSWR(
    ['/spaces/query' as const, spaceId],
    ([path, id]) => get(path, { id }).then(unwrap),
    {
      suspense: true,
    },
  );
  // In Suspense mode, `data` is always the fetch response
  // https://swr.vercel.app/docs/suspense
  return query.data!;
};
