import React, { FC } from 'react';
import { Button } from '../global';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ShapeOne } from '@/assets/shapes';
import { Icons } from '@/libs';
import { IBlog } from '@/interfaces';
import Image from 'next/image';
import { convertAttachmentUrl } from '@/utils';
import Link from 'next/link';
import { Navigation } from 'swiper/modules';

interface NewsSliderProps {
  blogs: IBlog[];
}

export const NewsSlider: FC<NewsSliderProps> = ({ blogs }) => {
  if (blogs.length === 0) {
    return <></>;
  }

  return (
    <section className='relative flex min-h-[675px] w-full items-center justify-center overflow-hidden bg-[#D9D9D9]'>
      <div className='container'>
        <Swiper
          modules={[Navigation]}
          slidesPerView={1}
          spaceBetween={1}
          navigation={{
            nextEl: '.swiper-news__navigation-next',
            prevEl: '.swiper-news__navigation-prev',
            disabledClass: 'pointer-events-none text-dark/50',
          }}
        >
          {blogs.map((blog, index) => {
            const moreUrl = `/blog/${blog.slug}`;

            return (
              <SwiperSlide key={index}>
                <div className='grid grid-cols-1 items-center gap-10 py-10 md:grid-cols-2 lg:grid-cols-5 lg:py-0'>
                  <Link
                    href={moreUrl}
                    className='group col-span-1 block aspect-square w-full overflow-hidden rounded-xl bg-black sm:aspect-[1.7/1] md:aspect-square lg:col-span-2'
                  >
                    {blog.thumbnail.mime.includes('image') && (
                      <Image
                        src={convertAttachmentUrl(blog.thumbnail.url)}
                        alt={blog.thumbnail.alternativeText || blog.thumbnail.name}
                        width={blog.thumbnail.width}
                        height={blog.thumbnail.height}
                        className='h-full w-full object-cover group-hover:scale-105'
                      />
                    )}
                    {blog.thumbnail.mime.includes('video') && (
                      <video className='h-full w-full object-cover' controls>
                        <source src={convertAttachmentUrl(blog.thumbnail.url)} type='video/mp4' />
                        Таны вэб хөтөч видео тоглуулах боломжгүй байна.
                      </video>
                    )}
                  </Link>

                  <div className='col-span-1 lg:col-span-3'>
                    <div className='flex flex-col items-center text-center md:block md:text-start'>
                      <Link
                        href={moreUrl}
                        className='mb-6 block text-3xl font-bold normal-case leading-snug text-dark hover:text-primary lg:text-[40px]'
                      >
                        {blog.title}
                      </Link>
                      <p className='mb-10 text-base leading-normal text-description lg:text-lg'>
                        {blog.description.slice(0, 150)}
                        {blog.description.length > 150 && '...'}
                      </p>
                      <Button asLink href={moreUrl}>
                        Дэлгэрэнгүй
                      </Button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      <button type='button' className='swiper-news__navigation-prev hidden lg:block'>
        <Icons.IoIosArrowRoundBack size={60} />
      </button>

      <button type='button' className='swiper-news__navigation-next hidden lg:block'>
        <Icons.IoIosArrowRoundForward size={60} />
      </button>

      <div className='absolute bottom-0 left-0'>
        <ShapeOne />
      </div>
    </section>
  );
};
