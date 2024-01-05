import { FC } from 'react';
import { TopHeader } from './TopHeader';
import { MainHeader } from './MainHeader';
import { NavHeader } from './NavHeader';

export const Header: FC = () => {
  return (
    <>
      <TopHeader />

      <header className='sticky top-0 z-[999]'>
        <MainHeader />
        <NavHeader />
      </header>
    </>
  );
};
