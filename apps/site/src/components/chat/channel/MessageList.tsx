import type { Message } from 'boluo-api';
import type { FC } from 'react';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Button } from 'ui';
import { useContextSelector } from 'use-context-selector';
import { get } from '../../../api/browser';
import type { ChannelState } from '../../../state/channel';
import { ChatContext, useChatDispatch } from '../../../state/chat';
import { useFocusPane } from '../../../state/panes';

interface Props {
  channelId: string;
}

interface ViewProps {
  channelId: string;
  messages: Message[];
  state: ChannelState['state'];
  focus: () => void;
}

const MessageListView: FC<ViewProps> = ({ channelId, messages, focus, state }) => {
  const dispatch = useChatDispatch();
  const [finished, setFinished] = useState(false);
  const handleLoadMore = async () => {
    let before: number | null = null;
    if (messages.length > 0) {
      before = messages[0]!.pos;
    }
    const newMessages = await get('/messages/by_channel', { channelId, before, limit: null });
    if (newMessages.isOk) {
      if (newMessages.some.length === 0) {
        setFinished(true);
      } else {
        dispatch({ type: 'MESSAGES_LOADED', before, channelId, messages: newMessages.some });
      }
    }
  };
  return (
    <div onClick={focus} className="p-4 overflow-y-scroll">
      {state === 'INITIALIZED' && (
        <div className="text-center">
          <Button onClick={handleLoadMore} disabled={finished}>
            <FormattedMessage defaultMessage="Load More" />
          </Button>
        </div>
      )}
      {messages.map(message => (
        <div key={message.id}>
          <span className="font-bold">{message.name}</span>: {message.text}
        </div>
      ))}
    </div>
  );
};

export const MessageList: FC<Props> = ({ channelId }) => {
  const focus = useFocusPane();
  const messages = useContextSelector(ChatContext, (state) => state.channels[channelId]?.messages ?? []);
  const state = useContextSelector(ChatContext, (state) => state.channels[channelId]?.state ?? 'UNINITIALIZED');
  if (messages) {
    return <MessageListView messages={messages} focus={focus} state={state} channelId={channelId} />;
  } else {
    return (
      <div>
        <FormattedMessage defaultMessage="Empty" />
      </div>
    );
  }
};
