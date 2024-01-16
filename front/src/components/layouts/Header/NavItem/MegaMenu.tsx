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
      className={classNames('absolute left-0 right-0 top-full -mt-1 w-full bg-white px-8 py-5 text-dark shadow-card', {
        'animate-fadeIn': show,
        'animate-fadeOut': !show,
      })}
    >
      <div className='grid grid-cols-4 gap-10'>
        {childItems.map((child, index) => {
          return (
            <div key={index} className='col-span-1'>
              <h6 className='mb-5 border-b border-b-dark/20 pb-2 text-base font-semibold uppercase'>{child.title}</h6>
              <div className='flex flex-col gap-4'>
                {child.items.map((item, index) => {
                  return (
                    <Link key={index} href={item.link} className='text-sm hover:text-primary'>
                      {item.title}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
