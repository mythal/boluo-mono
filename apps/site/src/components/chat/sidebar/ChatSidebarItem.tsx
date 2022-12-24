import type { Channel } from 'boluo-api';
import { makeId } from 'boluo-utils';
import clsx from 'clsx';
import type { FC } from 'react';
import { useChatPaneDispatch } from '../../../state/panes';

interface Props {
  channel: Channel;
  active: boolean;
}

export const ChatSidebarItem: FC<Props> = ({ channel, active }) => {
  const dispatch = useChatPaneDispatch();
  const replace = () => {
    dispatch({ type: 'REPLACE_CHAT', item: { type: 'channel', id: makeId(), channelId: channel.id } });
  };
  return (
    <div>
      <button
        className={clsx('block w-full text-left py-2 px-4 hover:bg-surface-200', active && 'bg-surface-200')}
        onClick={replace}
      >
        {channel.name}
      </button>
    </div>
  );
};
