import { Button } from '@/components/global';
import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react';

export const MainHeader: FC = () => {
  return (
    <div className='bg-white py-5'>
      <div className='container'>
        <div className='flex items-center justify-between'>
          {/* Logo */}
          <Link href={'/'} className='group flex items-center gap-4'>
            <div className='h-[60px] w-[60px]'>
              <Image
                src='/logo-1.png'
                alt='TMZ'
                width={50}
                height={50}
                className='h-full w-full object-cover group-hover:scale-110'
              />
            </div>
            <span className='text-dark group-hover:text-primary max-w-[400px] text-lg font-medium uppercase'>
              Монгол улсын татварын мэргэшсэн зөвлөхийн нийгэмлэг
            </span>
          </Link>

          <Button asLink>Гишүүний программ</Button>
        </div>
      </div>
    </div>
  );
};
