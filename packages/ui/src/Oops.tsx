import { FC } from 'react';
import { FormattedMessage } from 'react-intl';

export type OopsType = 'block' | 'inline' | 'inline-small';

interface Props {
  error: unknown;
  type?: OopsType;
}

export const Oops: FC<Props> = ({ type = 'block' }) => {
  if (type === 'inline') {
    return (
      <span>
        <span className="font-bold">
          <FormattedMessage defaultMessage="Oops" />
        </span>{' '}
        <span>
          <FormattedMessage defaultMessage="Something going wrong." />
        </span>
      </span>
    );
  } else if (type === 'inline-small') {
    return (
      <span className="font-bold">
        <FormattedMessage defaultMessage="Oops" />
      </span>
    );
  }
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div>
        <div className="font-bold">
          <FormattedMessage defaultMessage="Oops" />
        </div>
        <div>
          <FormattedMessage defaultMessage="Something going wrong." />
        </div>
      </div>
    </div>
  );
};
