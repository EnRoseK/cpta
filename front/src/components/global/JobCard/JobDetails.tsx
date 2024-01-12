import { IJob } from '@/interfaces';
import { parseMarkDown } from '@/utils';
import classNames from 'classnames';
import React, { FC } from 'react';

interface JobDetailsProps {
  onAnimationEnd: () => void;
  show: boolean;
  closeHandler: () => void;
  job: IJob;
}

export const JobDetails: FC<JobDetailsProps> = ({ onAnimationEnd, closeHandler, show, job }) => {
  const content = parseMarkDown(job.content);

  return (
    <div className='fixed inset-0 z-[1000] flex items-center justify-center'>
      <div
        className={classNames(
          ' job-details z-[1001] max-h-[90vh] w-[800px] overflow-y-auto rounded-xl bg-white p-5 shadow-card',
          {
            'animate-modalIn': show,
            'animate-modalOut': !show,
          },
        )}
        onAnimationEnd={onAnimationEnd}
      >
        <div className='job-details' dangerouslySetInnerHTML={{ __html: content }}></div>
      </div>

      <div
        className={classNames('fixed inset-0 z-[1000] bg-black/50', {
          'animate-fadeIn': show,
          'animate-fadeOut': !show,
        })}
        onClick={closeHandler}
        onAnimationEnd={onAnimationEnd}
      />
    </div>
  );
};
