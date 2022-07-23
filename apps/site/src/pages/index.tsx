import type { NextPage } from 'next';
import { FormattedMessage } from 'react-intl';
import Link from 'next/link';
import Logo from '../../public/logo.svg';
import { Me } from '../components/Me';
import { Title } from '../components/global/Title';

const Home: NextPage = () => {
  return (
    <div>
      <Title name="Playground" />
      <main className="p-4">
        <Logo />
        <h1 className=" text-3xl">
          <FormattedMessage defaultMessage="Boluo" />
        </h1>
        <div>
          <Me />
        </div>
        <div>
          <div>
            <Link href="/messenger">
              <a className="link">Messenger</a>
            </Link>
          </div>
          <div>
            <Link className="link" href="/design">
              <a className="link">Design</a>
            </Link>
          </div>
          <div className="flex gap-2">
            <Link className="link" href="/account/login">
              <a className="link">Login</a>
            </Link>
            <Link className="link" href="/account/logout">
              <a className="link">Logout</a>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
