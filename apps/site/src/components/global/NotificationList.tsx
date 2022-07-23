import type { FC } from 'react';
import React, { useCallback } from 'react';
import { perform, useAppSelector } from '../../state/store';
import { Toast } from '../fundamental/Toast';
import type { UiNotification } from '../../state/user-interface';

const NotificationCard: FC<UiNotification> = React.memo(({ id, level, child }) => {
  const onClose = useCallback(() => perform('dismissNotification', id), [id]);
  return (
    <Toast className="mt-4" key={id} global level={level} onClose={onClose}>
      {child}
    </Toast>
  );
});
NotificationCard.displayName = 'NotificationCard';

export const NotificationList: FC = () => {
  const notifications = useAppSelector((state) => state.interface.notifications);
  return (
    <div className="fixed -bottom-2 -right-2 z-40 flex flex-col-reverse">
      {notifications.map((notification) => (
        <NotificationCard key={notification.id} {...notification} />
      ))}
    </div>
  );
};
