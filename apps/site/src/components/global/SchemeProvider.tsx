import React from 'react';
import type { ChildrenProps } from '../../helper/props';
import { useInitializeTheme } from '../../hooks/useInitializeTheme';

export const SchemeProvider: React.FC<ChildrenProps> = ({ children }) => {
  useInitializeTheme();
  return <React.Fragment>{children}</React.Fragment>;
};
