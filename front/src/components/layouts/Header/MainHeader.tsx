import { Button } from '@/components/global';
import { useAnimation, useLocale } from '@/hooks';
import { Icons } from '@/libs';
import Image from 'next/image';
import Link from 'next/link';
import React, { FC, useEffect, useState } from 'react';
import { MobileMenu } from './MobileMenu';
import { useRouter } from 'next/router';
import { membershipProgram, siteName } from '@/constants';

export const MainHeader: FC = () => {
  const router = useRouter();
  const { currentLocale } = useLocale();
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
  const [renderMobileMenu, onAnimationEnd] = useAnimation(showMobileMenu);

  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      setShowMobileMenu(false);
    });

    return () => {
      router.events.off('routeChangeStart', () => {
        setShowMobileMenu(false);
      });
    };
  }, [router]);

  return (
    <>
      <div className='bg-white py-5 shadow-card lg:shadow-none'>
        <div className='container'>
          <div className='flex items-center justify-between'>
            {/* Logo */}
            <Link href={'/'} className='group flex items-center gap-4'>
              <div className='h-[60px] w-[60px] shrink-0'>
                <Image
                  src='/logo-1.png'
                  alt='TMZ'
                  width={50}
                  height={50}
                  className='h-full w-full object-cover group-hover:scale-110'
                />
              </div>
              <span className='hidden text-sm font-medium uppercase text-dark group-hover:text-primary sm:block sm:max-w-[300px] lg:max-w-[400px] lg:text-lg'>
                {siteName[currentLocale! as 'mn' | 'en']}
              </span>
            </Link>

            <div className='hidden lg:block'>
              <Button newTab asLink href='https://members.cpta.mn'>
                {membershipProgram[currentLocale! as 'mn' | 'en']}
              </Button>
            </div>

            <div className='lg:hidden'>
              <button
                onClick={() => setShowMobileMenu((prev) => !prev)}
                type='button'
                className='inline-block rounded-lg p-2 text-dark active:text-primary active:ring active:ring-primary/50'
              >
                <Icons.RiMenu3Fill size={26} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {renderMobileMenu && (
        <MobileMenu
          show={showMobileMenu}
          onAnimationEnd={onAnimationEnd}
          closeHandler={() => setShowMobileMenu(false)}
        />
      )}
    </>
  );
};
