import 'server-only';
import type { ApiError, Get, Post } from 'boluo-api';
import { makeUri } from 'boluo-api';
import type { Result } from 'boluo-utils';
import { cookies } from 'next/headers';
import { BACKEND_URL } from '../const';
import { appFetch } from './common';

export async function get<P extends keyof Get>(
  path: P,
  query: Get[P]['query'],
): Promise<Result<Get[P]['result'], ApiError>> {
  const url = makeUri(BACKEND_URL, path, query);
  const session = cookies().get('session')?.value;
  const headers = new Headers();
  console.log(`Backend: ${BACKEND_URL} Session: ${session ?? '[NO SESSION]'}`);
  if (session) {
    headers.set('authorization', session);
  }
  return appFetch(url, { headers });
}

export async function post<P extends keyof Post>(
  path: P,
  payload: Post[P]['result'],
): Promise<Result<Post[P]['result'], ApiError>> {
  const url = BACKEND_URL + path;
  const headers = new Headers({ 'Content-Type': 'application/json' });
  const session = cookies().get('session')?.value;
  if (session) {
    headers.set('authorization', session);
  }
  return appFetch(url, {
    headers,
    cache: 'no-cache',
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
