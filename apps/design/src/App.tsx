import clsx from 'clsx';
import { SchemeSwitch } from 'ui';
import { PageLinkList, PageRouter } from './pages';
import { Providers } from './Providers';

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
