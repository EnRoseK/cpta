import { useAnimation } from '@/hooks';
import { Icons } from '@/libs';
import classNames from 'classnames';
import React, { FC, useEffect, useState } from 'react';

interface CollapseProps {
  title: string;
  content: string;
  show?: boolean;
  onClick?: () => void;
}

export const Collapse: FC<CollapseProps> = ({ title, content, show, onClick }) => {
  const [showContent, setShowContent] = useState<boolean>(show || false);
  const [renderContent, onAnimationEnd] = useAnimation(showContent);

  useEffect(() => {
    if (show !== undefined) {
      setShowContent(show);
    }
  }, [show]);

  return (
    <div className='w-full border-b border-b-gray px-[30px] pb-5'>
      <button
        onClick={() => {
          setShowContent((prev) => !prev);
          onClick && onClick();
        }}
        type='button'
        className={classNames('flex w-full items-center justify-between text-lg text-dark hover:text-primary', {
          'text-primary': showContent,
        })}
      >
        <span>{title}</span>
        <span className={classNames({ 'rotate-180': showContent })}>
          <Icons.IoChevronDownSharp size={12} />
        </span>
      </button>
      {renderContent && (
        <div
          onAnimationEnd={onAnimationEnd}
          className={classNames({ 'animate-collapseOpen': showContent, 'animate-collapseClose': !showContent })}
        >
          <span className='inline-block pt-4 text-base leading-[30px] text-description'>{content}</span>
        </div>
      )}
    </div>
  );
};
