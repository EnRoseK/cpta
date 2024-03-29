import { FC } from 'react';
import { Button } from '..';
import classNames from 'classnames';
import { IHonoraryMember } from '@/interfaces';
import Image from 'next/image';
import { convertAttachmentUrl } from '@/utils';
import { useLocale } from '@/hooks';
import { close } from '@/constants';

interface MemberDetailsProps {
  closeHandler: () => void;
  show: boolean;
  onAnimationEnd: () => void;
  honoraryMember: IHonoraryMember;
}

export const MemberDetails: FC<MemberDetailsProps> = ({ closeHandler, show, onAnimationEnd, honoraryMember }) => {
  const { currentLocale } = useLocale();

  return (
    <div className='fixed inset-0 z-[1000] flex items-center justify-center'>
      <div
        className={classNames(' z-[1001] max-h-[90vh] w-[800px] overflow-y-auto rounded-xl bg-white p-5 shadow-card', {
          'animate-modalIn': show,
          'animate-modalOut': !show,
        })}
        onAnimationEnd={onAnimationEnd}
      >
        <div className='grid w-full grid-cols-1 gap-8 sm:grid-cols-2'>
          <div className='col-span-1 aspect-[1/1.2] overflow-hidden rounded-lg bg-[#d9d9d9]'>
            <Image
              src={convertAttachmentUrl(honoraryMember.picture.url)}
              alt={honoraryMember.picture.alternativeText || honoraryMember.firstName}
              className='h-full w-full object-cover'
              width={honoraryMember.picture.width}
              height={honoraryMember.picture.height}
            />
          </div>

          <div className='col-span-1 flex flex-col justify-between gap-5'>
            <div className='space-y-8'>
              <h5 className='text-xl font-bold leading-normal text-dark'>
                {honoraryMember.lastName} <span className='uppercase'>{honoraryMember.firstName}</span>
              </h5>
              <p className='text-base italic leading-normal text-description'>{honoraryMember.description}</p>
            </div>

            <Button variant='gray' size={'small'} onClick={closeHandler}>
              {close[currentLocale! as 'mn' | 'en']}
            </Button>
          </div>
        </div>
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
