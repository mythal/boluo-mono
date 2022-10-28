import type { Space } from 'boluo-api';
import Link from 'next/link';
import type { FC } from 'react';
import { useMemo } from 'react';
import { useChannelList } from '../../hooks/useChannelList';
import type { ChatPane } from '../../types/ChatPane';
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
      <Link
        href={`/chat/space/${space.id}`}
        className="bg-surface-700 border-r text-surface-50 flex p-2 items-center overflow-ellipsis overflow-hidden"
      >
        {space.name}
      </Link>
      <div className="border-r">
        {channelList}
      </div>
    </>
  );
};
