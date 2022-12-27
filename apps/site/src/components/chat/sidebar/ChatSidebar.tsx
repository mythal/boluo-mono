import type { Space } from 'boluo-api';
import { ChevronDown, ChevronUp } from 'boluo-icons';
import clsx from 'clsx';
import type { FC } from 'react';
import { useState } from 'react';
import { useMemo } from 'react';
import { useChannelList } from '../../../hooks/useChannelList';
import type { Pane } from '../../../types/ChatPane';
import { ChatSidebarFooter } from './ChatSidebarFooter';
import { SidebarChannelItem } from './SidebarChannelItem';
import { SpaceOptions } from './SpaceOptions';

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
        <SidebarChannelItem
          key={channel.id}
          channel={channel}
          active={channelIdFromPanes.includes(channel.id)}
        />
      )),
    [channelIdFromPanes, channels],
  );
  const [state, setState] = useState<'CHANNELS' | 'SPACE'>('CHANNELS');
  const isSettingsOpen = useMemo(() => panes.findIndex(pane => pane.type === 'SETTINGS') !== -1, [panes]);
  const isHelpOpen = useMemo(() => panes.findIndex(pane => pane.type === 'HELP') !== -1, [panes]);
  return (
    <>
      <div
        className="border-r border-b-1/2 bg-surface-100 border-b-gray-600 flex justify-between gap-1 py-2 px-4 items-center cursor-pointer group"
        onClick={() => setState(state => state === 'SPACE' ? 'CHANNELS' : 'SPACE')}
      >
        <span className="overflow-ellipsis overflow-hidden break-all whitespace-nowrap">{space.name}</span>
        <span
          className={clsx(
            'p-1 border  rounded-md',
            state === 'SPACE'
              ? 'border-surface-400 border-opacity-100 group-hover:border-opacity-70'
              : 'border-surface-300 border-opacity-0 group-hover:border-opacity-100',
          )}
        >
          {state === 'SPACE' ? <ChevronUp /> : <ChevronDown />}
        </span>
      </div>
      <div className="border-r flex flex-col justify-between row-start-2 row-end-[-1] col-start-1 col-end-1">
        <div>
          {state === 'CHANNELS' && channelList}
          {state === 'SPACE' && <SpaceOptions space={space} panes={panes} />}
        </div>
        <ChatSidebarFooter
          className="p-2 flex justify-between"
          isSettingsOpen={isSettingsOpen}
          isHelpOpen={isHelpOpen}
        />
      </div>
    </>
  );
};
