import { IBlogCategory } from '@/interfaces';
import React, { FC } from 'react';
import Link from 'next/link';

interface BlogCategoryFilterProps {
  categories: IBlogCategory[];
}

export const BlogCategoryFilter: FC<BlogCategoryFilterProps> = ({ categories }) => {
  return (
    <div className='rounded-xl bg-gray/50 px-[30px] py-[42px]'>
      <h6 className='mb-4 text-xl font-bold capitalize leading-normal text-dark'>Ангилал</h6>

      <ul className='space-y-3'>
        {categories.map((category, index) => {
          return (
            <li key={index}>
              <Link
                href={'#'}
                className='text-base font-medium capitalize leading-normal text-description hover:text-primary'
              >
                {category.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
