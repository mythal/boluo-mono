import type { FC } from 'react';
import { memo, Suspense } from 'react';
import { ChannelIdContext } from '../../hooks/useChannelId';
import { PaneIdProvider } from '../../state/panes';
import type { ChatPane } from '../../types/ChatPane';
import { ChatPaneChannel } from './ChannelPane';
import { PaneEmpty } from './PaneEmpty';
import { PaneError } from './PaneError';
import { PaneLoading } from './PaneLoading';

interface Props {
  pane: ChatPane;
}

const Switch: FC<Props> = ({ pane }) => {
  switch (pane.type) {
    case 'channel':
      return (
        <ChannelIdContext.Provider value={pane.channelId}>
          <ChatPaneChannel key={pane.channelId} />
        </ChannelIdContext.Provider>
      );
    default:
      return <PaneEmpty />;
  }
};

export const ChatPaneSwitch = memo<Props>(({ pane }) => {
  return (
    <PaneIdProvider key={pane.id} id={pane.id}>
      <PaneError>
        <Suspense fallback={<PaneLoading />}>
          <Switch pane={pane} />
        </Suspense>
      </PaneError>
    </PaneIdProvider>
  );
});
ChatPaneSwitch.displayName = 'ChatPaneSwitch';
