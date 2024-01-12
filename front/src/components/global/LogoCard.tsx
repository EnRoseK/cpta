import { IAttachment } from '@/interfaces';
import React, { FC } from 'react';
import { Button } from '.';
import { useLocale } from '@/hooks';
import Image from 'next/image';
import { convertAttachmentUrl } from '@/utils';
import { saveAs } from 'file-saver';

interface LogoCardProps {
  logo: IAttachment;
}

export const LogoCard: FC<LogoCardProps> = ({ logo }) => {
  const { currentLocale } = useLocale();

  const download = () => {
    saveAs(convertAttachmentUrl(logo.url), logo.name);
  };

  return (
    <div className='overflow-hidden rounded-xl bg-white p-[30px] shadow-card'>
      <div className='mb-10 flex items-center justify-center'>
        <div className='aspect-[1.8/1] w-full'>
          <Image
            src={convertAttachmentUrl(logo.url)}
            alt={logo.alternativeText || 'Logo'}
            width={logo.width}
            height={logo.height}
            className='h-full w-full object-contain'
          />
        </div>
      </div>
      <Button fullWidth onClick={download}>
        {currentLocale === 'mn' ? 'Татах' : 'Download'}
      </Button>
    </div>
  );
};
