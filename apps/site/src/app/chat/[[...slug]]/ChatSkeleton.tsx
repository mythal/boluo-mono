import type { FC } from 'react';
import type { ChildrenProps } from '../../../helper/props';

export const ChatSkeleton: FC<Partial<ChildrenProps>> = ({ children }) => {
  return (
    <div className="chat-grid">
      <div className="border-r border-b-1/2 border-b-gray-400"></div>
      <div className="border-r row-span-2"></div>
      <div className="border-b"></div>
      <div className="flex items-center justify-center row-span-2">{children}</div>
    </div>
  );
};
