import type { Event } from 'boluo-api';
import type { FC } from 'react';
import { useCallback, useContext, useReducer } from 'react';
import { createContext, useContextUpdate } from 'use-context-selector';
import type { ChildrenProps } from '../helper/props';
import { SpaceConnectionStateContext } from '../hooks/useChatConnection';
import type { Action } from './actions';
import type { ChannelState } from './channel';
import { channelReducer, makeInitialChannelState } from './channel';
import { useChatEvent } from './connection';

export interface ChatState {
  channels: Record<string, ChannelState>;
}
export const initialChatState: ChatState = { channels: {} };

export const ChatContext = createContext<ChatState>(initialChatState);
ChatContext.Provider.displayName = 'ChatContext.Provider';

interface ProviderProps extends ChildrenProps {
}

const channelsReducer = (channels: ChatState['channels'], action: Action): ChatState['channels'] => {
  if ('channelId' in action) {
    const { channelId } = action;
    const channelState = channelReducer(channels[channelId] ?? makeInitialChannelState(channelId), action);
    return { ...channels, [channelId]: channelState };
  } else {
    const nextChannels: ChatState['channels'] = {};
    for (const channelState of Object.values(channels)) {
      nextChannels[channelState.id] = channelReducer(channelState, action);
    }
    return nextChannels;
  }
};

const reducer = (state: ChatState, action: Action) => {
  const { channels } = state;
  return {
    channels: channelsReducer(channels, action),
  };
};

export const ChatStateProvider: FC<ProviderProps> = ({ children }) => {
  const connectionState = useContext(SpaceConnectionStateContext);
  const [state, reducerDispatch] = useReducer(reducer, initialChatState);
  const update = useContextUpdate(ChatContext);
  const dispatch: typeof reducerDispatch = useCallback((action) => {
    update(() => reducerDispatch(action), { suspense: true });
  }, [update]);
  const onEvent = useCallback((e: Event) => {
    if (e.body.type === 'NEW_MESSAGE') {
      const { channelId, message } = e.body;
      dispatch({ type: 'RECEIVE_MESSAGE', channelId, message });
    }
  }, [dispatch]);
  useChatEvent(connectionState, onEvent);
  return <ChatContext.Provider value={state}>{children}</ChatContext.Provider>;
};
