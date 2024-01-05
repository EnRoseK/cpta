import React, { FC, useState } from 'react';
import { Button } from '..';
import { MemberDetails } from './MemberDetails';
import { useAnimation } from '@/hooks';

export const MemberCard: FC = () => {
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [shouldRender, onAnimationEnd] = useAnimation(showDetails);

  return (
    <>
      <div className='w-full overflow-hidden rounded-xl shadow-card'>
        <div className='aspect-[1/1.1] w-full overflow-hidden bg-[#d9d9d9]'></div>

        <div className='bg-white p-6 text-center'>
          <h5 className='mb-8 text-xl font-bold leading-normal text-dark'>Ядмаагийн МИШИГЛҮНДЭН</h5>

          <div className='flex justify-center'>
            <Button onClick={() => setShowDetails(true)} variant='gray'>
              Дэлгэрэнгүй
            </Button>
          </div>
        </div>
      </div>

      {shouldRender && (
        <MemberDetails show={showDetails} closeHandler={() => setShowDetails(false)} onAnimationEnd={onAnimationEnd} />
      )}
    </>
  );
};
