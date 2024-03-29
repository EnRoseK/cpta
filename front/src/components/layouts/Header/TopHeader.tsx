import { Icons } from '@/libs';
import React, { FC } from 'react';
import { LanguageButton } from './LanguageButton';
import Link from 'next/link';
import { useGlobalContext, useLocale } from '@/hooks';
import { employment } from '@/constants';

export const TopHeader: FC = () => {
  const { currentLocale } = useLocale();
  const { generalInfo } = useGlobalContext();

  return (
    <div className='hidden border-b border-b-gray bg-white pb-3 pt-4 lg:block'>
      <div className='container'>
        <div className='flex items-center justify-between text-small text-description'>
          <div className='flex items-center gap-5'>
            {generalInfo?.phone && (
              <Link
                href={`tel:${generalInfo.phone}`}
                className='group inline-flex items-center gap-2 transition hover:text-primary'
              >
                <Icons.FaPhoneAlt size={16} />
                <span>{generalInfo.phone}</span>
              </Link>
            )}
            {generalInfo?.email && (
              <Link
                href={`mailto:${generalInfo.email}`}
                className='inline-flex items-center gap-2 transition hover:text-primary'
              >
                <Icons.IoMail size={18} />
                <span>{generalInfo.email}</span>
              </Link>
            )}
          </div>

          <div className='flex items-center gap-4'>
            <Link href='/jobs' className='capitalize transition hover:text-primary'>
              {employment[currentLocale! as 'mn' | 'en']}
            </Link>

            <LanguageButton />
          </div>
        </div>
      </div>
    </div>
  );
};
