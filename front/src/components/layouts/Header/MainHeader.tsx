import { Button, CustomLink } from '@/components/global';
import { useLocale } from '@/hooks';
import Image from 'next/image';
import React, { FC } from 'react';

export const MainHeader: FC = () => {
  const { currentLocale } = useLocale();

  return (
    <div className='bg-white py-5'>
      <div className='container'>
        <div className='flex items-center justify-between'>
          {/* Logo */}
          <CustomLink href={'/'} className='group flex items-center gap-4'>
            <div className='h-[60px] w-[60px]'>
              <Image
                src='/logo-1.png'
                alt='TMZ'
                width={50}
                height={50}
                className='h-full w-full object-cover group-hover:scale-110'
              />
            </div>
            <span className='max-w-[400px] text-lg font-medium uppercase text-dark group-hover:text-primary'>
              {currentLocale === 'mn'
                ? 'Монгол улсын татварын мэргэшсэн зөвлөхийн нийгэмлэг'
                : 'Mongolian Association of Certified Tax Consultants'}
            </span>
          </CustomLink>

          <Button asLink>Гишүүний программ</Button>
        </div>
      </div>
    </div>
  );
};
