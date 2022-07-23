import type { Reducer } from 'redux';
import type { IntlConfig } from 'react-intl';
import type { ReactNode } from 'react';
import { useCallback } from 'react';
import { prop, compose, remove, find, set, appendTo } from 'optics-ts/standalone';
import type { Id } from '../helper/id';
import { makeId } from '../helper/id';
import type { SelfMapper } from '../helper/function';
import { identity } from '../helper/function';
import type { GenericHandler } from './handlers';
import type { Action, AppAction } from './actions';
import { usePerform } from './actions';
import type { AppDispatch } from './store';

export interface UserInterfaceActionMap {
  notify: UiNotification;
  dismissNotification: Id;
  switchScheme: Scheme;
}

export type Scheme = 'light' | 'dark' | 'auto';
export type Locale = 'en' | 'ja' | 'zh-CN';
export type IntlMessages = IntlConfig['messages'];
export interface UiNotification {
  id: Id;
  child: ReactNode;
  level: 'warn' | 'default' | 'error';
}

export interface UserInterfaceState {
  scheme: Scheme;
  locale: Locale;
  notifications: UiNotification[];
}

const initState: UserInterfaceState = {
  scheme: 'light',
  locale: 'en',
  notifications: [],
};

export type UserInterfaceAction = Action<keyof UserInterfaceActionMap>;

type Handler<Key extends keyof UserInterfaceActionMap> = GenericHandler<UserInterfaceState, Key>;

const handleDissmissNotification: Handler<'dismissNotification'> = (id: string) =>
  remove(
    compose(
      'notifications',
      find((notification: UiNotification) => notification.id === id)
    )
  );

function applyAction(action: UserInterfaceAction): SelfMapper<UserInterfaceState> {
  switch (action.type) {
    case 'switchScheme':
      return set(prop('scheme'), action.payload);
    case 'notify':
      return set(compose('notifications', appendTo), action.payload);
    case 'dismissNotification':
      return handleDissmissNotification(action.payload);
    default:
      return identity;
  }
}

export const userInterfaceReducer: Reducer<UserInterfaceState, UserInterfaceAction> = (state = initState, action) =>
  applyAction(action)(state);

export const useSwitchScheme = () => {
  const perform = usePerform('switchScheme');
  return useCallback(
    (schemeString: string) => {
      if (schemeString === 'dark' || schemeString === 'light') {
        perform(schemeString);
      } else {
        perform('auto');
      }
    },
    [perform]
  );
};

export const recordSchemeMiddleware = () => (next: AppDispatch) => (action: AppAction) => {
  if (action.type === 'switchScheme') {
    localStorage.setItem('SCHEME', action.payload);
  }
  next(action);
};

export const useNotify = () => {
  const perform = usePerform('notify');
  return useCallback(
    (child: ReactNode, level: UiNotification['level'] = 'default') => {
      perform({ child, level, id: makeId() });
    },
    [perform]
  );
};
