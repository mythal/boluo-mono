import type { Space } from 'boluo-api';
import { Settings } from 'boluo-icons';
import type { FC } from 'react';
import { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import { useChatPaneDispatch } from '../../../state/panes';
import type { Pane, SpaceSettingsPane } from '../../../types/ChatPane';
import { SidebarItem } from './SidebarItem';

interface Props {
  space: Space;
  panes: Pane[];
}

export const SpaceOptions: FC<Props> = ({ space, panes }) => {
  const dispatch = useChatPaneDispatch();
  const spaceSettingsPane: SpaceSettingsPane = { type: 'SPACE_SETTINGS', id: 'space_settings' };
  const spaceSettingsActive = useMemo(() => panes.findIndex(pane => pane.type === 'SPACE_SETTINGS') !== -1, [panes]);
  return (
    <>
      <div className="text-surface-600 py-3 px-4 text-sm border-b border-surface-200">
        <FormattedMessage defaultMessage="Options for {spaceName}" values={{ spaceName: space.name }} />
      </div>
      <SidebarItem
        icon={<Settings />}
        active={spaceSettingsActive}
        onClick={() => dispatch({ type: 'TOGGLE', pane: spaceSettingsPane })}
      >
        <FormattedMessage defaultMessage="Space Settings" />
      </SidebarItem>
    </>
  );
};
