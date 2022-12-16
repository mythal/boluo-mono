'use client';

import type { FC } from 'react';
import React, { useEffect, useState } from 'react';
import { ChatNotFound } from '../../../components/chat/ChatNotFound';

const ChatLoading: FC<{ reason?: string }> = ({ reason = 'Loading...' }) => {
  return <div className="w-full">{reason}</div>;
};

type Reason = string;

const Chat = React.lazy(() => import('../../../components/chat/Chat'));

interface RootRoute {
  type: 'ROOT';
}

interface SpaceRoute {
  type: 'SPACE';
  spaceId: string;
}

interface NotFoundRoute {
  type: 'NOT_FOUND';
}

export type ChatRoute = RootRoute | SpaceRoute | NotFoundRoute;

export const ChatPage: FC<{ route: ChatRoute }> = ({ route }) => {
  const [loading, setLoading] = useState<Reason | false>('Page Loading...');

  // To prevent SSR
  useEffect(() => setLoading(false), []);

  if (loading !== false) {
    return <ChatLoading reason={loading} />;
  }

  if (route.type === 'NOT_FOUND') {
    return <ChatNotFound />;
  }
  if (route.type === 'ROOT') {
    return <div>TODO</div>;
  }
  const { spaceId } = route;

  return <Chat key={spaceId} spaceId={spaceId} />;
};
