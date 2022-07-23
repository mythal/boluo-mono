import { applyMiddleware, combineReducers, createStore } from 'redux';
import type { ThunkDispatch } from 'redux-thunk';
import thunk from 'redux-thunk';
import { useDispatch as useReduxDispatch, useSelector as useReduxSelector } from 'react-redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import { IS_REDUX_TRACE_ENABLE } from '../const';
import { recordSchemeMiddleware, userInterfaceReducer } from './user-interface';
import type { ActionMap, AppAction } from './actions';
import { makeAction } from './actions';

export function perform<K extends keyof ActionMap>(type: K, payload: ActionMap[K]) {
  store.dispatch(makeAction(type, payload));
}
export const applicationReducer = combineReducers({
  interface: userInterfaceReducer,
});

export type AppState = ReturnType<typeof applicationReducer>;
const composeEnhancers = composeWithDevTools({
  trace: process.env.NODE_ENV === 'development' && IS_REDUX_TRACE_ENABLE,
  traceLimit: 25,
  actionsDenylist: [],
});

export const store = createStore(
  applicationReducer,
  undefined,
  composeEnhancers(applyMiddleware(recordSchemeMiddleware, thunk))
);
export type AppDispatch = ThunkDispatch<AppState, unknown, AppAction>;

export const useAppDispatch = (): AppDispatch => {
  return useReduxDispatch<AppDispatch>();
};

export function useAppSelector<T>(mapper: (state: AppState) => T, equalityFn?: (a: T, b: T) => boolean): T {
  return useReduxSelector<AppState, T>(mapper, equalityFn);
}
