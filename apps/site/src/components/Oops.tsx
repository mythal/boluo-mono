import { FormattedMessage } from 'react-intl';
import React, { useRef } from 'react';
import clsx from 'clsx';
import { useContainerQuery } from '../hooks/useContainerQuery';
import { Text } from './fundamental/Text';
import { RefreshButton } from './RefreshButton';
import Icon from './fundamental/Icon';

export interface Props {
  error: unknown;
  className?: string;
}

const config = {
  width: {
    xs: 0,
    sm: 150,
    md: 300,
  },
  height: {
    xs: 0,
    sm: 100,
    md: 150,
  },
};

function OopsXs({}: Props) {
  return (
    <div className="w-full">
      <Text>
        <FormattedMessage defaultMessage="Something going wrong." />{' '}
        <a href="#" onClick={() => window.location.reload()}>
          <Icon icon="refresh" className="mr-1" />
          <FormattedMessage defaultMessage="refresh" />
        </a>
      </Text>
    </div>
  );
}

function OopsMd({}: Props) {
  return (
    <>
      <RefreshButton className="float-right mb-2 ml-2" text={false} small />
      <Text className="text-lg">
        <FormattedMessage defaultMessage="Oops" />
      </Text>
      <Text size="small">
        <FormattedMessage defaultMessage="Something going wrong." />
      </Text>
    </>
  );
}
function OopsLg({}: Props) {
  return (
    <>
      <RefreshButton className="float-right mb-2 ml-2" text />
      <Text className="text-xl">
        <FormattedMessage defaultMessage="Oops" />
      </Text>
      <Text>
        <FormattedMessage defaultMessage="Something going wrong." />
      </Text>
      <Text size="small">
        <FormattedMessage defaultMessage="This may be caused by a network problem. If the error persists after refreshing the page, please contact the admin." />
      </Text>
    </>
  );
}
function Oops({ error, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, height] = useContainerQuery(ref, config);
  console.error(error);
  let oops;

  if (width === 'xs' || height === 'xs') {
    oops = <OopsXs error={error} />;
  } else if (height === 'md' && width === 'md') {
    oops = <OopsLg error={error} />;
  } else {
    oops = <OopsMd error={error} />;
  }

  return (
    <div
      data-width={width}
      data-height={height}
      className={clsx('h-full w-full overflow-hidden p-4', className)}
      ref={ref}
    >
      {oops}
    </div>
  );
}

export default React.memo(Oops);
