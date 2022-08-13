import * as RadixSwitch from '@radix-ui/react-switch';
import clsx from 'clsx';
import { FC } from 'react';

// see https://www.radix-ui.com/docs/primitives/components/switch

interface Props {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const Switch: FC<Props> = ({ checked, onChange }) => (
  <RadixSwitch.Root
    checked={checked}
    onCheckedChange={onChange}
    className="w-14 h-8 rounded-full bg-pin-surface-600 relative inline-flex items-center"
  >
    <RadixSwitch.Thumb
      className={clsx(
        'block w-6 h-6 state-unchecked:bg-white state-checked:bg-brand-500 rounded-full shadow-black',
        'shadow-1/2 transition-all duration-200',
        'state-unchecked:translate-x-1 state-checked:translate-x-7',
      )}
    />
  </RadixSwitch.Root>
);
