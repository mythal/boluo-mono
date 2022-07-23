import { makeUri, request } from './request';
import type { GetMe, LoginData, LoginResult } from './types/users';

export function get(path: '/users/get_me'): Promise<GetMe | null>;
export function get(path: '/users/logout'): Promise<true>;

export function get<Q extends object, T>(path: string, query?: Q): Promise<T> {
  return request(makeUri(path, query), 'GET', null);
}

export function post(path: '/users/login', payload: LoginData): Promise<LoginResult>;
export function post<T, U extends object = object, Q extends object = Record<string, never>>(
  path: string,
  payload: U,
  query?: Q
): Promise<T> {
  return request(makeUri(path, query), 'POST', JSON.stringify(payload));
}
