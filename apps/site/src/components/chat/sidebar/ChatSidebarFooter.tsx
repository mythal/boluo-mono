import { ChevronLeft, ChevronRight, Settings } from 'boluo-icons';
import type { FC } from 'react';
import { Button } from 'ui';
import { useChatPaneDispatch } from '../../../state/panes';

interface Props {
  className?: string;
  isSettingsOpen: boolean;
}

export const ChatSidebarFooter: FC<Props> = ({ className, isSettingsOpen }) => {
  const dispatch = useChatPaneDispatch();
  return (
    <div className={className}>
      <Button onClick={() => dispatch({ type: 'TOGGLE_SETTINGS' })}>
        <Settings />
        {isSettingsOpen ? <ChevronLeft /> : <ChevronRight />}
      </Button>
    </div>
  );
};
