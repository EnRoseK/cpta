import { ILicenseExtendExam } from '@/interfaces';
import { convertAttachmentUrl } from '@/utils';
import Image from 'next/image';
import Link from 'next/link';
import React, { FC, Fragment } from 'react';

interface LicenseExtendExamProps {
  licenseExtendExam: ILicenseExtendExam;
}

export const LicenseExtendExam: FC<LicenseExtendExamProps> = ({ licenseExtendExam }) => {
  return (
    <>
      {licenseExtendExam.title && <h1 className='mb-5 text-center text-xl text-dark'>{licenseExtendExam.title}</h1>}
      {licenseExtendExam.leftTitleOne && (
        <h2 className='mb-5 text-end text-base italic text-description'>{licenseExtendExam.leftTitleOne}</h2>
      )}
      {licenseExtendExam.leftTitleTwo && (
        <h2 className='mb-5 text-end text-base italic text-description'>{licenseExtendExam.leftTitleTwo}</h2>
      )}
      {licenseExtendExam.rightTitle && (
        <h2 className='mb-5 text-start text-base text-dark'>
          {licenseExtendExam.rightTitle.split(' ').map((text, index) => {
            if (text.slice(0, 3) === 'www') {
              return (
                <Link
                  key={index}
                  href={'https://' + text.slice(4)}
                  target='_blank'
                  className='text-primary hover:underline'
                >
                  {text}{' '}
                </Link>
              );
            } else {
              return <Fragment key={index}>{text} </Fragment>;
            }
          })}
        </h2>
      )}
      {licenseExtendExam.picture && (
        <Image
          src={convertAttachmentUrl(licenseExtendExam.picture.url)}
          alt={licenseExtendExam.picture.alternativeText || licenseExtendExam.title || licenseExtendExam.picture.name}
          width={licenseExtendExam.picture.width}
          height={licenseExtendExam.picture.height}
          className='block h-auto w-full'
        />
      )}
    </>
  );
};
