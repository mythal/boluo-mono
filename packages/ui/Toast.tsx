import type { FC, ReactNode } from 'react';
import { createContext, useState } from 'react';

export interface ToastData {
  id: string;
  content: string;
}

export const Toast: FC<ToastData> = ({ id, content }) => {
  return <div>{content}</div>;
};

const ToastsContext = createContext<ToastData[]>([]);
type SetToasts = ReturnType<typeof useState<ToastData[]>>[1];
const SetToastsContext = createContext<SetToasts>(() => {
  throw new Error('Unexpected read `SetToastsContext` out of the <ToastProvider/>.');
});

export const ToastProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastData[]>([]);
  return (
    <ToastsContext.Provider value={toasts}>
      <SetToastsContext.Provider value={setToasts}>{children}</SetToastsContext.Provider>
    </ToastsContext.Provider>
  );
};
