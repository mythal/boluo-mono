import { parseBool } from './helper/env';

export const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';
export const IS_BROWSER = process.browser;
export const IS_SAFARI = IS_BROWSER && /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
export const IS_DEBUG = parseBool(process.env.NEXT_PUBLIC_DEBUG);
export const IS_REDUX_TRACE_ENABLE = parseBool(process.env.NEXT_PUBLIC_REDUX_TRACE);
