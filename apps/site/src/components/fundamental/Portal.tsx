import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import type { ChildrenProps } from '../../helper/props';

// See also https://github.com/vercel/next.js/tree/canary/examples/with-portals
export const Portal: React.FC<ChildrenProps> = React.memo(({ children }) => {
  const rootRef = useRef<HTMLElement | null>();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const portalElement = document.getElementById('portal');
    if (!portalElement) {
      throw new Error("Can't found portal element.");
    }
    rootRef.current = portalElement;
    setMounted(true);
  }, []);
  return mounted && rootRef.current ? ReactDOM.createPortal(children, rootRef.current) : null;
});
Portal.displayName = 'Portal';
