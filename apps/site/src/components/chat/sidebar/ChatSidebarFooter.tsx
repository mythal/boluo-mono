import { HelpCircle, Settings } from 'boluo-icons';
import type { FC } from 'react';
import { useIntl } from 'react-intl';
import { Button } from 'ui/Button';
import { Indicator } from 'ui/Indicator';
import { useChatPaneDispatch } from '../../../state/panes';
import type { HelpPane, SettingsPane } from '../../../types/ChatPane';

interface Props {
  className?: string;
  isSettingsOpen: boolean;
  isHelpOpen: boolean;
}

const SettingToggleButton: FC<{ on: boolean }> = ({ on }) => {
  const intl = useIntl();
  const dispatch = useChatPaneDispatch();
  const paneName = intl.formatMessage({ defaultMessage: 'Settings' });
  const label = on
    ? intl.formatMessage({ defaultMessage: 'Open {paneName}' }, { paneName })
    : intl.formatMessage({ defaultMessage: 'Close {paneName}' }, { paneName });
  const pane: SettingsPane = { type: 'SETTINGS', id: 'settings' };
  return (
    <Button
      onClick={() => dispatch({ type: 'TOGGLE', pane })}
      title={label}
      aria-label={label}
      className="group"
      data-active={on}
    >
      <Settings />
      <Indicator on={on} className="ml-0.5" />
    </Button>
  );
};

const HelpToggleButton: FC<{ on: boolean }> = ({ on }) => {
  const intl = useIntl();
  const dispatch = useChatPaneDispatch();
  const paneName = intl.formatMessage({ defaultMessage: 'Help' });
  const label = on
    ? intl.formatMessage({ defaultMessage: 'Open {paneName}' }, { paneName })
    : intl.formatMessage({ defaultMessage: 'Close {paneName}' }, { paneName });
  const pane: HelpPane = { type: 'HELP', id: 'help' };
  return (
    <Button
      onClick={() => dispatch({ type: 'TOGGLE', pane })}
      title={label}
      aria-label={label}
      className="group"
      data-active={on}
    >
      <HelpCircle />
      <Indicator on={on} className="ml-0.5" />
    </Button>
  );
};

export const ChatSidebarFooter: FC<Props> = ({ className, isSettingsOpen, isHelpOpen }) => {
  return (
    <div className={className}>
      <HelpToggleButton on={isHelpOpen} />
      <SettingToggleButton on={isSettingsOpen} />
    </div>
  );
};
