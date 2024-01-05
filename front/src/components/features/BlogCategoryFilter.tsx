import Link from 'next/link';
import React, { FC } from 'react';

export const BlogCategoryFilter: FC = () => {
  return (
    <div className='rounded-xl bg-gray/50 px-[30px] py-[42px]'>
      <h6 className='mb-4 text-xl font-bold capitalize leading-normal text-dark'>Ангилал</h6>

      <ul className='space-y-3'>
        {Array.from(Array(5)).map((_, index) => {
          return (
            <li key={index}>
              <Link
                href={'#'}
                className='text-base font-medium capitalize leading-normal text-description hover:text-primary'
              >
                Мэдээ
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
