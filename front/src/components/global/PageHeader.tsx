import bg from '@/assets/images/pageHeaderBg.svg';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react';

interface PageHeaderProps {
  title: string;
  pages: { title: string; link: string }[];
}

export const PageHeader: FC<PageHeaderProps> = ({ title, pages }) => {
  return (
    <section className='relative flex min-h-[250px] w-full items-center justify-center'>
      <div className='container relative z-10 flex items-center justify-between'>
        <h1 className='text-[50px] font-bold capitalize leading-normal text-dark'>{title}</h1>

        <div className='flex items-center gap-6'>
          <Link href='/' className='text-base font-medium leading-[30px] text-dark'>
            Нүүр хуудас
          </Link>
          {pages.map((page, index) => {
            return (
              <Link
                key={index}
                href={page.link}
                className={classNames(' text-base font-medium leading-[30px] hover:text-primary', {
                  'pointer-events-none text-primary': index === pages.length - 1,
                  'text-dark': index !== pages.length - 1,
                })}
              >
                {page.title}
              </Link>
            );
          })}
        </div>
      </div>

      <div className='absolute inset-0 z-0'>
        <Image src={bg} alt='Background' className='h-full w-full object-contain' />
      </div>
    </section>
  );
};
