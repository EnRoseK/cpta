import React, { FC, useState } from 'react';
import { Button } from '..';
import { MemberDetails } from './MemberDetails';
import { useAnimation, useLocale, useStopScroll } from '@/hooks';
import { IHonoraryMember } from '@/interfaces';
import Image from 'next/image';
import { convertAttachmentUrl } from '@/utils';
import { readMore } from '@/constants';

interface MemberCardProps {
  honoraryMember: IHonoraryMember;
}

export const MemberCard: FC<MemberCardProps> = ({ honoraryMember }) => {
  const { currentLocale } = useLocale();
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [shouldRender, onAnimationEnd] = useAnimation(showDetails);

  useStopScroll(showDetails);

  return (
    <>
      <div className='w-full overflow-hidden rounded-xl shadow-card'>
        <div className='aspect-[1/1.1] w-full overflow-hidden bg-[#d9d9d9]'>
          <Image
            src={convertAttachmentUrl(honoraryMember.picture.url)}
            alt={honoraryMember.picture.alternativeText || honoraryMember.firstName}
            className='h-full w-full object-cover'
            width={honoraryMember.picture.width}
            height={honoraryMember.picture.height}
          />
        </div>

        <div className='bg-white p-6 text-center'>
          <h5 className='mb-8 text-xl font-bold leading-normal text-dark'>
            {currentLocale === 'mn' ? (
              <>
                {honoraryMember.lastName} <span className='uppercase'>{honoraryMember.firstName}</span>
              </>
            ) : (
              <>
                <span className='uppercase'>{honoraryMember.firstName}</span> {honoraryMember.lastName}
              </>
            )}
          </h5>

          <div className='flex justify-center'>
            <Button onClick={() => setShowDetails(true)} variant='gray' size={'small'}>
              {readMore[currentLocale! as 'mn' | 'en']}
            </Button>
          </div>
        </div>
      </div>

      {shouldRender && (
        <MemberDetails
          honoraryMember={honoraryMember}
          show={showDetails}
          closeHandler={() => setShowDetails(false)}
          onAnimationEnd={onAnimationEnd}
        />
      )}
    </>
  );
};
