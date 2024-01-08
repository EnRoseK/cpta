import { Icons } from '@/libs';
import React, { FC } from 'react';
import { CustomLink } from '../global';

export const HomeCTA: FC = () => {
  return (
    <section className='py-[120px]'>
      <div className='container grid grid-cols-3 gap-6'>
        {Array.from(Array(3)).map((_, ind) => {
          return (
            <CustomLink
              key={ind}
              href={'#'}
              className='group flex items-center justify-between gap-4 rounded-[1000px] border border-gray bg-transparent p-[5px] pr-[30px] hover:border-primary hover:bg-primary'
            >
              <div className='h-14 w-14 rounded-full bg-gray/40 text-dark group-hover:bg-white group-hover:text-primary'></div>

              <span className='flex-1 text-sm font-bold leading-normal text-dark group-hover:text-white'>
                Сургалтын төлөвлөгөө
              </span>

              <span className='text-description group-hover:text-white'>
                <Icons.IoIosArrowRoundForward size={24} />
              </span>
            </CustomLink>
          );
        })}
      </div>
    </section>
  );
};
