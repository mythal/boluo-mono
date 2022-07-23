import { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import type { Dispatch } from 'redux';
import type { UserInterfaceActionMap } from './user-interface';

export type ActionMap = UserInterfaceActionMap;

export type Action<ActionName> = ActionName extends keyof ActionMap
  ? {
      type: ActionName;
      payload: ActionMap[ActionName];
    }
  : never;

export function makeAction<A extends Action<keyof ActionMap>>(type: A['type'], payload: A['payload']): A {
  const action = {
    type,
    payload,
  } as A;
  return action;
}

export type AppAction = Action<keyof ActionMap>;

type WaitDispath<Key extends keyof ActionMap> = (payload: ActionMap[Key]) => void;

export const perform =
  (dispatch: Dispatch) =>
  <ActionName extends keyof ActionMap>(type: ActionName): WaitDispath<ActionName> =>
  (payload) => {
    dispatch(makeAction(type, payload));
  };

export const usePerform = <ActionName extends keyof ActionMap>(type: ActionName): WaitDispath<ActionName> => {
  const dispatch = useDispatch();
  const f = useMemo(() => perform(dispatch)(type), [dispatch, type]);
  return useCallback((payload: ActionMap[ActionName]) => f(payload), [f]);
};
