import React, { FC } from 'react';
import { GridBlogCard, SeeMoreLink } from '../global';
import { IBlog } from '@/interfaces';

interface LatestNewsProps {
  blogs: IBlog[];
}

export const LatestNews: FC<LatestNewsProps> = ({ blogs }) => {
  return (
    <section className='bg-white py-[120px]'>
      <div className='container'>
        <div className='mb-14 flex w-full items-center justify-between'>
          <h3 className='text-sectionTitle font-bold capitalize text-dark'>Мэдээ мэдээлэл</h3>

          <SeeMoreLink href='/blog' />
        </div>

        <div className='grid grid-cols-3 gap-6'>
          {blogs.map((blog) => {
            return <GridBlogCard key={blog.slug} blog={blog} />;
          })}
        </div>
      </div>
    </section>
  );
};
