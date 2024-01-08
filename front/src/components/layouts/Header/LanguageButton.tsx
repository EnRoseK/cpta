import { useLocale } from '@/hooks';
import Image from 'next/image';
import React, { FC } from 'react';

export const LanguageButton: FC = () => {
  const { currentLocale, switchLocale } = useLocale();

  return (
    <button onClick={switchLocale} type='button' className='h-4 w-8 overflow-hidden active:scale-105'>
      {currentLocale === 'mn' ? (
        <Image src='/uk.webp' alt='English' width={32} height={16} className='h-full w-full object-cover' />
      ) : (
        <Image src='/mongolia.png' alt='English' width={32} height={16} className='h-full w-full object-cover' />
      )}
    </button>
  );
};
