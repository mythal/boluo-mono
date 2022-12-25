import type { Message } from 'boluo-api';

export interface ReceiveMessage {
  type: 'RECEIVE_MESSAGE';
  channelId: string;
  message: Message;
}

export interface Initialized {
  type: 'INITIALIZED';
}

export interface MessagesLoaded {
  type: 'MESSAGES_LOADED';
  messages: Message[];
  before: number | null;
  channelId: string;
}

export type Action = ReceiveMessage | Initialized | MessagesLoaded;
