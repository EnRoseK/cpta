import { IStuff } from '@/interfaces';
import { convertAttachmentUrl } from '@/utils';
import Image from 'next/image';
import React, { FC } from 'react';

interface StuffCardProps {
  stuff: IStuff;
}

export const StuffCard: FC<StuffCardProps> = ({ stuff }) => {
  return (
    <div className='w-[calc((100%_-_160px)_/_5)] space-y-5'>
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
          {stuff.lastName} <span className='uppercase'>{stuff.firstName}</span>
        </h4>
        <p className='text-center text-sm italic leading-normal text-description'>{stuff.title}</p>
      </div>
    </div>
  );
};
