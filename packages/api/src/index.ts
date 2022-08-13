import { makeUri, request } from './request';
import type { GetMe, LoginData, LoginReturn } from './types/users';

function get(path: '/users/get_me'): Promise<GetMe | null>;
function get(path: '/users/logout'): Promise<true>;
function get(path: string, query?: object): Promise<unknown> {
  return request(makeUri(path, query), 'GET', null);
}

function post(path: '/users/login', payload: LoginData): Promise<LoginReturn>;
function post(
  path: string,
  payload: object,
  query?: object,
): Promise<unknown> {
  return request(makeUri(path, query), 'POST', JSON.stringify(payload));
}

export { get, post };
export * from './types/channels';
export * from './types/id';
export * from './types/spaces';
export * from './types/users';
