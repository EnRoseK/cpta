import bg from '@/assets/images/pageHeaderBg.svg';
import { useLocale } from '@/hooks';
import { Icons } from '@/libs';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import React, { FC, Fragment } from 'react';

interface PageHeaderProps {
  title: string;
  pages: { title: string; link: string }[];
}

export const PageHeader: FC<PageHeaderProps> = ({ title, pages }) => {
  const { currentLocale } = useLocale();

  return (
    <section className='relative flex min-h-[250px] w-full items-center justify-center'>
      <div className='container relative z-10 flex items-center justify-between'>
        <h1 className='max-w-[600px] text-[40px] font-bold capitalize leading-normal text-dark'>{title}</h1>

        <div className='flex items-center gap-4'>
          <Link href='/' className='text-base font-medium leading-[30px] text-dark'>
            {currentLocale === 'mn' ? 'Нүүр хуудас' : 'Home Page'}
          </Link>
          {pages.map((page, index) => {
            return (
              <Fragment key={index}>
                <Icons.MdOutlineChevronRight size={20} />
                <Link
                  href={page.link}
                  className={classNames(' text-base font-medium leading-[30px] hover:text-primary', {
                    'pointer-events-none text-primary': index === pages.length - 1,
                    'text-dark': index !== pages.length - 1,
                  })}
                >
                  {page.title}
                </Link>
              </Fragment>
            );
          })}
        </div>
      </div>

      <div className='absolute inset-0 z-0'>
        <Image src={bg} alt='Background' className='h-full w-full object-cover object-left' />
      </div>
    </section>
  );
};
