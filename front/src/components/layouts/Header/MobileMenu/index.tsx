import { Icons } from '@/libs';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react';
import { LanguageButton } from '../LanguageButton';
import { useGlobalContext, useLocale } from '@/hooks';
import { MobileMenuItem } from './MobileMenuItem';
import { employment, membershipProgram } from '@/constants';

interface MobileMenuProps {
  show: boolean;
  onAnimationEnd: () => void;
  closeHandler: () => void;
}

export const MobileMenu: FC<MobileMenuProps> = ({ show, onAnimationEnd, closeHandler }) => {
  const { generalInfo, mainMenuItems, topMenuItems } = useGlobalContext();
  const { currentLocale } = useLocale();

  return (
    <>
      <div
        onAnimationEnd={onAnimationEnd}
        className={classNames(
          'fixed bottom-0 right-0 top-0 z-[1001] flex w-[100vw] flex-col bg-white min-[500px]:w-[80vw] md:w-[50vw] lg:hidden',
          {
            'animate-drawerOpen': show,
            'animate-drawerClose': !show,
          },
        )}
      >
        <div className='flex shrink-0 items-center justify-between border-b border-b-gray p-5'>
          <Link href='/' className='h-15 w-15 overflow-hidden'>
            <Image src='/logo-1.png' alt='TMZ' className='h-full w-full object-cover' width={60} height={60} />
          </Link>

          <button
            onClick={closeHandler}
            type='button'
            className='rounded-lg p-2 text-dark active:text-primary active:ring active:ring-primary/50'
          >
            <Icons.MdClose size={24} />
          </button>
        </div>

        <div className='flex-1 overflow-y-auto p-10'>
          <nav>
            <ul>
              {topMenuItems.map((item) => {
                return (
                  <MobileMenuItem
                    key={item.id}
                    menuItem={{
                      child: [],
                      id: item.id,
                      link: item.link,
                      locale: item.locale,
                      title: item.title,
                      priority: item.priority,
                    }}
                  />
                );
              })}

              {mainMenuItems.map((item, index) => {
                return <MobileMenuItem key={index} menuItem={item} />;
              })}
            </ul>
          </nav>
        </div>

        <div className='flex shrink-0 flex-wrap justify-between gap-5 border-t border-t-gray p-5 text-small text-description'>
          <div className='flex items-center gap-5'>
            <Link className='hover:text-primary' href={'/jobs'}>
              {employment[currentLocale! as 'mn' | 'en']}
            </Link>
            <Link className='hover:text-primary' href={'https://members.cpta.mn/'} target='_blank'>
              {membershipProgram[currentLocale! as 'mn' | 'en']}
            </Link>
            <LanguageButton />
          </div>
          <div className='flex items-center gap-5'>
            {generalInfo?.phone && (
              <Link href='#' className='group inline-flex items-center gap-2 transition hover:text-primary'>
                <Icons.FaPhoneAlt size={16} />
                <span>{generalInfo.phone}</span>
              </Link>
            )}
            {generalInfo?.email && (
              <Link href='#' className='inline-flex items-center gap-2 transition hover:text-primary'>
                <Icons.IoMail size={18} />
                <span>{generalInfo.email}</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      <div
        onClick={closeHandler}
        onAnimationEnd={onAnimationEnd}
        className={classNames('fixed inset-0 z-[1000] bg-black/50 lg:hidden', {
          'animate-fadeIn': show,
          'animate-fadeOut': !show,
        })}
      />
    </>
  );
};
