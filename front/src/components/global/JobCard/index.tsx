import { useAnimation } from '@/hooks';
import React, { FC, useState } from 'react';
import { JobDetails } from './JobDetails';
import { IJob } from '@/interfaces';
import { convertDateToString } from '@/utils';

interface JobCardProps {
  job: IJob;
}

export const JobCard: FC<JobCardProps> = ({ job }) => {
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [renderDetails, onAnimationEnd] = useAnimation(showDetails);

  return (
    <div className='group w-full overflow-hidden rounded-xl bg-white p-[30px] shadow-cardSmall hover:bg-primary'>
      <div className='mb-8 inline-block rounded-[5px] bg-primary px-4 text-small text-white group-hover:bg-secondary group-hover:text-primary'>
        {convertDateToString(new Date(job.createdAt))}
      </div>
      <h4 className='mb-4 text-2xl font-bold leading-normal text-dark group-hover:text-white'>{job.title}</h4>
      <p className='mb-5 text-base leading-[30px] text-description group-hover:text-white'>
        {job.description.slice(0, 150)}
        {job.description.length > 150 && '...'}
      </p>
      <button
        className='rounded-[50px] border border-gray px-7 py-[5px] text-base leading-[30px] text-dark hover:bg-white hover:!text-primary active:ring active:ring-white/50 group-hover:border-white group-hover:text-white'
        type='button'
        onClick={() => setShowDetails((prev) => !prev)}
      >
        Дэлгэрэнгүй
      </button>

      {renderDetails && (
        <JobDetails
          job={job}
          onAnimationEnd={onAnimationEnd}
          show={showDetails}
          closeHandler={() => setShowDetails(false)}
        />
      )}
    </div>
  );
};
