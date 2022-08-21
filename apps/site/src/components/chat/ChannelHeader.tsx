import { Close, SplitHorizontal } from 'boluo-icons';
import { makeId } from 'boluo-utils';
import clsx from 'clsx';
import type { FC, MouseEventHandler } from 'react';
import { useTransition } from 'react';
import { useMemo } from 'react';
import { useIntl } from 'react-intl';
import { Button } from 'ui';
import type { ChildrenProps } from '../../helper/props';
import { useChannel } from '../../hooks/useChannel';
import { useChannelId } from '../../hooks/useChannelId';
import { useChatPaneDispatch, useClosePane, useFocusPane, useIsFocused, usePaneId } from '../../state/panes';

const SplitPaneButton: FC = () => {
  const channelId = useChannelId();
  const intl = useIntl();
  const paneId = usePaneId();
  const paneDispatch = useChatPaneDispatch();
  const [, starTransition] = useTransition();
  const dup = () =>
    starTransition(() =>
      paneDispatch({ type: 'ADD_CHAT', selfId: paneId, item: { type: 'channel', id: makeId(), channelId } })
    );
  return (
    <Button
      data-small
      onClick={dup}
      title={intl.formatMessage({ defaultMessage: 'Split pane' })}
    >
      <SplitHorizontal />
    </Button>
  );
};

const ClosePaneButton: FC = () => {
  const intl = useIntl();
  const close = useClosePane();
  const [, starTransition] = useTransition();
  return (
    <Button
      data-small
      onClick={() => starTransition(close)}
      title={intl.formatMessage({ defaultMessage: 'Close pane' })}
    >
      <Close />
    </Button>
  );
};

const HeaderBox: FC<ChildrenProps> = ({ children }) => {
  const isFocused = useIsFocused();
  const focus = useFocusPane();
  return (
    <div
      className={clsx(
        'bg-surface-100 flex items-center px-4 text-lg',
        'justify-between border-b-1/2 transition-colors duration-200',
        isFocused ? 'border-brand-600' : 'border-surface-300',
      )}
      onClick={focus}
    >
      {children}
    </div>
  );
};

const ChannelName: FC = () => {
  const channelId = useChannelId();
  const channel = useChannel(channelId);
  return <span className="overflow-hidden whitespace-nowrap overflow-ellipsis">{channel.name}</span>;
};

export const ChannelHeader: FC = () => {
  const closeButton = useMemo(() => <ClosePaneButton />, []);
  const splitButton = useMemo(() => <SplitPaneButton />, []);
  const stopPropagation: MouseEventHandler = (e) => {
    e.stopPropagation();
  };
  return (
    <HeaderBox>
      <ChannelName />
      <span onClick={stopPropagation} className="inline-flex gap-1 ml-2">
        {splitButton}
        {closeButton}
      </span>
    </HeaderBox>
  );
};
