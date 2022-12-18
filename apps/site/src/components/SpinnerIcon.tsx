import React from 'react';
import { CircleNotch } from 'boluo-icons';
import Icon from './fundamental/Icon';

interface Props {
  label?: string;
}

export const SpinnerIcon: React.FC<Props> = ({ label }) => {
  return <Icon className="animate-spin" icon={CircleNotch} label={label} />;
};
SpinnerIcon.displayName = 'SpinnerIcon';