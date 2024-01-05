import classNames from 'classnames';
import React, { FC } from 'react';

interface MegaMenuProps {
  show: boolean;
  onAnimationEnd: () => void;
}

export const MegaMenu: FC<MegaMenuProps> = ({ show, onAnimationEnd }) => {
  return (
    <div
      onAnimationEnd={onAnimationEnd}
      className={classNames('absolute top-full -mt-2 w-full rounded-md bg-white p-5 text-dark shadow-card', {
        'animate-fadeIn': show,
        'animate-fadeOut': !show,
      })}
    >
      MegaMenu
    </div>
  );
};
