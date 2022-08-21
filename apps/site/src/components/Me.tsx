import { Loading } from 'ui';
import { useGetMe } from '../hooks/useMe';

export const Me = () => {
  const me = useGetMe();
  if (me === 'GUEST') {
    return <span>Not logged in</span>;
  } else if (me === 'LOADING') {
    return <Loading type="inline" />;
  } else {
    return <span>{me.user.nickname}</span>;
  }
};
