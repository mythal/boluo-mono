import type { Channel } from 'boluo-api';
import { makeId } from 'boluo-utils';
import clsx from 'clsx';
import type { FC } from 'react';
import { useChatPaneDispatch } from '../../state/panes';

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
      <a
        className={clsx('block py-2 px-2 hover:bg-surface-200', active && 'bg-surface-200')}
        href="#"
        onClick={replace}
      >
        {channel.name}
      </a>
    </div>
  );
};
