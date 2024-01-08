import classNames from 'classnames';
import React, { FC } from 'react';

interface LoadingScreenProps {
  show: boolean;
  onAnimationEnd: () => void;
}

export const LoadingScreen: FC<LoadingScreenProps> = ({ show, onAnimationEnd }) => {
  return (
    <div
      onAnimationEnd={onAnimationEnd}
      className={classNames('loading-body', { 'animate-fadeIn': show, 'animate-fadeOut': !show })}
    >
      <div className='loading-container'>
        <div className='loading-text'>
          <span>L</span>
          <span>O</span>
          <span>A</span>
          <span>D</span>
          <span>I</span>
          <span>N</span>
          <span>G</span>
        </div>
      </div>
    </div>
  );
};
