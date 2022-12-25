import type { Scheme } from 'ui';
import type { Locale } from './locale';

export interface Settings {
  locale?: Locale;
  scheme?: Scheme;
}

export const getSettings = (rawSettings: unknown): Settings => {
  if (!rawSettings || typeof rawSettings !== 'object') {
    return {};
  }
  return rawSettings as Settings;
};
