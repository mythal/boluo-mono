import { useEffect, useState } from 'react';
import type { Scheme } from '../scheme';
import { getScheme, observeScheme } from '../scheme';

export const useScheme = (): Scheme => {
  const [scheme, setScheme] = useState(getScheme());

  useEffect(() => {
    return observeScheme(setScheme);
  }, []);

  return scheme;
};
