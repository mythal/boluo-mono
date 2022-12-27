import type { Channel } from 'boluo-api';
import { Hash } from 'boluo-icons';
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
    dispatch({ type: 'REPLACE_PANE', item: { type: 'CHANNEL', id: makeId(), channelId: channel.id } });
  };
  return (
    <div>
      <button
        className={clsx(
          'flex gap-1 items-center w-full text-left py-2 px-4 hover:bg-surface-200',
          active && 'bg-surface-200',
        )}
        onClick={replace}
      >
        <Hash className={active ? 'text-pin-surface-600' : 'text-surface-400'} />
        {channel.name}
      </button>
    </div>
  );
};
