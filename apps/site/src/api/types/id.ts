import type { Id } from '../../helper/id';

export interface IdQuery {
  id: Id;
}

export interface IdWithToken {
  id: Id;
  token?: string;
}
