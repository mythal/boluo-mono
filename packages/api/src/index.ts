import { Result } from 'boluo-utils';
import { ApiError } from './errors';
import { makeUri, request } from './request';
import type { GetMe, LoginData, LoginReturn } from './types/users';

type Return<T, E extends ApiError = ApiError> = Promise<Result<T, E>>;

function get(path: '/users/get_me'): Return<GetMe | null>;
function get(path: '/users/logout'): Return<true>;
function get(path: string, query?: object): Return<unknown> {
  return request(makeUri(path, query), 'GET', null);
}

function post(path: '/users/login', payload: LoginData): Return<LoginReturn>;
function post(
  path: string,
  payload: object,
  query?: object,
): Return<unknown> {
  return request(makeUri(path, query), 'POST', JSON.stringify(payload));
}

export { get, post };
export * from './error-types';
export * from './errors';
export * from './types/channels';
export * from './types/id';
export * from './types/spaces';
export * from './types/users';
