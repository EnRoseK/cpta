import { Icons } from '@/libs';
import Link from 'next/link';
import React, { FC } from 'react';

export const TopHeader: FC = () => {
  return (
    <div className='border-b-gray border-b bg-white pb-3 pt-4'>
      <div className='container'>
        <div className='text-description text-small flex items-center justify-between'>
          <div className='flex items-center gap-5'>
            <Link href='#' className='hover:text-primary group inline-flex items-center gap-2 transition'>
              <Icons.FaPhoneAlt size={16} />
              <span>76118989</span>
            </Link>
            <Link href='#' className='hover:text-primary inline-flex items-center gap-2 transition'>
              <Icons.IoMail size={18} />
              <span>info@cpta.mn</span>
            </Link>
          </div>

          <Link href='#' className='hover:text-primary capitalize transition'>
            Ажлын байр
          </Link>
        </div>
      </div>
    </div>
  );
};
