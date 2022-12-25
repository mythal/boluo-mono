import type { FC } from 'react';
import { useMemo } from 'react';
import { useChannelId } from '../../../hooks/useChannelId';
import { useMe } from '../../../hooks/useMe';
import { Compose } from '../compose/Compose';
import { GuestCompose } from '../compose/GuestCompose';
import { ChannelHeader } from './ChannelHeader';
import { MessageList } from './MessageList';

interface Props {
}

interface ViewProps {
  channelId: string;
}

const ChatPaneChannelView: FC<ViewProps> = ({ channelId }) => {
  const me = useMe();
  return (
    <>
      <ChannelHeader />
      <MessageList channelId={channelId} />
      {me ? <Compose me={me} className="m-2" /> : <GuestCompose />}
    </>
  );
};

export const ChatPaneChannel: FC<Props> = () => {
  const channelId = useChannelId();
  return useMemo(() => <ChatPaneChannelView channelId={channelId} />, [
    channelId,
  ]);
};
