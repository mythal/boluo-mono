export interface ChannelPane {
  type: 'CHANNEL';
  id: string;
  channelId: string;
}

export interface SettingsPane {
  type: 'SETTINGS';
  id: 'settings';
}

export interface EmptyPane {
  type: 'EMPTY';
  id: string;
}

export type Pane = ChannelPane | EmptyPane | SettingsPane;
