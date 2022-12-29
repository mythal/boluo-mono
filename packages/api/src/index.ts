import { AppResponse, isAppResponse, makeUri } from './request';
import type { Channel } from './types/channels';
import { GetMessagesByChannel, Message, NewMessage } from './types/messages';
import type { CreateSpace, EditSpace, Space, SpaceWithMember, SpaceWithRelated } from './types/spaces';
import type { CheckEmail, CheckUsername, GetMe, LoginData, LoginReturn, RegisterData, User } from './types/users';

export interface Get {
  // users
  '/users/get_me': { query: null; result: GetMe | null };
  '/users/logout': { query: null; result: true };
  '/users/settings': { query: null; result: unknown };
  '/users/check_username': { query: CheckUsername; result: boolean };
  '/users/check_email': { query: CheckEmail; result: boolean };
  // spaces
  '/spaces/query': { query: { id: string }; result: Space };
  '/spaces/query_with_related': { query: { id: string }; result: SpaceWithRelated };
  // channels
  '/channels/query': { query: { id: string }; result: Channel };
  '/channels/by_space': { query: { id: string }; result: Channel[] };
  // messages
  '/messages/by_channel': { query: GetMessagesByChannel; result: Message[] };
}

export interface Post {
  // users
  '/users/login': { payload: LoginData; result: LoginReturn };
  '/users/register': { payload: RegisterData; result: User };
  // spaces
  '/spaces/create': { payload: CreateSpace; result: SpaceWithMember };
  '/spaces/edit': { payload: EditSpace; result: Space };
  // messages
  '/messages/send': { payload: NewMessage; result: Message };
}

export interface Put {
}

export interface Patch {
  // users
  '/users/update_settings': { payload: object; result: object };
}

export type { AppResponse };
export { isAppResponse, makeUri };
export * from './error-types';
export * from './errors';
export * from './types/channels';
export * from './types/events';
export * from './types/id';
export * from './types/messages';
export * from './types/spaces';
export * from './types/users';
