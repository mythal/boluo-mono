import { FormattedMessage } from 'react-intl';
import React, { useCallback } from 'react';
import { Button } from 'ui';
import { Refresh } from 'boluo-icons';
import type { StyleProps } from '../helper/props';
import Icon from './fundamental/Icon';

interface Props extends StyleProps {
  small?: boolean;
  text?: boolean;
}

export const RefreshButton = ({ className, small = false, text = true }: Props) => {
  const refresh = useCallback(() => {
    location.reload();
  }, []);
  return (
    <Button aria-label="refresh" title="refresh" onClick={refresh} className={className} data-small={small}>
      <Icon icon={Refresh} />
      {text && <FormattedMessage defaultMessage="Refresh" />}
    </Button>
  );
};
