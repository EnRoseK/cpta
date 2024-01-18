import { IResearchCouncil } from '@/interfaces';
import { convertAttachmentUrl } from '@/utils';
import Image from 'next/image';
import React, { FC } from 'react';

interface ResearchCouncilCardProps {
  researchCouncil: IResearchCouncil;
}

export const ResearchCouncilCard: FC<ResearchCouncilCardProps> = ({ researchCouncil }) => {
  return (
    <div className='w-full overflow-hidden rounded-xl shadow-card'>
      <div className='aspect-[1/1.1] w-full overflow-hidden bg-[#d9d9d9]'>
        <Image
          src={convertAttachmentUrl(researchCouncil.picture.url)}
          alt={researchCouncil.picture.alternativeText || researchCouncil.firstName}
          className='h-full w-full object-cover'
          width={researchCouncil.picture.width}
          height={researchCouncil.picture.height}
        />
      </div>

      <div className='bg-white p-6 text-center'>
        <h5 className='mb-4 text-xl font-bold leading-normal text-dark'>
          {researchCouncil.lastName} <span className='uppercase'>{researchCouncil.firstName}</span>
        </h5>

        <p className='text-center text-base text-description'>{researchCouncil.text}</p>
      </div>
    </div>
  );
};
