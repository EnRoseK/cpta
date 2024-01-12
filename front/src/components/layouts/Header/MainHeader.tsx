import { Button } from '@/components/global';
import { useLocale } from '@/hooks';
import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react';

export const MainHeader: FC = () => {
  const { currentLocale } = useLocale();

  return (
    <div className='bg-white py-5'>
      <div className='container'>
        <div className='flex items-center justify-between'>
          {/* Logo */}
          <Link href={'/'} className='group flex items-center gap-4'>
            <div className='h-10 w-10 shrink-0 lg:h-[60px] lg:w-[60px]'>
              <Image
                src='/logo-1.png'
                alt='TMZ'
                width={50}
                height={50}
                className='h-full w-full object-cover group-hover:scale-110'
              />
            </div>
            <span className='max-w-[180px] text-sm font-medium uppercase text-dark group-hover:text-primary sm:max-w-[300px] lg:max-w-[400px] lg:text-lg'>
              {currentLocale === 'mn'
                ? 'Монгол улсын татварын мэргэшсэн зөвлөхийн нийгэмлэг'
                : 'Mongolian Association of Certified Tax Consultants'}
            </span>
          </Link>

          <div className='hidden lg:block'>
            <Button newTab asLink href='https://members.cpta.mn'>
              {currentLocale === 'mn' ? 'Гишүүний программ' : 'Membership Program'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
