import React, { FC } from 'react';
import { Button } from '../global';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ShapeOne } from '@/assets/shapes';
import { Icons } from '@/libs';

export const NewsSlider: FC = () => {
  return (
    <section className='relative flex min-h-[675px] w-full items-center justify-center overflow-hidden bg-[#D9D9D9]'>
      <div className='container'>
        <Swiper>
          {Array.from(Array(3)).map((_, index) => {
            return (
              <SwiperSlide key={index}>
                <div className='grid grid-cols-5 items-center gap-10'>
                  <div className='col-span-2 aspect-square w-full overflow-hidden rounded-xl bg-black'></div>

                  <div className='col-span-3'>
                    <h2 className='text-dark mb-6 text-5xl font-bold capitalize leading-normal'>
                      Labaid testing and Laboratory Center.
                    </h2>
                    <p className='text-description mb-10 text-xl leading-normal'>
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa nemo consequuntur tenetur harum
                      perspiciatis! Omnis architecto vel provident? Illo, debitis.
                    </p>
                    <Button asLink>Дэлгэрэнгүй</Button>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      <button
        type='button'
        className='hover:text-primary text-dark absolute left-4 top-1/2 z-10 -translate-y-1/2 cursor-pointer'
      >
        <Icons.IoIosArrowRoundBack size={60} />
      </button>

      <button
        type='button'
        className='hover:text-primary text-dark absolute right-4 top-1/2 z-10 -translate-y-1/2 cursor-pointer'
      >
        <Icons.IoIosArrowRoundForward size={60} />
      </button>

      <div className='absolute bottom-0 left-0'>
        <ShapeOne />
      </div>
    </section>
  );
};
