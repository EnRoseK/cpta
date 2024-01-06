import { useAnimation } from '@/hooks';
import React, { FC, useState } from 'react';
import { JobDetails } from './JobDetails';

export const JobCard: FC = () => {
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [renderDetails, onAnimationEnd] = useAnimation(showDetails);

  return (
    <div className='shadow-cardSmall group w-full overflow-hidden rounded-xl bg-white p-[30px] hover:bg-primary'>
      <div className='mb-2 inline-block rounded-[5px] bg-primary px-2 text-small text-white group-hover:bg-secondary group-hover:text-primary'>
        Бүтэн цаг
      </div>
      <h4 className='mb-4 text-2xl font-bold leading-normal text-dark group-hover:text-white'>
        Global Sales & Marketing.
      </h4>
      <p className='mb-5 text-base leading-[30px] text-description group-hover:text-white'>
        Proin sollicitudin semper nulla ultricies efficitur. Donec facilisis consequat neque. Vestibulum semper massa ac
        maximus laoreet.
      </p>
      <button
        className='rounded-[50px] border border-gray px-7 py-[5px] text-base leading-[30px] text-dark hover:bg-white hover:!text-primary active:ring active:ring-white/50 group-hover:border-white group-hover:text-white'
        type='button'
        onClick={() => setShowDetails((prev) => !prev)}
      >
        Дэлгэрэнгүй
      </button>

      {renderDetails && (
        <JobDetails onAnimationEnd={onAnimationEnd} show={showDetails} closeHandler={() => setShowDetails(false)} />
      )}
    </div>
  );
};
