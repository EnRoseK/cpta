import React, { FC } from 'react';
import { NavItem } from './NavItem';

export const NavHeader: FC = () => {
  return (
    <div className='bg-primary text-white'>
      <div className='container'>
        <nav className='relative w-full'>
          <ul className='flex items-center justify-between gap-5'>
            {Array.from(Array(5)).map((_, index) => {
              return <NavItem megaMenu={index === 0} key={index} />;
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
};
