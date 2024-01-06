import Image from 'next/image';
import React, { FC } from 'react';

export const LanguageButton: FC = () => {
  return (
    <button type='button' className='h-4 w-8 overflow-hidden active:scale-105'>
      <Image src='/uk.webp' alt='English' width={32} height={16} className='h-full w-full object-cover' />
    </button>
  );
};
