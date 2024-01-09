import { IBlogCategory } from '@/interfaces';
import React, { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import { useLocale } from '@/hooks';

interface BlogCategoryFilterProps {
  categories: IBlogCategory[];
  isDetailsPage?: boolean;
}

export const BlogCategoryFilter: FC<BlogCategoryFilterProps> = ({ categories, isDetailsPage = false }) => {
  const { currentLocale } = useLocale();
  const router = useRouter();
  const selectedCategory = router.query.category;

  if (categories.length === 0) {
    return <></>;
  }

  return (
    <div className='rounded-xl bg-gray/50 px-[30px] py-[42px]'>
      <h6 className='mb-4 text-xl font-bold capitalize leading-normal text-dark'>
        {currentLocale === 'mn' ? 'Ангилал' : 'Categories'}
      </h6>

      <ul className='space-y-3'>
        <li>
          <Link
            scroll={false}
            href={{ pathname: '/blog', query: {} }}
            className={classNames(
              'text-base font-medium capitalize leading-normal text-description hover:text-primary',
              { 'text-primary': !selectedCategory && !isDetailsPage },
            )}
          >
            {currentLocale === 'mn' ? 'Бүгд' : 'All'}
          </Link>
        </li>

        {categories.map((category, index) => {
          return (
            <li key={index}>
              <Link
                scroll={false}
                href={{ pathname: '/blog', query: { category: category.slug } }}
                className={classNames(
                  'text-base font-medium capitalize leading-normal text-description hover:text-primary',
                  { 'text-primary': selectedCategory === category.slug && !isDetailsPage },
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
