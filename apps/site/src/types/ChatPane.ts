export interface ChannelPane {
  type: 'channel';
  id: string;
  channelId: string;
}

export interface EmptyPane {
  type: 'empty';
  id: string;
}

export type ChatPane = ChannelPane | EmptyPane;
