import { Refresh } from 'boluo-icons';
import { useCallback } from 'react';
import { FormattedMessage } from 'react-intl';
import { Button } from './Button';
import Icon from './Icon';
import type { StyleProps } from './types';

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
