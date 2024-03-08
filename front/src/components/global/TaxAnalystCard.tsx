import { useLocale } from '@/hooks';
import { ITaxAnalyst } from '@/interfaces';
import { convertAttachmentUrl } from '@/utils';
import Image from 'next/image';
import React, { FC } from 'react';

interface TaxAnalystCardProps {
  taxAnalyst: ITaxAnalyst;
}

export const TaxAnalystCard: FC<TaxAnalystCardProps> = ({ taxAnalyst }) => {
  const { currentLocale } = useLocale();

  return (
    <div className='w-full overflow-hidden rounded-xl border border-dark/[0.07]'>
      <div className='group aspect-[1/1.13] w-full overflow-hidden'>
        <Image
          src={convertAttachmentUrl(taxAnalyst.picture.url)}
          alt={taxAnalyst.picture.alternativeText || taxAnalyst.firstName}
          width={taxAnalyst.picture.width}
          height={taxAnalyst.picture.height}
          className='h-full w-full object-cover group-hover:scale-105'
        />
      </div>
      <div className='bg-white p-[30px]'>
        <h6 className='mb-4 text-xl font-bold leading-normal text-dark'>
          {currentLocale === 'mn' ? (
            <>
              {taxAnalyst.lastName} {taxAnalyst.firstName}
            </>
          ) : (
            <>
              {taxAnalyst.firstName} {taxAnalyst.lastName}
            </>
          )}
        </h6>
        <p className='text-base leading-[30px] text-description'>
          <span>
            {currentLocale === 'mn' ? 'ТМЗ дугаар' : 'TMZ number'}: {taxAnalyst.tmzNumber}
          </span>{' '}
          <br />
          <span>
            {currentLocale === 'mn' ? 'Батламжийн дугаар' : 'Confirmation number'}: {taxAnalyst.confirmationNumber}
          </span>
          <br />
          <span>
            {currentLocale === 'mn' ? 'И-мэйл' : 'E-mail'}: {taxAnalyst.email}
          </span>{' '}
          <br />
          <span>
            {currentLocale === 'mn' ? 'Утас' : 'Phone number'}: {taxAnalyst.phone}
          </span>
        </p>
      </div>
    </div>
  );
};
