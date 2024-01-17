import { IGreeting } from '@/interfaces';
import { convertAttachmentUrl, parseMarkDown } from '@/utils';
import classNames from 'classnames';
import Image from 'next/image';
import React, { FC } from 'react';
import { Button } from '..';
import { useLocale } from '@/hooks';
import { close, sincerely } from '@/constants';

interface GreetingDetailsProps {
  closeHandler: () => void;
  show: boolean;
  onAnimationEnd: () => void;
  greeting: IGreeting;
}

export const GreetingDetails: FC<GreetingDetailsProps> = ({ closeHandler, show, onAnimationEnd, greeting }) => {
  const { currentLocale } = useLocale();
  const content = parseMarkDown(greeting.content);

  return (
    <div className='fixed inset-0 z-[1000] flex items-center justify-center'>
      <div
        className={classNames(
          ' z-[1001] max-h-[90vh] max-w-[1300px] overflow-y-auto rounded-xl bg-white p-10 shadow-card lg:min-w-[1000px]',
          {
            'animate-modalIn': show,
            'animate-modalOut': !show,
          },
        )}
        onAnimationEnd={onAnimationEnd}
      >
        <div className='grid w-full grid-cols-1 gap-8 sm:grid-cols-3'>
          <div className='col-span-1 aspect-[1/1.4] h-max overflow-hidden rounded-lg bg-[#d9d9d9] sm:sticky sm:top-0'>
            <Image
              src={convertAttachmentUrl(greeting.picture.url)}
              alt={greeting.picture.alternativeText || greeting.firstName}
              className='h-full w-full object-cover'
              width={greeting.picture.width}
              height={greeting.picture.height}
            />
          </div>

          <div className='col-span-1 flex flex-col justify-between sm:col-span-2'>
            <div className='blog-details mb-2' dangerouslySetInnerHTML={{ __html: content }}></div>
            <p className='mb-5 text-end text-base font-normal italic leading-[30px] text-description'>
              <span className='font-medium text-dark'>{sincerely[currentLocale! as 'mn' | 'en']}: </span>{' '}
              {greeting.title} <br /> {greeting.lastName} <span className='uppercase'>{greeting.firstName}</span>
            </p>

            <div className='self-end'>
              <Button size={'small'} variant='gray' onClick={closeHandler}>
                {close[currentLocale! as 'mn' | 'en']}
              </Button>
            </div>
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
