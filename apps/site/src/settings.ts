import type { Locale } from './locale';

export interface Settings {
  locale?: Locale;
}

export const getSettings = (rawSettings: unknown): Settings => {
  if (!rawSettings || typeof rawSettings !== 'object') {
    return {};
  }
  return rawSettings as Settings;
};
