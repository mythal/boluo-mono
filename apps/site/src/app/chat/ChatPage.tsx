'use client';

import { useRouter } from 'next/router';
import type { FC } from 'react';
import React, { Suspense, useEffect, useMemo, useState } from 'react';
import type { ChildrenProps } from 'ui/dist/types';
import { validate as validateUuid } from 'uuid';
import { ChatNotFound } from '../../components/chat/ChatNotFound';
import { MeContext, useGetMe } from '../../hooks/useMe';

const ChatLoading: FC<{ reason?: string }> = ({ reason = 'Loading...' }) => {
  return <div className="w-full">{reason}</div>;
};

type Reason = string;

const Chat = React.lazy(() => import('../../components/chat/Chat'));

interface Params {
  spaceId: string;
}

const NOT_FOUND = 'NOT_FOUND';

const isUuid = (str: unknown): str is string => typeof str == 'string' && validateUuid(str);

function useParams(): Params | typeof NOT_FOUND {
  const { query } = useRouter();
  if (!('params' in query) || !Array.isArray(query.params)) {
    return NOT_FOUND;
  }
  const params: string[] = query.params;

  // /space/[spaceId]
  if (params[0]?.toLowerCase() === 'space' && isUuid(params[1])) {
    const spaceId = params[1];
    return {
      spaceId: params[1],
    };
  }

  return 'NOT_FOUND';
}

const ChatMeProvider: FC<ChildrenProps> = ({ children }) => {
  const router = useRouter();
  const me = useGetMe();

  if (me === 'LOADING') {
    return <ChatLoading reason="User infomation loading" />;
  }
  if (me === 'GUEST') {
    router.push('/account/login').catch(console.warn);
    return null;
  }

  return <MeContext.Provider value={me}>{children}</MeContext.Provider>;
};

export const ChatPage: FC = () => {
  const [loading, setLoading] = useState<Reason | false>('Page Loading...');

  // To prevent SSR
  useEffect(() => setLoading(false), []);

  const params = useParams();

  if (loading !== false) {
    return <ChatLoading reason={loading} />;
  }

  if (params === NOT_FOUND) {
    return <ChatNotFound />;
  }
  const { spaceId } = params;

  return (
    <ChatMeProvider>
      <Chat key={spaceId} spaceId={spaceId} />
    </ChatMeProvider>
  );
};
