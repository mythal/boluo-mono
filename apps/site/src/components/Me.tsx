import { Loading } from 'ui';
import { useMe } from '../hooks/useMe';

export const Me = () => {
  const me = useMe();
  if (!me) {
    return <span>Not logged in</span>;
  }
  if (me === 'LOADING') {
    return <Loading type="inline" />;
  }
  return <span>{me.user.nickname}</span>;
};
