/* eslint-disable react-hooks/exhaustive-deps */
import { RefObject, useEffect, useState } from 'react';

export function useOnScreen(ref: RefObject<HTMLElement>) {
  const [isIntersecting, setIntersecting] = useState<boolean>(false);
  const [shouldRender, setShouldRender] = useState(isIntersecting);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isIntersecting && count === 0) {
      setShouldRender(true);
      setCount((prev) => prev + 1);
    }
  }, [isIntersecting]);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(([entry]) => setIntersecting(entry.isIntersecting));

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);

  return shouldRender;
}
