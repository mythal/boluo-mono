import React from 'react';
import Icon from './fundamental/Icon';

interface Props {
  label?: string;
}

export const SpinnerIcon: React.FC<Props> = ({ label }) => {
  return <Icon className="animate-spin" icon="spinner" label={label} />;
};
SpinnerIcon.displayName = 'SpinnerIcon';
