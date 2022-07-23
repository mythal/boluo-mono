import type { SelfMapper } from '../helper/function';
import type { Action, ActionMap } from './actions';

export type GenericHandler<SubState, ActionName extends string> = ActionName extends keyof ActionMap
  ? (action: Action<ActionName>['payload']) => SelfMapper<SubState> // currying
  : never;
