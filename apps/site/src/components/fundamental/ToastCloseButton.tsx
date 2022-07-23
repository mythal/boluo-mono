import clsx from 'clsx';
import React from 'react';
import Icon from './Icon';

interface Props {
  onClose: () => void;
}

export const ToastCloseButton: React.FC<Props> = ({ onClose }) => {
  return (
    <button
      aria-label="close"
      onClick={() => onClose()}
      className={clsx(
        'cursor-pointer appearance-none border-none',
        'text-[inherit] flex h-7 w-7 items-center justify-center rounded text-xl',
        'bg-white/20 hover:bg-white/50 focus:ring active:bg-white/75'
      )}
    >
      <Icon icon="x" />
    </button>
  );
};
