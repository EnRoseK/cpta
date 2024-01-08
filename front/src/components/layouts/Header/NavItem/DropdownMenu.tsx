import { IMenuItem } from '@/interfaces';
import classNames from 'classnames';
import Link from 'next/link';
import React, { FC } from 'react';

interface DropdownMenuProps {
  onAnimationEnd: () => void;
  show: boolean;
  items: IMenuItem[];
}

export const DropdownMenu: FC<DropdownMenuProps> = ({ show, onAnimationEnd, items }) => {
  return (
    <ul
      onAnimationEnd={onAnimationEnd}
      className={classNames(
        'absolute left-0 top-full -mt-2 w-max min-w-[150%] space-y-2 rounded-md bg-white p-5 text-dark shadow-card',
        { 'animate-fadeIn': show, 'animate-fadeOut': !show },
      )}
    >
      {items
        .sort((a, b) => a.priority - b.priority)
        .map((item, index, arr) => {
          return (
            <li
              key={index}
              className={classNames({
                'border-b border-b-dark/10 pb-2': index !== arr.length - 1,
                'pb-0': index === arr.length - 1,
              })}
            >
              <Link href={item.link} className='text-base hover:text-primary'>
                {item.title}
              </Link>
            </li>
          );
        })}
    </ul>
  );
};
