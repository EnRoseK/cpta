import { Icons } from '@/libs';
import React, { FC, useState } from 'react';
import { MegaMenu } from './MegaMenu';
import { DropdownMenu } from './DropdownMenu';
import { useAnimation } from '@/hooks';
import { IMainMenuItem, IMegaMenuItem, IMenuItem } from '@/interfaces';
import Link from 'next/link';

interface NavItemProps {
  menuItem: IMainMenuItem;
}

export const NavItem: FC<NavItemProps> = ({ menuItem }) => {
  const hasChild = !!menuItem.child?.[0];
  const megaMenu = menuItem.child?.[0]?.__component === 'menu.mega-menu';
  const childItems =
    menuItem.child?.[0]?.__component === 'menu.mega-menu' ? menuItem.child?.[0]?.menuItems : menuItem.child?.[0]?.items;
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [renderDropdown, onAnimationEnd] = useAnimation(showDropdown);

  return (
    <li
      className={megaMenu ? '' : 'relative'}
      onMouseEnter={() => {
        hasChild && setShowDropdown(true);
      }}
      onMouseLeave={() => {
        hasChild && setShowDropdown(false);
      }}
    >
      <Link
        href={menuItem.link}
        className='group flex items-center gap-1 py-5 text-small font-medium uppercase hover:text-secondary'
      >
        <span className='whitespace-nowrap'>{menuItem.title}</span>
        {hasChild && <Icons.IoChevronDownSharp size={18} className='group-hover:rotate-180' />}
      </Link>

      {renderDropdown && (
        <>
          {megaMenu ? (
            <MegaMenu childItems={childItems as IMegaMenuItem[]} show={showDropdown} onAnimationEnd={onAnimationEnd} />
          ) : (
            <DropdownMenu items={childItems as IMenuItem[]} onAnimationEnd={onAnimationEnd} show={showDropdown} />
          )}
        </>
      )}
    </li>
  );
};
