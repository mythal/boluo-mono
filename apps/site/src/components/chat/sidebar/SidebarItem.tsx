import clsx from 'clsx';
import type { FC, ReactNode } from 'react';

interface Props {
  onClick: () => void;
  icon?: ReactNode;
  active?: boolean;
  children: ReactNode;
}

export const SidebarItem: FC<Props> = ({ onClick, icon, children, active = false }) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'flex text-left items-center gap-1 w-full py-2 px-4 hover:bg-surface-200',
        active && 'bg-surface-200',
      )}
    >
      <span className={active ? 'text-surface-600' : 'text-surface-400'}>{icon}</span>
      {children}
    </button>
  );
};
