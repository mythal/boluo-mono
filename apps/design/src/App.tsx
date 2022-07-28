import { PageRouter, PageLinkList } from './pages';
import { Providers } from './Providers';
import { SchemeSwitch } from 'ui';
import clsx from 'clsx';

export function App() {
  return (
    <Providers>
      <div className={clsx('flex w-full')}>
        <div className={clsx('flex-1 p-4')}>
          <PageRouter />
        </div>
        <div className="flex-none p-4">
          <SchemeSwitch className="mb-4" />
          <PageLinkList />
        </div>
      </div>
    </Providers>
  );
}
