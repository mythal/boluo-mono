export type Theme = 'light' | 'dark' | 'system';

export const toTheme = (value: string): Theme => {
  if (value === 'light') {
    return 'light';
  } else if (value === 'dark') {
    return 'dark';
  } else {
    return 'system';
  }
};

export const getThemeFromDom = (): Theme => {
  const classList = window.document.documentElement.classList;
  if (classList.contains('dark')) {
    return 'dark';
  } else if (classList.contains('light')) {
    return 'light';
  } else {
    return 'system';
  }
};

export const setThemeToDom = (value: string): Theme => {
  const html = window.document.documentElement;
  if (value === 'light') {
    html.classList.add('light');
    html.classList.remove('dark');
    return 'light';
  } else if (value === 'dark') {
    html.classList.remove('light');
    html.classList.add('dark');
    return 'dark';
  } else {
    html.classList.remove('light');
    html.classList.remove('dark');
    return 'system';
  }
};

export const observeTheme = (callback: (theme: Theme) => void): () => void => {
  const node = window.document.documentElement;
  const config: MutationObserverInit = {
    attributeFilter: ['class'],
    subtree: false,
    attributeOldValue: false,
    characterDataOldValue: false,
  };

  const observer = new MutationObserver(() => {
    callback(getThemeFromDom());
  });

  observer.observe(node, config);
  return () => observer.disconnect();
};
