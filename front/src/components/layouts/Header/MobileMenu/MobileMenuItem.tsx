import { useAnimation } from '@/hooks';
import { IMainMenuItem } from '@/interfaces';
import { Icons } from '@/libs';
import Link from 'next/link';
import React, { FC, useState } from 'react';
import { MobileMenuItemChild } from './MobileMenuItemChild';

interface MobileMenuItemProps {
  menuItem: IMainMenuItem;
}

export const MobileMenuItem: FC<MobileMenuItemProps> = ({ menuItem }) => {
  const hasChild = !!menuItem.child[0];
  const [showChild, setShowChild] = useState<boolean>(false);
  const [renderChild, onAnimationEnd] = useAnimation(showChild);

  return (
    <>
      <li className='border-b border-b-gray py-4 text-base text-dark'>
        {hasChild ? (
          <button
            onClick={() => setShowChild((prev) => !prev)}
            type='button'
            className='flex w-full items-center justify-between hover:text-primary'
          >
            <span>{menuItem.title}</span>
            <span>
              <Icons.IoChevronForward />
            </span>
          </button>
        ) : (
          <Link href={menuItem.link} className='hover:text-primary'>
            {menuItem.title}
          </Link>
        )}
      </li>

      {renderChild && (
        <MobileMenuItemChild
          title={menuItem.title}
          child={menuItem.child[0]}
          show={showChild}
          onAnimationEnd={onAnimationEnd}
          closeHandler={() => setShowChild(false)}
        />
      )}
    </>
  );
};
