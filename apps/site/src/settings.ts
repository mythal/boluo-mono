import type { Scheme } from 'ui';
import type { Locale } from './locale';

export interface Settings {
  locale?: Locale;
  scheme?: Scheme;
  enterSend?: boolean;
  expandDice?: boolean;
}

export const defaultSettings: Settings = {};

export const toSettings = (rawSettings: unknown): Settings => {
  if (!rawSettings || typeof rawSettings !== 'object') {
    return defaultSettings;
  }
  return rawSettings as Settings;
};
