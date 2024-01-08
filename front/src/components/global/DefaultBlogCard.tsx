import React, { FC } from 'react';
import { Button, CustomLink } from '.';

export const DefaultBlogCard: FC = () => {
  return (
    <div className='w-full overflow-hidden rounded-xl shadow-card'>
      <CustomLink href='/blog/1' className='block aspect-[2.16/1] w-full overflow-hidden bg-[#d9d9d9]'></CustomLink>

      <div className='bg-white p-[30px]'>
        <span className='mb-4 block text-date text-description'>April 21, 2023</span>
        <CustomLink
          href={'/blog/1'}
          className='mb-5 block text-3xl font-bold leading-none text-dark hover:text-primary'
        >
          Aliquam vel nibh sapien. Suspendisse placerat.
        </CustomLink>
        <p className='mb-6 text-base leading-[30px] text-description'>
          Praesent malesuada risus eget lobortis euismod. Suspendisse arcu justo, tempus sit amet ipsum sed, dapibus
          sollicitudin velit. Sed hendrerit nec sapien in rutrum. Praesent ullamcorper lobortis nisl, et porta nulla
          ullamcorper. Quisque risus lacus, luctus eget arcu rhoncus Aliquam vel nibh sapien. Suspendisse placerat,
          augue sed tempus lacinia, orci augue luctus odio.
        </p>
        <Button asLink href='/blog/1' variant='gray'>
          Дэлгэрэнгүй
        </Button>
      </div>
    </div>
  );
};
