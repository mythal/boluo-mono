// This file was generated by [ts-rs](https://github.com/Aleph-Alpha/ts-rs). Do not edit this file manually.

export interface NewMessage {
  messageId: string | null;
  channelId: string;
  name: string;
  text: string;
  entities: Array<unknown>;
  inGame: boolean;
  isAction: boolean;
  mediaId: string | null;
  whisperToUsers: Array<string> | null;
  pos: number | null;
}