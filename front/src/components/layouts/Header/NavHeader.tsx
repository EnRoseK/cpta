import React, { FC } from 'react';
import { NavItem } from './NavItem';
import { useGlobalContext } from '@/hooks';

export const NavHeader: FC = () => {
  const { mainMenuItems } = useGlobalContext();

  return (
    <div className='bg-primary text-white'>
      <div className='container'>
        <nav className='relative w-full'>
          <ul className='flex items-center gap-10'>
            {mainMenuItems.map((menuItem, index) => {
              return <NavItem key={index} menuItem={menuItem} />;
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
};
