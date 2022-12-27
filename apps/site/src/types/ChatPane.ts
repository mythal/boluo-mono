export interface ChannelPane {
  type: 'CHANNEL';
  id: string;
  channelId: string;
}

export interface SettingsPane {
  type: 'SETTINGS';
  id: 'settings';
}

export interface HelpPane {
  type: 'HELP';
  id: 'help';
}

export interface SpaceSettingsPane {
  type: 'SPACE_SETTINGS';
  id: 'space_settings';
}

export interface EmptyPane {
  type: 'EMPTY';
  id: string;
}

export type Pane = ChannelPane | EmptyPane | SettingsPane | HelpPane | SpaceSettingsPane;
