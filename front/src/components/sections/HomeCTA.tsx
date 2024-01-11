import { Icons } from '@/libs';
import React, { FC } from 'react';
import Link from 'next/link';
import { IHomeCta } from '@/interfaces';
import Image from 'next/image';
import { convertAttachmentUrl } from '@/utils';

interface HomeCTAProps {
  ctas: IHomeCta[];
}

export const HomeCTA: FC<HomeCTAProps> = ({ ctas }) => {
  if (ctas.length === 0) {
    return <></>;
  }

  return (
    <section className='pb-[120px]'>
      <div className='container grid grid-cols-3 gap-6'>
        {ctas.map((cta) => {
          return (
            <Link
              key={cta.id}
              href={cta.link}
              className='group flex items-center justify-between gap-4 rounded-[1000px] border border-gray bg-transparent p-[5px] pr-[30px] hover:border-primary hover:bg-primary'
              target={cta.newTab ? '_blank' : '_self'}
            >
              <div className='flex h-14 w-14 items-center justify-center rounded-full bg-gray/40 text-dark group-hover:bg-white group-hover:text-primary'>
                <div className='h-8 w-8 overflow-hidden'>
                  <Image
                    src={convertAttachmentUrl(cta.icon.url)}
                    alt={cta.icon.alternativeText || cta.title}
                    width={32}
                    height={32}
                    className='h-full w-full object-cover'
                  />
                </div>
              </div>

              <span className='flex-1 text-sm font-bold leading-normal text-dark group-hover:text-white'>
                {cta.title}
              </span>

              <span className='text-description group-hover:text-white'>
                <Icons.IoIosArrowRoundForward size={24} />
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
