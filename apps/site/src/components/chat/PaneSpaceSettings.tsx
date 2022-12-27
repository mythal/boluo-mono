import { Settings } from 'boluo-icons';
import type { FC } from 'react';
import { FormattedMessage } from 'react-intl';
import { ClosePaneButton } from './ClosePaneButton';
import { PaneBodyBox } from './PaneBodyBox';
import { PaneHeaderBox } from './PaneHeaderBox';

interface Props {
}

export const PaneSpaceSettings: FC<Props> = () => {
  return (
    <>
      <PaneHeaderBox operators={<ClosePaneButton />} icon={<Settings />}>
        <FormattedMessage defaultMessage="Space Settings" />
      </PaneHeaderBox>
      <PaneBodyBox className="p-4">
        Space Settings
      </PaneBodyBox>
    </>
  );
};
