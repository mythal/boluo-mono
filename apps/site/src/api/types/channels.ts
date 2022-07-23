import type { Id } from '../../helper/id';
import type { Space, SpaceMember } from './spaces';
import type { User } from './users';

export interface CreateChannel {
  spaceId: Id;
  name: string;
  characterName: string;
  defaultDiceType?: string;
  isPublic?: boolean;
}

export interface Channel {
  id: Id;
  name: string;
  topic: string;
  spaceId: string;
  created: number;
  isPublic: boolean;
  defaultDiceType: string;
  defaultRollCommand: string;
}

export interface ChannelMember {
  userId: Id;
  channelId: Id;
  joinDate: number;
  characterName: string;
  isMaster: boolean;
  textColor: string | null;
}

export interface ChannelMemberWithUser {
  member: ChannelMember;
  user: User;
}

export interface ChannelWithMember {
  channel: Channel;
  member: ChannelMember;
}

export interface Member {
  channel: ChannelMember;
  space: SpaceMember;
  user: User;
}

export interface JoinChannel {
  channelId: Id;
  characterName?: string;
}

export interface AddMember {
  channelId: Id;
  userId: Id;
}

export interface ChannelWithRelated {
  channel: Channel;
  members: Member[];
  space: Space;
  colorList: Record<Id, string>;
  heartbeatMap: Record<Id, number>;
  encodedEvents: string[];
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
