import * as RadixSwitch from '@radix-ui/react-switch';
import clsx from 'clsx';
import type { FC } from 'react';

// see https://www.radix-ui.com/docs/primitives/components/switch

interface Props {
  id?: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
}

export const Switch: FC<Props> = ({ checked, onChange, id, disabled = false }) => (
  <RadixSwitch.Root
    checked={checked}
    onCheckedChange={onChange}
    disabled={disabled}
    className={clsx(
      'w-12 h-8 rounded-full bg-pin-surface-500 relative inline-flex',
      'items-center state-checked:bg-pin-brand-900 flex-none transition-all duration-100 ease-in-out',
      disabled && 'contrast-50 brightness-75 cursor-not-allowed',
    )}
  >
    <RadixSwitch.Thumb
      id={id}
      className={clsx(
        'block w-6 h-6 state-unchecked:bg-white state-checked:bg-brand-300 rounded-full ',
        'transition-all duration-150 ease-out',
        'state-unchecked:translate-x-1 state-checked:translate-x-5',
      )}
    />
  </RadixSwitch.Root>
);
