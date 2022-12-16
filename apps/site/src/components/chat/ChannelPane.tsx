import type { Message } from 'boluo-api';
import type { FC } from 'react';
import { useMemo } from 'react';
import { useContextSelector } from 'use-context-selector';
import { useChannelId } from '../../hooks/useChannelId';
import { useMe } from '../../hooks/useMe';
import { ChatContext } from '../../state/chat';
import { useFocusPane } from '../../state/panes';
import { ChannelHeader } from './ChannelHeader';
import { Compose } from './Compose';

interface Props {
}

interface ViewProps {
  channelId: string;
  messages: Message[];
}

const ChatPaneChannelView: FC<ViewProps> = ({ channelId, messages }) => {
  const focus = useFocusPane();
  const me = useMe();
  return (
    <>
      <ChannelHeader />
      <div onClick={focus} className="p-4">
        {messages.map(message => (
          <div key={message.id}>
            <span className="font-bold">{message.name}</span>: {message.text}
          </div>
        ))}
      </div>
      {me && <Compose me={me} />}
    </>
  );
};

export const ChatPaneChannel: FC<Props> = () => {
  const channelId = useChannelId();
  const messages = useContextSelector(ChatContext, (state) => state.channels[channelId]?.messages);
  return useMemo(() => <ChatPaneChannelView channelId={channelId} messages={messages ?? []} />, [
    channelId,
    messages,
  ]);
};
