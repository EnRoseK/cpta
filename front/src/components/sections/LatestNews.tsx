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
    <section className='bg-white py-20 lg:py-[120px]'>
      <div className='container'>
        <div className='mb-10 flex w-full flex-col items-center justify-between gap-4 min-[500px]:mb-14 min-[500px]:flex-row'>
          <h3 className='text-sectionTitle font-bold capitalize text-dark'>{sectionInfo.sectionTitle}</h3>

          <SeeMoreLink href='/blog' />
        </div>

        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {blogs.map((blog) => {
            return <GridBlogCard key={blog.slug} blog={blog} />;
          })}
        </div>
      </div>
    </section>
  );
};
