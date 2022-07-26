export const UNAUTHENTICATED = 'UNAUTHENTICATED';
export type UNAUTHENTICATED = typeof UNAUTHENTICATED;

export const NO_PERMISSION = 'NO_PERMISSION';
export type NO_PERMISSION = typeof NO_PERMISSION;

export const NOT_JSON = 'NOT_JSON';
export type NOT_JSON = typeof NOT_JSON;

export const NOT_FOUND = 'NOT_FOUND';
export type NOT_FOUND = typeof NOT_FOUND;

export const FETCH_FAIL = 'FETCH_FAIL';
export type FETCH_FAIL = typeof FETCH_FAIL;

export const UNEXPECTED = 'UNEXPECTED';
export type UNEXPECTED = typeof UNEXPECTED;

export const BAD_REQUEST = 'BAD_REQUEST';
export type BAD_REQUEST = typeof BAD_REQUEST;

export const VALIDATION_FAIL = 'VALIDATION_FAIL';
export type VALIDATION_FAIL = typeof VALIDATION_FAIL;

export const CONFLICT = 'CONFLICT';
export type CONFLICT = typeof CONFLICT;

export const METHOD_NOT_ALLOWED = 'METHOD_NOT_ALLOWED';
export type METHOD_NOT_ALLOWED = typeof METHOD_NOT_ALLOWED;

export const LIMIT_EXCEEDED = 'LIMIT_EXCEEDED';
export type LIMIT_EXCEEDED = typeof LIMIT_EXCEEDED;

export interface ApiError {
  code:
    | UNAUTHENTICATED
    | NO_PERMISSION
    | NOT_FOUND
    | UNEXPECTED
    | BAD_REQUEST
    | VALIDATION_FAIL
    | CONFLICT
    | FETCH_FAIL
    | METHOD_NOT_ALLOWED
    | LIMIT_EXCEEDED;
  message: string;
  context: string | null;
}

export interface NotJsonError {
  code: NOT_JSON;
  cause: unknown;
}

export interface FetchFail {
  code: FETCH_FAIL;
  cause: unknown;
}

export type AppError = ApiError | NotJsonError | FetchFail;

export class AppErrorBox {
  constructor(public readonly error: AppError) {}
}
