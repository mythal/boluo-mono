import type { Message } from 'boluo-api';
import type { Action, ReceiveMessage } from './actions';

export interface ChannelState {
  id: string;
  messages: Message[];
}

export const makeInitialChannelState = (id: string): ChannelState => {
  return { id, messages: [] };
};

const handleNewMessage = (state: ChannelState, action: ReceiveMessage): ChannelState => {
  const messages = state.messages.concat([action.message]);
  return { ...state, messages };
};

export const channelReducer = (state: ChannelState, action: Action): ChannelState => {
  switch (action.type) {
    case 'RECEIVE_MESSAGE':
      return handleNewMessage(state, action);
    default:
      return state;
  }
};
