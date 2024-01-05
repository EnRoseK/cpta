import React, { FC } from 'react';
import { GridBlogCard, SeeMoreLink } from '../global';

export const LatestNews: FC = () => {
  return (
    <section className='bg-white py-[120px]'>
      <div className='container'>
        <div className='mb-14 flex w-full items-center justify-between'>
          <h3 className='text-dark text-sectionTitle font-bold capitalize'>Мэдээ мэдээлэл</h3>

          <SeeMoreLink />
        </div>

        <div className='grid grid-cols-3 gap-6'>
          <GridBlogCard />
          <GridBlogCard />
          <GridBlogCard />
        </div>
      </div>
    </section>
  );
};
