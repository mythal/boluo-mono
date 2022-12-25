import type { Message } from 'boluo-api';
import type { FC } from 'react';
import { useEffect } from 'react';
import { useMemo } from 'react';
import { useContextSelector } from 'use-context-selector';
import { get } from '../../../api/browser';
import { useChannelId } from '../../../hooks/useChannelId';
import { useMe } from '../../../hooks/useMe';
import { ChatContext, useChatDispatch } from '../../../state/chat';
import { useFocusPane } from '../../../state/panes';
import { Compose } from '../Compose';
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
      {me && <Compose me={me} className="m-2" />}
    </>
  );
};

export const ChatPaneChannel: FC<Props> = () => {
  const channelId = useChannelId();
  return useMemo(() => <ChatPaneChannelView channelId={channelId} />, [
    channelId,
  ]);
};
