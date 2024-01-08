import { Icons } from '@/libs';
import React, { FC } from 'react';
import { LanguageButton } from './LanguageButton';
import { CustomLink } from '@/components/global';

export const TopHeader: FC = () => {
  return (
    <div className='border-b border-b-gray bg-white pb-3 pt-4'>
      <div className='container'>
        <div className='flex items-center justify-between text-small text-description'>
          <div className='flex items-center gap-5'>
            <CustomLink href='#' className='group inline-flex items-center gap-2 transition hover:text-primary'>
              <Icons.FaPhoneAlt size={16} />
              <span>76118989</span>
            </CustomLink>
            <CustomLink href='#' className='inline-flex items-center gap-2 transition hover:text-primary'>
              <Icons.IoMail size={18} />
              <span>info@cpta.mn</span>
            </CustomLink>
          </div>

          <div className='flex items-center gap-4'>
            <CustomLink href='/jobs' className='capitalize transition hover:text-primary'>
              Ажлын байр
            </CustomLink>

            <LanguageButton />
          </div>
        </div>
      </div>
    </div>
  );
};
