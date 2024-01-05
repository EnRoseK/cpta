import { Icons } from '@/libs';
import Link from 'next/link';
import React, { FC } from 'react';

export const HomeCTA: FC = () => {
  return (
    <section className='py-[120px]'>
      <div className='container grid grid-cols-3 gap-6'>
        {Array.from(Array(3)).map((_, ind) => {
          return (
            <Link
              key={ind}
              href={'#'}
              className='border-gray hover:bg-primary hover:border-primary group flex items-center justify-between gap-4 rounded-[1000px] border bg-transparent p-[5px] pr-[30px]'
            >
              <div className='bg-gray/40 group-hover:text-primary text-dark h-14 w-14 rounded-full group-hover:bg-white'></div>

              <span className='text-dark flex-1 text-sm font-bold leading-normal group-hover:text-white'>
                Сургалтын төлөвлөгөө
              </span>

              <span className='text-description group-hover:text-white'>
                <Icons.IoIosArrowRoundForward size={24} />
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
