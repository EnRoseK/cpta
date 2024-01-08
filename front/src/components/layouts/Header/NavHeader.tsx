import React, { FC, useEffect, useState } from 'react';
import { NavItem } from './NavItem';
import { IMainMenuItem } from '@/interfaces';
import axios from 'axios';
import { useLocale } from '@/hooks';

export const NavHeader: FC = () => {
  const [menuItems, setMenuItems] = useState<IMainMenuItem[]>([]);
  const { currentLocale } = useLocale();

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const res = await axios
          .get<{ data: IMainMenuItem[] }>(`/api/main-menu?locale=${currentLocale}`)
          .then((res) => res.data);

        setMenuItems(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMenuItems();
  }, [currentLocale]);

  return (
    <div className='bg-primary text-white'>
      <div className='container'>
        <nav className='relative w-full'>
          <ul className='flex items-center justify-between gap-5'>
            {menuItems.map((menuItem, index) => {
              return <NavItem key={index} menuItem={menuItem} />;
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
};
