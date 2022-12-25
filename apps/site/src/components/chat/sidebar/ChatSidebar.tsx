import type { Space } from 'boluo-api';
import type { FC } from 'react';
import { useMemo } from 'react';
import { useChannelList } from '../../../hooks/useChannelList';
import type { Pane } from '../../../types/ChatPane';
import { ChatSidebarFooter } from './ChatSidebarFooter';
import { ChatSidebarItem } from './ChatSidebarItem';

interface Props {
  space: Space;
  panes: Pane[];
}

export const ChatSiderbar: FC<Props> = ({ space, panes }) => {
  const channels = useChannelList(space.id);
  const channelIdFromPanes = useMemo(
    () => panes.flatMap((pane) => pane.type === 'CHANNEL' ? [pane.channelId] : []),
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
  const isSettingsOpen = useMemo(() => panes.findIndex(pane => pane.type === 'SETTINGS') !== -1, [panes]);
  return (
    <>
      <span className="border-r border-b-1/2 border-b-gray-600 flex py-2 px-4 items-center overflow-ellipsis overflow-hidden">
        {space.name}
      </span>
      <div className="border-r row-span-2 row-end-4 flex flex-col justify-between">
        <div>
          {channelList}
        </div>
        <ChatSidebarFooter className="p-2" isSettingsOpen={isSettingsOpen} />
      </div>
    </>
  );
};
