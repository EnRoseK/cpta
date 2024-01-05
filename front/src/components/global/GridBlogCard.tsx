import Link from 'next/link';
import React, { FC } from 'react';
import { Button } from '.';

export const GridBlogCard: FC = () => {
  return (
    <div className='shadow-card w-full overflow-hidden rounded-xl'>
      <Link href={'#'} className='block aspect-[1.5/1] w-full overflow-hidden bg-[#c4c4c4]'></Link>

      <div className='bg-white p-7'>
        <span className='text-description text-date mb-3 block capitalize'>April 21, 2023</span>

        <Link href='#' className='text-dark hover:text-primary mb-2 block text-xl font-bold capitalize leading-normal'>
          sapien, quis porttitor ipsum et.
        </Link>

        <p className='text-description mb-7 text-base leading-[30px]'>
          Duis interdum ex lobortis, suscipit purus congue, euismod odio. Aenean tempor.
        </p>
        <Button asLink variant='gray'>
          Дэлгэрэнгүй
        </Button>
      </div>
    </div>
  );
};
