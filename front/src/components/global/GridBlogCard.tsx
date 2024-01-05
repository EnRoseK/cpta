import Link from 'next/link';
import React, { FC } from 'react';
import { Button } from '.';

export const GridBlogCard: FC = () => {
  return (
    <div className='w-full overflow-hidden rounded-xl shadow-card'>
      <Link href={'/blog/1'} className='block aspect-[1.5/1] w-full overflow-hidden bg-[#c4c4c4]'></Link>

      <div className='bg-white p-7'>
        <span className='mb-3 block text-date capitalize text-description'>April 21, 2023</span>

        <Link
          href='/blog/1'
          className='mb-2 block text-xl font-bold capitalize leading-normal text-dark hover:text-primary'
        >
          sapien, quis porttitor ipsum et.
        </Link>

        <p className='mb-7 text-base leading-[30px] text-description'>
          Duis interdum ex lobortis, suscipit purus congue, euismod odio. Aenean tempor.
        </p>
        <Button asLink href='/blog/1' variant='gray'>
          Дэлгэрэнгүй
        </Button>
      </div>
    </div>
  );
};
