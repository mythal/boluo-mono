'use client';
import type { GetMe } from 'boluo-api';
import { useState } from 'react';
import { post } from '../../api/browser';
import { useChannelId } from '../../hooks/useChannelId';
import { useFocusPane } from '../../state/panes';

interface Props {
  me: GetMe;
}

export const Compose = ({ me }: Props) => {
  const channelId = useChannelId();
  const focus = useFocusPane();
  const [text, setText] = useState('');
  const onSubmit = async () => {
    const result = await post('/messages/send', {
      messageId: null,
      channelId,
      name: me.user.nickname,
      text,
      entities: [],
      inGame: false,
      isAction: false,
      mediaId: null,
      pos: null,
      whisperToUsers: null,
    });
    if (result.isOk) {
      setText('');
    }
  };

  return (
    <div onClick={focus}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
        className="input input-default w-full h-full resize-none"
      >
      </textarea>
    </div>
  );
};
