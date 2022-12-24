import type { Space } from 'boluo-api';
import Link from 'next/link';
import type { FC } from 'react';
import { useMemo } from 'react';
import { useChannelList } from '../../../hooks/useChannelList';
import type { ChatPane } from '../../../types/ChatPane';
import { ChatSidebarItem } from './ChatSidebarItem';

interface Props {
  space: Space;
  panes: ChatPane[];
}

export const ChatSiderbar: FC<Props> = ({ space, panes }) => {
  const channels = useChannelList(space.id);
  const channelIdFromPanes = useMemo(
    () => panes.flatMap((pane) => pane.type === 'channel' ? [pane.channelId] : []),
    [panes],
  );
  const channelList = useMemo(
    () =>
      channels.map((channel) => (
        <ChatSidebarItem
          key={channel.id}
          channel={channel}
          active={channelIdFromPanes.includes(channel.id)}
        />
      )),
    [channelIdFromPanes, channels],
  );
  return (
    <>
      <span className="border-r border-b-1/2 border-b-gray-600 flex py-2 px-4 items-center overflow-ellipsis overflow-hidden">
        {space.name}
      </span>
      <div className="border-r row-span-2 row-end-4">
        {channelList}
      </div>
    </>
  );
};
