import { IBlogCategory } from '@/interfaces';
import React, { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import classNames from 'classnames';

interface BlogCategoryFilterProps {
  categories: IBlogCategory[];
}

export const BlogCategoryFilter: FC<BlogCategoryFilterProps> = ({ categories }) => {
  const router = useRouter();
  const selectedCategory = router.query.category;

  return (
    <div className='rounded-xl bg-gray/50 px-[30px] py-[42px]'>
      <h6 className='mb-4 text-xl font-bold capitalize leading-normal text-dark'>Ангилал</h6>

      <ul className='space-y-3'>
        <li>
          <Link
            scroll={false}
            href={{ query: { page: 1 } }}
            className={classNames(
              'text-base font-medium capitalize leading-normal text-description hover:text-primary',
              { 'text-primary': !selectedCategory },
            )}
          >
            Бүгд
          </Link>
        </li>

        {categories.map((category, index) => {
          return (
            <li key={index}>
              <Link
                scroll={false}
                href={{ query: { page: 1, category: category.slug } }}
                className={classNames(
                  'text-base font-medium capitalize leading-normal text-description hover:text-primary',
                  { 'text-primary': selectedCategory === category.slug },
                )}
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
