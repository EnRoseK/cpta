import { Icons } from '@/libs';
import Link from 'next/link';
import React, { FC } from 'react';
import { LanguageButton } from './LanguageButton';

export const TopHeader: FC = () => {
  return (
    <div className='border-b border-b-gray bg-white pb-3 pt-4'>
      <div className='container'>
        <div className='flex items-center justify-between text-small text-description'>
          <div className='flex items-center gap-5'>
            <Link href='#' className='group inline-flex items-center gap-2 transition hover:text-primary'>
              <Icons.FaPhoneAlt size={16} />
              <span>76118989</span>
            </Link>
            <Link href='#' className='inline-flex items-center gap-2 transition hover:text-primary'>
              <Icons.IoMail size={18} />
              <span>info@cpta.mn</span>
            </Link>
          </div>

          <div className='flex items-center gap-4'>
            <Link href='/jobs' className='capitalize transition hover:text-primary'>
              Ажлын байр
            </Link>

            <LanguageButton />
          </div>
        </div>
      </div>
    </div>
  );
};
