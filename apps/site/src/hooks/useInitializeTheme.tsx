import { useCallback, useEffect, useRef } from 'react';
import { startSchemeSwitching, stopSchemeSwitching } from '../helper/scheme';
import { isDaytime } from '../helper/time';
import { useAppSelector } from '../state/store';
import { useSwitchScheme } from '../state/user-interface';

export const useInitializeTheme = () => {
  const scheme = useAppSelector((state) => state.interface.scheme);
  const schemeRef = useRef<typeof scheme>(scheme);
  const switchScheme = useSwitchScheme();

  useEffect(() => {
    // update scheme ref
    schemeRef.current = scheme;
  }, [scheme, switchScheme]);

  useEffect(() => {
    // sync scheme state from localStorage
    const storageScheme = localStorage.getItem('SCHEME');
    if (storageScheme && storageScheme !== schemeRef.current) {
      const handle = window.setTimeout(() => {
        switchScheme(storageScheme);
      }, 100);
      return () => window.clearTimeout(handle);
    }
  }, [switchScheme]);

  // watch the scheme change in other pages
  useEffect(() => {
    const listenSchemeChange = (e: StorageEvent) => {
      if (e.key === 'SCHEME') {
        if (e.newValue !== schemeRef.current) {
          switchScheme(e.newValue ?? 'auto');
        }
      }
    };
    window.addEventListener('storage', listenSchemeChange);
    return () => window.removeEventListener('storage', listenSchemeChange);
  }, [switchScheme]);

  // set <meta name="color-scheme"/>
  useEffect(() => {
    if (process.env.NODE_ENV === 'test') {
      return;
    }
    const colorSchemeMeta = document.documentElement.querySelector<HTMLMetaElement>('meta[name="color-scheme"]');
    if (!colorSchemeMeta) {
      console.warn('The <meta name="color-scheme"/> tag cannot be found ');
      return;
    }
    if (scheme === 'dark' || scheme === 'light') {
      colorSchemeMeta.content = scheme;
    } else {
      colorSchemeMeta.content = 'light dark';
    }
  }, [scheme]);

  const switchDark = useCallback(() => {
    document.documentElement.classList.add('dark');
  }, []);
  const switchLight = useCallback(() => {
    document.documentElement.classList.remove('dark');
  }, []);

  // Set theme
  useEffect(() => {
    // Color transition on switching
    startSchemeSwitching();
    const schemeSwitchHandle = setTimeout(stopSchemeSwitching, 1000);
    if (scheme === 'dark') {
      switchDark();
    } else if (scheme === 'light') {
      switchLight();
    } else if (scheme === 'auto') {
      if (!window.matchMedia) {
        // When the `matchMedia` is unsupported
        isDaytime() ? switchLight() : switchDark();
        return;
      }
      // Detect prefers-color-scheme change https://stackoverflow.com/a/59621903/1137004
      const colorSchemeQueryList = window.matchMedia('(prefers-color-scheme: dark)');
      const autoChangeScheme = (mediaQueryList: { matches: boolean }) => {
        if (mediaQueryList.matches) {
          switchDark();
        } else {
          switchLight();
        }
      };
      autoChangeScheme(colorSchemeQueryList);
      colorSchemeQueryList.addEventListener('change', autoChangeScheme);
      return () => {
        colorSchemeQueryList.removeEventListener('change', autoChangeScheme);
        window.clearTimeout(schemeSwitchHandle);
      };
    }
    return () => window.clearTimeout(schemeSwitchHandle);
  }, [scheme, switchDark, switchLight]);
};
