import type { FC } from 'react';
import { useIntl } from 'react-intl';
import { useTransition } from 'transition-hook';
import clsx from 'clsx';
import type { ChildrenProps, StyleProps } from '../../helper/props';
import { Button } from 'ui';
import { Overlay } from './Overlay';

interface Props extends StyleProps, ChildrenProps {
  title?: string;
  show?: boolean;
  dismiss: () => void;
  showDismissButton?: boolean;
  dismissText?: string;
  onSubmit?: () => void;
  submitText?: string;
}

export const Dialog: FC<Props> = ({
  children,
  title,
  onSubmit,
  submitText,
  className,
  show = true,
  dismiss,
  showDismissButton = true,
  dismissText,
}) => {
  const transitionTimeMs = 300;
  const { stage, shouldMount } = useTransition(show, transitionTimeMs);
  const intl = useIntl();
  if (!submitText) {
    submitText = intl.formatMessage({ defaultMessage: 'Submit' });
  }
  if (!dismissText) {
    dismissText = intl.formatMessage({ defaultMessage: 'Cancel' });
  }
  if (!shouldMount) {
    return null;
  }

  return (
    <Overlay
      dismiss={dismiss}
      data-stage={stage}
      className={clsx(
        'rounded border-[0.125rem] border-solid border-dialog-border',
        'min-w-[14em] bg-dialog-bg p-4 opacity-0',
        'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
        'shadow-1 shadow-dialog-shadow',
        stage === 'enter' && 'opacity-100 transition-all duration-200',
        stage === 'leave' && ['opacity-0 transition-all duration-200', '-translate-x-1/2 translate-y-[30em]'],
        className
      )}
    >
      {title && <div className="mb-2 pb-1 text-xl">{title}</div>}
      <div>{children}</div>
      {(onSubmit || showDismissButton) && (
        <div className="mt-8 text-right">
          {showDismissButton && <Button onClick={() => dismiss()}>{dismissText}</Button>}
          {onSubmit && (
            <Button data-type="primary" onClick={() => onSubmit()} className="ml-1" type="submit">
              {submitText}
            </Button>
          )}
        </div>
      )}
    </Overlay>
  );
};
