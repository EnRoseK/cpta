import React, { FC } from 'react';
import { GridBlogCard, SeeMoreLink } from '../global';
import { IBlog, ISection } from '@/interfaces';

interface LatestNewsProps {
  blogs: IBlog[];
  sectionInfo: ISection;
}

export const LatestNews: FC<LatestNewsProps> = ({ blogs, sectionInfo }) => {
  if (blogs.length === 0) {
    return <></>;
  }

  return (
    <section className='bg-white py-[120px]'>
      <div className='container'>
        <div className='mb-14 flex w-full items-center justify-between'>
          <h3 className='text-sectionTitle font-bold capitalize text-dark'>{sectionInfo.sectionTitle}</h3>

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
