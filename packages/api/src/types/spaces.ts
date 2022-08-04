import type { Id } from 'boluo-utils';
import type { Space } from 'server-bindings/Space';
import type { SpaceMember } from 'server-bindings/SpaceMember';
import type { SpaceMemberWithUser } from 'server-bindings/SpaceMemberWithUser';
import type { SpaceWithMember } from 'server-bindings/SpaceWithMember';
import type { SpaceWithRelated } from 'server-bindings/SpaceWithRelated';
import type { UserStatus } from 'server-bindings/UserStatus';
import type { StatusKind } from 'server-bindings/StatusKind';

export interface SpaceIdWithToken {
  spaceId: Id;
  token?: string;
}

export interface CreateSpace {
  name: string;
  description: string;
  defaultDiceType: string | undefined;
  firstChannelName: string;
}

export interface SearchParams {
  search: string;
}

export interface EditSpace {
  spaceId: Id;
  name?: string;
  description?: string;
  defaultDiceType: string | undefined;
  explorable?: boolean;
}

export interface Kick {
  spaceId: Id;
  userId: Id;
}

export { Space, SpaceMember, SpaceMemberWithUser, SpaceWithMember, SpaceWithRelated, UserStatus, StatusKind };
