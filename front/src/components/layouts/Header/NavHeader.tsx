import { Icons } from '@/libs';
import Link from 'next/link';
import React, { FC } from 'react';

export const NavHeader: FC = () => {
  return (
    <div className='bg-primary py-5 text-white'>
      <div className='container'>
        <nav>
          <ul className='flex items-center justify-between gap-5'>
            {Array.from(Array(5)).map((_, index) => {
              return (
                <li key={index}>
                  <Link href='#' className='text-small flex items-center gap-2 font-medium uppercase'>
                    <span>Мэдээ, мэдээлэл</span>
                    <Icons.IoChevronDownSharp size={18} />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
};
