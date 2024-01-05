import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react';

export const Footer: FC = () => {
  return (
    <footer className='bg-dark text-white'>
      <div className='container pb-[100px] pt-[120px]'>
        <div className='flex gap-20'>
          <div className='max-w-[420px] shrink-0'>
            <Link href={'/'} className='mb-4 flex items-center gap-4'>
              <div className='h-[60px] w-[60px] shrink-0'>
                <Image src='/logo-1.png' alt='TMZ' className='h-full w-full object-cover' width={60} height={60} />
              </div>
              <span className='text-base font-medium uppercase text-white'>
                Монгол улсын татварын мэргэшсэн зөвлөхийн нийгэмлэг
              </span>
            </Link>

            <p className='text-base leading-[30px] text-white/70'>
              There are many variations of passages of Lorem Ipsum available, but the majority have suffered predefined
              chunks as necessary tests with nursing implications.
            </p>
          </div>

          <div className='grid flex-1 grid-cols-4 gap-6'>
            <div className='col-span-1'>
              <h6 className='mb-3 text-xl font-bold capitalize leading-normal'>About Us</h6>
            </div>

            <div className='col-span-1'>
              <h6 className='mb-3 text-xl font-bold capitalize leading-normal'>About Us</h6>
            </div>

            <div className='col-span-1'>
              <h6 className='mb-3 text-xl font-bold capitalize leading-normal'>About Us</h6>
            </div>

            <div className='col-span-1'>
              <h6 className='mb-3 text-xl font-bold capitalize leading-normal'>About Us</h6>
            </div>
          </div>
        </div>
      </div>

      <div className='border-t border-t-white/[0.07] pb-5 pt-6'>
        <div className='container'>
          <p className='text-center text-base leading-[28px] text-white/70'>
            © Copyright 2024.{' '}
            <Link className='text-white transition hover:underline' href={'#'} target='_blank'>
              Nexus Technology
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};
