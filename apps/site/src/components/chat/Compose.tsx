import { post } from 'boluo-api';
import { useState } from 'react';
import { useChannelId } from '../../hooks/useChannelId';
import { useMe } from '../../hooks/useMe';
import { useFocusPane } from '../../state/panes';

export const Compose = () => {
  const channelId = useChannelId();
  const me = useMe();
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
