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
    <div
      onAnimationEnd={onAnimationEnd}
      className={classNames(
        'absolute left-0 top-full -mt-1 flex w-max min-w-[120%] flex-col bg-white py-2 text-dark shadow-card',
        {
          'animate-fadeIn': show,
          'animate-fadeOut': !show,
        },
      )}
    >
      {items.map((item, index) => {
        return (
          <Link key={index} href={item.link} className='px-5 py-2 text-sm hover:bg-slate-100 hover:text-primary'>
            {item.title}
          </Link>
        );
      })}
    </div>
  );
};
