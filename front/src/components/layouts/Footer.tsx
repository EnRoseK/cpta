import { useGlobalContext, useLocale } from '@/hooks';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

export const Footer: FC = () => {
  const { currentLocale } = useLocale();
  const { footer, generalInfo } = useGlobalContext();

  return (
    <footer className='bg-dark text-white'>
      <div className='container pb-10 pt-15 lg:pb-25 lg:pt-[120px]'>
        <div className='flex flex-col gap-20 lg:flex-row'>
          <div className='max-w-[420px] shrink-0'>
            <Link href={'/'} className='mb-4 flex items-center gap-4'>
              <div className='h-[60px] w-[60px] shrink-0'>
                <Image src='/logo-1.png' alt='TMZ' className='h-full w-full object-cover' width={60} height={60} />
              </div>
              <span className='text-base font-medium uppercase text-white'>
                {currentLocale === 'mn'
                  ? 'Монгол улсын татварын мэргэшсэн зөвлөхийн нийгэмлэг'
                  : 'Mongolian Association of Certified Tax Consultants'}
              </span>
            </Link>

            <p className='text-base leading-[30px] text-white/70'>{footer?.description}</p>
          </div>

          <div className='grid flex-1 grid-cols-1 gap-15 sm:grid-cols-2 md:grid-cols-3 md:gap-5'>
            <div className='col-span-1'>
              <h6 className='mb-4 text-xl font-bold capitalize leading-normal'>
                {currentLocale === 'mn' ? 'ТМЗ нийгэмлэг' : 'Community'}
              </h6>
              <ul className='space-y-4 text-base text-white/70'>
                {footer?.menuItems.map((item, index) => {
                  return (
                    <li key={index}>
                      <Link href={item.link} className='hover:underline'>
                        {item.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className='col-span-1'>
              <h6 className='mb-4 text-xl font-bold capitalize leading-normal'>
                {currentLocale === 'mn' ? 'Холбоо барих' : 'Contact'}
              </h6>

              <ul className='space-y-4 text-base text-white/70'>
                <li>
                  <span className='font-bold'>{currentLocale === 'mn' ? 'Утас' : 'Phone'}:</span> {generalInfo?.phone}
                </li>
                <li>
                  <span className='font-bold'>{currentLocale === 'mn' ? 'И-мэйл' : 'Email'}:</span> {generalInfo?.email}
                </li>
                <li>
                  <span className='font-bold'>{currentLocale === 'mn' ? 'Вэбсайт' : 'Website'}:</span>{' '}
                  {generalInfo?.website}
                </li>
              </ul>
            </div>

            <div className='col-span-1'>
              <h6 className='mb-4 text-xl font-bold capitalize leading-normal'>
                {currentLocale === 'mn' ? 'Хаяг' : 'Address'}
              </h6>
              <ul className='space-y-10 text-base text-white/70'>
                <p>{generalInfo?.address}</p>
                <p>{generalInfo?.workingHours}</p>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className='border-t border-t-white/[0.07] pb-5 pt-6'>
        <div className='container'>
          <p className='text-center text-base leading-[28px] text-white/70'>© {footer?.bottomText}</p>
        </div>
      </div>
    </footer>
  );
};
