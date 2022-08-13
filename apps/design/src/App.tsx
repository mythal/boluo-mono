import clsx from 'clsx';
import { FC } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import { SchemeSwitch } from 'ui';
import { pages } from './pages';
import { Home } from './pages/Home';
import { Providers } from './Providers';

const getName = (component: FC<{}>): string => {
  const name = component.displayName ?? component.name;
  if (!name) {
    throw new Error('Unknown component name');
  }
  return name;
};

const getPath = (component: FC<{}>): string => `/page/${getName(component)}`;

const pageLinkClass = ({ isActive }: { isActive: boolean }) =>
  clsx('hover:underline hover:bg-surface-300 rounded-r-lg w-40 px-4 py-2 block', {
    'font-bold bg-surface-200': isActive,
  });

export const PageLinkList = () => (
  <ul className="border-brand-500 border-l-1/2">
    <li>
      <NavLink to="/" className={pageLinkClass}>
        Home
      </NavLink>
    </li>
    {pages.map((Component) => {
      const name = getName(Component);
      const path = getPath(Component);
      return (
        <li key={name}>
          <NavLink className={pageLinkClass} to={path}>
            {name}
          </NavLink>
        </li>
      );
    })}
  </ul>
);

export const PageRouter = () => {
  return (
    <Routes>
      {pages.map((Component) => {
        const name = getName(Component);
        return <Route key={name} path={getPath(Component)} element={<Component />} />;
      })}
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

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
