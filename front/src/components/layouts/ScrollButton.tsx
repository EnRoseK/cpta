import { useAnimation } from '@/hooks';
import { Icons } from '@/libs';
import classNames from 'classnames';
import React, { FC, useEffect, useState } from 'react';

export const ScrollButton: FC = () => {
  const [isTop, setIsTop] = useState<boolean>(true);
  const [renderButton, onAnimationEnd] = useAnimation(!isTop);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const checkTop = () => {
    if (window.scrollY >= 90) {
      setIsTop(false);
    } else {
      setIsTop(true);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', checkTop);

    return () => {
      window.removeEventListener('scroll', checkTop);
    };
  }, []);

  return (
    <>
      {renderButton && (
        <button
          onAnimationEnd={onAnimationEnd}
          className={classNames(
            'fixed bottom-10 right-10 z-[999] rounded-full border border-dark bg-white p-4 text-dark hover:border-primary hover:bg-primary hover:text-white active:ring active:ring-primary/50',
            { 'animate-scrollBtnOut': isTop, 'animate-scrollBtnIn': !isTop },
          )}
          type='button'
          onClick={scrollToTop}
        >
          <Icons.FaArrowUp size={18} />
        </button>
      )}
    </>
  );
};
