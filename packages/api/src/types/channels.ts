import type { Id } from 'boluo-utils';
import type { Channel } from 'server-bindings/Channel';
import type { ChannelMember } from 'server-bindings/ChannelMember';
import type { ChannelMemberWithUser } from 'server-bindings/ChannelMemberWithUser';
import type { ChannelWithMember } from 'server-bindings/ChannelWithMember';
import type { Member } from 'server-bindings/Member';
import type { ChannelWithRelated } from 'server-bindings/ChannelWithRelated';

export interface CreateChannel {
  spaceId: Id;
  name: string;
  characterName: string;
  defaultDiceType?: string;
  isPublic?: boolean;
}

export interface JoinChannel {
  channelId: Id;
  characterName?: string;
}

export interface AddMember {
  channelId: Id;
  userId: Id;
}

export interface EditChannel {
  channelId: Id;
  name: string | null;
  topic: string | null;
  defaultDiceType?: string;
  defaultRollCommand?: string;
  isPublic?: boolean;
  grantMasters?: Id[];
  removeMasters?: Id[];
}

export interface EditChannelMember {
  channelId: Id;
  characterName?: string;
  textColor?: string;
}

export interface CheckChannelName {
  spaceId: Id;
  name: string;
}

export interface Export {
  channelId: Id;
  after?: number;
}

export { Channel, ChannelMember, ChannelMemberWithUser, ChannelWithMember, Member, ChannelWithRelated };
