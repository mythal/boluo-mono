import { Loading as LoadingUi } from 'ui';
import { ChatSkeleton } from './ChatSkeleton';

export default function Loading() {
  return (
    <ChatSkeleton>
      <LoadingUi />
    </ChatSkeleton>
  );
}
