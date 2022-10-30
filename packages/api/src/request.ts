import { IS_DEBUG, Ok } from 'boluo-utils';
import { Err, Result } from 'boluo-utils';
import { FetchFailError, NotJsonError } from './error-types';
import type { ApiError } from './errors';

export const makeUri = (path: string, query?: object): string => {
  if (path[0] !== '/') {
    path = '/api/' + path;
  } else {
    path = '/api' + path;
  }
  if (query === undefined) {
    return path;
  }
  const entities = Object.entries(query);
  if (entities.length === 0) {
    return path;
  }
  const searchParams = new URLSearchParams();
  for (const entry of entities) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const [key, value] = entry;
    if (typeof value === 'boolean' || typeof value === 'number' || typeof value === 'string') {
      searchParams.set(key, String(value));
    }
  }
  return `${path}?${searchParams.toString()}`;
};

interface AppResponse {
  isOk: boolean;
  ok: unknown;
  err: ApiError;
}

export const request = async <T, E extends ApiError = ApiError>(
  path: string,
  method: string,
  body: Exclude<RequestInit['body'], undefined>,
  contentType = 'application/json',
): Promise<Result<T, E | NotJsonError | FetchFailError>> => {
  const host = 'http://localhost:3000';
  console.log(host, path);
  const headers = new Headers({
    'Content-Type': contentType,
  });
  if (IS_DEBUG) {
    headers.append('development', '');
  }
  let res: Response;
  try {
    res = await fetch(host + path, {
      method,
      headers,
      body,
      credentials: 'include',
    });
  } catch (cause) {
    const fetchError: FetchFailError = { code: 'FETCH_FAIL', cause };
    return new Err(fetchError);
  }
  let data: AppResponse;
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    data = await res.json();
  } catch (cause) {
    console.error('Failed to parse JSON: ', cause);
    const notJson: NotJsonError = { code: 'NOT_JSON', cause };
    return new Err(notJson);
  }
  if (data.isOk) {
    return new Ok(data.ok as T);
  } else {
    return new Err(data.err as E);
  }
};
