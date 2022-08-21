import type { Message } from 'boluo-api';

export interface ReceiveMessage {
  type: 'RECEIVE_MESSAGE';
  channelId: string;
  message: Message;
}

export type Action = ReceiveMessage;
