import { useLocale } from '@/hooks';
import { IStuff } from '@/interfaces';
import { convertAttachmentUrl } from '@/utils';
import Image from 'next/image';
import React, { FC } from 'react';

interface StuffCardProps {
  stuff: IStuff;
}

export const StuffCard: FC<StuffCardProps> = ({ stuff }) => {
  const { currentLocale } = useLocale();

  return (
    <div className='w-full space-y-5 min-[500px]:w-[calc((100%_-_40px)_/_2)] md:w-[calc((100%_-_80px)_/_3)] lg:w-[calc((100%_-_120px)_/_4)] xl:w-[calc((100%_-_160px)_/_5)]'>
      <div className='group aspect-[1/1.13] w-full overflow-hidden rounded-xl'>
        <Image
          src={convertAttachmentUrl(stuff.picture.url)}
          alt={stuff.picture.alternativeText || stuff.firstName}
          width={stuff.picture.width}
          height={stuff.picture.height}
          className='h-full w-full object-cover group-hover:scale-105'
        />
      </div>

      <div className='space-y-2'>
        <h4 className='text-center text-base font-medium capitalize text-dark'>
          {currentLocale === 'mn' ? (
            <>
              {stuff.lastName} <span className='uppercase'>{stuff.firstName}</span>
            </>
          ) : (
            <>
              <span className='uppercase'>{stuff.firstName}</span> {stuff.lastName}
            </>
          )}
        </h4>
        <p className='text-center text-sm italic leading-normal text-description'>{stuff.title}</p>
      </div>
    </div>
  );
};
