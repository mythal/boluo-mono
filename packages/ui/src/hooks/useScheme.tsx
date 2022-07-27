import { useEffect, useState } from 'react';

export type Scheme = 'light' | 'dark' | 'system';

export const getScheme = (): Scheme => {
  const classList = window.document.documentElement.classList;
  if (classList.contains('dark')) {
    return 'dark';
  } else if (classList.contains('light')) {
    return 'light';
  } else {
    return 'system';
  }
};

export const observeScheme = (callback: (scheme: Scheme) => void): (() => void) => {
  const node = window.document.documentElement;
  const config: MutationObserverInit = {
    attributeFilter: ['class'],
    subtree: false,
    attributeOldValue: false,
    characterDataOldValue: false,
  };

  const observer = new MutationObserver(() => {
    callback(getScheme());
  });

  observer.observe(node, config);
  return () => observer.disconnect();
};

export const useScheme = (): Scheme => {
  const [scheme, setScheme] = useState(getScheme());

  useEffect(() => {
    return observeScheme(setScheme);
  }, []);

  return scheme;
};
