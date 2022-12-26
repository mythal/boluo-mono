import { ChevronLeft, ChevronRight, Settings } from 'boluo-icons';
import type { FC } from 'react';
import { useIntl } from 'react-intl';
import { Button } from 'ui/Button';
import { Indicator } from 'ui/Indicator';
import { useChatPaneDispatch } from '../../../state/panes';

interface Props {
  className?: string;
  isSettingsOpen: boolean;
}

export const ChatSidebarFooter: FC<Props> = ({ className, isSettingsOpen }) => {
  const intl = useIntl();
  const dispatch = useChatPaneDispatch();
  const label = isSettingsOpen
    ? intl.formatMessage({ defaultMessage: 'Open Settings' })
    : intl.formatMessage({ defaultMessage: 'Close Settings' });
  return (
    <div className={className}>
      <Button
        onClick={() => dispatch({ type: 'TOGGLE_SETTINGS' })}
        title={label}
        aria-label={label}
      >
        <Settings />
        <Indicator on={isSettingsOpen} className="ml-0.5" />
      </Button>
    </div>
  );
};
