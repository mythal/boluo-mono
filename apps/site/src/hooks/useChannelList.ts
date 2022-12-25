import type { Channel } from 'boluo-api';
import { unwrap } from 'boluo-utils';
import useSWR, { useSWRConfig } from 'swr';
import { get } from '../api/browser';

export const useChannelList = (spaceId: string): Channel[] => {
  const { mutate } = useSWRConfig();
  const query = useSWR(
    ['/channels/by_space' as const, spaceId],
    ([path, id]) => get(path, { id }).then(unwrap),
    {
      suspense: true,
      onSuccess: (channels) =>
        void Promise.all(channels.map((channel) => mutate(['/channels/query', channel.id], channel))),
    },
  );
  // In Suspense mode, `data` is always the fetch response
  // https://swr.vercel.app/docs/suspense
  return query.data!;
};
