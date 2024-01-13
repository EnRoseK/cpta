import { IGreeting } from '@/interfaces';
import Image from 'next/image';
import React, { FC, useState } from 'react';
import { Button } from '..';
import { convertAttachmentUrl } from '@/utils';
import { useAnimation, useStopScroll } from '@/hooks';
import { GreetingDetails } from './GreetingDetails';

interface GreetingCardProps {
  greeting: IGreeting;
}

export const GreetingCard: FC<GreetingCardProps> = ({ greeting }) => {
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [shouldRender, onAnimationEnd] = useAnimation(showDetails);

  useStopScroll(showDetails);

  return (
    <>
      <div className='w-full overflow-hidden rounded-xl shadow-card'>
        <div className='aspect-[1/1.3] w-full overflow-hidden bg-[#d9d9d9]'>
          <Image
            src={convertAttachmentUrl(greeting.picture.url)}
            alt={greeting.picture.alternativeText || greeting.firstName}
            className='h-full w-full object-cover'
            width={greeting.picture.width}
            height={greeting.picture.height}
          />
        </div>

        <div className='bg-white p-6 text-center'>
          <h5 className='mb-2 text-xl font-bold leading-normal text-dark'>
            {greeting.lastName} <span className='uppercase'>{greeting.firstName}</span>
          </h5>

          <p className='mb-4 text-sm italic text-description'>{greeting.title}</p>

          <div className='flex justify-center'>
            <Button size={'small'} onClick={() => setShowDetails(true)} variant='gray'>
              Дэлгэрэнгүй
            </Button>
          </div>
        </div>
      </div>

      {shouldRender && (
        <GreetingDetails
          greeting={greeting}
          show={showDetails}
          closeHandler={() => setShowDetails(false)}
          onAnimationEnd={onAnimationEnd}
        />
      )}
    </>
  );
};
