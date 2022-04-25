import { useEffect } from 'react';

export const useInterval = (callback: () => void, delay: number | null): void => {
  useEffect(() => {
    if (!delay && delay !== 0) {
      return;
    }

    const id = setInterval(callback, delay);

    return () => clearInterval(id);
  }, []);
};
