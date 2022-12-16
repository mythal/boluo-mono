import type { Channel } from 'boluo-api';
import { unwrap } from 'boluo-utils';
import useSWR from 'swr';
import { get } from '../api/browser';

export const useChannel = (channelId: string): Channel => {
  const query = useSWR(
    ['/channels/query' as const, channelId],
    ([path, id]) => get(path, { id }).then(unwrap),
    {
      suspense: true,
    },
  );
  // In Suspense mode, `data` is always the fetch response
  // https://swr.vercel.app/docs/suspense
  return query.data!;
};
