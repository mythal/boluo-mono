import { makeId } from 'boluo-utils';
import type { Dispatch, FC } from 'react';
import { useCallback } from 'react';
import { createContext, useContext, useReducer } from 'react';
import type { ChildrenProps } from 'ui/dist/types';
import { useChannelList } from '../hooks/useChannelList';
import type { ChatPane } from '../types/ChatPane';

export interface AddChat {
  type: 'ADD_CHAT';
  selfId: string;
  item: ChatPane;
}

export interface ReplaceChat {
  type: 'REPLACE_CHAT';
  item: ChatPane;
}

export interface RemoveChat {
  type: 'REMOVE_CHAT';
  id: string;
}

export interface Focus {
  type: 'FOCUS';
  id: string;
}

type Action = AddChat | ReplaceChat | RemoveChat | Focus;

const PaneDispatchContext = createContext<Dispatch<Action>>(() => {
  throw new Error('Unexpected');
});

const PaneIdContext = createContext<string>('');

export const PaneIdProvider: FC<ChildrenProps & { id: string }> = ({ id, children }) => (
  <PaneIdContext.Provider value={id}>{children}</PaneIdContext.Provider>
);

const FocusPaneContext = createContext<string | null>('');

export const useIsFocused = (): boolean => {
  const id = usePaneId();
  return useContext(FocusPaneContext) === id;
};

export const usePaneId = (): string => {
  const id = useContext(PaneIdContext);
  if (id === '') {
    console.warn('Attempt use pane id outside provider.');
  }
  return id;
};

export const useFocusPane = () => {
  const id = usePaneId();
  const dispatch = useChatPaneDispatch();
  return useCallback(() => dispatch({ type: 'FOCUS', id }), [dispatch, id]);
};

export const useClosePane = () => {
  const id = usePaneId();
  const dispatch = useChatPaneDispatch();
  return useCallback(() => dispatch({ type: 'REMOVE_CHAT', id }), [dispatch, id]);
};

interface PaneProviderProps extends ChildrenProps {
  dispatch: Dispatch<Action>;
  focused: string | null;
}

export const PaneProvider: FC<PaneProviderProps> = ({ children, dispatch, focused }) => {
  return (
    <PaneDispatchContext.Provider value={dispatch}>
      <FocusPaneContext.Provider value={focused}>{children}</FocusPaneContext.Provider>
    </PaneDispatchContext.Provider>
  );
};

export const useChatPaneDispatch = (): Dispatch<Action> => useContext(PaneDispatchContext);

interface Return {
  dispatch: Dispatch<Action>;
  panes: ChatPane[];
  focused: string | null;
}

interface PaneState {
  focused: string | null;
  panes: ChatPane[];
}

const initialPaneState: PaneState = {
  focused: null,
  panes: [],
};

const handleAddChat = (state: PaneState, { selfId, item }: AddChat): PaneState => {
  const panes = [...state.panes];
  const index = panes.findIndex(pane => pane.id === selfId);
  if (index >= 0) {
    panes.splice(index + 1, 0, item);
  } else {
    panes.push(item);
  }
  return { panes, focused: item.id };
};

const handleReplaceChat = (state: PaneState, action: ReplaceChat): PaneState => {
  const { focused } = state;
  if (!focused || state.panes.length <= 1) {
    return { panes: [action.item], focused: action.item.id };
  }
  const panes = [...state.panes];
  const focusedPaneIndex = panes.findIndex(pane => pane.id === focused);
  if (focusedPaneIndex >= 0) {
    panes[focusedPaneIndex] = action.item;
  } else {
    panes.push(action.item);
  }
  return { panes, focused: action.item.id };
};

const handleRemoveChat = (state: PaneState, action: RemoveChat): PaneState => {
  let { panes, focused } = state;
  panes = panes.filter(item => item.id !== action.id);
  if (focused === action.id && panes.length > 0) {
    const index = state.panes.findIndex(pane => pane.id === focused);
    if (index > 0) {
      focused = state.panes[index - 1]!.id;
    } else {
      focused = panes[0]!.id;
    }
  }
  return { panes, focused };
};

export const usePanes = (spaceId: string): Return => {
  const channels = useChannelList(spaceId);
  const reducer = (state: PaneState, action: Action): PaneState => {
    const { panes, focused } = state;
    switch (action.type) {
      case 'FOCUS':
        if (focused === action.id) {
          return state;
        }
        return { panes, focused: action.id };
      case 'ADD_CHAT':
        return handleAddChat(state, action);
      case 'REMOVE_CHAT':
        return handleRemoveChat(state, action);
      case 'REPLACE_CHAT':
        return handleReplaceChat(state, action);
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer<typeof reducer, PaneState>(
    reducer,
    initialPaneState,
    (): PaneState => {
      const channel = channels.find(channel => channel.isPublic);
      const panes: ChatPane[] = channel ? [{ type: 'channel', id: makeId(), channelId: channel.id }] : [];
      return { focused: null, panes };
    },
  );
  const { panes, focused } = state;
  return { panes, dispatch, focused };
};
