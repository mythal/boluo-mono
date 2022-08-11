import { makeUri, request } from './request';
import type { GetMe, LoginData, LoginReturn } from './types/users';

function get<Q extends object, R>(path: string, query?: Q | undefined): Promise<R> {
  return request(makeUri(path, query), 'GET', null);
}

export const getMe = (): Promise<GetMe | null> => get('/users/get_me');

export const logout = (): Promise<true> => get('/users/logout');

function post<P, Q extends object, R>(
  path: string,
  payload: P,
  query?: Q,
): Promise<R> {
  return request(makeUri(path, query), 'POST', JSON.stringify(payload));
}

export const login = (data: LoginData): Promise<LoginReturn> => post('/users/login', data);

export * from './types/channels';
export * from './types/id';
export * from './types/spaces';
export * from './types/users';
