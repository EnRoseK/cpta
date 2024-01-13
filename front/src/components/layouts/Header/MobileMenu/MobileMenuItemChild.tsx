import { IDropdownMenu, IMegaMenu } from '@/interfaces';
import { Icons } from '@/libs';
import classNames from 'classnames';
import React, { FC } from 'react';
import Link from 'next/link';
import { LanguageButton } from '../LanguageButton';
import { useGlobalContext, useLocale } from '@/hooks';
import { employment, membershipProgram } from '@/constants';

interface MobileMenuItemChildProps {
  show: boolean;
  onAnimationEnd: () => void;
  closeHandler: () => void;
  title: string;
  child: IDropdownMenu | IMegaMenu;
}

export const MobileMenuItemChild: FC<MobileMenuItemChildProps> = ({
  show,
  onAnimationEnd,
  closeHandler,
  title,
  child,
}) => {
  const { currentLocale } = useLocale();
  const { generalInfo } = useGlobalContext();
  const isMegaMenu = child.__component === 'menu.mega-menu';

  return (
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
      <div className='flex shrink-0 items-center gap-3 border-b border-b-gray p-5 text-lg text-dark '>
        <button
          onClick={closeHandler}
          type='button'
          className='rounded-lg p-2 active:text-primary active:ring active:ring-primary/50'
        >
          <Icons.IoChevronBack size={24} />
        </button>
        <span>{title}</span>
      </div>

      <div className='flex-1 overflow-y-auto p-10'>
        {!isMegaMenu && (
          <nav>
            <ul>
              {child.items.map((item, index) => {
                return (
                  <li key={index} className='border-b border-b-gray py-4 text-base text-dark'>
                    <Link href={item.link} className='hover:text-primary'>
                      {item.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}

        {isMegaMenu && (
          <nav className='flex flex-col gap-8'>
            {child.menuItems.map((item, index) => {
              return (
                <div key={index}>
                  <h6 className='mb-3 text-lg font-medium text-dark'>{item.title}</h6>
                  <ul className='border-l border-l-gray pl-4'>
                    {item.items.map((childItem, ind) => {
                      return (
                        <li key={`${index}-${ind}`} className='border-b border-b-gray py-4 text-base text-dark'>
                          <Link href={childItem.link} className='hover:text-primary'>
                            {childItem.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </nav>
        )}
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
  );
};
