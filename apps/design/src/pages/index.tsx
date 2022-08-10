import clsx from 'clsx';
import { FC } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import { ButtonPage } from './ButtonPage';
import { Home } from './Home';

const pages = [ButtonPage];

const getName = (component: FC<{}>): string => {
  const name = component.displayName ?? component.name;
  if (!name) {
    throw new Error('Unknown component name');
  }
  return name;
};

const getPath = (component: FC<{}>): string => `/page/${getName(component)}`;

const pageLinkClass = ({ isActive }: { isActive: boolean }) =>
  clsx('hover:underline hover:bg-gray-50 rounded-r-lg w-40 px-4 py-2 block', {
    'font-bold bg-gray-100': isActive,
  });

export const PageLinkList = () => (
  <ul className="border-brand-400 hover:border-brand-600 border-l-1/2">
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
