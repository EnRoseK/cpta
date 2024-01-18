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
          <span>татварын мэргэшсэн зөвлөх үйлчилгээ монголд - 20 жил</span>
        </div>
      </div>
    </div>
  );
};
