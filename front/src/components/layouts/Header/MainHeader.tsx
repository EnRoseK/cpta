import { Button } from '@/components/global';
import { useLocale } from '@/hooks';
import { Icons } from '@/libs';
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
            <div className='h-[60px] w-[60px] shrink-0'>
              <Image
                src='/logo-1.png'
                alt='TMZ'
                width={50}
                height={50}
                className='h-full w-full object-cover group-hover:scale-110'
              />
            </div>
            <span className='hidden text-sm font-medium uppercase text-dark group-hover:text-primary sm:block sm:max-w-[300px] lg:max-w-[400px] lg:text-lg'>
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

          <div className='lg:hidden'>
            <button
              type='button'
              className='inline-block rounded-lg p-2 text-dark active:text-primary active:ring active:ring-primary/50'
            >
              <Icons.RiMenu3Fill size={26} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
