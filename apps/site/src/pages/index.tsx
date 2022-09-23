import type { GetMe, Space } from 'boluo-api';
import { Logo } from 'boluo-logo';
import type { NextPage } from 'next';
import Link from 'next/link';
import type { FC } from 'react';
import { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import type { StyleProps } from 'ui/dist/types';
import { Favicon } from '../components/global/Favicon';
import { Title } from '../components/global/Title';
import { Me } from '../components/Me';
import { isLoggedIn, useGetMe } from '../hooks/useMe';

const UserOperations = ({ className }: StyleProps) => {
  const me = useGetMe();
  if (me === 'LOADING') {
    return <span>Loading...</span>;
  }
  if (me === 'GUEST') {
    return (
      <div className={className}>
        <Link className="link" href="/account/login">
          <a className="link">Login</a>
        </Link>
        <Link className="link" href="/account/sign-up">
          <a className="link">Sign Up</a>
        </Link>
      </div>
    );
  }
  return (
    <div className={className}>
      <Link className="link" href="/account/logout">
        <a className="link">Logout</a>
      </Link>
    </div>
  );
};

const MySpaceListItem: FC<{ space: Space }> = ({ space }) => {
  return (
    <div>
      <Link href={`/chat/space/${space.id}`}>
        <a className="link">{space.name}</a>
      </Link>
    </div>
  );
};

const MySpaceList: FC<{ me: GetMe }> = ({ me }) => {
  const items = useMemo(() => (
    me.mySpaces.map(item => <MySpaceListItem key={item.space.id} space={item.space} />)
  ), [me.mySpaces]);
  return <div>{items}</div>;
};

const Home: NextPage = () => {
  const me = useGetMe();
  return (
    <div>
      <Favicon />
      <Title>Home</Title>
      <main className="p-4">
        <Logo />
        <h1 className=" text-3xl">
          <FormattedMessage defaultMessage="Boluo" />
        </h1>
        <div>
          <Me />
        </div>
        <UserOperations className="flex gap-2" />
        {isLoggedIn(me) && <MySpaceList me={me} />}
        <Link href="/space/create">
          <a className="link">Create Plane</a>
        </Link>
      </main>
    </div>
  );
};

export default Home;
