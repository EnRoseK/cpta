import { IMegaMenuItem } from '@/interfaces';
import classNames from 'classnames';
import Link from 'next/link';
import React, { FC } from 'react';

interface MegaMenuProps {
  show: boolean;
  onAnimationEnd: () => void;
  childItems: IMegaMenuItem[];
}

export const MegaMenu: FC<MegaMenuProps> = ({ show, onAnimationEnd, childItems }) => {
  return (
    <div
      onAnimationEnd={onAnimationEnd}
      className={classNames(
        'absolute left-0 right-0 top-full -mt-2 w-full rounded-md bg-white px-8 py-5 text-dark shadow-card',
        {
          'animate-fadeIn': show,
          'animate-fadeOut': !show,
        },
      )}
    >
      <div className='flex flex-wrap gap-10'>
        {childItems.map((child, index) => {
          return (
            <div key={index} className='max-w-[300px]'>
              <h6 className='mb-5 border-b border-b-dark/20 pb-2 text-lg font-semibold uppercase'>{child.title}</h6>
              {child.items.map((item, index, arr) => {
                return (
                  <li
                    key={index}
                    className={classNames({
                      'border-b border-b-dark/10 pb-0': index !== arr.length - 1,
                      'pb-2': index === arr.length - 1,
                    })}
                  >
                    <Link href={item.link} className='text-base hover:text-primary'>
                      {item.title}
                    </Link>
                  </li>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};
