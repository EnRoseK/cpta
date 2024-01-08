import { CustomLink } from '@/components/global';
import classNames from 'classnames';
import React, { FC } from 'react';

interface DropdownMenuProps {
  onAnimationEnd: () => void;
  show: boolean;
}

export const DropdownMenu: FC<DropdownMenuProps> = ({ show, onAnimationEnd }) => {
  return (
    <ul
      onAnimationEnd={onAnimationEnd}
      className={classNames(
        'absolute left-0 top-full -mt-2 w-max min-w-[150%] space-y-2 rounded-md bg-white p-5 text-dark shadow-card',
        { 'animate-fadeIn': show, 'animate-fadeOut': !show },
      )}
    >
      {Array.from(Array(5)).map((_, index) => {
        return (
          <li key={index} className={classNames('pb-2', { 'border-b border-b-dark/10': index !== 4 })}>
            <CustomLink href={'#'} className='text-base hover:text-primary'>
              Хүндэт гишүүн
            </CustomLink>
          </li>
        );
      })}
    </ul>
  );
};
