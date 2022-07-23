export type Scheme = 'light' | 'dark' | 'auto';

export const valueToTheme = (value: unknown): Scheme => {
  if (value === 'dark') {
    return 'dark';
  } else if (value === 'light') {
    return 'light';
  } else {
    return 'auto';
  }
};

const SCHEME_KEY = 'SCHEME';

export const readSchemeFromStorage = (): Scheme => {
  try {
    return valueToTheme(localStorage.getItem(SCHEME_KEY));
  } catch (e) {
    return 'auto';
  }
};

export const writeSchemeToStorage = (scheme: Scheme) => {
  localStorage.setItem(SCHEME_KEY, scheme);
};

export const startSchemeSwitching = () => {
  document.documentElement.classList.add('switching');
};

export const stopSchemeSwitching = () => {
  document.documentElement.classList.remove('switching');
};
