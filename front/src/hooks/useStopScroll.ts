import { useEffect } from 'react';

export const useStopScroll = (show: boolean) => {
  useEffect(() => {
    document.body.classList.toggle('overflow-y-hidden');
  }, [show]);
};
