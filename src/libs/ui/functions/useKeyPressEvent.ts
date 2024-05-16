import { useEffect } from 'react';

export const useKeyPressEvent = (key: string, handler: any): void => {
  useEffect(() => {
    const listener = (event: KeyboardEvent): void => {
      if (event.key === key) handler(event);
    };
    document.addEventListener('keydown', listener, false);
    return () => {
      document.removeEventListener('keydown', listener, false);
    };
  }, [handler, key]);
};
