import type { Space } from 'boluo-api';
import type { FC } from 'react';
import { useMemo } from 'react';
import type { ChatPane } from '../../types/ChatPane';
import { PaneEmpty } from './PaneEmpty';
import { ChatPaneSwitch } from './PaneSwitch';
import { ChatSiderbar } from './sidebar/ChatSidebar';

interface Props {
  space: Space;
  panes: ChatPane[];
}

export const ChatView: FC<Props> = ({ space, panes }) => {
  const sidebar = useMemo(
    () => (
      <ChatSiderbar
        key={space.id}
        space={space}
        panes={panes}
      />
    ),
    [space, panes],
  );

  const chatBody = useMemo(() => {
    if (panes.length === 0) {
      return <PaneEmpty />;
    }
    return panes.map((pane) => <ChatPaneSwitch key={pane.id} pane={pane} />);
  }, [panes]);

  return (
    <div className="chat-grid">
      {sidebar}
      {chatBody}
    </div>
  );
};
